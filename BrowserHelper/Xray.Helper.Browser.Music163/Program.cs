using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;
using Gecko;
using Gecko.Events;

namespace Xray.Helper.Browser.Music163
{
    static class Program
    {
        const int port = 7777;
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main()
        {
            Fiddler.FiddlerApplication.SetAppDisplayName("FiddlerCoreDemoApp");
            //启动代理程序，开始监听http请求  
            //监听端口 是否注册为系统代理 是否解析SSL 监听远程请求
            Fiddler.FiddlerApplication.Startup(port, false, true, true);
  
            Gecko.GeckoPreferences.User["general.useragent.override"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0";
            Gecko.GeckoPreferences.User["network.proxy.http"] = "127.0.0.1";
            Gecko.GeckoPreferences.User["network.proxy.http_port"] = 7777;
            Gecko.GeckoPreferences.User["network.proxy.ssl"] = "127.0.0.1";
            Gecko.GeckoPreferences.User["network.proxy.ssl_port"] = 7777;
            Gecko.GeckoPreferences.User["network.proxy.type"] = 1;
            Gecko.CertOverrideService.GetService().ValidityOverride += geckoWebBrowser1_ValidityOverride;
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }

        private static void geckoWebBrowser1_ValidityOverride(object sender, CertOverrideEventArgs e)
        {
            e.OverrideResult = Gecko.CertOverride.Mismatch | Gecko.CertOverride.Time | Gecko.CertOverride.Untrusted; e.Temporary = true; e.Handled = true;
        }
    }
}
