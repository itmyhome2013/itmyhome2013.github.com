---
layout: post
blog_id: "java-string-immutable"
title: "为什么String是不可变对象"
date: 2017-11-07 00:00:00 -0700
tags: Java
category: Java
summary: 不可变对象是指在创建后后其外部可见状态无法更改的对象
comments: false
---

不可变对象是指在创建后后其外部可见状态无法更改的对象。Java 类库中的 String 、 Integer 和 BigDecimal 类就是不变对象的示例 ― 它们表示在对象的生命期内无法更改的单个值。

看下面代码：

```java
String s = "ABC";
s.toLowerCase();
```

s.toLowerCase()并没有改变"ABC"的值，而是创建了一个新的String类"abc"，然后将指向变量s

我们查看toLowerCase()方法的源码可知：

```java
return new String(result, 0, len + resultOffset);
```

最后返回的是new String

#### 不可变对象的优势：

+ 1、不可变对象可以提高String Pool的效率和安全性。如果你知道一个对象是不可变的，那么需要拷贝这个对象的内容时，就不用复制它的本身而只是复制它的地址，复制地址(通常一个指针的大小)需要很小的内存效率也很高。对于同时引用这个“ABC”的其他变量也不会造成影响。
+ 2、不可变对象对于多线程是安全的，因为在多线程同时进行的情况下，一个可变对象的值很可能被其他进程改变，这样会造成不可预期的结果，而使用不可变对象就可以避免这种情况。

当然也有其他方面原因，但是Java把String设成immutable最大的原因应该是`效率和安全`。