---
layout: post
blog_id: "maven-environment-configuration"
title: "Maven - 环境配置"
date: 2015-12-06 00:00:00 -0700
tags: Maven
category: Maven
summary: Maven 是一个基于 Java 的工具，所以要做的第一件事情就是安装 JDK。
comments: false
---
<br>

Maven 是一个基于Java的工具，所以要做的第一件事情就是安装JDK。

#### 1、检查Java安装

打开控制台，执行下面的Java命令，如果平台输出如下则安装成功

![License Badge]({{ site.baseurl}}/images/maven/1.png)

#### 2、设置Java环境

设置 JAVA_HOME 环境变量，并指向你机器上的Java安装目录。例如：

![License Badge]({{ site.baseurl}}/images/maven/2.png)

将Java编译器地址添加到系统路径path中。

变量名：Path

变量值：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

#### 3、下载Maven文件

地址：http://maven.apache.org/download.cgi 本例版本为3.0.5

<span style="color:red">PS：Maven对应JDK版本</span>

<span style="color:red">Maven 3.3 要求 JDK 1.7 或以上</span>

<span style="color:red">Maven 3.2 要求 JDK 1.6 或以上</span>

<span style="color:red">Maven 3.0/3.1 要求 JDK 1.5 或以上</span>

#### 4、解压Maven文件

解压文件到你想要的位置来安装 Maven，得到apache-maven-3.0.5子目录。本例为 D:\apache-maven-3.0.5

#### 5、设置Maven环境变量

使用系统属性设置环境变量。

MAVEN_HOME=D:\apache-maven-3.0.5

Path=%MAVEN_HOME%\bin;

#### 6、验证Maven安装

打开控制台，执行 mvn -version 命令。如果正常应该输入如下：

![License Badge]({{ site.baseurl}}/images/maven/3.png)

至此，完成了所有Maven设置

<br>