using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Importer.Entitys.MusicInfo
{
    public class MusicInfo_QQ: MusicInfo_Base
    {
        /// <summary>
        /// 覆盖基类属性
        /// </summary>
        public override String playurl
        {
            get => $"https://y.qq.com/n/yqq/song/{music_mid_qq}.html";
        }
        /// <summary>
        /// 单曲id
        /// </summary>
        public String musicid_qq { get; set; }
        public String music_mid_qq { get; set; }
        /// <summary>
        /// 专辑id
        /// </summary>
        public string albumid_qq { get; set; }
        /// <summary>
        /// mid
        /// </summary>
        public string album_mid_qq { get; set; }
        /// <summary>
        /// 专辑封面
        /// </summary>
        public string albumpic_qq { get; set; }
    }
}
