using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Xray.APP.Importer.Interfaces;

namespace Xray.APP.Importer.Entitys.MusicInfo
{
    public abstract class MusicInfo_Base : IMusicInfo
    {
        /// <summary>
        /// 播放地址
        /// </summary>
        public virtual String playurl { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        public String name { get; set; }
        /// <summary>
        /// 时长
        /// </summary>
        public String time { get; set; }
        /// <summary>
        /// 专辑
        /// </summary>
        public String album { get; set; }
        /// <summary>
        /// 歌曲状态
        /// </summary>
        public SongStatue songStatue { get; set; }

        /// <summary>
        /// 歌手信息
        /// </summary>
        public List<ISingerInfo> singers { get; set; }

    }
}
