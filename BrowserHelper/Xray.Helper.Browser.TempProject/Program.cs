using Gecko.Events;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Xray.Helper.Browser.TempProject
{
    static class Program
    {
        static int port = GetRandomAvaliablePort();
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
        /// <summary>
        /// 获得随机未被占用端口
        /// </summary>
        /// <param name="minPort"></param>
        /// <param name="maxPort"></param>
        /// <returns></returns>
        public static int GetRandomAvaliablePort(int minPort = 1024, int maxPort = 65535)
        {
            Random rand = new Random();
            while (true)
            {
                int port = rand.Next(minPort, maxPort);
                if (!IsPortInUsed(port))
                {
                    return port;
                }
            }
        }
        /// <summary>
        /// 判断端口是否被占用
        /// </summary>
        /// <param name="port"></param>
        /// <returns></returns>
        private static bool IsPortInUsed(int port)
        {
            IPGlobalProperties ipGlobalProps = IPGlobalProperties.GetIPGlobalProperties();
            IPEndPoint[] ipsTCP = ipGlobalProps.GetActiveTcpListeners();

            if (ipsTCP.Any(p => p.Port == port))
            {
                return true;
            }

            IPEndPoint[] ipsUDP = ipGlobalProps.GetActiveUdpListeners();
            if (ipsUDP.Any(p => p.Port == port))
            {
                return true;
            }

            TcpConnectionInformation[] tcpConnInfos = ipGlobalProps.GetActiveTcpConnections();
            if (tcpConnInfos.Any(conn => conn.LocalEndPoint.Port == port))
            {
                return true;
            }

            return false;
        }
    }
}
