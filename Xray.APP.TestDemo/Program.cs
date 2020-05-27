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
            platform.GetUserInfo();
            Console.ReadLine();
        }
    }
}
