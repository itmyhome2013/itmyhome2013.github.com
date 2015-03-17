---
layout: post
blog_id: "java-study-notes-passed-by-reference"
title: "Java学习笔记15--引用传递"
date: 2015-03-15 00:00:00 -0700
tags: Java
category: Java
summary: Java中分为值传递和引用传递。值传递：指的是在方法调用时,传递的参数是按值的拷贝传递。引用传递:传递的参数是按引用进行传递,其实传递的引用的地址,也就是变量所对应的内存空间的地址。
comments: false
---
</br>
####范例一

```java
class Demo{  
    public int temp = 30;  
}  
public class T {  
  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        Demo d1 = new Demo();  
        d1.temp = 50;  
        System.out.println("fun()方法调用之前："+d1.temp);  
        fun(d1);  
        System.out.println("fun()方法调用之后："+d1.temp);  
    }  
    public static void fun(Demo d2){  
        d2.temp = 1000;  
    }  
}
```

####<span style="color:red">内存分析</span>

![License Badge]({{ site.baseurl}}/images/java/15/1.png)

</br>
####范例二

```java
public class T {  
  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        String str1 = "hello";  
        System.out.println("fun()方法调用之前："+str1);  
        fun(str1);  
        System.out.println("fun()方法调用之前："+str1);  
    }  
    public static void fun(String s2){  
        s2 = "MLDN";  
    }
}
```

####<span style="color:red">内存分析</span>

![License Badge]({{ site.baseurl}}/images/java/15/2.png)

</br>
####范例三

```java
class Demo{  
    String temp = "hello";  
}  
public class T {  
  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        Demo d1 = new Demo();  
        d1.temp = "world";  
        System.out.println("fun()方法调用之前："+d1.temp);  
        fun(d1);  
        System.out.println("fun()方法调用之后："+d1.temp);  
    }  
    public static void fun(Demo d2){  
        d2.temp = "MLDN";  
    }  
}
```

####<span style="color:red">内存分析</span>

![License Badge]({{ site.baseurl}}/images/java/15/3.png)

本程序与范例一的流程完全是一样的，范例二是特殊的，因为<span style="color:red">String是一个特殊的类，其内容不可改变。</span>

</br>