---
layout: post
blog_id: "springboot-development-of-entry"
title: "Spring Boot 开发入门"
date: 2016-09-02 00:00:00 -0700
tags: SringBoot
category: SringBoot
summary: 使用Java开发一个简单的web应用，项目采用Maven进行构建
comments: false
---
<br>

#### 准备工作

我们将使用Java开发一个简单的"hello spring boot" web应用，项目采用Maven进行构建在开始前，打开终端检查下安装的Java和Maven版本是否可用：

```ruby
C:\Users>java -version
java version "1.7.0_79"
Java(TM) SE Runtime Environment (build 1.7.0_79-b15)
Java HotSpot(TM) Client VM (build 24.79-b02, mixed mode, sharing)
```

```ruby
C:\Users>mvn -v
Apache Maven 3.0.5 (r01de14724cdef164cd33c7c8c2fe155faf9602da; 2013-02-19 21:51:
28+0800)
Maven home: D:\apache-maven-3.0.5\bin\..
Java version: 1.7.0_79, vendor: Oracle Corporation
Java home: C:\Program Files (x86)\Java\jdk1.7.0_79\jre
```

PS：SpringBoot 需要 `Java7` 以上版本支持
新建 Java Maven Project

![License Badge]({{ site.baseurl}}/images/springboot/2.png)

PS：Java Compiler 一定要 `1.6` 及以上

#### 创建POM

代码如下内容：

```xml
<?xml version="1.0" encoding="utf-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">  
  <modelVersion>4.0.0</modelVersion>  
  <groupId>springboot</groupId>  
  <artifactId>springboot</artifactId>  
  <packaging>jar</packaging>  
  <version>0.0.1-SNAPSHOT</version>  
  <name>springboot</name>  
  <url>http://maven.apache.org</url>  
  <parent> 
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-parent</artifactId>  
    <version>1.4.0.BUILD-SNAPSHOT</version> 
  </parent>  
  <!-- 为Web应用程序添加依赖关系 -->  
  <dependencies> 
    <dependency> 
       <groupId>org.springframework.boot</groupId>  
       <artifactId>spring-boot-starter-web</artifactId> 
    </dependency> 
  </dependencies>  
  <!-- Package as an executable jar -->  
  <build> 
    <plugins> 
      <plugin> 
        <groupId>org.springframework.boot</groupId>  
         <artifactId>spring-boot-maven-plugin</artifactId> 
      </plugin> 
    </plugins> 
  </build>  
  <!-- 添加Spring库 -->  
  <!-- (you don't need this if you are using a .RELEASE version) -->  
  <repositories> 
    <repository> 
      <id>spring-snapshots</id>  
      <url>http://repo.spring.io/snapshot</url>  
      <snapshots> 
         <enabled>true</enabled> 
      </snapshots> 
    </repository>  
    <repository> 
       <id>spring-milestones</id>  
       <url>http://repo.spring.io/milestone</url> 
    </repository> 
  </repositories>  
  <pluginRepositories> 
    <pluginRepository> 
       <id>spring-snapshots</id>  
       <url>http://repo.spring.io/snapshot</url> 
    </pluginRepository>  
    <pluginRepository> 
       <id>spring-milestones</id>  
       <url>http://repo.spring.io/milestone</url> 
    </pluginRepository> 
  </pluginRepositories> 
</project>
```

#### 编写代码

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class FirstController {
    
    @RequestMapping(value="/")//springmvc中的注解
    String home(){
        return "hello spring boot";
    }
    
    public static void main(String[] args) throws Exception {
        SpringApplication.run(FirstController.class, args);
    }
    
}
```

直接run  main方法就可以了，如果没报错，说明启动成功
使用浏览器打开localhost:8080，就可以访问了

![License Badge]({{ site.baseurl}}/images/springboot/3.png)


#### @RestController和@RequestMapping注解

FirstController类上使用的第一个注解是 @RestController，这被称为构造型（stereotype）注解。它为阅读代码的人提供暗示(这是一个支持REST的控制器)，对于Spring，该类扮演了一个特殊角色。在本示例中，我们的类是一个web @Controller，所以当web请求进来时，Spring会考虑是否使用它来处理。

@RequestMapping注解提供路由信息，它告诉Spring任何来自"/"路径的HTTP请求都应该被映射到home方法。 @RestController注解告诉Spring以字符串的形式渲染结果，并直接返回给调用者。

注：@RestController和@RequestMapping是Spring MVC中的注解（它们不是Spring Boot的特定部分），具体参考Spring文档的MVC章节。


#### @EnableAutoConfiguration注解

第二个类级别的注解是@EnableAutoConfiguration，这个注解告诉Spring Boot根据添加的jar依赖猜测你想如何配置Spring。由于spring-boot-starter-web添加了Tomcat和Spring MVC，所以auto-configuration将假定你正在开发一个web应用，并对Spring进行相应地设置。

#### main方法

应用程序的最后部分是main方法，这是一个标准的方法，它遵循Java对于一个应用程序入口点的约定。我们的main方法通过调用run，将业务委托给了Spring Boot的SpringApplication类。SpringApplication将引导我们的应用，启动Spring，相应地启动被自动配置的Tomcat web服务器。

我们需要将FirstController.class作为参数传递给run方法，以此告诉SpringApplication谁是主要的Spring组件，并传递args数组以暴露所有的命令行参数。
