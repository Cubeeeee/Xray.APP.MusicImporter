using System;
using Xray.APP.Impoter.Platform;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.TestDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            IMusicPlatform platform = new Imopter_Music163();
            platform.Login();
            platform.CreateMusicList("test1");
            //platform.OutPutMusicListToExcel();
            Console.WriteLine("完毕");
            Console.ReadLine();
        }
    }
}
