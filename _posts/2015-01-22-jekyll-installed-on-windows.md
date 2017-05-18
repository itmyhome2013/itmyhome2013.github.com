---
layout: post
blog_id: "jekyll-installed-on-windows"
title: "Windows上安装Jekyll "
date: 2015-01-22 00:00:00 -0700
tags: jekyll
category: jekyll
summary: jekyll是一个简单的免费的Blog生成工具,是一个静态站点生成器,它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能,所以实际上可以用来编写整个网站。
comments: false
---
<br>

**Run Jekyll on Windows**

目录

+ Jekyll介绍
+ 安装Ruby
+ 安装DevKit
+ 安装Jekyll
+ 安装Python 
+ 安装pip
+ 运行Jekyll

### Introduction Jekyll

jekyll是一个简单的免费的Blog生成工具,是一个静态站点生成器,它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能,所以实际上可以用来编写整个网站。我们可以使用jekyll bootstrap来搭建一个静态博客网站,本篇先介绍如何在Windows下安装jekyll安装jekyll之前,先做好一些准备工作,需要如下配置：

`！重要：本文使用环境为Windows7  64位操作系统,如有不同,安装过程中不保证与本文完全一致`

### Install Ruby

首先下载 [Ruby](http://rubyinstaller.org/downloads/),下载的是Ruby 2.0.0-p598 (x64)

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/1.png)

勾选"Add Ruby executables to your PATH" 进行安装,完成后打开命令行工具检测Ruby是否安装成功

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/2.png)

**PS:打开命令行工具即为cmd(下同)**

### Install DevKit

选择适合系统版本,我的是DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/3.png)

安装在C:\RubyDevKit下
接下来,需要初始化devkit并将其绑定到Ruby安装。打开命令行工具,到RubyDevKit文件夹下。

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/4.png)

### Install Jekyll

打开命令行输入以下命令
`gem install jekyll`
如果顺利会出现如下情况,则表示正在安装,可能需要一段时间,需要下载的东西较多,也取决于你的网速

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/5.png)

这是我第二次安装,如果是第一次肯定会报错(具体报什么错误,这里也不再重现了。参考http://ruby.taobao.org/ 即可)
或许是因为之前已经设置了镜像,而不需要再重新设置。
检查jekyll是否安装成功

```java
C:\>jekyll -v
jekyll 3.0.1
```

### Install Python

下载 [Python](https://www.python.org/downloads/)

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/6.png)

当出现如下对话框 选中："Add python.exe to Path"

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/7.png)

### Install pip

pip是一个Python包的安装和管理工具。你会需要它的安装pygments,pygments.rb突出你的代码,使用Python包。

下载 [pip](https://pip.pypa.io/en/latest/installing.html)

接下来 打开命令行进入到 比如：C:\pip

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/8.png)

设置Pygments作为语法高亮

在C:\RubyDevKit\_config.yml中添加如下：highlighter: pygments

### Run Jekyll

OK 一切准备就绪,现在就可以在我们本地搭建一个jekyll博客了

```java
jekyll new myblog  
cd myblog  
jekyll serve 
```

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/9.png)

PS：在服务启动的过程中报 'which' 不是内部或外部命令，也不是可运行的程序或批处理文件。
暂时不知道什么原因引起,但不影响使用,先忽略之。
浏览器中输入：http://localhost:4000

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-installed-on-windows/10.png)

PS：如果是第一次安装jekyll,过程中可能会出现很多问题
远不止`ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why:`这一个问题
多多摸索就行了,大不了都卸了重装。

### PS: jekyll升级记

突然某一天jekyll server的时候挂了，百思不得其姐，最后发现可能(一定)是版本问题。
网上找了各种方法，真是越添越乱，最后无奈Ruby、DevKit、jekyll、Python
统统卸掉重装。Ruby和jekyll都有版本更新，升级为Ruby 2.2.3、jekyll 3.0.1
有一个错误出现：
`jekyll 3.0.1 | Error:  Permission denied - bind(2) for 127.0.0.1:4000`
说明端口被占有，不只为何，打开_config.yml 在最后加入一行 port: 5001 (其他也可)问题解决

　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　2015-12-30 更新

<br>