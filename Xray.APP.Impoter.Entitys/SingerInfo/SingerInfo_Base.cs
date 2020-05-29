using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.Impoter.Entitys.SingerInfo
{
    /// <summary>
    /// 歌手信息 基类
    /// </summary>
   public abstract class SingerInfo_Base:ISingerInfo
    {
        /// <summary>
        /// 歌手名
        /// </summary>
        public String name { get; set; }
        /// <summary>
        /// 歌手id
        /// </summary>
        public String id { get; set; }
        /// <summary>
        /// 数据来源平台
        /// </summary>
        public PlatformType platform { get; set; }
    }
}
