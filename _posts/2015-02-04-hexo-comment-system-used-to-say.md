---
layout: post
blog_id: "hexo-comment-system-used-to-say"
title: "Hexo中使用多说评论系统"
date: 2015-02-04 00:00:00 -0700
tags: hexo
category: hexo
summary: 一、注册一个多说，设置自己的网站信息，获得以下通用代码。二、替换模板。三、修改模板
comments: false
---
<br>

之前用jekyll搭建博客的时候搞过jekyll中使用多说评论系统

以为通用代码是通用的，没想到不通用，稍微改一下即可

#### 一、注册一个多说，设置自己的网站信息，获得以下通用代码

```bash
<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" 
     data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
var duoshuoQuery = {short_name:"itmyhome1900"};
	(function() {
		var ds = document.createElement('script');
		ds.type = 'text/javascript';ds.async = true;
		ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
		ds.charset = 'UTF-8';
		(document.getElementsByTagName('head')[0] 
		 || document.getElementsByTagName('body')[0]).appendChild(ds);
	})();
</script>
<!-- 多说公共JS代码 end -->
```

#### 二、替换模板

找到自己使用的theme的文件夹里面的comment.ejs的文件，例如我的主题是light，

那么comment.ejs位于的路径是themes\light\layout_partial\comment.ejs，打开并将里面的全部内容替换为以下代码。

```bash
<% if (page.comments){ %>
<section id="comment">
  这里要放置多说提供的通用代码
</section>
<% } %>
```

然后将第一步多说提供的通用代码替换为上面中文所说明的地方

#### 三、修改模板

将data-thread-key="请将此处替换成文章在你的站点中的ID" 替换成data-thread-key=”<%= page.path %>”

将data-title=”请替换成文章的标题” 替换成 data-title=”<%= page.title %>”

将data-url=”请替换成文章的网址” 替换成 data-url=”<%= page.permalink %>”

修改完后大致如下：

```bash
<% if ( page.comments){ %>
<section id="comment">
 <!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="<%= page.path %>" data-title="<%= page.title %>" data-url="http://itbirds1900.github.io/<%= page.permalink %>"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
	var duoshuoQuery = {short_name:"itmyhome1900"};
		(function() {
			var ds = document.createElement('script');
			ds.type = 'text/javascript';ds.async = true;
			ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
			ds.charset = 'UTF-8';
			(document.getElementsByTagName('head')[0] 
			 || document.getElementsByTagName('body')[0]).appendChild(ds);
		})();
</script>
<!-- 多说公共JS代码 end -->
</section>
<% } %>
```

参考文章：http://www.leejianyang.com/2014/05/25/duoshuo_tutorial/