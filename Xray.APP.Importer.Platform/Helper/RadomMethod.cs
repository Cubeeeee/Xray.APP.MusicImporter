using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Platform.Helper
{
    public class RadomMethod
    {
        static Random random { get; set; } = new Random();
        public static int GetRandomDelay(int min = 1, int max = 5000)
        {
            return random.Next(min,max);
        }
    }
}
