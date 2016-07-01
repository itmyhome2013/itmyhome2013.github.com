---
layout: post
blog_id: git-integration-myeclipse8.5"
title: "MyEclipse8.5整合Git "
date: 2015-01-20 00:00:00 -0700
tags: Git
category: Git
summary: 把下载的插件解压出来,在MyEclipse的dropins目录下新建一个egit文件夹,然后把刚才解压的features、plugins和另外两个jar包
comments: false
---
<br>

以下为MyEclipse8.5整合Git 

下载Eclipse的git插件--EGit。egit/updates-1.2下载地址：[egit-updatesite-1.2](http://download.csdn.net/detail/itmyhome/8034085)

#### **安装插件,以下两种方法任选其一**

一、把下载的插件解压出来,在MyEclipse的dropins目录下新建一个egit文件夹,然后把刚才解压的features、plugins和另外两个jar包

全放进去。重启MyEclipse后,进入Window-Preferences-Team,看到Git选项,就说明安装成功了。

二、把下载的插件解压出来,只保留features和plugins两个文件夹即可。在MyEclipse下新建myPlugin(随意名字)文件夹,

进去在此目录下新建egit文件夹,把刚才解压的features和plugins两个文件夹全部放进去 然后在dropins目录下新建egit.link文件,

内容为(示例) ：path=C:\\Users\\xxx\\AppData\\Local\\Genuitec\\MyEclipse 8.5 M1\\myPlugin\\egit

重启MyEclipse后,进入Window-Preferences-Team,看到Git选项,就说明安装成功了。

