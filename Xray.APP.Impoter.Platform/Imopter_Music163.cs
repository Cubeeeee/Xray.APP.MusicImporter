using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading;
using Xray.APP.Impoter.Entitys.LoginInfo;
using Xray.APP.Impoter.Entitys.MusicInfo;
using Xray.APP.Impoter.Entitys.MusicList;
using Xray.APP.Impoter.Entitys.SingerInfo;
using Xray.APP.Impoter.Entitys.UserInfo;
using Xray.APP.Impoter.Interfaces;
using Xray.APP.Impoter.Platform.Helper;
using Xray.Tools.ExtractLib.Encode;
using Xray.Tools.ExtractLib.Extract;
using Xray.Tools.ExtractLib.Extract.ExtractParms;
using Xray.Tools.HttpToolsLib;

namespace Xray.APP.Impoter.Platform
{
    public class Imopter_Music163 : Impoter_Base
    {
        public override void GetUserInfo()
        {
            //获取用户昵称 id 头像
            var result_home = HttpMethod.HttpWork(new HttpItem { URL = "https://music.163.com/", Cookie = logininfo.cookie });
            if (result_home.StatusCode == System.Net.HttpStatusCode.OK)
            {
                String html_home = result_home.Html;
                String userid = ExtractMethod.GetResult(ExtractType.Regex, html_home, "userId:(\\d+)", new RegexPam { Group = 1 });
                this.userinfo = new UserInfo_163
                {
                    userid_163 = userid,
                    image = ExtractMethod.GetResult(ExtractType.Regex, html_home, "avatarUrl:\"(.+?)\"", new RegexPam { Group = 1 }),
                    name = ExtractMethod.GetResult(ExtractType.Regex, html_home, "nickname:\"(.+?)\"", new RegexPam { Group = 1 }),
                    platform = PlatformType.Music163,
                    musicLists = GetMusicList(userid)
                };
                String text = JsonConvert.SerializeObject(this.userinfo);
            }
        }

        private List<IMusicList> GetMusicList(String userid)
        {
            List<IMusicList> lists = new List<IMusicList>();
            //进个人获得歌单列表
            var result_playlist = HttpMethod.HttpWork(new HttpItem
            {
                URL = "https://music.163.com/weapi/user/playlist?csrf_token=",
                ContentType = "application/x-www-form-urlencoded; charset=UTF-8",
                Method = "POST",
                Referer = "https://music.163.com/",
                UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
                Postdata = Encrypt_Music163.EncryptedRequest(JsonConvert.SerializeObject(new
                {
                    uid = userid,
                    wordwrap = "7",
                    offset = "0",
                    total = "true",
                    limit = "36",
                    csrf_token = ""
                }))
            });
            if (result_playlist.StatusCode == System.Net.HttpStatusCode.OK)
            {
                if (JsonConvert.DeserializeObject(result_playlist.Html) is JObject jobj)
                {
                    foreach (var item in jobj.SelectTokens("playlist.[*]"))
                    {
                        int songcount = default;
                        String musiclist_id = Convert.ToString(item.SelectToken("id"));
                        try
                        {
                            songcount = Convert.ToInt32(item.SelectToken("trackCount"));
                        }
                        catch (Exception)
                        {
                            songcount = default;
                        }
                        IMusicList templist = new MusicList_163
                        {
                            authorname = Convert.ToString(item.SelectToken("creator.nickname")),
                            avatarUrl = Convert.ToString(item.SelectToken("creator.avatarUrl")),
                            createtime = EncodeMethod.GetDateTime(Convert.ToString(item.SelectToken("createTime"))),
                            updatetime = EncodeMethod.GetDateTime(Convert.ToString(item.SelectToken("updateTime"))),
                            musicListType = Convert.ToString(item.SelectToken("creator.userId")).Equals(userid) ? MusicListType.Owner : MusicListType.Collection,
                            musiclist_id = musiclist_id,
                            name = Convert.ToString(item.SelectToken("name")),
                            songcount = Convert.ToString(songcount),
                            musiclist_province = Convert.ToString(item.SelectToken("creator.province")),
                            musiclist_city = Convert.ToString(item.SelectToken("creator.city")),
                            playtimes = Convert.ToString(item.SelectToken("playCount")),
                            musics = GetMusic(musiclist_id, songcount),
                        };
#if DEBUG
                        Console.WriteLine(templist.name);
#endif
                        lists.Add(templist);
#if DEBUG
                        break;
#endif
                    }
                }
            }
            else
            {
                throw new Exception("爬取歌单列表失败");
            }
            return lists;
        }
        /// <summary>
        /// 歌单详情
        /// </summary>
        /// <param name="musiclist_id">歌单id</param>
        /// <param name="songcount">歌曲数</param>
        /// <returns></returns>
        private List<IMusicInfo> GetMusic(String musiclist_id, int songcount)
        {
            List<IMusicInfo> musicInfos = new List<IMusicInfo>();
            HttpItem item = new HttpItem
            {
                URL = $"https://music.163.com/#/playlist?id={musiclist_id}",
                UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
                //小于6条不需要登录  不传cookie
                Cookie = songcount > 6 ? logininfo.cookie : String.Empty
            };
            var result_playlist = HttpMethod.HttpWork(item);
            if (result_playlist.StatusCode == System.Net.HttpStatusCode.OK)
            {
                String html = result_playlist.Html;
                var data = ExtractMethod.GetResult(ExtractType.Xpath, html, "//*[@id=\"song-list-pre-data\"]");
                var gs = ExtractMethod.GetResult(ExtractType.Xpath, html, "/html/body/div[3]/div/div/div/div/div/img", new XpathPam { Attr = "data-key" });
                var bqi4m = ExtractMethod.GetResult(ExtractType.Xpath, html, "//*[@id=\"song-list-pre-cache\"]/ul/li/a", new XpathPam { Attr = "href" });
                String listjson = HttpMethod.HttpWork(new HttpItem
                {
                    URL = "http://127.0.0.1:8001/api/",
                    Method = "POST",
                    Postdata = JsonConvert.SerializeObject(new { data, gs, bqi4m })
                }).Html;
                if (JsonConvert.DeserializeObject(listjson) is JArray jarr)
                {
                    foreach (var tk in jarr)
                    {
                        musicInfos.Add(new MusicInfo_163
                        {
                            name = Convert.ToString(tk.SelectToken("name")),
                            musicid_163 = Convert.ToString(tk.SelectToken("id")),
                            singers = GetSingers(tk.SelectTokens("ar[*]")),
                            album = Convert.ToString(tk.SelectToken("al.name")),
                            albumid_163 = Convert.ToString(tk.SelectToken("al.id")),
                            albumpic_163 = Convert.ToString(tk.SelectToken("al.picUrl")),
                            time = TimeConverter.ToMinSecond(tk.SelectToken("dt")),
                            songStatue = GetStatue(Convert.ToString(tk.SelectToken("pv.st")), Convert.ToString(tk.SelectToken("fee")))
                        });
                    }
                }
            }
            else
            {
                throw new Exception("获取歌单详情失败");
            }
            return musicInfos;
        }

