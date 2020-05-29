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
        const String checktokenurl = "http://127.0.0.1:8001/api/token";
        const String UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0";

        #region 实现部分
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
        public override void Login()
        {
            this.logininfo = new LoginInfo_163 { cookie = "JSESSIONID-WYYY=u8F6EdvHP7f%2BM0b1I5kDoZ%5CcCYNoF0HpBg%2FBxDamK83rBEuplhl9XB2RZU2ZPYVigqrka5GHYl%2BdjcGSoA8lxr%5C5zoQj6CWj9l6%2FT1TlsQ%5CxO8HjlU%5CEE8Dgegl3RXjuA6fiYXVKCXWT%5C4eERb9PMadui%5COs%5CDhnT%2FE0QG1JKx7KXEyz%3A1590746230847; _iuqxldmzr_=32; _ntes_nnid=9443153b364c4a672be28ceb6be416f2,1590565485214; _ntes_nuid=9443153b364c4a672be28ceb6be416f2; WM_NI=nTY9lsMyaPBKTJI%2FYsSUA%2BUg1w8uSEXeUsq6l49bmo7nPYQZMTzfNX2YZIbXXO8XeiF5k0nW%2FFwmrtR8lCv5w1dl0luK8lx8j8oSYj28ZeFcwnn0MLBH5qAXVSN054wFWWE%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eea4b83dfbee8a84e13eb7b08ea7d45a939f9fbaf5508591ba90d46e94b29b84e72af0fea7c3b92aae8c97daef798fa7afb1c141989687d0dc79918b8fccd86df3a9f896d24f9cbb9b94f43eb0ecf783f065f5b2a0bad4528f8cb687cd54f28796aae1549c91f8b9e86386eba5d1ed5ded9ab98ef18092e8a4a4f53fb5efac8db368b795f88dfb34aae8a1b4dc62f2e89686c569b5b2a2d1d0488298fb92c454968d82d1b840b59a99b8c837e2a3; WM_TID=fZj46A%2BR3W1BBVEQUBYuXXNiRmswwU8P; MUSIC_U=692dd5da248da10ebc9df0fe720b89da660c7855cf4ec47035ea031e17da4a1a33a649814e309366; __remember_me=true; __csrf=3098a1827297e2b132274f6e6c217aa0; ntes_kaola_ad=1" };
        }
        public override void OutPutMusicListToExcel()
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
                        worksheet.Cells[i + 2, 6].Value = $"https://music.163.com/#/song?id={((MusicInfo_163)item.musics[i]).musicid_163}";
                    }
                    package.SaveAs(new FileInfo("xxy.xlsx"));
                }

            }
        }
        /// <summary>
        /// 加入歌曲到歌单
        /// </summary>
        /// <param name="parms">0 目标歌单id  1歌曲id列表</param>
        public override void AddMusicToList(params object[] parms)
        {
            String targetid = Convert.ToString(parms[0]);
            List<String> songs = (List<String>)(parms[1]);
            var csrf_token = ((LoginInfo_163)logininfo).csrf_token;
            //标准头
            HttpItem item = new HttpItem();
            item.URL = "https://music.163.com/weapi/playlist/manipulate/tracks";
            item.Postdata = Encrypt_Music163.EncryptedRequest(JsonConvert.SerializeObject(new
            {
                csrf_token,
                op = "add",
                pid = targetid,
                trackIds = $"[{String.Join(",", songs)}]",
                tracks = String.Join(",", from a in songs select "[object Object]"),
            }));
            item.UserAgent = UA;
            item.Referer = "https://music.163.com/my/";
            item.ContentType = "application/x-www-form-urlencoded";
            item.Accept = "*/*";
            item.Cookie = logininfo.cookie;
            item.Method = "POST";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate, br");
            item.Header.Add("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2");
            item.Header.Add("Origin", "https://music.163.com");
            String html = HttpMethod.HttpWork(item).Html;
            Console.WriteLine(html);
        }

        public override void CreateMusicList(params object[] parms)
        {
            var name = parms[0];
            var csrf_token = ((LoginInfo_163)logininfo).csrf_token;
            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://music.163.com/weapi/playlist/create?csrf_token={csrf_token}";
            item.Postdata = Encrypt_Music163.EncryptedRequest(JsonConvert.SerializeObject(new
            {
                checkToken = GetCheckToken(),
                name,
                csrf_token
            }));
            item.UserAgent = UA;
            item.Referer = "https://music.163.com/my/";
            item.ContentType = "application/x-www-form-urlencoded";
            item.Accept = "*/*";
            item.Cookie = logininfo.cookie;
            item.Method = "POST";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate, br");
            item.Header.Add("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2");
            item.Header.Add("Origin", "https://music.163.com");
            String html = HttpMethod.HttpWork(item).Html;
            Console.WriteLine(html);
        }
        /// <summary>
        /// 搜索 联想
        /// </summary>
        /// <param name="parms">s limit</param>
        /// <returns></returns>
        public override List<IMusicInfo> SearchMusic_Suggest(params object[] parms)
        {
            List<IMusicInfo> musics = new List<IMusicInfo>();
            String s = Convert.ToString(parms[0]);
            String limit = Convert.ToString(parms[1]);
            //标准头
            HttpItem item = new HttpItem();
            item.URL = "https://music.163.com/weapi/search/suggest/web";
            item.Postdata = Encrypt_Music163.EncryptedRequest(JsonConvert.SerializeObject(new
            {
                csrf_token = String.Empty,
                limit,
                s
            }));
            item.UserAgent = UA;
            item.Referer = "https://music.163.com/my/";
            item.ContentType = "application/x-www-form-urlencoded";
            item.Accept = "*/*";
            item.Cookie = logininfo.cookie;
            item.Method = "POST";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate, br");
            item.Header.Add("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2");
            item.Header.Add("Origin", "https://music.163.com");
            String html = HttpMethod.HttpWork(item).Html;
            if (JsonConvert.DeserializeObject(html) is JObject jobj)
            {
                if (Convert.ToString(jobj.SelectToken("code")).Equals("200"))
                {
                    var song_tks = jobj.SelectTokens("result.songs[*]");
                    foreach (var tk in song_tks)
                    {
                        musics.Add(new MusicInfo_163
                        {
                            name = Convert.ToString(tk.SelectToken("name")),
                            musicid_163 = Convert.ToString(tk.SelectToken("id")),
                            singers = GetSingers(tk.SelectTokens("artists[*]")),
                            album = Convert.ToString(tk.SelectToken("album.name")),
                            albumid_163 = Convert.ToString(tk.SelectToken("album.id")),
                            albumpic_163 = Convert.ToString(tk.SelectToken("album.picUrl")),
                            time = TimeConverter.ToMinSecond(tk.SelectToken("dt")),
                            songStatue = GetStatue("0", Convert.ToString(tk.SelectToken("fee")))
                        });
                    }

                }
            }
            Console.WriteLine(JsonConvert.SerializeObject(musics));
            return musics;
        }

        public override List<IMusicInfo> SearchMusic(params object[] parms)
        {
            List<IMusicInfo> musics = new List<IMusicInfo>();
            String s = Convert.ToString(parms[0]);
            String limit = Convert.ToString(parms[1]);
            //标准头
            HttpItem item = new HttpItem();
            item.URL = "https://music.163.com/weapi/cloudsearch/get/web?csrf_token=";
            item.Postdata = Encrypt_Music163.EncryptedRequest(JsonConvert.SerializeObject(new
            {
                csrf_token = String.Empty,
                hlposttag = "</span>",
                hlpretag = "<span class=\"s-fc7\">",
                limit,
                offset = 0,
                s,
                total = "true",
                type = "1"
            }));
            item.UserAgent = UA;
            item.Referer = "https://music.163.com/my/";
            item.ContentType = "application/x-www-form-urlencoded";
            item.Accept = "*/*";
            item.Cookie = logininfo.cookie;
            item.Method = "POST";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate, br");
            item.Header.Add("Accept-Language", "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2");
            item.Header.Add("Origin", "https://music.163.com");
            String html = HttpMethod.HttpWork(item).Html;
            if (JsonConvert.DeserializeObject(html) is JObject jobj)
            {
                if (Convert.ToString(jobj.SelectToken("code")).Equals("200"))
                {
                    var song_tks = jobj.SelectTokens("result.songs[*]");
                    foreach (var tk in song_tks)
                    {
                        musics.Add(new MusicInfo_163
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
            Console.WriteLine(JsonConvert.SerializeObject(musics));
            return musics;
        }
        #endregion

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
                UserAgent = UA,
                Postdata = Encrypt_Music163.EncryptedRequest(JsonConvert.SerializeObject(new
                {
                    uid = userid,
                    wordwrap = "7",
                    offset = "0",
                    total = "true",
                    limit = "36",
                    csrf_token = ""
                })),

            });
            if (result_playlist.StatusCode == System.Net.HttpStatusCode.OK)
            {
                if (JsonConvert.DeserializeObject(result_playlist.Html) is JObject jobj)
                {
                    foreach (var item in jobj.SelectTokens("playlist.[*]"))
                    {
                        int songcount = default(int);
                        String musiclist_id = Convert.ToString(item.SelectToken("id"));
                        try
                        {
                            songcount = Convert.ToInt32(item.SelectToken("trackCount"));
                        }
                        catch (Exception)
                        {
                            songcount = default(int);
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
                UserAgent = UA,
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
        private String GetCheckToken()
        {
            return HttpMethod.FastMethod_HttpHelper(checktokenurl);
        }
    }
}
