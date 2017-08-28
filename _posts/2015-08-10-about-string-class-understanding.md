---
layout: post
blog_id: "about-string-class-understanding"
title: "关于String类的理解"
date: 2015-08-10 00:00:00 -0700
tags: Java
category: Java
summary: String是一个特殊的类
comments: false
---

#### Java中的数据类型有两种

一种是基本类型(primitive types)共有8种 即byte short int long float double  char  boolean(并没有String类型)
看下面一段程序：

```java
int a = 413;  
int b = 413;  
System.out.println(a==b); //true  
  
Integer c = 10;  
Integer d = 10;  
System.out.println(c==d); //true  
  
Integer e = 128;  
Integer f = 128;  
System.out.println(e==f); //false
```

Integer类型赋不同值的值返回的结果却不同

**原因：**

<span style="color:red">自动装箱是对于从 -128 到 127 之间的信息值,它们在被装箱为 对象数据后会在内存中被重用.所以上面两个是不相同的.</span>
<span style="color:red">java编译器在1.5版本中,对原型的自动装包是有一个规定的,对于boolean,byte相同的值放在同一个包装器对象中,</span>
<span style="color:red">char<=127的放在同一个包装对象中,short和int在-128到127之间的数据放在同一个包装对象中。</span>

**String是一个特殊的类。即可以用String str = new String("abc");的形式来创建，也可以用String str = "abc";的形式来创建。对于new的形式 是在堆中开一片内存。**

```java
String str1 = "abc";  
String str2 = "abc";  
System.out.println(str1==str2);
```

<span style="color:red">结果说明，JVM创建了两个引用str1和str2，但只创建了一个对象，而且两个引用都指向了这个对象。</span>
接着看如下代码：

```java
String str3 = "abc";  
String str4 = new String("abc");  
System.out.println(str3==str4);//false
```

<span style="color:red">创建了两个引用。创建了两个对象。两个引用分别指向不同的两个对象。</span>

**结论：**

使用String str = "abc"；的方式，可以在一定程度上提高程序的运行速度，因为JVM会自动根据栈中数据的实际情况来决定是否有必要创建新对象。而对于String str = new String("abc")；的代码，则一概在<span style="color:red">堆</span>中创建新对象，而不管其字符串值是否相等，是否有必要创建新对象，从而加重了程序的负担。

#### **附：StringBuffer  StringBuilder  String的区别**

String是固定长度的字符串，如果要发生变化必须重新生成新的实例。

+ String 字符串常量
+ StringBuffer 字符串常量<span style="color:red">(线程安全)</span>
+ StringBuilder 字符串常量<span style="color:red">(非线程安全)(效率高)</span>

简要的说， <span style="color:red">String 类型和 StringBuffer 类型的主要性能区别其实在于 String 是不可变的对象,</span>

而如果是使用 StringBuffer 类则结果就不一样了，每次结果都会对 StringBuffer 对象本身进行操作，而不是生成新的对象，再改变对象引用。所以在一般情况下我们推荐使用 StringBuffer ，特别是字符串对象经常改变的情况下。而在某些特别情况下，String对象的字符串拼接其实是被JVM 解释成了 StringBuffer 对象的拼接，所以这些时候 String 对象的速度并不会比 StringBuffer对象慢，而特别是以下的字符串对象生成中，String 效率是远要比 StringBuffer 快的：

```java
String s1 = "This is only a" + “ simple” + “ test”;
StringBuffer sb = new StringBuilder(“This is only a”).append(“ simple”).append(“ test”);
```

你会很惊讶的发现，生成 String s1 对象的速度简直太快了，而这个时候 StringBuffer 居然速度上根本一点都不占优势。
其实这是 JVM 的一个把戏，在 JVM 眼里，这个
String s1 = "This is only a" + "simple" + "test"; 其实就是：
String s1 = "This is only a simple test"; 所以当然不需要太多的时间了。但大家这里要注意的是，如果你的字符串是来自另外的String 对象的话，速度就没那么快了，譬如：

```java
String s2 = "This is only a";
String s3 = "simple";
String s4 = "test";
String s1 = S2 +S3 + S4;
```

这时候 JVM 会规规矩矩的按照原来的方式去做,<span style="color:red">在大部分情况下 StringBuffer > String</span>

**Java.lang.StringBuffer线程安全的可变字符序列**。一个类似于 String 的字符串缓冲区，但不能修改。虽然在任意时间点上它都包含某种特定的字符序列，但通过某些方法调用可以改变该序列的长度和内容。可将字符串缓冲区安全地用于多个线程。可以在必要时对这些方法进行同步，因此任意特定实例上的所有操作就好像是以串行顺序发生的，该顺序与所涉及的每个线程进行的方法调用顺序一致。StringBuffer上的主要操作是 append 和 insert 方法，可重载这些方法，以接受任意类型的数据。每个方法都能有效地将给定的数据转换成字符串，然后将该字符串的字符追加或插入到字符串缓冲区中。append 方法始终将这些字符添加到缓冲区的末端；而 insert 方法则在指定的点添加字符。

**java.lang.StringBuilder一个可变的字符序列是5.0新增的**。此类提供一个与 StringBuffer 兼容的 API，但不保证同步。

该类被设计用作 StringBuffer的一个简易替换，用在字符串缓冲区被单个线程使用的时候（这种情况很普遍）。如果可能，建议优先采用该类，因为在大多数实现中，它比 StringBuffer要快。两者的方法基本相同

<br>