        private List<ISingerInfo> GetSingers(IEnumerable<JToken> enumerable)
        {
            List<ISingerInfo> list = new List<ISingerInfo>();
            foreach (var tk in enumerable)
            {
                list.Add(new SingerInfo_163 { platform = PlatformType.Music163, name = Convert.ToString(tk.SelectToken("name")), id = Convert.ToString(tk.SelectToken("id")) });
            }
            return list;
        }

        /// <summary>
        /// 判断歌曲状态
        /// </summary>
        /// <param name="st"></param>
        /// <param name="fee"></param>
        /// <returns></returns>
        private SongStatue GetStatue(string st, string fee)
        {
            SongStatue statue = SongStatue.未知;
            if (st.Equals("-200"))
            {
                statue = SongStatue.无版权;
            }
            else
            {
                switch (fee)
                {
                    case "1":
                        statue = SongStatue.VIP;
                        break;
                    case "8":
                    default:
                        statue = SongStatue.正常;
                        break;
                }
            }
            return statue;
        }

        public override void Login()
        {
            this.logininfo = new LoginInfo_163 { cookie = "_iuqxldmzr_=32; _ntes_nnid=6234c151afd63ea2566b4ed32769fed2,1589432018523; _ntes_nuid=6234c151afd63ea2566b4ed32769fed2; WM_TID=gDRxNAjFc6NBQUFVREdvCRJTlTrq1VtN; MUSIC_U=02969969aff49cc77a133c97e7e915de8ba689fefc8b4f08f2ee7599cdd8288a93597ed9d457305327d9901adef0efa4c3061cd18d77b7a0; __remember_me=true; __csrf=ab85e29fecca09c64ef49150377febe0; ntes_kaola_ad=1; JSESSIONID-WYYY=%2F%2FoTDJ0sfV0V%2BZbAGV%2B2%5CxA2iTFCOeNqOTmhPhwdbjs2ox%2FHaTN5JXOg7NEnyoWGSmVchcasH%5C2%2FBUbEhuFDkl8asCdpv%5C2mrbQ%5CUkjUZwP%2B6lDImsp4flU2EuK3BmJkEpv1hKv7Wg2E7UITj54YB9T1rA5OFrj3BPVeRQSuGApZufTH%3A1590462748428; WM_NI=b5IaA1%2FopLx8bI%2Flyor7Zo4CmbIxKJ5BzT1bIeDIZxNwglisC09EKOahFOpmzdtpEEd%2BTS7ZmUMimMkiyAXc4wK8nnOeXj0yA%2BTe%2FHymC5KPKsnXJ031mWokqLO%2BbEPBM1k%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6ee89ca708c86feaddb3a8e968bb3d54b979f9fbbb6598888a1d9ae5b908f978fdb2af0fea7c3b92aa2eb8782c43bedb1c0adfb34a297e18dfc65b2e99690b749afbe8799ca42f79eb6b5b46a8bbb8caad9748ea9a98dec7981f0f7a6ca45a3b88ab0f367babcbc91c84fa8f59cb4b652af8b838af047a9b7b7a2db69f8a985d9ed668dbb988bb37383f59c86ae44bbb38dd6ca5c89ada2b9c93cf1efa3b8ee61b39481cce14f949e83d2ea37e2a3" };
        }

        public override void OutPutMusicListToExcel()
        {
            using (ExcelPackage package = new ExcelPackage())
            {
                foreach (var item in userinfo.musicLists)
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets.Add($"{item.name}_{Enum.GetName(typeof(MusicListType), item.musicListType)}" );//创建worksheet
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
                        worksheet.Cells[i + 2, 6].Value = $"https://music.163.com/#/song?id={((MusicInfo_163)item.musics[i]).musicid_163}";
                    }
                    package.SaveAs(new FileInfo("xxy.xlsx"));
                }

            }
        }
    }
}
