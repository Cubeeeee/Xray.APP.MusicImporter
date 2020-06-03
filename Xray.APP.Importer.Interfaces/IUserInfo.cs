using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Importer.Interfaces
{
    /// <summary>
    /// 用户信息接口
    /// </summary>
    public interface IUserInfo
    {
        /// <summary>
        /// 平台类型
        /// </summary>
        PlatformType platform { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        String image { get; set; }
        /// <summary>
        /// 用户昵称
        /// </summary>
        String name { get; set; }
        /// <summary>
        /// 歌单列表
        /// </summary>
        List<IMusicList> musicLists { get; set; }
    }
}
