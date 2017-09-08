---
layout: post
blog_id: "java-tostring-stringvalueof"
title: "String.ValueOf和toString区别"
date: 2017-09-07 00:00:00 -0700
tags: Java
category: Java
summary: 在Java开发中，我们经常用到将对象转换成String类型这一功能
comments: false
---

在Java开发中，我们经常用到将对象转换成String类型这一功能，常用的有如下三种方式

+ (String)[对象]
+ [对象].toString
+ String.valueOf([对象])

#### (String)

这是标准的类型转换，将对象强制转换为String类型，前提是`该对象必须能保证转成String类型`，否则将抛出ClassCastException异常

#### toString

API源码：

```java
/**
* This object (which is already a string!) is itself returned.
*
* @return  the string itself.
*/
public String toString() {
   return this;
}
```

此方法返回对象本身，在java.lang.Object类中也有toString()方法，所以Java对象都可以调用此方法，但使用的时候`必须保证要转换的对象不为null`，否则将抛出NullPointerException异常


#### String.valueOf()

API源码

```java
/**
* Returns the string representation of the <code>Object</code> argument.
*
* @param   obj   an <code>Object</code>.
* @return  if the argument is <code>null</code>, then a string equal to
*          <code>"null"</code>; otherwise, the value of
*          <code>obj.toString()</code> is returned.
* @see     java.lang.Object#toString()
*/
public static String valueOf(Object obj) {
   return (obj == null) ? "null" : obj.toString();
}
```

从上面源码可以看出，我们不用担心Object为null，但使用的时候也要小心，`当Object为null时，它的返回值是“null”，而不是null`，是有区别的。

#### 示例代码

```java
public class Test {
    public static void main(String[] args) {
        Object obj = new Object();
        String str = null;

        System.out.println((String) obj);        // ①
        System.out.println(str.toString());      // ②
        System.out.println(String.valueOf(str)); // ③
    }
}
```

①行代码使用(String)强制转换，由于是Object类型无法转换成String，所以报如下异常

```bath
Exception in thread "main" java.lang.ClassCastException: java.lang.Object cannot be cast to java.lang.String
	at com.becoda.bkms.bus.energyindex.web.Test.main(Test.java:11)
```

②行代码使用toString()方法，由于str为null，所以报如下异常

```bath
Exception in thread "main" java.lang.NullPointerException
	at com.becoda.bkms.bus.energyindex.web.Test.main(Test.java:12)
```

③行代码使用String.valueOf()方法，即使str为null，也不会报错，返回字符串null

