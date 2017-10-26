---
layout: post
blog_id: "java-collection-best-rractices"
title: "Java集合框架最佳实践"
date: 2017-10-25 00:00:00 -0700
tags: [Java,集合]
category: Java
summary: 根据应用的需要合理的选择集合的类型对性能非常重要 
comments: false
---

+ 1、根据需要选择正确的集合类型。比如，如果指定了大小，我们会选用Array而非ArrayList。如果我们想根据插入顺序遍历一个Map，我们需要使用TreeMap。如果我们不想重复，我们应该使用Set。
+ 2、一些集合类允许指定初始容量，所以如果我们能够估计到存储元素的数量,我们可以使用它,就避免了重新哈希或大小调整
+ 3、基于接口编程，而非基于实现编程，它允许我们后来轻易地改变实现。
+ 4、总是使用类型安全的泛型，避免在运行时出现ClassCastException。
+ 5、使用JDK提供的不可变类(immutable class)作为Map的key，可以避免自己实现hashCode()和equals()。
+ 6、尽可能使用Collections工具类，或者获取只读、同步或空的集合，而非编写自己的实现。它将会提供代码重用性，它有着更好的稳定性和可维护性。


