using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Interfaces
{
    /// <summary>
    /// 平台相关接口
    /// </summary>
    public interface IMusicPlatform
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        void Login();
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns></returns>
        void GetUserInfo();
    }
}
