using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.Impoter.Entitys.UserInfo
{
    /// <summary>
    /// 用户信息抽象基类
    /// </summary>
    public abstract class UserInfo_Base: IUserInfo
    {
        public PlatformType platform { get; set; }
        public string image { get; set; }
        public string name { get; set; }
        public List<IMusicList> musicLists { get; set; }
    }
}
