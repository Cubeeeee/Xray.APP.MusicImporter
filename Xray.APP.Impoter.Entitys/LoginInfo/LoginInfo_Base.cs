using System;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.Impoter.Entitys.LoginInfo
{
    /// <summary>
    /// 登录信息基类
    /// </summary>
    public abstract  class LoginInfo_Base:ILoginInfo
    {
        public String cookie { get; set; }

    }
}
