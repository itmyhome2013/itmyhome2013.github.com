---
layout: post
blog_id: "ngrok-use-introduction"
title: "ngrok 使用介绍"
date: 2016-09-18 00:00:00 -0700
tags: ngrok
category: ngrok
summary: ngrok 是一个反向代理,通过在公共的端点和本地运行的Web服务器之间建立一个安全的通道
comments: false
---
<br>

最近在做微信公众号开发，需要调试本地的测试环境，微信公众号的调试需要部署到一个公网服务器，
虽然目前可以使用BAE、SAE、Coding等各种免费的云平台，但是调试基本只能靠查看日志输出，而且
每次修改还要重新部署所以及其不便，这时我们需要一个能将本地的Web网站映射到外网以供调试
ngrok 是一个反向代理，通过在公共的端点和本地运行的 Web 服务器之间建立一个安全的通道

#### 一、注册账号

进入 <a href="https://ngrok.com/">ngrok</a> 填写信息进行注册，完成后会有一个授权码

![License Badge]({{ site.baseurl}}/images/ngrok/1.png)

#### 二、下载 <a href="https://ngrok.com/download">downloading ngrok</a>

我使用的是windows版本 下载Windows 64-Bit

![License Badge]({{ site.baseurl}}/images/ngrok/2.png)

#### 三、解压启动

下载并解压后，找到解压目录，双击ngrok.exe 输入如下命令：

```java
ngrok authtoken 授权码
```

之后接着输入

```java
ngrok http 8080
```

将本地8080端口下的web服务映射到外网80端口

![License Badge]({{ site.baseurl}}/images/ngrok/3.png)

启动后的界面如下：

![License Badge]({{ site.baseurl}}/images/ngrok/4.png)

红色部分即为映射的外网地址，现在访问这个地址就是访问本地的8080端口。

