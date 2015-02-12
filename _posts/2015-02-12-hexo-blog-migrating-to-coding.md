---
layout: post
blog_id: "hexo-blog-migrating-to-coding"
title: "Hexo博客迁移到Coding"
date: 2015-02-12 00:00:00 -0700
tags: [GitCafe,Coding]
category: Github
summary: Coding是一个面向开发者的云端开发平台，目前提供代码托管，运行空间，质量控制，项目管理等功能。Coding提供社会化协作功能，包含了社交元素，为开发者提供技术讨论和协作平台。
comments: false
---
</br>
Coding是一个面向开发者的云端开发平台，目前提供代码托管，运行空间，质量控制，项目管理等功能。

Coding提供社会化协作功能，包含了社交元素，为开发者提供技术讨论和协作平台。

</br>
###一、创建项目

![License Badge]({{ site.baseurl}}/images/coding/1.png)

**注:选择公开**

点击创建之后 获取页面HTTPS或SSH地址

![License Badge]({{ site.baseurl}}/images/coding/2.png)

</br>
###二、Clone项目到本地

```bash
$ git clone https://coding.net/itmyhome/blog.git blog
```

</br>
###三、推送代码

如果已有hexo博客代码 放在blog目录下(.deploy .git除外),其他不变 修改根目录下_config.yml配置文件

```bash
deploy:
  type: github
  repository: https://coding.net/itmyhome/blog.git  #改为你的项目地址
  branch: master
```
  
然后执行如下命令进行推送到Coding

```bash
$ hexo clean
$ hexo generate
$ hexo deploy
```

</br>
###四、部署项目

代码推送成功之后点击`[演示]` 然后点`"开始检测"`(不管提示，强制开启)

![License Badge]({{ site.baseurl}}/images/coding/4.png)

服务器选择北京和香港都可**(如果需要自定义域名选香港)**

![License Badge]({{ site.baseurl}}/images/coding/5.png)

进入到控制台，配置部署版本为`master`分支，运行环境为`HTML`，然后填写访问域名(如果是香港服务器可进行自定义域名)。

最后点击“一键部署”！如果不出意外就部署成功了，点击"马上访问"

或浏览器输入：http://itmyhome.coding.io/  即可预览

本文只是以Hexo博客迁移到Coding为基础介绍Coding部署项目的方法

</br>
