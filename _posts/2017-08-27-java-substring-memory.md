---
layout: post
blog_id: "java-substring-memory"
title: "Java中substring内存泄露问题"
date: 2017-08-27 00:00:00 -0700
tags: Java
category: Java
summary: Java中的substring真的会引起内存泄露么？
comments: false
---

在Java中，String是最常用的数据类型，String有一个substring方法用来截取字符串，或许我们没注意到该方法可能会引起内存泄露问题(`出现于Java6中`)。

#### 方法介绍：

##### 在Java中提供了两个截取子字符串的方法：

```java
substring(int beginIndex)
substring(int beginIndex, int endIndex)
```

#### 问题重现：

```java
public class Test {
    private String largeString = new String(new byte[100000]);

    String getString() {
        return this.largeString.substring(0, 2);
    }

    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();

        for (int i = 0; i < 1000000; i++) {
            Test t = new Test();
            list.add(t.getString());
        }
    }
}
```

运行上面代码，如果使用Java6(Java7以上不会抛异常)运行一下就会报如下异常，说明没有足够的堆内存供我们创建对象

```java
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at java.lang.StringCoding$StringDecoder.decode(StringCoding.java:133)
	at java.lang.StringCoding.decode(StringCoding.java:173)
	at java.lang.StringCoding.decode(StringCoding.java:185)
```

于是有人会说，我们每个循环都创建一个Test对象，100万条数据存储到ArrayList中，这样必然会造成OOM，其实不然，看下面这段代码，只修改getString()方法

```java
public class Test {
    private String largeString = new String(new byte[100000]);

    String getString() {
        //return this.largeString.substring(0, 2);
        return new String("ab");
    }

    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();

        for (int i = 0; i < 1000000; i++) {
            Test t = new Test();
            list.add(t.getString());
        }
    }
}
```

执行上面的方法，并不会导致OOM异常，因为我们持有的时1000000个ab字符串对象，而Test对象（包括其中的largeString）会在java的垃圾回收中释放掉。所以这里不会存在内存溢出。

#### 那么究竟是什么导致的内存泄露呢？

##### 在 JDK 1.6 中 String.substring(int, int)的源码为：

```java
public String substring(int beginIndex, int endIndex) { 
     if (beginIndex < 0) { 
          throw new StringIndexOutOfBoundsException(beginIndex); 
     } 
     if (endIndex > count) { 
          throw new StringIndexOutOfBoundsException(endIndex); 
     } 
     if (beginIndex > endIndex) { 
          throw new StringIndexOutOfBoundsException(endIndex - beginIndex); 
     } 
     return ((beginIndex == 0) && (endIndex == count)) ? this : 
          new String(offset + beginIndex, endIndex - beginIndex, value); 
}
```

调用的 String 构造函数源码为：

```java
String(int offset, int count, char value[]) { 
  this.value = value; 
  this.offset = offset; 
  this.count = count; 
}
```

我们发现 String.substring()所返回的 String 仍然会保存原始 String，其实substring中生成的字符串与原字符串共享内容数组是一个很棒的设计，这样避免了每次进行substring重新进行字符数组复制。这种设计在很多时候可以很大程度的节省内存，因为这些 String 都复用了原始 String，只是通过 int 类型的 start, end 等值来标识每一个 String。而对于上面的案例，从一个巨大的 String 截取少数 String 为以后所用，这样的设计则造成大量冗余数据。

既然导致大量内存占用的根源是 String.substring()返回结果中包含大量原始 String，那么一个显而易见的减少内存浪费的的途径就是去除这些原始 String。办法有很多种，在此我们采取比较直观的一种，即再次调用 new String构造一个的仅包含截取出的字符串的 String

```java
String newString = new String(largeString.substring(0,2));
```

#### Java 7 实现

在Java 7 中substring的实现抛弃了之前的内容字符数组共享的机制，对于子字符串（自身除外）采用了数组复制实现单个字符串持有自己的应该拥有的内容。

```java
public String substring(int beginIndex, int endIndex) {
	if (beginIndex < 0) {
	    throw new StringIndexOutOfBoundsException(beginIndex);
	}
	if (endIndex > value.length) {
	    throw new StringIndexOutOfBoundsException(endIndex);
	}
	int subLen = endIndex - beginIndex;
	if (subLen < 0) {
	    throw new StringIndexOutOfBoundsException(subLen);
	}
	return ((beginIndex == 0) && (endIndex == value.length)) ? this
		: new String(value, beginIndex, subLen);
}
```

substring方法中调用的构造方法，进行内容字符数组复制。

```java
public String(char value[], int offset, int count) {
	if (offset < 0) {
	    throw new StringIndexOutOfBoundsException(offset);
	}
	if (count < 0) {
	    throw new StringIndexOutOfBoundsException(count);
	}
	// Note: offset or count might be near -1>>>1.
	if (offset > value.length - count) {
	    throw new StringIndexOutOfBoundsException(offset + count);
	}
	this.value = Arrays.copyOfRange(value, offset, offset+count);
}
```