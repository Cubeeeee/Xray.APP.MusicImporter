using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using Xray.APP.Importer.Interfaces;
using Xray.APP.Importer.Platform.Helper;
using Xray.APP.Impoter.Platform.Helper;

namespace Xray.APP.Importer.Platform
{
    /// <summary>
    /// 平台操作抽象基类
    /// </summary>
    public abstract class Importer_Base : IMusicPlatform
    {
        static Importer_Base()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }
        public ILoginInfo logininfo { get;  set; }
        public IUserInfo userinfo { get;  set; }

        public abstract void AddMusicToList(params object[] parms);
        public abstract bool CheckLogin(params object[] parms);
        public abstract void CreateMusicList(params object[] parms);
        public abstract void GetUserInfo();
        /// <summary>
        ///  各自实现快乐按钮
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <returns></returns>
        public virtual bool ImportList(IMusicList from, IMusicList to)
        {
            List<IMusicInfo> lostmusic = new List<IMusicInfo>();
            List<IMusicInfo> musics = new List<IMusicInfo>();
            foreach (var item in from.musics)
            {
                //剔除时长相差超过30秒的数据
                var search_result = SearchMusic($"{item.name}-{item.singers.FirstOrDefault().name}");
                if (search_result?.Count > 0)
                {
                    var song = GetMatchMusic(search_result, item);
                    if (song != null)
                    {
                        musics.Add(song);
                    }
                    else
                    {
                        //因权重过低被丢弃的歌
                        lostmusic.Add(item);
                    }
                }
                //随机延迟
                Thread.Sleep(RadomMethod.GetRandomDelay());
            }
            AddMusicToList(to,musics);
            return true;
        }

        public virtual void Login()
        {
            throw new NotImplementedException();
        }

        public virtual void OutPutMusicListToExcel(String path)
        {
            using (ExcelPackage package = new ExcelPackage())
            {
                foreach (var item in userinfo.musicLists)
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets.Add($"{item.name}_{Enum.GetName(typeof(MusicListType), item.musicListType)}");//创建worksheet
                    worksheet.DefaultColWidth = 25;
                    worksheet.DefaultColWidth = 20;
                    worksheet.Cells.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    //标题
                    worksheet.Cells[1, 1].Value = "歌曲名称";
                    worksheet.Cells[1, 2].Value = "时长";
                    worksheet.Cells[1, 3].Value = "专辑名";
                    worksheet.Cells[1, 4].Value = "歌手";
                    worksheet.Cells[1, 5].Value = "歌曲状态";
                    worksheet.Cells[1, 6].Value = "播放地址";
                    //Ok now format the values;
                    using (var range = worksheet.Cells[1, 1, 1, 6])
                    {
                        range.Style.Font.Bold = true;
                        range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        range.Style.Fill.BackgroundColor.SetColor(Color.DarkBlue);
                        range.Style.Font.Color.SetColor(Color.White);
                    }
                    for (int i = 0; i < item.musics.Count; i++)
                    {
                        worksheet.Cells[i + 2, 1].Value = item.musics[i].name;
                        worksheet.Cells[i + 2, 2].Value = item.musics[i].time;
                        worksheet.Cells[i + 2, 3].Value = item.musics[i].album;
                        worksheet.Cells[i + 2, 4].Value = String.Join(",", from a in item.musics[i].singers select a.name);
                        worksheet.Cells[i + 2, 5].Value = Enum.GetName(typeof(SongStatue), item.musics[i].songStatue);
                        worksheet.Cells[i + 2, 6].Value = item.musics[i].playurl;
                    }
                    try
                    {
                        package.SaveAs(new FileInfo(path));
                    }
                    catch (Exception)
                    {

                    }
                }

            }
        }

        public abstract List<IMusicInfo> SearchMusic(params object[] parms);
        public abstract List<IMusicInfo> SearchMusic_Suggest(params object[] parms);
        public abstract bool SetLoginInfo(params object[] parms);
        /// <summary>
        /// 为各个属性加权重  选出权重最高的返回
        /// </summary>
        /// <param name="musics"></param>
        /// <param name="music"></param>
        /// <returns></returns>
        public IMusicInfo GetMatchMusic(List<IMusicInfo> musics, IMusicInfo music)
        {
            Dictionary<IMusicInfo, double> weighdic = new Dictionary<IMusicInfo, double>();
            musics.ForEach(item=> {
                double w = 0;
                //歌名 权重5
                w += GetCompareResult(music.name, item.name) * 5;
                //专辑 权重2
                w+= GetCompareResult(music.album, item.album) * 5;
                //时长权重 5
                w -= (Math.Abs(TimeConverter.ToSecondDouble(item.time) - TimeConverter.ToSecondDouble(music.time)) / TimeConverter.ToSecondDouble(item.time)) * 5;
                var singer_a = String.Join(",", from a in item.singers select a.name);
                var singer_b = String.Join(",", from a in music.singers select a.name);
                //歌手 权重10
                w += GetCompareResult(singer_b, singer_a) * 10;
                weighdic.Add(item,w);
            });
           return weighdic.OrderByDescending(w => w.Value).Where(a=>a.Value>0).FirstOrDefault().Key ;
        }
        /// <summary>
        /// Levenshtein Distance算法
        /// </summary>
        /// <param name="source">source string</param>
        /// <param name="target">target string</param>
        /// <returns>0 is different, 1 is equals</returns>
        private double GetCompareResult(string source, string target)
        {

            if (string.IsNullOrEmpty(source))
                return string.IsNullOrEmpty(target) ? 1:0;

            if (string.IsNullOrEmpty(target))
                return string.IsNullOrEmpty(source) ? 1 : 0;

            source = source.ToLowerInvariant().Trim();
            target = target.ToLowerInvariant().Trim();

            var sourceLength = source.Length;
            var targetLength = target.Length;

            var distance = new int[sourceLength + 1, targetLength + 1];

            for (var i = 0; i <= sourceLength; distance[i, 0] = i++) ;
            for (var j = 0; j <= targetLength; distance[0, j] = j++) ;

            for (var i = 1; i <= sourceLength; i++)
            {
                for (var j = 1; j <= targetLength; j++)
                {
                    var cost = (target[j - 1] == source[i - 1]) ? 0 : 1;
                    distance[i, j] = Math.Min(Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1), distance[i - 1, j - 1] + cost);
                }
            }

            //return distance[sourceLength, targetLength];

            double stepsToSame = distance[sourceLength, targetLength];
            return (1.0 - (stepsToSame / (double)Math.Max(source.Length, target.Length)));

        }
    }
}
