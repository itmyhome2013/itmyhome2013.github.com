---
layout: post
blog_id: "java-study-notes-exception"
title: "Java学习笔记16--异常"
date: 2015-03-16 00:00:00 -0700
tags: Java
category: Java
summary: 异常是导致程序中断运行的一种指令流,如果不对异常进行正确的处理,则可能导致程序的中断执行,造成不必要的损失.
comments: false
---
<br>

#### 异常

异常是导致程序中断运行的一种指令流，如果不对异常进行正确的处理，则可能导致程序的中断执行，造成不必要的损失，所以在程序的设计中必须要考虑各种异常的发生，并正确的做好相应的处理，这样才能保证程序正常的执行。

#### 异常类的继承结构

在整个java的异常结构中，实际上有以下两个最常用的类：Exception、Error，这两个类全都是Throwable的子类
Exception：一般表示的是程序中出现的问题，可以直接使用try...catch处理。
Error：一般指的是JVM错误，程序中无法处理。

![License Badge]({{ site.baseurl}}/images/java/16/1.png)

#### 自定义异常类

只需要继承Exception就可以完成自定义异常类。因为在java中提供的都是标准的异常类（包括一些异常信息等等）
如果需要定义自己想要的异常信息的时候就可以自定义异常类。

```java
package com.itmyhome;  
  
import java.util.Scanner;  
  
class MyException extends Exception { // 自定义异常类  
      
    public MyException(String name) {  
        super(name);                  // 调用父类构造  
    }  
}  
  
public class T3 {  
  
    /** 
     * @param args 
     */  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        Scanner scan = new Scanner(System.in);  
        System.out.print("请输入除数：");  
        int i = scan.nextInt();  
        System.out.print("请输入被除数：");  
        int j = scan.nextInt();  
        try {  
            if (j == 0) {  
                throw new MyException("被除数不能为0"); // 抛出自定义异常  
            } else {  
                System.out.println(i / j);  
            }  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
  
        }  
    }  
}
```

#### **几个常见的面试题：**

##### **1、try {}里有一个return语句,那么紧跟在这个try后的finally{}里的code会不会被执行,什么时候被执行,在return前还是后?**

会执行，在return之前。

下面看两个例子

```java
public class T {  
  
    public static void main(String[] args) {  
        System.out.println(new T().test());  
    }  
    static int test() {  
        int x = 1;  
        try {  
            return x;  
        } finally {  
            ++x;  
        }  
    }  
}
```

输出结果返回1

```java
public class T {  
  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        System.out.println(test());  
    }  
    public static int test(){  
        try{  
            return 1;  
        }finally{  
            return 2;  
        }  
    }  
}
```

输出结果返回2

try中的return语句调用的函数先于finally中调用的函数执行，也就是说return语句先执行，finally语句后执行，所以，返回结果为2.
<span style="color:red">return并不是让函数马上返回,而是return语句执行后,将把返回结果放置进函数栈中,此时函数并不是马上返回,要要执行</span>
<span style="color:red">finally语句后才真正开始返回。</span>

##### **2、final，finally，finalize的区别**

final用于声明属性，方法和类，分别表示属性不可变，方法不可覆盖，类不可继承。
finally是异常处理语句结构的一部分，表示总是执行。
finalize是Object类的一个方法，在垃圾收集器执行的时候会调用被回收对象的此方法，可以覆盖此方法提供垃圾收集时的其他资源回收,例如关闭文件等。JVM不保证此方法总被调用。

##### **3、运行时异常与一般异常有何异同？**

异常表示程序运行过程中可能出现的非正常状态，运行时异常表示虚拟机的通常操作中可能遇到的异常，是一种常见运行错误。java编译器要求方法必须声明抛出可能发生的非运行时异常，但是并不要求必须声明抛出未被捕获的运行时异常。

##### **4、error和exception有什么区别？**

error表示恢复不是不可能但很困难的情况下的一种严重问题。比如内存溢出，不可能指望程序能出来这样的情况。
exception表示一种设计或实现问题。
也就是说，它表示如果程序运行正常，从不会发生的情况。
 
##### **5、写出最常见的5个runtime exception**

ClassCastException，IndexOutOfBoundsException，NullPointerException，ArithmeticException，IllegalArgumentException

##### **6、Java中的异常处理机制的简单原理和应用**

异常时指java程序运行时（非编译）所发生的非正常情况或错误，java使用面向对象的方式来处理异常，它把程序中发生的每个异常也都分别封装到一个对象来表示的，该对象中包含有异常的信息。

java对异常进行了分类，不同类型的异常分别用不同的java类表示，所有异常的根类为java.lang.Throwable，Throwable下面又派生了两个子类Error和Exception，Error表示应用程序本身无法克服和恢复的一种严重问题，例如，内存溢出和线程死锁等系统问题。Exception表示程序还能够克服和恢复的问题，其中又分为系统异常和普通异常，系统异常是软件本身缺陷所导致的问题，也就是软件开发人员考虑不周所导致的问题软件使用者无法克服和恢复这种问题，但在这种问题下还可以让软件系统继续运行或者让软件死掉，例如数组越界(ArrayIndexOfOutOfBoundsException)空指针异常(NullPointerException)

类转换异常(ClassCastException)普通异常是运行环境的编号或异常所导致的问题，是用户能够克服的问题例如，网络断线，磁盘空间不足，发生这样的异常后，程序不应该死掉。

java为系统异常和普通异常提供了不同的解决方案,编译器强制普通异常必须try...catch处理货用throws声明继续抛给上层调用方法处理，所以普通异常也被称为checked异常，二系统异常可以处理也可以不处理，所以，编译器不强制用try...catch处理或用throws声明，所以系统异常也被称为unchecked异常。