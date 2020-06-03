using System;
using Xray.APP.Importer.Platform;
using Xray.APP.Importer.Interfaces;
using System.Collections.Generic;
using Xray.APP.Importer.Entitys.MusicInfo;
using Xray.APP.Importer.Entitys.SingerInfo;
using System.Linq;

namespace Xray.APP.TestDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            导入测试();
            Console.ReadLine();
        }

        private static void 导入测试()
        {
            IMusicPlatform platform_qq = new Importer_MusicQQ();
            platform_qq.SetLoginInfo("RK=lXDAx7N2bl; ptcz=4aa787abd524390979682d89ce3f5a1fe628d69d05716807d8efb32a77f67fde; pgv_pvi=9999510528; pgv_pvid=2128213090; ts_uid=6628462480; psrf_qqrefresh_token=6E0A55C8F0B5FE751ABB2AF3981AC862; psrf_qqopenid=31BA214E49A095A8EBCCA257B9EEC4D0; psrf_qqaccess_token=5574AEA78D32767BD031915358B8FFA6; psrf_qqunionid=25CB47D4065E5F229F9214D549D336DB; userAction=1; yq_index=0; pgv_info=ssid=s5625732504; pgv_si=s7660564480; skey=@fdZdbo8Ui; _qpsvr_localtk=1591151512084; player_exist=1; qqmusic_fromtag=66; ts_refer=i.y.qq.com/n2/m/share/profile_v2/index.html; yplayer_open=0; psrf_access_token_expiresAt=1598942287; uin=462247201; qqmusic_key=Q_H_L_2yKHNx50eGOzbdy303AzZ7UYxkS4XTWGEymKqSpVWzI1g8eh48XuWNZy0rnISgC; qm_keyst=Q_H_L_2yKHNx50eGOzbdy303AzZ7UYxkS4XTWGEymKqSpVWzI1g8eh48XuWNZy0rnISgC; psrf_musickey_createtime=1591166287; yqq_stat=0; ts_last=y.qq.com/n/yqq/playlist/959107623.html");
            platform_qq.GetUserInfo();
            IMusicPlatform platform_163 = new Importer_Music163();
            platform_163.SetLoginInfo("JSESSIONID-WYYY=u8F6EdvHP7f%2BM0b1I5kDoZ%5CcCYNoF0HpBg%2FBxDamK83rBEuplhl9XB2RZU2ZPYVigqrka5GHYl%2BdjcGSoA8lxr%5C5zoQj6CWj9l6%2FT1TlsQ%5CxO8HjlU%5CEE8Dgegl3RXjuA6fiYXVKCXWT%5C4eERb9PMadui%5COs%5CDhnT%2FE0QG1JKx7KXEyz%3A1590746230847; _iuqxldmzr_=32; _ntes_nnid=9443153b364c4a672be28ceb6be416f2,1590565485214; _ntes_nuid=9443153b364c4a672be28ceb6be416f2; WM_NI=nTY9lsMyaPBKTJI%2FYsSUA%2BUg1w8uSEXeUsq6l49bmo7nPYQZMTzfNX2YZIbXXO8XeiF5k0nW%2FFwmrtR8lCv5w1dl0luK8lx8j8oSYj28ZeFcwnn0MLBH5qAXVSN054wFWWE%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eea4b83dfbee8a84e13eb7b08ea7d45a939f9fbaf5508591ba90d46e94b29b84e72af0fea7c3b92aae8c97daef798fa7afb1c141989687d0dc79918b8fccd86df3a9f896d24f9cbb9b94f43eb0ecf783f065f5b2a0bad4528f8cb687cd54f28796aae1549c91f8b9e86386eba5d1ed5ded9ab98ef18092e8a4a4f53fb5efac8db368b795f88dfb34aae8a1b4dc62f2e89686c569b5b2a2d1d0488298fb92c454968d82d1b840b59a99b8c837e2a3; WM_TID=fZj46A%2BR3W1BBVEQUBYuXXNiRmswwU8P; MUSIC_U=692dd5da248da10ebc9df0fe720b89da660c7855cf4ec47035ea031e17da4a1a33a649814e309366; __remember_me=true; __csrf=3098a1827297e2b132274f6e6c217aa0; ntes_kaola_ad=1");
            platform_163.GetUserInfo();
            var list_qq = (platform_qq as Importer_MusicQQ).userinfo.musicLists.FirstOrDefault(a => a.name.Equals("xxy"));
            var list_163 = (platform_163 as Importer_Music163).userinfo.musicLists.FirstOrDefault(a => a.name.Equals("冷水泡面有点咸的年度歌单"));
            platform_qq.ImportList(list_163, list_qq);

        }

        private static void TestQQ()
        {

            IMusicPlatform platform = new Importer_MusicQQ();
            platform.SetLoginInfo("yqq_stat=0; pgv_pvi=3460326400; pgv_si=s9341173760; pgv_info=ssid=s1193431101; pgv_pvid=991575316; ts_uid=4230256586; idt=1591071055; ts_refer=cn.bing.com/; ts_last=y.qq.com/portal/profile.html; _qpsvr_localtk=0.2957930589685578; RK=lWCAx5NWZl; ptcz=a4c0ff95a52082ce6064236019d66e4c280761607ff8852eae3b9d97e4d3737b; qm_keyst=Q_H_L_2GMqLx50eC4DeNShJGb3auqV-xvYBuRqRISgwaUKaa8lPrvjO5ktIDn2ytRlca8; psrf_qqopenid=31BA214E49A095A8EBCCA257B9EEC4D0; uin=462247201; psrf_qqunionid=25CB47D4065E5F229F9214D549D336DB; psrf_musickey_createtime=1591071076; qqmusic_key=Q_H_L_2GMqLx50eC4DeNShJGb3auqV-xvYBuRqRISgwaUKaa8lPrvjO5ktIDn2ytRlca8; psrf_access_token_expiresAt=1598847076; psrf_qqaccess_token=5574AEA78D32767BD031915358B8FFA6; psrf_qqrefresh_token=6E0A55C8F0B5FE751ABB2AF3981AC862");
            platform.GetUserInfo();
            //platform.AddMusicToList("001NmPTG1fVsUw","3");
            //platform.SearchMusic("彩虹");
        }

        /// <summary>
        /// 测试163
        /// </summary>
        private static void Test163()
        {
            IMusicPlatform platform = new Importer_Music163();
            platform.SetLoginInfo("JSESSIONID-WYYY=u8F6EdvHP7f%2BM0b1I5kDoZ%5CcCYNoF0HpBg%2FBxDamK83rBEuplhl9XB2RZU2ZPYVigqrka5GHYl%2BdjcGSoA8lxr%5C5zoQj6CWj9l6%2FT1TlsQ%5CxO8HjlU%5CEE8Dgegl3RXjuA6fiYXVKCXWT%5C4eERb9PMadui%5COs%5CDhnT%2FE0QG1JKx7KXEyz%3A1590746230847; _iuqxldmzr_=32; _ntes_nnid=9443153b364c4a672be28ceb6be416f2,1590565485214; _ntes_nuid=9443153b364c4a672be28ceb6be416f2; WM_NI=nTY9lsMyaPBKTJI%2FYsSUA%2BUg1w8uSEXeUsq6l49bmo7nPYQZMTzfNX2YZIbXXO8XeiF5k0nW%2FFwmrtR8lCv5w1dl0luK8lx8j8oSYj28ZeFcwnn0MLBH5qAXVSN054wFWWE%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eea4b83dfbee8a84e13eb7b08ea7d45a939f9fbaf5508591ba90d46e94b29b84e72af0fea7c3b92aae8c97daef798fa7afb1c141989687d0dc79918b8fccd86df3a9f896d24f9cbb9b94f43eb0ecf783f065f5b2a0bad4528f8cb687cd54f28796aae1549c91f8b9e86386eba5d1ed5ded9ab98ef18092e8a4a4f53fb5efac8db368b795f88dfb34aae8a1b4dc62f2e89686c569b5b2a2d1d0488298fb92c454968d82d1b840b59a99b8c837e2a3; WM_TID=fZj46A%2BR3W1BBVEQUBYuXXNiRmswwU8P; MUSIC_U=692dd5da248da10ebc9df0fe720b89da660c7855cf4ec47035ea031e17da4a1a33a649814e309366; __remember_me=true; __csrf=3098a1827297e2b132274f6e6c217aa0; ntes_kaola_ad=1");
            platform.SetLoginInfo(String.Empty);
            platform.CheckLogin();
            platform.CreateMusicList("check");
            //platform.OutPutMusicListToExcel();
            //platform.AddMusicToList("5040781264",new List<String> { "470268206", "428387141", "418257349", "1451454746", "445546621" });
            //platform.SearchMusic_Suggest("说谎" ,8);
            //platform.SearchMusic("说谎" ,30);
            Console.WriteLine("完毕");
        }
    }
}
