---
layout: post
blog_id: "unable-to-update-index-for-central-maven"
title: "Unable to update index for central http://repo1.maven.org/maven2/ 解决方法"
date: 2016-09-29 00:00:00 -0700
tags: Maven
category: Maven
summary: 不知道什么原因Eeclipse中的maven插件突然不能用了，修改pom.xml无任何反应
comments: false
---
<br>

不知道什么原因 MyEclipse(eclipse) 中的 maven 插件突然不能用了，修改 pom.xml 无任何反应
控制台报 `Unable to update index for central http://repo1.maven.org/maven2/` 错误
搜索到一些文章 <a href="http://www.cnblogs.com/mingforyou/p/3276864.html">cnblogs</a>，<a href="http://zy77612.iteye.com/blog/1338555">iteye</a>，差不多都是出自同一人之手然后到处转载，看着挺复杂的，也没试验。
在stackoverflow上看到有人提出同样的问题，下面有解答，照着操作 竟然成功了
<a href="http://stackoverflow.com/questions/7065478/classic-error-unable-to-update-index-for-centralhttp-repo1-maven-org-maven2">Classic error: Unable to update index for central|http://repo1.maven.org/maven2</a>

#### 步骤如下：

+ 1、关闭Eclipse
+ 2、删除 workspace_location/.metadata/.plugins/org.maven.ide.eclipse 文件夹
+ 3、删除 workspace_location/.metadata/.plugins/org.eclipse.m2e.core(未发现有此目录，可忽略)
+ 4、Window->Preferences->MyEclipse->Maven4MyEclipse->Maven-> 勾选如下
   
![License Badge]({{ site.baseurl}}/images/maven/eclipse_maven.png)

以上步骤轻松搞定，可见国内网站和国外网站的差别，也可见百度搜索和Google搜索的差别
