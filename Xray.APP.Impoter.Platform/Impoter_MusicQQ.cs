using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Impoter.Entitys.LoginInfo;
using Xray.APP.Impoter.Entitys.MusicList;
using Xray.APP.Impoter.Entitys.UserInfo;
using Xray.APP.Impoter.Interfaces;
using Xray.Tools.ExtractLib.Encode;
using Xray.Tools.ExtractLib.Extract;
using Xray.Tools.ExtractLib.Extract.ExtractParms;
using Xray.Tools.HttpToolsLib;

namespace Xray.APP.Impoter.Platform
{
    /// <summary>
    /// Q音
    /// </summary>
    class Impoter_MusicQQ : Impoter_Base
    {
        public override void AddMusicToList(params object[] parms)
        {
            throw new NotImplementedException();
        }

        public override bool CheckLogin(params object[] parms)
        {
            throw new NotImplementedException();
        }

        public override void CreateMusicList(params object[] parms)
        {
            throw new NotImplementedException();
        }

        public override void GetUserInfo()
        {
            var temploginlinfo = (LoginInfo_QQ)logininfo; 
            //标准头
            HttpItem item = new HttpItem();
            item.URL = $"https://c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg?g_tk_new_20200303=&g_tk=&loginUin={temploginlinfo.qqnum}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&cid={temploginlinfo.cid}&ct=20&userid=0&reqfrom=1&reqtype=0";
            item.UserAgent = "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.04";
            item.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
            item.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            item.Cookie = temploginlinfo.cookie;
            item.Method = "GET";
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            if(JsonConvert.DeserializeObject(html) is JObject jobj)
            {
                if(Convert.ToInt32(jobj.SelectToken("code")) == 0)
                {
                    this.userinfo = new UserInfo_QQ {
                        image = Convert.ToString(jobj.SelectToken("data.creator.headpic")),
                        name = Convert.ToString(jobj.SelectToken("data.creator.nick")),
                        platform = PlatformType.MusicQQ,
                    };
                    userinfo.musicLists = GetMusicList(jobj.SelectTokens("data.mydiss.list."));
                }
            }
        }

        private List<IMusicList> GetMusicList(IEnumerable<JToken> enumerable)
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
                    songcount = ExtractMethod.GetResult(ExtractType.Regex, subtitle, "(\\d+)首", new RegexPam { Group = 1 }),
                };
                tempmusiclist.musics = GetMusic(disstid);

                musics.Add(tempmusiclist);
        }
            return musics;
        }

        private List<IMusicInfo> GetMusic(string disstid)
        {
            var temploginlinfo = (LoginInfo_QQ)logininfo;

            String postdata = JsonConvert.SerializeObject(new {
                req_0 = new {
                    module = "srf_diss_info.DissInfoServer",
                    method = "CgiGetDiss",
                    param = new {
                        disstid = Convert.ToInt32(disstid),
                        onlysonglist = 1,
                        song_begin = 0,
                        song_num = 15,
                    }
                },
                comm = new {
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
            item.Cookie = logininfo.cookie;
            //自定义头
            item.Header.Add("Accept-Encoding", "gzip, deflate");
            String html = HttpMethod.HttpWork(item).Html;
            Console.WriteLine(html) ;
        }

        private String getSign(string postdata)
        {
            throw new NotImplementedException();
        }

        public override List<IMusicInfo> SearchMusic(params object[] parms)
        {
            throw new NotImplementedException();
        }

        public override List<IMusicInfo> SearchMusic_Suggest(params object[] parms)
        {
            throw new NotImplementedException();
        }

        public override bool SetLoginInfo(params object[] parms)
        {
            this.logininfo = new LoginInfo_QQ { 
                cookie = Convert.ToString(parms[0])
            };
            return CheckLogin(parms);
        }
    }
}
