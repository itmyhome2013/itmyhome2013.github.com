---
layout: post
blog_id: "jekyll-bootstrap-change-theme"
title: "jekyll bootstrap更改主题theme"
date: 2015-01-24 00:00:00 -0700
tags: jekyll
category: jekyll
summary: 由于JB版本0.2.X的主题,现在完全是模块化的。他们跟踪和单独版本的主题包。这让每个人都可以自由发布和共享主题。
comments: false
---
<br>

#### 使用主题

介绍：

由于JB版本0.2.X的主题,现在完全是模块化的。他们跟踪和单独版本的主题包。这让每个人都可以自由发布和共享主题。
Jekyll-Bootstrap v 0.2.x只附带twitter主题,其他主题需要被安装。
直接浏览当前主题包在GitHub上：<a href="https://github.com/jekyllbootstrap">https://github.com/jekyllbootstrap</a>
可以看到可供我们使用的主题有**the-minimum、tom、mark-reid、twitter、the-program**

#### 安装主题

通过使用rake命令,并通过该主题在git的URL安装一个主题。

```java
$ rake theme:install git="https://github.com/jekyllbootstrap/theme-the-program.git"  
```

安装主题之前,先在本地起搭建一个服务,可参考文章：jekyll bootstrap搭建github blog

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-bootstrap-change-theme/theme1.png)

目前默认是twitter主题,使用rake命令来安装一个主题

![License Badge]({{ site.baseurl}}/images/jekyll/jekyll-bootstrap-change-theme/theme2.png)

安装程序使用的git下载主题包,如果你已经获得了另一种方式的主题包,如通过Download ZIP下载下来的
你可以手动把它放到你的 **./_theme_packages**文件夹下,然后运行带有该主题名称

```java
$ rake theme:install name="THEME-NAME"  
```

在安装成功后,任务会问你,是否切换新安装的主题,输入"Y"并回车切换

#### 切换主题

一旦你的主题安装,您可以通过rake来进行他们之间的切换

```java
$ rake theme:switch name="the-program"  
```

#### 自定义主题

主题的布局包含再 ./_includes/themes/THEME-NAME。您可以编辑在该主题目录中的文件
而不是_layouts,因为改变主题将覆盖_layout目录中的文件，你可以在_layouts中自由添加额外的模板文件
以自定义您的博客