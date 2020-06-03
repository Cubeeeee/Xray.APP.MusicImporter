using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Importer.Entitys.MusicInfo
{
    public class MusicInfo_163: MusicInfo_Base
    {
        /// <summary>
        /// 覆盖基类属性
        /// </summary>
        public override String playurl
        {
            get => $"https://music.163.com/#/song?id={musicid_163}";
        }
        /// <summary>
        /// 单曲id
        /// </summary>
        public String musicid_163 { get; set; }
        /// <summary>
        /// 专辑id
        /// </summary>
        public string albumid_163 { get; set; }
        /// <summary>
        /// 专辑封面
        /// </summary>
        public string albumpic_163 { get; set; }
    }
}
