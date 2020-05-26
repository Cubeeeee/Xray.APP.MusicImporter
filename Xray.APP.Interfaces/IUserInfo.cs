using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Interfaces
{
    /// <summary>
    /// 用户信息接口
    /// </summary>
    public interface IUserInfo
    {
        /// <summary>
        /// 登录cookie
        /// </summary>
        String cookie { get; set; }
    }
}
