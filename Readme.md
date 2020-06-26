# Q音和网易云音乐歌单互相导入实现

虽然官方已经支持这个功能了，但是还是心血来潮想去自己实现一遍，为了避免引起一些不必要的麻烦，项目中的一些关键参数的计算方法的实现隐去了。但是具体的分析过程可以看如下文章:  
[1.网易云音乐web端加密解析](http://blog.nb-ray.com/articles/2020/05/28/1590655139257.html)  
[2.QQ音乐sign签名字段解](http://blog.nb-ray.com/articles/2020/06/03/1591149783970.html)  

[项目地址](http://gitlab.zcznb.top/XXY/musicimporter)  
[使用示例](http://gitlab.zcznb.top/XXY/musicimporter/-/blob/master/Xray.APP.TestDemo/Program.cs)  

除了基础的歌单互相导入功能以外，还做了一个导出歌单为excel的功能，使用效果如下:  
![image.png](https://b3logfile.com/file/2020/06/image-6be06891.png)

导出的字段包含歌曲名，时长，专辑，歌手，播放链接及歌曲在该平台的状态信息等。  
