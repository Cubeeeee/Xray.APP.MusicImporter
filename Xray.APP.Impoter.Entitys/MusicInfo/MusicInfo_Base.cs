using System;
using System.Collections.Generic;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.Impoter.Entitys.MusicInfo
{
    public abstract class MusicInfo_Base: IMusicInfo
    {
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
