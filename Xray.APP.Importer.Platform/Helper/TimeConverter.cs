using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Importer.Platform.Helper
{
    /// <summary>
    /// 时间相关转换
    /// </summary>
    public class TimeConverter
    {
        /// <summary>
        /// 毫秒时长转化为分钟:秒
        /// </summary>
        /// <param name="millsecond"></param>
        /// <returns></returns>
        public static String ToMinSecond(object millsecond)
        {
            TimeSpan tp = default(TimeSpan);
            try
            {
                tp = TimeSpan.FromMilliseconds(Convert.ToDouble(millsecond));
            }
            catch (Exception)
            {

            }
            return $"{tp.Minutes}:{tp.Seconds}";
        }
    }
}
