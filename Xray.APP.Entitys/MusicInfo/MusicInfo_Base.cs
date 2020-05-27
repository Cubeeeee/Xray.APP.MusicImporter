using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Interfaces;

namespace Xray.APP.Entitys.MusicInfo
{
    public abstract class MusicInfo_Base: IMusicInfo
    {
        /// <summary>
        /// 标题
        /// </summary>
        public String title { get; set; }
        /// <summary>
        /// 时长
        /// </summary>
        public String time { get; set; }
        /// <summary>
        /// 歌手
        /// </summary>
        public String singer { get; set; }
        /// <summary>
        /// 专辑
        /// </summary>
        public String album { get; set; }
    }
}
