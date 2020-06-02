using Fiddler;
using Gecko;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Windows.Forms;
using Xray.Tools.SimpleServer;

namespace Xray.Helper.Browser.MusicQQ
{
    /// <summary>
    /// 模板项目
    /// </summary>
    public partial class Form1 : Form
    {
        static String js = File.ReadAllText("qqmusic.js");
        GeckoWebBrowser browser = new GeckoWebBrowser() { Dock = DockStyle.Fill };
        static nsICookieManager CookieMan;

        /// <summary>
        /// 简易HTTP服务器地址
        /// </summary>
        static String APIAddress { get; set; } = ConfigurationManager.AppSettings["Host"];

        const String url = "https://i.y.qq.com/n2/m/share/details/taoge.html?id=7585475452";
        public Form1()
        {
            InitializeComponent();
            this.Text = "浏览器辅助服务_QQ";
            CookieMan = Xpcom.GetService<nsICookieManager>("@mozilla.org/cookiemanager;1");
            CookieMan = Xpcom.QueryInterface<nsICookieManager>(CookieMan);
            CookieMan.RemoveAll();
            panel1.Controls.Add(browser);
            browser.Navigate(url);
            browser.DocumentCompleted += (ss, ee) =>
            {
                //加载完毕
            };
            //method 请求方式  address 请求地址 body请求体
            SimpleServer.StartServer(APIAddress, (method, address, body) =>
            {
                ///响应内容
                String response = String.Empty;
                switch (method.ToUpper())
                {
                    case "GET":
                        break;
                    case "POST":
                        string result = String.Empty; ;

                        if (address.EndsWith("api/sign"))
                        {
                            this.Invoke(new Action(() =>
                            {
                                try
                                {
                                    //使用浏览器执行一些操作
                                    using (AutoJSContext context = new AutoJSContext(browser.Window))
                                    {
                                        String code = "window.__sign_hash_20200305(\"CJBPACrRuNy7" + body.Replace("\"", "\\\"") + "\")";
                                        context.EvaluateScript(code, out result);
                                        result = $"zza{"q057l5bm9e"}{result}";
                                    }
                                }
                                catch (Exception ex)
                                {
                                }

                            }));
                        }
                        response = result;
                        break;
                    default:
                        break;
                }
                return response;
            });

        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Fiddler.FiddlerApplication.Shutdown();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Fiddler.FiddlerApplication.BeforeRequest += (os) =>
            {
                os.bBufferResponse = true;
            };
            Fiddler.FiddlerApplication.BeforeResponse += TrackMethod;
        }
        private void TrackMethod(Session oSession)
        {
            Console.WriteLine(oSession.fullUrl);
            if (oSession.fullUrl.Contains("lib/h5/music.js"))
            {
                oSession.utilDecodeResponse();
                oSession.utilSetResponseBody(js);
            }
        }
    }
}
