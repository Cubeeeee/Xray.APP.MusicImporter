using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Importer.Entitys.LoginInfo;
using Xray.APP.Importer.Entitys.MusicInfo;
using Xray.APP.Importer.Entitys.MusicList;
using Xray.APP.Importer.Entitys.SingerInfo;
using Xray.APP.Importer.Entitys.UserInfo;
using Xray.APP.Importer.Interfaces;
using Xray.APP.Importer.Platform.Helper;
using Xray.Tools.ExtractLib.Encode;
using Xray.Tools.ExtractLib.Extract;
using Xray.Tools.ExtractLib.Extract.ExtractParms;
using Xray.Tools.HttpToolsLib;

namespace Xray.APP.Importer.Platform
{
    /// <summary>
    /// Q音
    /// </summary>
    public class Importer_MusicQQ : Importer_Base
    {
        const String signurl = "http://127.0.0.1:8002/api/sign";
        #region 实现部分
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parms">0 mid dirid</param>
        public override void AddMusicToList(params object[] parms)
        {
            LoginInfo_QQ temploginlinfo = (LoginInfo_QQ)logininfo;

            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://c.y.qq.com/splcloud/fcgi-bin/fcg_music_add2songdir.fcg?g_tk={temploginlinfo.csrf_token}&g_tk_new_20200303={temploginlinfo.csrf_token}";
            item.Postdata = $"loginUin={temploginlinfo.qqmusic_key}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.post&needNewCode=0&uin={temploginlinfo.qqmusic_key}&midlist={parms[0]}&typelist=13&dirid={parms[1]}&addtype=&formsender=4&source=153&r2=0&r3=1&utf8=1&g_tk={temploginlinfo.csrf_token}";
            item.UserAgent = "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.04";
            item.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
            item.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            item.Cookie = logininfo.cookie;
            item.Method = "POST";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            try
            {
                if (JsonConvert.DeserializeObject(html) is JObject jobj)
                {
                    int code = Convert.ToInt32(jobj.SelectToken("code"));
                    if (code == 0)
                    {

                    }
                    else
                    {

                    }
                    Console.WriteLine(html);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override bool CheckLogin(params object[] parms)
        {
            LoginInfo_QQ temploginlinfo = (LoginInfo_QQ)logininfo;

            return !String.IsNullOrEmpty(temploginlinfo.qqmusic_key);
        }
        /// <summary>
        /// 创建歌单
        /// </summary>
        /// <param name="parms">0 歌单名</param>
        public override void CreateMusicList(params object[] parms)
        {
            LoginInfo_QQ temploginlinfo = (LoginInfo_QQ)logininfo;

            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://c.y.qq.com/splcloud/fcgi-bin/create_playlist.fcg?g_tk={temploginlinfo.csrf_token}";
            item.Postdata = $"loginUin={temploginlinfo.qqnum}&hostUin=0&format=json&inCharset=utf8&outCharset=utf8&notice=0&platform=yqq&needNewCode=0&g_tk={temploginlinfo.csrf_token}&uin={temploginlinfo.qqnum}&name={parms[0]}&description=&show=1&pic_url=&tags=&tagids=&formsender=1&utf8=1&qzreferrer=https%3A%2F%2Fy.qq.com%2Fportal%2Fprofile.html%23sub%3Dother%26tab%3Dcreate%26";
            item.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";
            item.Referer = "https://y.qq.com/portal/profile.html";
            item.ContentType = "application/x-www-form-urlencoded";
            item.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            item.Cookie = logininfo.cookie;
            item.Method = "POST";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            try
            {
                if (JsonConvert.DeserializeObject(html) is JObject jobj)
                {
                    int code = Convert.ToInt32(jobj.SelectToken("code"));
                    if (code == 0)
                    {

                    }
                    else
                    {

                    }
                    Console.WriteLine(html);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override void GetUserInfo()
        {
            var temploginlinfo = (LoginInfo_QQ)logininfo;
            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg?g_tk_new_20200303={temploginlinfo.csrf_token}&g_tk={temploginlinfo.csrf_token}&loginUin={temploginlinfo.qqnum}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&cid=205360838&ct=20&userid=0&reqfrom=1&reqtype=0";
            item.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";
            item.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
            item.Accept = "application/json, text/javascript, */*; q=0.01";
            item.Cookie = temploginlinfo.cookie;
            item.Method = "GET";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            if (JsonConvert.DeserializeObject(html) is JObject jobj)
            {
                if (Convert.ToInt32(jobj.SelectToken("code")) == 0)
                {
                    this.userinfo = new UserInfo_QQ
                    {
                        image = Convert.ToString(jobj.SelectToken("data.creator.headpic")),
                        name = Convert.ToString(jobj.SelectToken("data.creator.nick")),
                        platform = PlatformType.MusicQQ,
                    };
                    userinfo.musicLists = GetMydiss(jobj.SelectTokens("data.mydiss.list[*]"));
                    userinfo.musicLists.AddRange(GetMymusic(jobj.SelectTokens("data.mymusic[*]")));
                }
            }
            String json = JsonConvert.SerializeObject(userinfo);

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parms">0 keyword</param>
        /// <returns></returns>
        public override List<IMusicInfo> SearchMusic(params object[] parms)
        {
            LoginInfo_QQ temploginlinfo = (LoginInfo_QQ)logininfo;
            List<IMusicInfo> musics = new List<IMusicInfo>();
            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w={EncodeMethod.Encode( EncodeType.UrlEncode,parms[0])}&g_tk_new_20200303={temploginlinfo.csrf_token}&g_tk={temploginlinfo.csrf_token}&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
            item.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36";
            item.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
            item.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            try
            {
                if (JsonConvert.DeserializeObject(html) is JObject jobj)
                {
                    int code = Convert.ToInt32(jobj.SelectToken("code"));
                    if (code == 0)
                    {
                        foreach (var tk in jobj.SelectTokens("data.song.list[*]"))
                        {
                            String albumid = Convert.ToString(tk.SelectToken("album.mid"));
                            musics.Add(new MusicInfo_QQ
                            {
                                album = Convert.ToString(tk.SelectToken("album.name")),
                                albumid_qq = Convert.ToString(tk.SelectToken("album.id")),
                                album_mid_qq = albumid,
                                albumpic_qq = $"https://y.gtimg.cn/music/photo_new/T002R300x300M000{albumid}_1.jpg?max_age=2592000",
                                musicid_qq = Convert.ToString(tk.SelectToken("id")),
                                music_mid_qq = Convert.ToString(tk.SelectToken("mid")),
                                name = Convert.ToString(tk.SelectToken("name")),
                                time = TimeConverter.ToMinSecond(Convert.ToInt32(tk.SelectToken("interval")) * 1000),
                                songStatue = GetMusicSattue(Convert.ToInt32(tk.SelectToken("pay.pay_play")), Convert.ToInt32(tk.SelectToken("pay.pay_down")), Convert.ToInt32(tk.SelectToken("pay.price_track"))),
                                singers = GetSingers(tk.SelectTokens("singer[*]"))
                            });
                        }
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            Console.WriteLine(JsonConvert.SerializeObject(musics));
            return musics;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="parms">0 keyword</param>
        /// <returns></returns>
        public override List<IMusicInfo> SearchMusic_Suggest(params object[] parms)
        {
            LoginInfo_QQ temploginlinfo = (LoginInfo_QQ)logininfo;
            List<IMusicInfo> musics = new List<IMusicInfo>();
            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key={EncodeMethod.Encode(EncodeType.UrlEncode, parms[0])}&g_tk_new_20200303={temploginlinfo.csrf_token}&g_tk={temploginlinfo.csrf_token}&loginUin={temploginlinfo.qqnum}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
            item.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";
            item.Referer = "https://y.qq.com/portal/profile.html";
            item.ContentType = "application/x-www-form-urlencoded";
            item.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            item.Cookie = logininfo.cookie;
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            try
            {
                if (JsonConvert.DeserializeObject(html) is JObject jobj)
                {
                    int code = Convert.ToInt32(jobj.SelectToken("code"));
                    if (code == 0)
                    {
                        foreach (var tk in jobj.SelectTokens("data.song.itemlist[*]"))
                        {
                            musics.Add(new MusicInfo_QQ
                            {
                                 musicid_qq = Convert.ToString(tk.SelectToken("id")),
                                 music_mid_qq = Convert.ToString(tk.SelectToken("mid")),
                                name = Convert.ToString(tk.SelectToken("name")),
                                singers = new List<ISingerInfo> { new SingerInfo_QQ { platform = PlatformType.MusicQQ, name = Convert.ToString(tk.SelectToken("singer")) } }
                            });
                        }
                    }
                    else
                    {

                    }
                    Console.WriteLine(html);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            Console.WriteLine(JsonConvert.SerializeObject(musics));
            return musics;
        }

        public override bool SetLoginInfo(params object[] parms)
        {
            this.logininfo = new LoginInfo_QQ
            {
                cookie = Convert.ToString(parms[0])
            };
            return CheckLogin(parms);
        }
        #endregion

        //我喜欢部分
        private IEnumerable<IMusicList> GetMymusic(IEnumerable<JToken> enumerable)
        {
            List<IMusicList> musics = new List<IMusicList>();
            foreach (var tk in enumerable)
            {
                String subtitle = Convert.ToString(tk.SelectToken("subtitle"));
                String disstid = Convert.ToString(tk.SelectToken("id"));
                var tempmusiclist = new MusicList_QQ
                {
                    authorname = this.userinfo.name,
                    avatarUrl = Convert.ToString(tk.SelectToken("picurl")),
                    disstid = disstid,
                    name = Convert.ToString(tk.SelectToken("title")),
                    subtitle = subtitle,
                    songcount = ExtractMethod.GetResult(ExtractType.Regex, subtitle, "(\\d+)首", new RegexPam { Group = 1 }),
                };
                if (tempmusiclist.disstid.Equals("0"))
                {
                    continue;
                }
                tempmusiclist.musics = GetMusic(disstid, Convert.ToInt32(tempmusiclist.songcount));

                musics.Add(tempmusiclist);
            }
            return musics;
        }

        private List<IMusicList> GetMydiss(IEnumerable<JToken> enumerable)
        {
            List<IMusicList> musics = new List<IMusicList>();
            foreach (var tk in enumerable)
            {
                String subtitle = Convert.ToString(tk.SelectToken("subtitle"));
                String disstid = Convert.ToString(tk.SelectToken("dissid"));
                var tempmusiclist = new MusicList_QQ
                {
                    authorname = this.userinfo.name,
                    avatarUrl = Convert.ToString(tk.SelectToken("picurl")),
                    disstid = disstid,
                    name = Convert.ToString(tk.SelectToken("title")),
                    subtitle = subtitle,
                    dirid = Convert.ToString(tk.SelectToken("dirid")),
                    songcount = ExtractMethod.GetResult(ExtractType.Regex, subtitle, "(\\d+)首", new RegexPam { Group = 1 }),
                    playtimes = ExtractMethod.GetResult(ExtractType.Regex, subtitle, "(\\d+)次播放", new RegexPam { Group = 1 }),
                    musicListType = MusicListType.Owner
                };
                tempmusiclist.musics = GetMusic(disstid, Convert.ToInt32(tempmusiclist.songcount));

                musics.Add(tempmusiclist);
            }
            return musics;
        }

        private List<IMusicInfo> GetMusic(string disstid, int count)
        {
            var temploginlinfo = (LoginInfo_QQ)logininfo;
            List<IMusicInfo> musics = new List<IMusicInfo>();
            String postdata = JsonConvert.SerializeObject(new
            {
                req_0 = new
                {
                    module = "srf_diss_info.DissInfoServer",
                    method = "CgiGetDiss",
                    param = new
                    {
                        disstid = Convert.ToInt64(disstid),
                        onlysonglist = 1,
                        song_begin = 0,
                        song_num = count,
                    }
                },
                comm = new
                {
                    g_tk = Convert.ToInt32(temploginlinfo.csrf_token),
                    uin = Convert.ToInt32(temploginlinfo.qqnum),
                    format = "json",
                    platform = "h5"
                }
            });

            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://u.y.qq.com/cgi-bin/musics.fcg?sign={getSign(postdata)}&_={EncodeMethod.GetTimeSamp()}";
            item.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";
            item.ContentType = "application/json";
            item.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            item.Method = "POST";
            item.Postdata = postdata;
            //这一步不需要cookie
            //item.Cookie = logininfo.cookie;
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            Console.WriteLine(html);
            if (JsonConvert.DeserializeObject(html) is JObject jobj)
            {
                if (Convert.ToInt32(jobj.SelectToken("code")) == 0)
                {
                    var songs = jobj.SelectTokens("req_0.data.songlist[*]");
                    foreach (var tk in songs)
                    {
                        String albumid = Convert.ToString(tk.SelectToken("album.mid"));
                        musics.Add(new MusicInfo_QQ
                        {
                            album = Convert.ToString(tk.SelectToken("album.name")),
                            albumid_qq = Convert.ToString(tk.SelectToken("album.id")),
                            album_mid_qq = albumid,
                            albumpic_qq = $"https://y.gtimg.cn/music/photo_new/T002R300x300M000{albumid}_1.jpg?max_age=2592000",
                            musicid_qq = Convert.ToString(tk.SelectToken("id")),
                            music_mid_qq = Convert.ToString(tk.SelectToken("mid")),
                            name = Convert.ToString(tk.SelectToken("name")),
                            time = TimeConverter.ToMinSecond(Convert.ToInt32(tk.SelectToken("interval")) * 1000),
                            songStatue = GetMusicSattue(Convert.ToInt32(tk.SelectToken("pay.pay_play")), Convert.ToInt32(tk.SelectToken("pay.pay_down")), Convert.ToInt32(tk.SelectToken("pay.price_track"))),
                            singers = GetSingers(tk.SelectTokens("singer[*]"))
                        });
                    }
                }
            }
            return musics;
        }

        private List<ISingerInfo> GetSingers(IEnumerable<JToken> enumerable)
        {
            List<ISingerInfo> singers = new List<ISingerInfo>();
            foreach (var tk in enumerable)
            {
                singers.Add(new SingerInfo_QQ
                {
                    id = Convert.ToString(tk.SelectToken("id")),
                    name = Convert.ToString(tk.SelectToken("name")),
                    mid = Convert.ToString(tk.SelectToken("mid")),
                    platform = PlatformType.MusicQQ
                });
            }
            return singers;
        }

        private SongStatue GetMusicSattue(int play, int down, int track)
        {
            if (play == 1)
            {
                return SongStatue.VIP;
            }
            if (down == 1)
            {
                return SongStatue.独家;
            }
            if (track == 0)
            {
                return SongStatue.无版权;
            }
            else if (track == 200)
            {
                return SongStatue.正常;
            }
            return SongStatue.未知;
        }

        private String getSign(string postdata)
        {
            return HttpMethod.FastMethod_HttpHelper(signurl, "POST", postdata);
        }


    }
}
