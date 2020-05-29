using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Interfaces
{
    /// <summary>
    /// 歌手信息
    /// </summary>
    public interface ISingerInfo
    {
        /// <summary>
        /// 歌手名
        /// </summary>
        String name { get; set; }
        /// <summary>
        /// 歌手id
        /// </summary>
        String id { get; set; }
        /// <summary>
        /// 数据来源平台
        /// </summary>
        PlatformType platform { get; set; }
    }
}
