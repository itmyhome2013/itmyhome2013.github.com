---
layout: post
blog_id: "installation-and-configuration-of-ant-tutorial"
title: "Ant入门教程之安装配置"
date: 2015-04-09 00:00:00 -0700
tags: Ant
category: Ant
summary: 在使用Ant之前需要先进行安装和配置,添加系统环境变量：ANT_HOME 该变量指向Ant解压后的根目录,添加Path变量 ： 在path最后面追加 %ANT_HOME%\bin
comments: false
---
</br>
###一、安装

下载地址: [http://ant.apache.org](http://ant.apache.org) 本文中下载的是1.9.4版本。

解压到某个目录(例如D:\apache-ant-1.9.4)即可使用。

</br>
###二、配置

添加系统环境变量：ANT_HOME 该变量指向Ant解压后的根目录，本文为：D:\apache-ant-1.9.4

添加Path变量 ： 在path最后面追加 %ANT_HOME%\bin; (注意分号)

</br>
###三、测试是否成功

打开cmd，运行命令ant -version,若安装和配置成功，则会显示Ant版本信息，如下：

![License Badge]({{ site.baseurl}}/images/ant/1.png)

</br>