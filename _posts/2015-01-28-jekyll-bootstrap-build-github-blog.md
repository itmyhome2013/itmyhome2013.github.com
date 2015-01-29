---
layout: post
blog_id: "jekyll-bootstrap-build-github-blog"
title: "jekyll bootstrap搭建github blog"
date: 2015-01-28 00:00:00 -0700
tags: jekyll
category: jekyll
summary: jekyll是一个简单的免费的Blog生成工具,是一个静态站点生成器,它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能,所以实际上可以用来编写整个网站。
comments: false
---
</br>
前提你必须有一个GitHub账号且本机安装有Git

###**一、创建一个新的仓库**

去你的 https://github.com 主页新建一个仓库 名字为USERNAME.github.com

USERNAME为你的用户名(下同)

</br>
###**二、安装Jekyll-Bootstrap**

在Git Bash中输入如下命令 将代码clone到你本地

```diff 
git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.com  
cd USERNAME.github.com  
git remote set-url origin https://github.com/itmyline/USERNAME.github.com.git  
git push origin master  
```

PS:如果想clone到指定目录,则使用如下格式 git clone xxx.git "指定目录"

</br>
###**三、完成**

接下来Github将创建你的公开博客在 `http://USERNAME.github.com`

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-bootstrap-build-github-blog/jekyll-bootstrap.png)

请参考本文搭建的blog http://itmyline.github.io/

</br>
###**如果你已经有blog在Github上？**

假设你机器上安装有jekyll,如果没有请参考Windows上安装Jekyll。

在本地运行Jekyll-Bootstrap,打开命令行工具 输入如下命令:

```diff
$ git clone https://github.com/plusjade/jekyll-bootstrap.git  
$ cd jekyll-bootstrap  
$ jekyll serve  
```

浏览器中打开`http://localhost:4000` 我们将能看到和搭建在github上一样的效果