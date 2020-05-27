using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Interfaces
{
    /// <summary>
    /// 单曲信息
    /// </summary>
    public interface IMusicInfo
    {
        /// <summary>
        /// 标题
        /// </summary>
        String title { get; set; }
        /// <summary>
        /// 时长
        /// </summary>
        String time { get; set; }
        /// <summary>
        /// 歌手
        /// </summary>
        String singer { get; set; }
        /// <summary>
        /// 专辑
        /// </summary>
        String album { get; set; }
    }
}
