---
layout: post
blog_id: eclipse-plug-egit-use-the-git"
title: "Eclipse上GIT插件EGIT使用"
date: 2015-01-21 00:00:00 -0700
tags: Git
category: Git
summary: 配置个人信息 Window > Preferences > Team > Git > Configuration
comments: false
---
</br>
###一、安装EGit插件

参考：MyEclipse8.5整合Git

###二、EGit配置

配置个人信息 Window > Preferences > Team > Git > Configuration

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/1.png)

Location会自动查找~/.gitconfig文件(在Windows系统中对于多数人来说 位于C:\Documents and Settings\$USER下)。

如何没有此文件,可打开Git Bash进行设置：

```diff
$ git config --global user.name "youName"  
$ git config --global user.email "youEmail@example.com"  
```

再进入$USER下就可以看到该.gitconfig文件了

</br>
###三、将本地仓库推送到远程仓库

####1：MyEclipse新建一个项目(mygit)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/2.png)

</br>
####2：GitHub新建一个仓库

创建成功之后跳转到如下页面,记住该HTTP地址：https://github.com/itmyline/mygit.git

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/3.png)

</br>
####3：创建仓库

项目右键：Team > ShareProject > Git    Next之后出现如下页面

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/4.png)

勾选框

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/5.png)

创建仓库后,在$workspace\mygit目录下的.git文件夹,就是git的仓库地址。

</br>
####4、提交

有了本地仓库之后 我们就可以上传到远程仓库了

项目右键：Team > Commit

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/6.png)

</br>
####5：推送

项目右键：Team > Remote > Push

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/7.png)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/8.png)

进入Github 即可看到我们提交的项目

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/9.png)

</br>
###四、将远程仓库克隆到本地

Import > Git > Projects from Git > Next > Clone

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/10.png)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/11.png)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/12.png)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/13.png)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/14.png)

![License Badge]({{ site.baseurl}}/images/git/eclipse-plug-egit-use-the-git/15.png)





