---
layout: post
blog_id: "hexo-build-blog"
title: "Hexo博客搭建"
date: 2015-02-02 00:00:00 -0700
tags: hexo
category: hexo
summary: 这是一篇简要的介绍Hexo独立博客的搭建教程,其他相关知识如Git、Github Pages请自行脑补。
comments: false
---
</br>
这是一篇简要的介绍Hexo独立博客的搭建教程

其他相关知识如Git、Github Pages请自行脑补。

</br>
###一、安装准备软件

####[Node.js](http://nodejs.org/download/)

我的环境是Win7 64位,请选择对应版本进行下载

![License Badge]({{ site.baseurl}}/images/hexo/hexo-build-blog/1.png)

一直Next  只需选中Add to PATH即可

![License Badge]({{ site.baseurl}}/images/hexo/hexo-build-blog/3.png)

####Git

安装Git的客户端[msysgit](http://msysgit.github.io/)

</br>
###二、安装Hexo

Node和Git都安装好后，可执行如下命令安装hexo：

```diff
npm install -g hexo
```

初始化Hexo

进入任意盘(如：D盘)打开Git Bash依次执行

```diff
$ hexo init blog
$ cd blog
$ npm install
$ hexo server
```

![License Badge]({{ site.baseurl}}/images/hexo/hexo-build-blog/4.png)

浏览器输入`http://localhost:4000/` 即可看到效果

</br>
###三、主题更换

对于一个独立博客，更换主题是必不可少的.hexo的主题列表 [Hexo Themes](https://github.com/hexojs/hexo/wiki/Themes)

选择一个你比较喜欢的,打开Git Bash 执行如下命令进行主题安装(下面以light主题为例)

```diff
$ git clone git://github.com/tommy351/hexo-theme-light.git light
```

注：在**/blog/themes**目录下执行上述命令，执行成功之后会在themes目录下多出一个light主题

安装完成后，打开blog/_config.yml，修改主题为light

```diff
theme: light
```

重启server

```diff
$ hexo server
```

刷新即可预览到刚更换的Hexo主题

</br>
###三、推送到Github

</br>
####1、注册Github账号

已有账号可以跳过

</br>
####2、创建repository

比如我的Github测试账号是itbirds1900，那么创建的repository名字应该是**itbirds1900.github.io**

![License Badge]({{ site.baseurl}}/images/hexo/hexo-build-blog/5.png)

</br>
####3、部署

编辑_config.yml(在D:\blog下)。部署时，要把下面的itbirds1900都换成你的账号名。

```diff
deploy:
  type: github
  repository: https://github.com/itbirds1900/itbirds1900.github.io.git
  branch: master
```

blog目录下打开Git Bash执行下列指令进行推送。

```diff
$ hexo generate
$ hexo deploy
```

如何你电脑没设置SSH,将会提示输入用户名密码，输入即可。

成功之后浏览器输入http://*你的账户名*.github.io/    本例参考 http://itbirds1900.github.io/

