---
layout: post
blog_id: "java-code-block"
title: "Java静态代码块、构造代码块、构造函数"
date: 2017-08-29 00:00:00 -0700
tags: Java
category: Java
summary: 所谓的代码块是指使用“{}”括起来的一段代码
comments: false
---

所谓的代码块是指使用“{}”括起来的一段代码，根据位置不同，代码块可以分为构造代码块、构造函数、静态代码块。

+ 静态代码块：用staitc声明，jvm加载类时执行，仅执行一次
+ 构造代码块：类中直接用 {} 定义，每一次创建对象时执行。
+ 构造函数：创建对象时执行

`执行顺序优先级：静态代码块 > 构造代码块 > 构造函数。`


#### 静态代码块

```java
static {
     System.out.println(" I am 静态代码块");
}
```

+ 静态代码块优先于主方法执行，而在类中定义的静态代码块会优先于构造块执行，而且不管有多少个对象产生，静态代码块只执行一次。
+ 静态代码块其实就是给类初始化的，而构造代码块时给对象初始化的。
+ 一个类中可以有多个静态代码块


#### 构造代码块

```java
{
     System.out.println(" I am 构造代码块");
}
```

+ 构造代码块的作用是给对象进行初始化。
+ 对象一建立就运行构造代码块，而且优先于构造函数执行
+ 构造代码块与构造函数的区别是：构造代码块是给所有对象进行统一初始化，而构造函数是给对应的对象初始化，因为构造函数是可以多个的，运行哪个构造函数就会建立什么样的对象，但无论建立哪个对象，都会先执行相同的构造代码块。也就是说，构造代码块中定义的是不同对象共性的初始化内容。


#### 构造函数

```java
public Test() {
	System.out.println(" I am 构造函数");
}
```

每创建一个对象时就会执行一次。同时构造函数是给特定对象进行初始化，而构造代码块是给所有对象进行初始化

#### 示例代码：

```java
class Test {
    
    {
        System.out.println(" I am 构造代码块");
    }
	
	static {
        System.out.println(" I am 静态代码块");
    }

    public Test() {
        System.out.println(" I am 构造函数");
    }
}


public class CodeBlock {
    /**
     * @itmyhome
     */
    public static void main(String[] args) {
        Test test1 = new Test();
        System.out.println("-------");
        Test test2 = new Test();
    }
}
```

输出结果：

```java
 I am 静态代码块
 I am 构造代码块
 I am 构造函数
-------
 I am 构造代码块
 I am 构造函数
```