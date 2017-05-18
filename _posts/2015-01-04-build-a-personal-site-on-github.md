---
layout: post
blog_id: "build-a-personal-site-on-github"
title: "GitHub上搭建个人网站"
date: 2015-01-04 00:00:00 -0700
tags: Git
category: Git
summary: 1、注册Git账号 2、创建SSH keys
comments: false
---
<br>

大致如下步骤：

+ 1、注册Git账号
+ 2、创建SSH keys
+ 3、新建repository
+ 4、设置网站
+ 5、clone库到本地
+ 6、提交、上传
+ 7、预览

本教程默认你了解GitHub的基础之上 会使用基本命令，如果不了解 前三步可参考文章：
[GitHub入门教程](http://blog.itmyhome.com/2015/01/git-tutorial)    [GitHub创建SSH Keys](http://blog.itmyhome.com/2015/01/github-create-SSH-Keys)

### 一、新建repository(仓库),如下

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/1.png)

填写名称,描述信息 其他默认 然后提交即可。

### 二、设置网站

Create之后跳转新页面,点击右方Settings设置

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/2.png)

在Options选项卡中我们找到GitHub Pages点击"Automatic page generator"

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/3.png)

我们看到跳转的页面:

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/4.png)

+ Project name:网站标题
+ Tagline：网站副标题
+ Body：网页源码
+ Google Analytics Tracking ID：搜索引擎抓取关键字

以上这些我们都可以自定义,暂默认即可。
填完后,点击"Continue to Layouts" 选择自己的博客主题

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/5.png)

然后点击"Publish page"成功之后回到项目页面可以看到自动生成的一些文件

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/6.png)

接下来我们就可以在浏览器中输入 <a href="http://itmyline.github.io/blog">http://itmyline.github.io/blog</a> 来预览一下

**itmyline:用户名, blog:项目名**

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/7.png)

提示：404错误。稍等10分钟

PS:等了漫长的十分钟,刷新页面 我们blob的主页面就显示出来了。

`(如果一直显示404,就要检查你是否验证邮箱了,如果没有,到你账户去进行验证)`

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/8.png)

可这个主页的内容和样式都不是我们想要的,如何破。我们可以上传我们自己的项目
下面以一个简单的Bootstrap网站模板为例...

### 三、clone(克隆)代码、修改

在任意盘根目录下(本例为D盘)把代码clone下来

```java
$ git clone git@github.com:itmyline/blog.git  
```

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/9.png)

然后在D盘我们就会看到clone下来的代码

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/10.png)

接下来把我们要上传的文件复制到此目录下

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/11.png)

本例中新增了css、js文件夹及覆盖index.html

### 四、提交、上传

进入D\blog目录,右键Git Bash 打开命令行

```java
$ git branch  
* gh-pages  
```

查看当前分支为gh-pages
接下来：

```java
$ git add .  
$ git commit -m "blog"  
$ git remote add origin git@github.com:itmyline/blog.git  
$ git push -u origin gh-pages 
```

进入GitHub查看 我们新增的文件都出来了。

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/12.png)

浏览器输入地址 <a href="http://itmyline.github.io/blog">http://itmyline.github.io/blog</a> 即可预览我们搭建的网站。

![License Badge]({{ site.baseurl}}/images/git/build a personal site on GitHub/14.png)