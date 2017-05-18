---
layout: post
blog_id: "int-integer-difference"
title: "Java中int和Integer的区别"
date: 2016-12-02 00:00:00 -0700
tags: Java
category: Java
summary: Java中int和Integer的区别从大的方面来说就是 int是基本数据类型 Integer是包装类
comments: false
---
<br>

Java中 int和Integer的区别从大的方面来说就是 **int是基本数据类型 Integer是包装类**
更深入一步说明两者的区别，看下面代码

```java
int i1 = 127;
Integer i2 = 127;
Integer i3 = new Integer(127);
Integer i4 = 127;
System.out.println(i1 == i2); // ① true
System.out.println(i1 == i3); // ② true
System.out.println(i2 == i4); // ③ true

Integer i5 = 128;
Integer i6 = 128;
System.out.println(i5 == i6);// ④ false


Integer i7 = new Integer(127);
System.out.println(i4 == i7); // ⑤ false

Integer i8 = new Integer(128);
Integer i9 = new Integer(121);
System.out.println(i8 == i9); // ⑥ false
```

①②③结果都为true,因为int会自动装箱为Integer(jdk1.5以上)

而④却为false，③和④只是数字127和128的区别，为什么④为false呢

因为Java在编译Integer i5 = 128的时候,被翻译成 Integer i5 = Integer.valueOf(128);让我们看看这个valueOf()方法，

JDK源码的valueOf方法这样的：

```java
public static Integer valueOf(int i) {
   if(i >= -128 && i <= IntegerCache.high)
       return IntegerCache.cache[i + 128];
   else
       return new Integer(i);
}
```

对于-128到127之间的数，会进行缓存，Integer i2 = 127时，会将127进行缓存，下次再写Integer i4 = 127时，

就会直接从缓存中取，就不会new了。所以③的结果为true,而④为false。

而⑤⑥两个都不是同一个对象 所以都是false。


