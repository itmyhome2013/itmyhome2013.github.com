---
layout: post
blog_id: "windows-redis-installation-tutorial"
title: "Windows 64位下安装Redis教程"
date: 2016-05-30 00:00:00 -0700
tags: Redis
category: Redis
summary: Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库
comments: false
---

Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、
Key-Value数据库，并提供多种语言的API。


#### 一、下载

地址：Download <a href="https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip">redis-latest.zip</a> Windows 64位

#### 二、解压

D盘(其他盘亦可)新建文件夹 redis，右键解压ZIP包，所有文件解压到redis 文件夹中。

##### 部分文件介绍：

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>redis-benchmark.exe</td> 
     <td>基准测试</td> 
    </tr> 
	<tr> 
     <td>redis-check-aof.exe</td> 
     <td>aof</td> 
    </tr> 
	 <tr> 
     <td>redischeck-dump.exe</td> 
     <td>dump</td> 
    </tr>
	<tr> 
     <td>redis-cli.exe</td> 
     <td>客户端</td> 
    </tr> 
	<tr> 
     <td>redis-server.exe</td> 
     <td>服务器</td> 
    </tr> 
	<tr> 
     <td>redis.windows.conf</td> 
     <td>配置文件</td> 
    </tr> 	
</table>

![License Badge]({{ site.baseurl}}/images/redis/1.png)

#### 三、运行

Windows运行，输入【cmd】命令 进入DOC窗口
**PS：窗口要在D:\redis 目录下，且要以管理员身份运行**
输入命令[redis-server.exe  redis.windows.conf] 启动redis 服务

![License Badge]({{ site.baseurl}}/images/redis/2.jpg)

如图所示 表示启动成功

#### 四、测试

启动redis服务的doc窗口，不用关闭，因为服务需要一直执行，关闭服务，直接关闭窗口就行。
新打开一个doc窗口，用自带的客户端工具进行测试 命令【redis-cli.exe】,
事例展示了一个基本的读写操作，
设置set key->name，value->itmyhome，get age 得到key的值

![License Badge]({{ site.baseurl}}/images/redis/3.jpg)
