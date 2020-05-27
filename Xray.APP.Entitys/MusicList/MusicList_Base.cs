using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.Impoter.Entitys.MusicList
{
    public abstract class MusicList_Base: IMusicList
    {
        /// <summary>
        /// 歌曲数
        /// </summary>
        public String songcount { get; set; }
        /// <summary>
        /// 封面图
        /// </summary>
        public String avatarUrl { get; set; }
        /// <summary>
        /// 歌单名称
        /// </summary>
        public String name { get; set; }
        /// <summary>
        /// 播放次数
        /// </summary>
        public String playtimes { get; set; }
        /// <summary>
        /// 创建用户昵称
        /// </summary>
        public String authorname { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime createtime { get; set; }
        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime updatetime { get; set; }
        /// <summary>
        /// 歌单
        /// </summary>
        public List<IMusicInfo> musics { get ; set ; }
        /// <summary>
        /// 歌单类型
        /// </summary>
        public MusicListType musicListType { get ; set ; }
    }
}
