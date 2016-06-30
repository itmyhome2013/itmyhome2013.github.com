---
layout: post
blog_id: "java-avoid-null-pointer"
title: "Java中避免空指针的几个方法"
date: 2016-06-29 00:00:00 -0700
tags: Java
category: Java
summary: 在开发过程中,总能时不时的碰到空指针的异常,如何才能避免空指针异常
comments: false
---
<br>

#### equals

Object类中的equals 方法在非空对象引用上实现相等关系，具有对称性

x.equals(y) 和 y.equals(x) 结果是一样的，但当x == null时会抛出空指针异常

例如：

```java
String x = null;
String y = "world";
if(x.equals(y)){ // java.lang.NullPointerException
	
}
```

<font color="red">所以我们要把确定不为null的对象或值放在前面</font>

#### valueOf()和toString()

调用null对象的toString()会抛出空指针异常，使用valueOf()可以获得相同的值，传递一个null给valueOf()将会返回null

例如：

```java
Integer i = null;
System.out.println(i.toString()); // 抛出NullPointerException异常
System.out.println(String.valueOf(i)); // 返回null 不会出现异常
```

##### **接口返回对象做非空判断，集合或数组可返回空集合或空数组，避免返回null**

<br>




















