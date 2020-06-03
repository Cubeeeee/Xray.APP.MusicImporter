using System;
using System.Collections.Generic;
using System.Text;
using Xray.Tools.ExtractLib.Extract;
using Xray.Tools.ExtractLib.Extract.ExtractParms;

namespace Xray.APP.Importer.Entitys.LoginInfo
{
    public class LoginInfo_163 : LoginInfo_Base
    {
        public String csrf_token
        {
            get =>String.IsNullOrEmpty(cookie)?String.Empty: ExtractMethod.GetResult(ExtractType.Regex, cookie, "__csrf=(.+?)($|;)", new RegexPam { Group = 1 });
        }
    }
}
