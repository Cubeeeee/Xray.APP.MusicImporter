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
        //实例化q音平台操作
        static IMusicPlatform platform_qq = new Importer_MusicQQ();
        //实例化网易云平台操作
        static IMusicPlatform platform_163 = new Importer_Music163();
        static void Main(string[] args)
        {
            歌单导出();
            //导入测试();
            Console.WriteLine("end");
            Console.ReadLine();
        }

        private static void 歌单导出()
        {
            platform_163.SetLoginInfo("_ntes_nnid=37e8200e1540554f39e3fc8771b918e9,1590578005667; _ntes_nuid=37e8200e1540554f39e3fc8771b918e9; ntes_kaola_ad=1; NTES_PASSPORT=6D.eCrv8sr0mYK5EIy6jplWcVTFAuGkYL9JOH.cflLTiImX8_R7Huxv3a81KUYU6RUutflNhFW6276aif9uPHOuz5Tdp948DVIoIYOtNlm1r58._lfVfUIQCfZbgPEJxoGDWb31A3xDakfN1D44Tz1m6bPZm3Ny49thGiwLu.sI3WJOAUtB_BEBXM; P_INFO=m13750670674@163.com|1591442885|1|cc|00&99|zhj&1590771290&cloudmusic#zhj&null#10#0#0|&0||m13750670674@163.com; _ntes_newsapp_install=false; UM_distinctid=172d7204f17bd8-0287ac2a94553-4353761-384000-172d7204f18acd; MUSIC_U=692dd5da248da10ebc9df0fe720b89da20edbaa342f55d6d43e97a5a6017c04333a649814e309366; __remember_me=true; __csrf=17302144a68392a6a16ddc3fb80f4922; JSESSIONID-WYYY=JjrnONNkenp68%2BbgVNJykbssKJU4dg5s84KO%5C%2ByA65eS9WfZN1Dql7VeuNcskaZQ8PsPjUNkmChr2aWCx%2B4%2B07zhGm4Rnfdkfiec31oOl68uO0QezhnsWFsJovReHX%2BKXI8au60iJQsxcP3h4cFSY0jj4AFATXM0XSAMEaJlaaoPsSiS%3A1593142022126; _iuqxldmzr_=33");
            platform_163.GetUserInfo();
            platform_163.OutPutMusicListToExcel("xxy.xlsx");
        }

        private static void 导入测试()
        {
        
            //设置登录cookie
            platform_qq.SetLoginInfo();
            //获取用户信息 包括歌单数据
            platform_qq.GetUserInfo();

            //设置登录cookie
            platform_163.SetLoginInfo();
            //获取用户信息 包括歌单数据
            platform_163.GetUserInfo();
            var list_qq = (platform_qq as Importer_MusicQQ).userinfo.musicLists.FirstOrDefault(a => a.name.Equals("xxy"));
            var list_163 = (platform_163 as Importer_Music163).userinfo.musicLists.FirstOrDefault(a => a.name.Equals("冷水泡面有点咸的年度歌单"));
            //将网易云歌单:冷水泡面有点咸的年度歌单 导入q音并命名为xxy
            platform_qq.ImportList(list_163, list_qq);

        }
    }
}
