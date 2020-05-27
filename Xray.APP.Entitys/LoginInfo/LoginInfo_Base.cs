using System;
using System.Collections.Generic;
using System.Text;
using Xray.APP.Interfaces;

namespace Xray.APP.Entitys.LoginInfo
{
    /// <summary>
    /// 登录信息基类
    /// </summary>
   public abstract  class LoginInfo_Base:ILoginInfo
    {
        public String cookie { get; set; }

    }
}
