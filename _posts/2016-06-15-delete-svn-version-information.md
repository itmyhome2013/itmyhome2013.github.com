---
layout: post
blog_id: "delete-svn-version-information"
title: "删除SVN版本信息 .svn文件夹"
date: 2016-06-15 00:00:00 -0700
tags: SVN
category: SVN
summary: 在MyEclipse中拷贝文件夹时，需要先删除.svn文件
comments: false
---
<br>

##### 环境：MyEclipse、Windows

#### 问题描述：

在MyEclipse中当我们需要将一个文件夹(包含若干文件或嵌套文件夹)拷贝到另一个文件夹时，
此时文件内容虽然拷贝过去了，但其下面的.svn文件夹也会跟着拷贝过去，就会导致无法提交
其实我们真正需要的只是内容，所以需要先删除.svn文件 再进行提交

#### 解决方法：

##### **第一种：手动删除**

此方法只适合文件夹嵌套很少的情况可以进行手动删除，如果文件夹嵌套很深或较多 则进去一个个删除就捉襟见肘了

##### **第二种：使用注册表**

将以下代码在任意地方保存为 deleteSVN.reg 文件 双击执行导入注册表

```java
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN] 
@="Delete SVN Folders"

[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN\command] 
@="cmd.exe /c \"TITLE Removing SVN Folders in %1 && COLOR 9A && FOR /r \"%1\" %%f IN (.svn) DO RD /s /q \"%%f\" \""
```

执行过程如下：

![License Badge]({{ site.baseurl}}/images/svn/1.png)

![License Badge]({{ site.baseurl}}/images/svn/2.png)

在需要删除.svn文件的地方 右键 就会看到 <font color="red">Delete SVN Folders</font> 点击执行就会删除该文件夹下面的所有.svn文件

![License Badge]({{ site.baseurl}}/images/svn/3.png)

在使用完之后我们应该去掉该右键功能，毕竟我们不会天天去删除.svn的，万一哪天一不小心在项目的根目录误删了
所有的.svn 那就很蛋疼了。所以最好还是先去掉，等需要的时候再添加到注册表

#### 去除该右键功能方法：

+ 打开注册表
+ 找到[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Folder\shell\DeleteSVN]
+ 删除 DeleteSVN 即可

![License Badge]({{ site.baseurl}}/images/svn/4.png)

<br>




















