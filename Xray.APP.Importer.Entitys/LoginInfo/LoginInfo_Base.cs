using System;
using Xray.APP.Importer.Interfaces;

namespace Xray.APP.Importer.Entitys.LoginInfo
{
    /// <summary>
    /// 登录信息基类
    /// </summary>
    public abstract  class LoginInfo_Base:ILoginInfo
    {
        public String cookie { get; set; }

    }
}
