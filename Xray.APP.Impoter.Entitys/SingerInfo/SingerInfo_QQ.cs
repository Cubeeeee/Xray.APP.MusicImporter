using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Entitys.SingerInfo
{
    public class SingerInfo_QQ : SingerInfo_Base
    {
        public SingerInfo_QQ()
        {
            this.platform = Interfaces.PlatformType.MusicQQ;
        }
        public string mid { get; set; }
    }
}
