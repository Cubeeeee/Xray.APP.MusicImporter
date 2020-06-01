using Gecko.Events;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Xray.Helper.Browser.MusicQQ
{
    static class Program
    {
        static int port = Convert.ToInt32(ConfigurationManager.AppSettings["FiddlerPort"]);
        static String UA = ConfigurationManager.AppSettings["UA"];
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

            Gecko.GeckoPreferences.User["general.useragent.override"] = UA;
            Gecko.GeckoPreferences.User["network.proxy.http"] = "127.0.0.1";
            Gecko.GeckoPreferences.User["network.proxy.http_port"] = port;
            Gecko.GeckoPreferences.User["network.proxy.ssl"] = "127.0.0.1";
            Gecko.GeckoPreferences.User["network.proxy.ssl_port"] = port;
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
