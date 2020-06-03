using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Importer.Interfaces
{
    /// <summary>
    /// 单曲信息
    /// </summary>
    public interface IMusicInfo:IEquatable<IMusicInfo>
    {
        /// <summary>
        /// 歌名/标题
        /// </summary>
        String name { get; set; }
        /// <summary>
        /// 时长
        /// </summary>
        String time { get; set; }
        /// <summary>
        /// 专辑
        /// </summary>
        String album { get; set; }
        /// <summary>
        /// 歌曲状态
        /// </summary>
        SongStatue songStatue { get; set; }
        /// <summary>
        /// 歌手信息
        /// </summary>
        List<ISingerInfo> singers { get; set; }
    }
}
