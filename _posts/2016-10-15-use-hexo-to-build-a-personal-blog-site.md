---
layout: post
blog_id: "use-hexo-to-build-a-personal-blog-site"
title: "使用Hugo搭建个人博客站点"
date: 2016-10-15 00:00:00 -0700
tags: Hugo
category: Hugo
summary: Hugo是由Go语言实现的静态网站生成器。简单、易用、高效、易扩展、快速部署。
comments: false
---
<br>

Hugo是个什么东东这里直接忽略，想了解的请查阅其他资料，我们直接上手操作。

### 安装Hugo

到 <a href="https://github.com/spf13/hugo/releases">Hugo Releases</a> 下载对应的操作系统版本的Hugo二进制文件

![License Badge]({{ site.baseurl}}/images/hugo/1.png)

解压后得到 hugo_0.17_windows_amd64.exe 可以将其改名为 hugo.exe

按理双击exe即可安装，不知为何在我这里不行

![License Badge]({{ site.baseurl}}/images/hugo/2.png)

于是改为其他方法：

C盘新建文件夹 hugo\bin ,将hugo.exe放在bin目录下

`在path中设置环境变量 C:\hugo\bin;`

### 生成站点

使用Hugo快速生成站点，进入到 C:\hugo

```bath
$ hugo new site mysite
```

这样就在hugo目录里生成了初始站点，进去目录

```bath
$ cd mysite
```

站点目录结构为：

![License Badge]({{ site.baseurl}}/images/hugo/3.png)

简要介绍一下，config.toml是网站的总配置文件，content目录里放的是markdown文章，

layouts目录里放的是网站的模板文件，static目录里放的是一些图片、css、js等资源。

创建一篇日志文件

```bath
$ hugo new post/first.md
```

执行完后，会在content/post目录自动生成一个markdown格式的first.md文件：

可以简单修改一下里面的内容，比如：

```ruby
+++
draft = true
date = "2016-10-18T13:36:45+08:00"
title = "第一篇Hugo文章"

+++

### 你好！Hugo！
```

### 安装皮肤

到 <a href="http://www.gohugo.org/theme/">皮肤列表</a> 挑选一个喜欢的皮肤，找到相应的Github地址，

以 https://github.com/allnightgrocery/hugo-theme-blueberry-detox.git 为例，将主题clone到themes目录下

```bath
$ cd themes
$ git clone https://github.com/allnightgrocery/hugo-theme-blueberry-detox.git detox
```

### 本地预览

在 \mysite 目录下启动 hugo server

```bath
$ hugo server --theme=detox --buildDrafts --watch
```

浏览器访问：`http://localhost:1313/` 即可预览

![License Badge]({{ site.baseurl}}/images/hugo/4.png)

### 部署Github

首先在GitHub上创建一个Repository，命名为：`itbirds1900.github.io` (itbirds1900替换为你的github用户名)。

在站点根目录执行 Hugo 命令生成最终页面：

```bath
$ hugo --theme=detox --baseUrl="https://itbirds1900.github.io/"
```

(注意，以上命令并不会生成草稿页面，如果未生成任何文章，请去掉文章头部的 **draft=true** 再重新生成。)

如果一切顺利，所有静态页面都会生成到 public 目录，将pubilc目录里所有文件 push 到刚创建的Repository的 master 分支。

```bath
$ cd public
$ git init
$ git remote add origin https://github.com/itbirds1900/itbirds1900.github.io.git
$ git add .
$ git commit -m "first commit"
$ git push -u origin master
```

浏览器里访问：<a href="https://itbirds1900.github.io/">https://itbirds1900.github.io/</a>

