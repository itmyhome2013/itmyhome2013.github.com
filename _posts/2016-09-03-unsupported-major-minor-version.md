---
layout: post
blog_id: "unsupported-major-minor-version"
title: "Unsupported major.minor version 51.0"
date: 2016-09-03 00:00:00 -0700
tags: SringBoot
category: SringBoot
summary: 运行 spring boot 时报错,检查Java版本
comments: false
---
<br>

#### 1、问题

运行 spring boot 时报以下错误信息

```ruby
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
     |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v1.2.2.RELEASE)


java.lang.UnsupportedClassVersionError: javax/annotation/ManagedBean : Unsupported major.minor version 51.0
```

检查Java版本 使用的是1.6

```ruby
java version "1.6.0_43"
Java(TM) SE Runtime Environment (build 1.6.0_43-b01)
Java HotSpot(TM) 64-Bit Server VM (build 20.14-b01, mixed mode)
```

#### 2、原因

报错的为 javax/annotation/ManagedBean 找到这个类所在jar

![License Badge]({{ site.baseurl}}/images/springboot/1.png)

打开里面的MANIFEST.MF文件

```ruby
Manifest-Version: 1.0
Ant-Version: Apache Ant 1.9.3
Created-By: 1.7.0_67-b01 (Oracle Corporation)
Specification-Title: Apache Tomcat
Specification-Version: 8.0
Specification-Vendor: Apache Software Foundation
Implementation-Title: Apache Tomcat
Implementation-Version: 8.0.20
Implementation-Vendor: Apache Software Foundation
X-Compile-Source-JDK: 1.7
X-Compile-Target-JDK: 1.7
```

可以看出需要 jdk1.7的编译

参考JDK各版本对应的错误编码：

```ruby
J2SE 8 = 52 
J2SE 7 = 51 
J2SE 6.0 = 50 
J2SE 5.0 = 49 
JDK 1.4 = 48 
JDK 1.3 = 47 
JDK 1.2 = 46 
JDK 1.1 = 45 
```

#### 3、解决

下载JDK7，将 **1.6** 换成 **1.7** 即可
