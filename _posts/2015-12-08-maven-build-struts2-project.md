---
layout: post
blog_id: "maven-build-struts2-project"
title: "Maven - 构建Struts2项目"
date: 2015-12-08 00:00:00 -0700
tags: Maven
category: Maven
summary: MyEclipse设置本地Maven及仓库、修改pom.xml、改web.xml 添加Struts配置
comments: false
---
</br>
#### 1、MyEclipse设置本地Maven及仓库

![License Badge]({{ site.baseurl}}/images/maven/7.png)

</br>
#### 2、新建Web Project

![License Badge]({{ site.baseurl}}/images/maven/8.png)

</br>
#### 3、修改pom.xml

删除原有pom.xml内容，添加如下struts依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>maven-struts2</groupId>
	<artifactId>maven-struts2</artifactId>
	<packaging>war</packaging>
	<version>0.0.1-SNAPSHOT</version>

	<dependencies>
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-core</artifactId>
			<version>2.3.24.1</version>
		</dependency>
	</dependencies>

</project>
```

等待下载 稍后就会看到所下jar包

![License Badge]({{ site.baseurl}}/images/maven/9.png)

</br>
#### 4、修改web.xml 添加Struts配置

```xml
<filter>
	<filter-name>struts2</filter-name>
	<filter-class>org.apache.struts2.dispatcher.FilterDispatcher</filter-class>
</filter>
<filter-mapping>
	<filter-name>struts2</filter-name>
	<url-pattern>/*</url-pattern>
</filter-mapping>
```

</br>
#### 5、添加struts.xml

```xml
<!DOCTYPE struts PUBLIC 
	"-//Apache Software Foundation//DTD Struts Configuration 2.0//EN"
	"http://struts.apache.org/dtds/struts-2.0.dtd">
<struts>
	<package name="build" extends="struts-default">
		<action name="login">
			<result name="success">index.jsp</result>
		</action>
	</package>
</struts>
```

部署启动 访问 `http://localhost:8080/maven-struts2/login.action`  构建完成

![License Badge]({{ site.baseurl}}/images/maven/10.png)

</br>