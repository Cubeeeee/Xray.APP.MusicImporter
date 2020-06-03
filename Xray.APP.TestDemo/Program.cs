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
            //cookie
            platform_qq.SetLoginInfo();
            platform_qq.GetUserInfo();
            IMusicPlatform platform_163 = new Importer_Music163();
            //cookie
            platform_163.SetLoginInfo();
            platform_163.GetUserInfo();
            var list_qq = (platform_qq as Importer_MusicQQ).userinfo.musicLists.FirstOrDefault(a => a.name.Equals("xxy"));
            var list_163 = (platform_163 as Importer_Music163).userinfo.musicLists.FirstOrDefault(a => a.name.Equals("冷水泡面有点咸的年度歌单"));
            platform_qq.ImportList(list_163, list_qq);

        }
    }
}
