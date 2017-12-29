---
layout: post
blog_id: "java-concurrent-programming-final"
title: "Java并发编程之final"
date: 2017-12-26 00:00:00 -0700
tags: [Java并发,并发]
category: [Java并发,并发]
summary: 对final域的读和写更像是普通的变量访问
comments: false
---

#### final域的重排序规则

对于final域，编译器和处理器要遵守两个重排序规则。

+ 在构造函数内对一个final域的写入，与随后把这个被构造对象的引用赋值给一个引用变量，这两个操作之间不能重排序。
+ 初次读一个包含final域的对象的引用，与随后初次读这个final域，这两个操作之间不能重排序。

下面通过一些示例性的代码来分别说明这两个规则。

```java
public class FinalExample {
      int i; // 普通变量
      final int j; // final变量
      static FinalExample obj;

      public FinalExample() { // 构造函数
            i = 1; // 写普通域
            j = 2; // 写final域
      }

      public static void writer() { // 写线程A执行
            obj = new FinalExample();
      }

      public static void reader() { // 读线程B执行
            FinalExample object = obj; // 读对象引用
            int a = object.i; // 读普通域
            int b = object.j; // 读final域
            System.out.println("a: " + a); // 可能看到 0
            System.out.println("b: " + b); // 保证能看到 2
      }
}
```

这里假设一个线程A执行writer()方法，随后另一个线程B执行reader()方法

#### 写final域的重排序规则

写final域的重排序规则禁止把final域的写重排序到构造函数之外。这个规则的实现包含下面2个方面。

+ JMM禁止编译器把final域的写重排序到构造函数之外。
+ 编译器会在final域的写之后，构造函数return之前，插入一个StoreStore屏障。这个屏障禁止处理器把final域的写重排序到构造函数之外。

写final域的重排序规则可以确保：在对象引用为任意线程可见之前，对象的final域已经被正确初始化过了，而普通域不具有这个保障。以上图为例，在读线程B“看到”对象引用obj时，很可能obj对象还没有构造完成（对普通域i的写操作被重排序到构造函数外，此时初始值1还没有写入普通域i）。

#### 读final域的重排序规则

读final域的重排序规则是，在一个线程中，初次读对象引用与初次读该对象包含的final域，JMM禁止处理器重排序这两个操作（注意，这个规则仅仅针对处理器）。编译器会在读final域操作的前面插入一个LoadLoad屏障。初次读对象引用与初次读该对象包含的final域，这两个操作之间存在间接依赖关系。由于编译器遵守间接依赖关系，因此编译器不会重排序这两个操作。大多数处理器也会遵守间接依赖，也不会重排序这两个操作。但有少数处理器允许对存在间接依赖关系的操作做重排序（比如alpha处理器），这个规则就是专门用来针对这种处理器的。

reader()方法包含3个操作。

+ 初次读引用变量obj。
+ 初次读引用变量obj指向对象的普通域j。
+ 初次读引用变量obj指向对象的final域i。

读final域的重排序规则可以确保：在读一个对象的final域之前，一定会先读包含这个final域的对象的引用。在这个示例程序中，如果该引用不为null，那么引用对象的final域一定已经被A线程初始化过了

<hr>

参考文献：<a href="http://itmyhome.com/java-concurrent-programming/" target="_blank">Java并发编程的艺术</a> 方腾飞等 著