---
layout: post
blog_id: "maven-download-jar"
title: "Maven - 下载JAR包"
date: 2015-12-07 00:00:00 -0700
tags: Maven
category: Maven
summary: 使用 mvn clean install 命令把生成的jar包，安装到"本地仓库"中
comments: false
---
</br>
进入Spring官网 http://projects.spring.io/spring-framework/ 如果我们想下载Spring发现只能

通过Maven或Cradle进行下载了。

![License Badge]({{ site.baseurl}}/images/maven/5.png)

下面以Spring为例使用Maven下载JAR文件

</br>
#### 方法:

**1、任意目录下创建一个文件夹，其下创建一个pom.xml文件(本例为：D:\maven-jar)**

</br>
**2、修改Maven默认的下载位置**

打开 D:\apache-maven-3.0.5\conf\settings.xml

```xml
<!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ~/.m2/repository
<localRepository>/path/to/local/repo</localRepository>
-->
<localRepository>D:/maven-jar</localRepository>
```

</br>
**3、pom.xml**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	
	<modelVersion>4.0.0</modelVersion>

   <groupId>springframework</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>

   <!-- 下载相应jar包依赖 -->
   <dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>4.2.3.RELEASE</version>
		</dependency>
	</dependencies>
</project>
```

</br>
**4、打开控制台，执行下面 mvn clean install 命令**

![License Badge]({{ site.baseurl}}/images/maven/4.png)

</br>
完成之后就可以看到下载的Spring有关JAR文件了

![License Badge]({{ site.baseurl}}/images/maven/6.png)

</br>