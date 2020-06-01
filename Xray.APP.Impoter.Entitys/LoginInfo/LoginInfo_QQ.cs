using System;
using System.Collections.Generic;
using System.Text;
using Xray.Tools.ExtractLib.Extract;
using Xray.Tools.ExtractLib.Extract.ExtractParms;

namespace Xray.APP.Impoter.Entitys.LoginInfo
{
    public class LoginInfo_QQ: LoginInfo_Base
    {
        /// <summary>
        /// qq号
        /// </summary>
        public String qqnum
        {
            get => String.IsNullOrEmpty(cookie) ? String.Empty : ExtractMethod.GetResult(ExtractType.Regex, cookie, "uin=(\\d+)", new RegexPam { Group = 1 });
        }
        public String qqmusic_key
        {
            get => String.IsNullOrEmpty(cookie) ? String.Empty : ExtractMethod.GetResult(ExtractType.Regex, cookie, "qqmusic_key=(.+?)($|;)", new RegexPam { Group = 1 });
        }
        public String csrf_token
        {
            get => String.IsNullOrEmpty(qqmusic_key) ? String.Empty : getACSRFToken(qqmusic_key);
        }

        public String cid { get; set; } = "205361801";
        private String getACSRFToken(String qqmusic_key)
        {
            var o = 5381;
            for (int i = 0; i < qqmusic_key.Length; i++)
            {
                o += (o << 5) + qqmusic_key[i];
            }
            return Convert.ToString(2147483647 & o);
        }
    }
}
