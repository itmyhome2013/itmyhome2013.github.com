---
layout: post
blog_id: "added-maven-support-web-projects"
title: "已有Web项目添加Maven支持"
date: 2016-08-20 00:00:00 -0700
tags: Maven
category: Maven
summary: 在我们现有的Web开发项目中可以集成Maven
comments: false
---
<br>

IDE：MyEclipse

当我们在现有的Web开发项目中集成 Maven 的时候,需要修改以下几个地方:

##### **1、将以下代码拷贝到工程根路径下的 .project 文件中的 `<buildSpec>` 标签下(如果代码存在，则无须拷贝)**

```xml
<buildCommand>
	<name>org.maven.ide.eclipse.maven2Builder</name>
	<arguments></arguments>
</buildCommand>
```

##### **2、将以下代码拷贝到工程根路径下的 .project 文件中的 `<natures>` 标签下(如果代码存在，则无须拷贝)**

```xml
<nature>org.maven.ide.eclipse.maven2Nature</nature>
```

##### **3、将以下代码拷贝到工程根路径下的 .classpath 文件中的 `<classpath>` 标签下(如果代码存在，则无须拷贝)**

```xml
<classpathentry kind="con" path="org.maven.ide.eclipse.MAVEN2_CLASSPATH_CONTAINER"/>
```

项目右键 **Refresh** 刷新即可，如果不行重启MyEclipse，看到如下Maven依赖

![License Badge]({{ site.baseurl}}/images/mongodb/maven.png)

即配置成功！ Java Project 项目同理
