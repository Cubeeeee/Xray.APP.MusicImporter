using System;
using Xray.APP.Impoter.Interfaces;

namespace Xray.APP.Impoter.Platform
{
    /// <summary>
    /// 平台操作抽象基类
    /// </summary>
    public abstract class Impoter_Base : IMusicPlatform
    {
        public ILoginInfo logininfo { get;  set; }
        public IUserInfo userinfo { get;  set; }

        public abstract void GetUserInfo();

        public virtual void Login()
        {
            throw new NotImplementedException();
        }
    }
}
