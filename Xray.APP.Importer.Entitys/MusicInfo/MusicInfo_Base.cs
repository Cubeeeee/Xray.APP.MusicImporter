using System;
using System.Collections.Generic;
using System.Linq;
using Xray.APP.Importer.Interfaces;

namespace Xray.APP.Importer.Entitys.MusicInfo
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


        public bool Equals(IMusicInfo other)
        {
            var singer_a = from a in singers select a.name;
            var singer_b = from a in other.singers select a.name;
            //单曲名称相同且歌手差集为0且专辑名称相同
            return name.Equals(other.name) && (singer_a.Except(singer_b)?.Count() == 0) && album.Equals(other.album);
        }

    }
}
