using System;
using Xray.APP.Impoter.Platform;
using Xray.APP.Impoter.Interfaces;
using System.Collections.Generic;

namespace Xray.APP.TestDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            Test163();

            Console.ReadLine();
        }
        /// <summary>
        /// 测试163
        /// </summary>
        private static void Test163()
        {
            IMusicPlatform platform = new Impoter_Music163();
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
