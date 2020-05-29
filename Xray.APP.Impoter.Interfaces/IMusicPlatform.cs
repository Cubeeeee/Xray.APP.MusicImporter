using System;
using System.Collections.Generic;
using System.Text;

namespace Xray.APP.Impoter.Interfaces
{
    /// <summary>
    /// 平台相关接口
    /// </summary>
    public interface IMusicPlatform
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        void Login();
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns></returns>
        void GetUserInfo();
        /// <summary>
        /// 导出到Excel
        /// </summary>
        void OutPutMusicListToExcel();
        /// <summary>
        /// 创建歌单
        /// </summary>
        void CreateMusicList(params object[] parms);
        /// <summary>
        /// 加入歌曲到歌单
        /// </summary>
        /// <param name="parms"></param>
        void AddMusicToList(params object[] parms);
        /// <summary>
        /// 搜索歌曲
        /// </summary>
        /// <returns></returns>
        IMusicInfo SearchMusci(params object[] parms);
    }
}
