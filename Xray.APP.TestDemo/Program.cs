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
            IMusicPlatform platform = new Imopter_Music163();
            platform.Login();
            platform.CreateMusicList("作弊成功");
            //platform.OutPutMusicListToExcel();
            //platform.AddMusicToList("5040781264",new List<String> { "470268206", "428387141", "418257349", "1451454746", "445546621" });
            //platform.SearchMusic_Suggest("说谎" ,8);
            //platform.SearchMusic("说谎" ,30);
            Console.WriteLine("完毕");
            Console.ReadLine();
        }
    }
}
