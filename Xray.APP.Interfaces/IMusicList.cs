using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Interfaces
{
    /// <summary>
    /// 歌单相关接口
    /// </summary>
    public interface IMusicList
    {
        /// <summary>
        /// 创建者头像
        /// </summary>
        String avatarUrl { get; set; }
        /// <summary>
        /// 歌单名称
        /// </summary>
        String name { get; set; }
        /// <summary>
        /// 播放次数
        /// </summary>
        String playtimes { get; set; }
        /// <summary>
        /// 创建用户昵称
        /// </summary>
        String authorname { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        DateTime createtime { get; set; }
        /// <summary>
        /// 更新时间
        /// </summary>
        DateTime updatetime { get; set; }
        /// <summary>
        /// 歌单
        /// </summary>
        List<IMusicInfo> musics { get; set; }
        /// <summary>
        /// 歌单类型
        /// </summary>
        MusicListType musicListType { get; set; }
        /// <summary>
        /// 歌曲数
        /// </summary>
        String songcount { get; set; }
    }
}
