---
layout: post
blog_id: "java-study-notes-operator-expression"
title: "Java学习笔记02--运算符、表达式"
date: 2015-03-02 00:00:00 -0700
tags: Java
category: Java
summary: 赋值运算符号、一元运算符、算术运算符、关系运算符、递增与递减运算符、逻辑运算符、位运算符
comments: false
---
<br>

#### 赋值运算符号

![License Badge]({{ site.baseurl}}/images/java/02/1.png)

#### 一元运算符

![License Badge]({{ site.baseurl}}/images/java/02/2.png)

#### 算术运算符

![License Badge]({{ site.baseurl}}/images/java/02/3.png)

#### 关系运算符

![License Badge]({{ site.baseurl}}/images/java/02/4.png)

#### 递增与递减运算符

![License Badge]({{ site.baseurl}}/images/java/02/5.png)

```java
public class T {  
	public static void main(String[] args) {  
		int a = 3 , b = 3 ; // 定义两个变量a和b  
		int x = 6, y = 6 ;  // 定义两个变量x和y  
		System.out.println("a = " + a) ;  
		System.out.println("\t a++ = " + (a++) + " ， a = " + a) ;   // 先计算后自增  
		System.out.println("b = " + b) ;  
		System.out.println("\t ++b = " + (++b) + " ， b = " + b) ;   // 先自增后计算  
		System.out.println("x = " + x) ;  
		System.out.println("\t x-- = " + (x--) + " ， x = " + x) ;   // 先计算后自减  
		System.out.println("y = " + y) ;  
		System.out.println("\t --y = " + (--y) + " ， y = " + y) ;   // 先自减后计算  
  
	}  
}
```

运算结果

```diff
a = 3  
	 a++ = 3 ， a = 4  
b = 3  
	 ++b = 4 ， b = 4  
x = 6  
	 x-- = 6 ， x = 5  
y = 6  
	 --y = 5 ， y = 5 
```

#### 逻辑运算符

![License Badge]({{ site.baseurl}}/images/java/02/6.png)

不管是短路还是非短路，其基本的操作结果都是一样的。

![License Badge]({{ site.baseurl}}/images/java/02/7.png)

现有如下的错误代码：

```java
public class T {  
    public static void main(String[] args) {  
        int i = 10/0;  
        System.out.println(i);  
    }  
} 
```

以上的代码只要一运行就会出现问题。

```java
public class T {  
    public static void main(String[] args) {  
        if(10!=10&10/0==0){  
            System.out.println("条件满足");  
        }  
    }  
}
```

短路与

```java
public class T {  
    public static void main(String[] args) {  
        if(10!=10&&10/0==0){  
            System.out.println("条件满足");  
        }  
    }  
} 
```

只要第一个条件满足，之后的程序代码都不在执行了。

#### 位运算符

![License Badge]({{ site.baseurl}}/images/java/02/8.png)

位运算符的结果表

![License Badge]({{ site.baseurl}}/images/java/02/9.png)

```java
public class T {  
	public static void main(String[] args) {  
		int x = 3 ;     // 3的二进制数据： 00000000 00000000 00000000 00000011  
		int y = 6 ;     // 6的二进制数据： 00000000 00000000 00000000 00000110  
		System.out.println(x & y) ; //与：    00000000 00000000 00000000 00000010  
		System.out.println(x | y) ; //或：    00000000 00000000 00000000 00000111  
		System.out.println(x ^ y) ; //或：    00000000 00000000 00000000 00000101  
	}  
}
```
	