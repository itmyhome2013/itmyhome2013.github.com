---
layout: post
blog_id: "lombok-eliminate-java-verbosity"
title: "Lombok 介绍 消除Java的冗长"
date: 2016-02-24 00:00:00 -0700
tags: Lombok
category: Lombok
summary: Lombok是一种Java实用工具,可用来帮助开发人员消除Java的冗长,尤其是对于简单的Java对象(POJO)
comments: false
---
<br>
Lombok 是一种 Java实用工具，可用来帮助开发人员消除Java的冗长，尤其是对于简单的Java对象(POJO)。

它通过注释实现这一目的。一个标准的Java bean 一般具有若干属性，每个属性具有getter()和setter()方法,

通常还会有一个toString() 方法、一个 equals() 方法和一个 hashCode() 方法。这样一来，代码就显得冗余。


#### 安装 Lombok

使用Lombok 首先要进行安装，本例介绍 myeclipse 的安装方法，首先官网下载 <a href="http://projectlombok.org/">lombok.jar</a>

+ 将 lombok.jar 复制到 myeclipse.ini / eclipse.ini 所在的文件夹目录下

+ 打开 myeclipse.ini / eclipse.ini，在最后加上以下两行并保存：

　　　-Xbootclasspath/a:lombok.jar

　　　-javaagent:lombok.jar
  
+ 重启 myeclipse / eclipse 即可

#### 使用 Lombok

现在，就可以在 IDE 中使用Lombok了，看以下代码：

```java
public class User {
	private String username;
	private String password;
	private int age;
}
```

以上是一个简单的 Java bean 的典型开始。可以为每个属性添加 getters 和 setters。

然后再添加一个 equals() 方法、一个 toString() 方法和一个 hashCode() 方法。

有了 Lombok，无需自己完成上述操作。相反，只需添加一个注释：`@Data`。

```java
@Data
public class User {
	private String username;
	private String password;
	private int age;
}
```

#### Lombok 注解

Lombok 注解可参看 <a href="http://projectlombok.org/features/index">帮助文档</a>

下面介绍几个常用的 lombok 注解

+ @Data   ：注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了equals、canEqual、hashCode、toString 方法

+ @Setter：注解在属性上；为属性提供 setting 方法

+ @Getter：注解在属性上；为属性提供 getting 方法

+ @Log4j ：注解在类上；为类提供一个 属性名为log 的 log4j 日志对象

+ @NoArgsConstructor：注解在类上；为类提供一个无参的构造方法

+ @AllArgsConstructor：注解在类上；为类提供一个全参的构造方法

当使用注解的时候，我们看看Lombok到底干了些什么

```java
public class User {
	private @Getter @Setter String username;
	private @Getter @Setter String password;
	private @Getter @Setter int age;
}
```

![License Badge]({{ site.baseurl}}/images/lombok/1.jpg)

甚至可以这样写：

```java
@Data
public class User {
	private String username;
	private String password;
	private int age;
}
```

![License Badge]({{ site.baseurl}}/images/lombok/2.jpg)

可以看出，在编译期，Lombok根据所写的annotation，为所有属性加上了getter setter，甚至是hashCode，equals和toString。

#### 参考资料:

+ <a href="https://www.ibm.com/developerworks/cn/opensource/os-lombok/">以简单的方式消除 Java 的冗长</a>

+ <a href="http://www.blogjava.net/fancydeepin/archive/2012/07/12/lombok.html">Lombok 安装、入门 - 消除冗长的 java 代码</a>

<br>