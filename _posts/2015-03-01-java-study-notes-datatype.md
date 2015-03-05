---
layout: post
blog_id: "java-study-notes-datatype"
title: "Java学习笔记01--数据类型"
date: 2015-03-01 00:00:00 -0700
tags: Java
category: Java
summary: Java中主要有8中基本数据类型，分别是byte,short,int,long,char,boolean,float,double
comments: false
---
</br>
###Java数据类型划分

![License Badge]({{ site.baseurl}}/images/java/01/1.jpg)

分为两大类型：

+ 基本数据类型：类似于普通的值。

+ 引用数据类型：传递的是内存的地址。

浮点类型实际上就是表示小数。

</br>
###Java基本数据类型

![License Badge]({{ site.baseurl}}/images/java/01/2.png)

</br>
###数据的溢出

当整数的数据大小超出了可以表示的范围，而程序中又没有做数值范围的检查时，这个整型变量所输出的值将发生絮乱，

且不是预期的运行结果。例如：求出整型的最大值

```java
public class T {  
    public static void main(String[] args) {  
        int max = Integer.MAX_VALUE;  
        System.out.println("整型的最大值为："+max); //整型的最大值为：2147483647  
    }  
} 
```

现在对求的最大值进行加法操作

```java
public class T {  
    public static void main(String[] args) {  
        int max = Integer.MAX_VALUE;  
        System.out.println("整型的最大值为："+max);       //整型的最大值为：2147483647  
        System.out.println("整型的最大值+1: "+(max+1));  //整型的最大值+1: -2147483648  
        System.out.println("整型的最大值+2: "+(max+2));  //整型的最大值+2: -2147483647  
    }  
} 
```

如果现在要想避免数据的溢出，可以采用扩大数据类型的方式。int-->long

```java
public class T {  
	public static void main(String[] args) {  
		int max = Integer.MAX_VALUE;  
		System.out.println("整型的最大值为："+max);       //整型的最大值为：2147483647  
		System.out.println("整型的最大值+1: "+(max+1));  //整型的最大值+1: -2147483648  
		System.out.println("整型的最大值+2: "+(max+2));  //整型的最大值+2: -2147483647  
		System.out.println("整型的最大值+2: "+((long)max+2));  //2147483649  
	}  
}  
```

</br>
###字符类型

字符类型在内存中占有2个字节，可以用来保存英文字母等字符。计算机处理字符类型时，是把这些字符当成不同的整数来看待，

因此，严格说来，字符类型也算是整数类型的一种。

```java
public class T {  
	public static void main(String[] args) {  
		char ch1 = 'a';     //字符是使用''括起来的数据  
		char ch2 = 97;      //通过数字定义字符变量  
		System.out.println("ch1 = "+ch1);  
		System.out.println("ch2 = "+ch2);  
	}  
}  
```

</br>
###常用的转义字符

![License Badge]({{ site.baseurl}}/images/java/01/3.png)

</br>
###浮点数类型与双精度浮点数类型

在日常生活中经常会使用到小数类型的数值，如身高，体重等需要精确的数值时，整数就不能满足程序设计者的要求了。

在数学中，这些带有小数点的数值称为实数，在java中，这种数据类型称为浮点数类型(floag)，其长度为32个字节，

有效范围为-3.4E1038到3.4E1038。当浮点数的表示范围不够大的时候还有一种双精度(double)浮点数可供使用。

双精度浮点数类型的长度为64个字节，有效范围为-1.7E10308到1.7E10308

在java 中一个数字或者一个小数实际上也都是存在默认类型的：

+ 小数(1.1，1.2)的默认类型是double类型

+ 整数(1，2，3)的默认类型是int类型

</br>
###布尔类型

布尔(boolean)类型的变量，只有 **true(真)** 和 **false(假)** 两种

</br>
###基本数据类型的默认值

![License Badge]({{ site.baseurl}}/images/java/01/4.png)

</br>