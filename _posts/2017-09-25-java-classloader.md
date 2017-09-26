---
layout: post
blog_id: "java-classloader"
title: "Java类加载器ClassLoader"
date: 2017-09-25 00:00:00 -0700
tags: Java
category: Java
summary: 类加载器(class loader)用来加载Java类到Java虚拟机中
comments: false
---

#### 类加载器基本概念

顾名思义，类加载器(class loader)用来加载Java类到Java虚拟机中。一般来说，Java虚拟机使用Java类的方式如下：Java源程序(.java文件)在经过Java编译器编译之后就被转换成Java字节代码(.class文件)。类加载器负责读取Java字节代码，并转换成java.lang.Class类的一个实例。每个这样的实例用来表示一个Java类。通过此实例的newInstance()方法就可以创建出该类的一个对象。

基本上所有的类加载器都是 java.lang.ClassLoader类的一个实例。下面详细介绍这个 Java 类。

#### java.lang.ClassLoader类介绍

java.lang.ClassLoader类的基本职责就是根据一个指定的类的名称，找到或者生成其对应的字节代码，然后从这些字节代码中定义出一个 Java 类，即 java.lang.Class类的一个实例。除此之外，ClassLoader还负责加载 Java 应用所需的资源，如图像文件和配置文件等。

#### 类加载器的树状组织结构

Java 中的类加载器大致可以分成两类，一类是系统提供的，另外一类则是由 Java 应用开发人员编写的。系统提供的类加载器主要有下面三个：

+ **引导类加载器（bootstrap class loader）**：它用来加载 Java 的核心库，是用原生代码来实现的，并不继承自 java.lang.ClassLoader。
+ **扩展类加载器（extensions class loader）**：它用来加载 Java 的扩展库。Java 虚拟机的实现会提供一个扩展库目录。该类加载器在此目录里面查找并加载 Java 类。
+ **系统类加载器（system class loader）**：它根据 Java 应用的类路径（CLASSPATH）来加载 Java 类。一般来说，Java 应用的类都是由它来完成加载的。可以通过 ClassLoader.getSystemClassLoader()来获取它。

除了系统提供的类加载器以外，开发人员可以通过继承 java.lang.ClassLoader类的方式实现自己的类加载器，以满足一些特殊的需求。

除了引导类加载器之外，所有的类加载器都有一个父类加载器，通过getParent()方法可以得到。对于系统提供的类加载器来说，系统类加载器的父类加载器是扩展类加载器，而扩展类加载器的父类加载器是引导类加载器；对于开发人员编写的类加载器来说，其父类加载器是加载此类加载器Java类的类加载器。因为类加载器Java类如同其他的Java类一样，也是要由类加载器来加载的。一般来说，开发人员编写的类加载器的父类加载器是系统类加载器。类加载器通过这种方式组织起来，形成树状结构。树的根节点就是引导类加载器。图 1中给出了一个典型的类加载器树状组织结构示意图，其中的箭头指向的是父类加载器。

![License Badge]({{ site.baseurl}}/images/classloader/1.jpg)

#### 加载顺序

看到上面系统提供的三个类加载器，那它们的加载顺序如何呢？

+ 引导类加载器（bootstrap class loader）
+ 扩展类加载器（extensions class loader）
+ 系统类加载器（system class loader）

#### 每个类加载器都有一个父加载器

每个 Java 类都维护着一个指向定义它的类加载器的引用，通过 getClassLoader()方法就可以获取到此引用。如下代码通过递归调用 getParent()方法来输出全部的父类加载器。

```java
public class ClassLoaderTree {
    public static void main(String[] args) {
        ClassLoader loader = ClassLoaderTree.class.getClassLoader();

        while (loader != null) {
            System.out.println(loader.toString());
            loader = loader.getParent();
        }
    }
}
```

运行结果如下所示：

```java
sun.misc.Launcher$AppClassLoader@164dbd5
sun.misc.Launcher$ExtClassLoader@9cb0f4
```

第一个输出的是 ClassLoaderTree类的类加载器，即系统类加载器。它是 sun.misc.Launcher$AppClassLoader类的实例；第二个输出的是扩展类加载器，是 sun.misc.Launcher$ExtClassLoader类的实例。需要注意的是这里并没有输出引导类加载器，这是由于有些 JDK 的实现对于父类加载器是引导类加载器的情况，getParent()方法返回 null。

#### Class.forName

Class.forName是一个静态方法，同样可以用来加载类。该方法有两种形式：`Class.forName(String name, boolean initialize, ClassLoader loader)`和 `Class.forName(String className)`。第一种形式的参数 name表示的是类的全名；initialize表示是否初始化类；loader表示加载时使用的类加载器。第二种形式则相当于设置了参数 initialize的值为 true，loader的值为当前类的类加载器。Class.forName的一个很常见的用法是在加载数据库驱动的时候。如 Class.forName("oracle.jdbc.driver.OracleDriver").newInstance()用来加载 Oracle 数据库的驱动。

#### 双亲委托

Java中ClassLoader的加载采用了双亲委托机制，采用双亲委托机制加载类的时候采用如下的几个步骤

+ 1、当前ClassLoader首先从自己已经加载的类中查询是否此类已经加载，如果已经加载则直接返回原来已经加载的类。
+ 2、当前classLoader的缓存中没有找到被加载的类的时候，委托父类加载器去加载，父类加载器采用同样的策略，首先查看自己的缓存，然后委托父类的父类去加载，一直到bootstrp ClassLoader
+ 3、当所有的父类加载器都没有加载的时候，再由当前的类加载器加载，并将其放入它自己的缓存中，以便下次有加载请求的时候直接返回