---
layout: post
blog_id: "jekyll-comment-system-used-to-say"
title: "jekyll中使用多说评论系统"
date: 2015-01-25 00:00:00 -0700
tags: jekyll
category: jekyll
summary: jekyll bootstrap搭建的博客默认使用的是Disqus评论插件,当然不是说Disqus不好,只是针对我们国内的用户来说,似乎并不是最好的选择。所以我们改为多说...
comments: false
---
<br>

jekyll bootstrap搭建的博客默认使用的是Disqus评论插件,当然不是说Disqus不好
只是针对我们国内的用户来说,似乎并不是最好的选择。所以我们改为多说...

#### 首先进入多说官网创建一个站点

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-comment-system-used-to-say/1.png)

#### 创建成功之后 我们会得到如下代码

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-comment-system-used-to-say/2.png)

将此代码粘贴到需要的位置替换Disqus,至于放在什么文件什么地方,取决于你所使用的模板
本例为：_includes\themes\bootstrap-3\post.html
这段代码有三个地方需要修改

+ **data-thread-key填上{% raw %}{{ page.id }}{% endraw %}**
+ **data-title填上{% raw %}{{ page.title }}{% endraw %}**
+ **data-url填上your web site/{% raw %}{{ page.url }}{% endraw %}** 比如：`http://localhost:4000/{% raw %}{{ page.url }}{% endraw %}`

最后我们就可以在页面中看到多说了

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-comment-system-used-to-say/3.png)