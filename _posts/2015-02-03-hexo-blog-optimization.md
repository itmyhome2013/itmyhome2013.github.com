---
layout: post
blog_id: "hexo-blog-optimization"
title: "Hexo博客优化"
date: 2015-02-03 00:00:00 -0700
tags: hexo
category: hexo
summary: 优化发布文章、修改日期显示格式、导航栏添加”关于”、添加友情链接widget、主页文章显示摘要
comments: false
---
</br>
###一、发布文章

在source/_posts目录下存放文章，后缀为md或markdown都可

打开一篇文章，开头需要配置一下。

```bash
title: "hexo"
date: 2015-02-02 00:00:00 -0700
tags: hexo
category: hexo
---
```

上面是一些最基本的配置，依次为 标题、日期、标签、分类

如果需要其他属性也可以添加。

</br>
###二、修改日期显示格式

默认显示的是如下英文格式，我们可以把它修改为按中文显示

![License Badge]({{ site.baseurl}}/images/hexo/hexo-blog-optimization/1.png)

打开根目录下的_config.yml文件找到

```bash
date_format: MMM D YYYY
```

修改为：

```bash
date_format: YYYY年MM月D日
```

效果如下：

![License Badge]({{ site.baseurl}}/images/hexo/hexo-blog-optimization/2.png)

注：如果出现乱码，请注意编码格式


</br>
###三、导航栏添加”关于”

```bash
hexo new page "about"
```

然后到source/about/index.md 编辑内容。

在themes/light/_config.yml中，添加如下：

```bash
menu:
  Home: /
  Archives: /archives
  关于: /about
```

</br>
###四、添加友情链接widget

1、在themes/light/layout/_widget中新建名为links.ejs的文件，编辑内容如下：

```xml
<div class="widget tag"> 
   <h3 class="title">友情链接</h3> 
   <ul class="entry"> 
    <li><a href="itmyhome.com" title="itmyhome">麦田技术博客</a></li> 
   </ul> 
</div>
```

2、在themes/light/_config.yml中，添加如下：

```bash
widgets:
- links
```

</br>
###五、主页文章显示摘要

编辑md文件的时候，在要作为摘要的文字后面添加<!--more-->即可。

</br>
###六、添加“多说”评论

稍等,文章还未发表

</br>
###七、访问加载缓慢的问题

这是由于Google字体库引起的Hexo首页加载缓慢(巨慢)

解决方法：在hexo\themes\主题\source\css\_base\variable.styl中，

找到 **@import url("//fonts.googleapis.com/css?family=Lato:400,400italic")** 这句并注释掉

重启即可