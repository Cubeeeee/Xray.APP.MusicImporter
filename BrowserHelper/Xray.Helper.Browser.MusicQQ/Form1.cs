using Gecko;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Xray.Tools.SimpleServer;

namespace Xray.Helper.Browser.MusicQQ
{
    /// <summary>
    /// 模板项目
    /// </summary>
    public partial class Form1 : Form
    {
        GeckoWebBrowser browser = new GeckoWebBrowser() { Dock = DockStyle.Fill };

        /// <summary>
        /// 简易HTTP服务器地址
        /// </summary>
        static String APIAddress { get; set; } = ConfigurationManager.AppSettings["Host"];

        const String url = "https://i.y.qq.com/n2/m/share/details/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=7256928516";
        public Form1()
        {
            InitializeComponent();
            this.Text = "浏览器辅助服务_QQ";
            panel1.Controls.Add(browser);
            browser.Navigate(url);
            browser.DocumentCompleted += (ss, ee) =>
            {
                //加载完毕
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
                                            String js = $"M.getSecuritySign('{body.Replace("\"", "\\\"")}')";
                                            context.EvaluateScript(js, out result);
                                            //context.EvaluateScript($"encrypt.encrypt('{jobj.SelectToken("text")}')", out result);
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                    }

                                }));
                            }
                            response = JsonConvert.SerializeObject(new { result });
                            break;
                        default:
                            break;
                    }
                    return response;
                });
            };
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            Fiddler.FiddlerApplication.Shutdown();
        }
    }
}
