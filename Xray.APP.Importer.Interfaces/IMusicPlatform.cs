using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Xray.APP.Importer.Interfaces
{
    /// <summary>
    /// 平台相关接口
    /// </summary>
    public interface IMusicPlatform
    {
        /// <summary>
        /// 登录 如果直接填入Cookie等身份信息的话不需要这一步
        /// </summary>
        /// <returns></returns>
        void Login();
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <returns></returns>
        void GetUserInfo();
        /// <summary>
        /// 导出歌单到Excel
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
        /// 搜索歌曲 联想接口
        /// </summary>
        /// <returns></returns>
        List<IMusicInfo> SearchMusic_Suggest(params object[] parms);
        /// <summary>
        /// 搜索歌曲
        /// </summary>
        /// <param name="parms"></param>
        /// <returns></returns>
        List<IMusicInfo> SearchMusic(params object[] parms);
        /// <summary>
        /// 设置登录信息 
        /// </summary>
        /// <param name="parms"></param>
        /// <returns></returns>
        bool SetLoginInfo(params object[] parms);
        /// <summary>
        /// 校验登录状态
        /// </summary>
        /// <param name="parms"></param>
        /// <returns></returns>
        bool CheckLogin(params object[] parms);

    }
}
