---
layout: post
blog_id: "myeclipse-install-svn-plugin"
title: "MyEclipse8.5 安装SVN插件"
date: 2016-11-02 00:00:00 -0700
tags: SVN
category: SVN
summary: 之前已经安装过SVN插件，使用的Site-1.6.5，突然某一天无法使用了
comments: false
---
<br>

之前已经安装过SVN插件，使用的Site-1.6.5，突然某一天无法使用了，报如下错误

```ruby
org.tigris.subversion.javahl.ClientException: svn: This client is too old to work with working 
copy 'D:\MyEclipse2015\ithome'; please get a newer Subversion client
```

得知原因是 site插件与Subversion版本不匹配 

![License Badge]({{ site.baseurl}}/images/myeclipse-svn/1.png)

忘了之前Subversion是哪个版本了，也不知道是不是啥时候更新过
解决方法是将 **site-1.6.5 替换为 site-1.8.22**(估计1.7也行，没试)

##### **一、下载 site-1.8.22.zip**

##### **二、解压该文件到myeclipse的安装目录 myPlugin\svn 文件夹下(没有则创建)**

![License Badge]({{ site.baseurl}}/images/myeclipse-svn/2.png)

##### **三、dropins目录下新建svn.link文件 内容为**

```ruby
path=C:\\xxx\\Genuitec\\MyEclipse 8.5 M1\\myPlugin\\svn
```

##### **四、重启MyEclipse**

![License Badge]({{ site.baseurl}}/images/myeclipse-svn/3.png)

