---
layout: post
blog_id: "java-final"
title: "Java之final修饰符"
date: 2017-09-03 00:00:00 -0700
tags: Java
category: Java
summary: final可以修饰变量、可以修饰方法、可以修饰类
comments: false
---

final修饰符是Java语言中比较常见的一个修饰符，我们经常用的String类就是一个final类。
final的用法主要有以下几种：

+ final可以修饰变量，被final修饰的变量被赋初始值之后，不能对它重新赋值。
+ final可以修饰方法，被final修饰的方法不能被重写。
+ final可以修饰类，被final修饰的类不能派生子类。

#### final修饰的变量

被final修饰的实例变量必须显式指定初始值，而且只能在如下3个位置指定初始值。

+ 定义final实例变量时指定初始值
+ 在非静态初始化块中为final实例变量指定初始值
+ 在构造器中为final实例变量指定初始值

**对于普通实例变量**，Java程序可以对它执行默认的初始化，也就是将实例变量的值指定为默认的初始值0或null，但对于final实例变量，则必须显式指定初始值。

```java
public class Test {
    // 定义final实例变量时指定初始值
    final String var1 = "hello";
    final String var2;
    final String var3;

    // 在初始化块中为var2赋值
    {
        var2 = "itmyhome";
    }

    // 在构造器中为var3赋值
    public Test() {
        this.var3 = "hi";
    }

    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.var1);
        System.out.println(t.var2);
        System.out.println(t.var3);
    }
}
```

上面程序中定义了3个final实例变量var1、var2和var3,分别为在定义var1时为其赋初始值，在初始化块中为var2指定初始值，在构造器中为var3指定初始值。

**对于final类变量而言**，同样必须显式指定初始值，而且final类变量只能在2个地方指定初始值

+ 定义final类变量时指定初始值
+ 在静态初始化块中为final类变量指定初始值

```java
public class Test {
    // 定义final类变量时赋初始值
    final static String var1 = "hello";
    final static String var2;

    // 在静态初始化块中赋值
    static {
        var2 = "itmyhome";
    }

    public static void main(String[] args) {
        Test t = new Test();
    }
}
```

上面程序中定义了2个final类变量var1和var2，在定义var1时为其赋初始值，在静态初始化块中为var2指定初始值。

#### 执行“宏替换”的变量

对一个final变量，不管它是类变量、实例变量，还是局部变量，只要定义该变量时使用了final修饰符修饰，并在定义该final类变量时指定了初始值，而且该初始值可以在编译时就被确定下来，那么这个final变量本质上已经不再是变量，而是相当于一个直接量。

final修饰符的一个重要用途就是定义“宏变量”，当定义final变量时就为该变量指定了初始值，而且该初始值可以在编译时就确定下来，那这个final变量本质上就是一个“宏变量”，编译器会把程序中所有用到该变量的地方直接替换成该变量的值。

```java
public class Test {
    public static void main(String[] args) {
        String str1 = "itmyhome";
        String str2 = "it" + "myhome";
        System.out.println(str1 == str2); // true

        String s1 = "it";
        String s2 = "myhome";
        String str3 = s1 + s2;
        System.out.println(str1 == str3); // false
    }
}
```

上面程序中分别判断str1和str2是否相等，以及str1和str3是否相等。str1是一个普通的字符串直接量“itmyhome”，str2的值是两个字符串直接量进行拼接运算，由于编译器可以在编译阶段就确定str2的值为“itmyhome”，所以系统会让str2直接指向字符串池中缓存中的“itmyhome”字符串。由此可见，str1==str2将输出true。

对于str3而已，它的值由s1和s2进行连接运算后得到。由于s1、s2只是两个普通变量，编译器不会执行“宏替换”，因此编译器无法在编译时确定str3的值，不会让str3指向字符串池中缓存中的“itmyhome”，由此可见，str1==str3将输出false。

为了让str1==str3输出true也很简单，只要编译器可以对s1、s2两个变量进行“宏替换”。这样编译器即可在编译阶段就确定str3的值，程序改为如下形式

```java
public class Test {
    public static void main(String[] args) {
        String str1 = "itmyhome";
        String str2 = "it" + "myhome";
        System.out.println(str1 == str2); // true

        final String s1 = "it";
        final String s2 = "myhome";
        String str3 = s1 + s2;
        System.out.println(str1 == str3); // true
    }
}
```

**对于实例变量而言**，除了可以在定义该变量时赋初始值之外，还可以在非静态初始化块、构造器中对它赋初始值，而且在这3个地方指定初始值的效果基本一样。但对于final实例变量而言，只有在定义该变量时指定初始值才会有“宏变量”的效果，在非静态初始化块、构造器中为final实例变量指定初始值则不会有这种效果，示例如下：

```java

public class Test {
    // 定义3个final实例变量
    final String str1;
    final String str2;
    final String str3 = "Java";
	
    // str1、str2分别在非静态初始化块、构造器中初始化
    {
        str1 = "Java";
    }

    public Test() {
        str2 = "Java";
    }

    public void print() {
        System.out.println((str1 + str1) == "JavaJava"); // false
        System.out.println((str2 + str2) == "JavaJava"); // false
        System.out.println((str3 + str3) == "JavaJava"); // true
    }

    public static void main(String[] args) {
        Test t = new Test();
        t.print();
    }
}
```

上面程序中定义了3个final实例变量，但只有str3在定义该变量时指定了初始值，另外的str1、str2分别在非静态初始化块、构造器中指定初始值，因此系统不会对str1、str2执行“宏替换”，但会对str3执行“宏替换”。

于此类似的是，对于普通类变量，在定义时指定初始值、在静态初始化块中赋初始值的效果基本一样。但对于final类变量而已，只有在定义final类变量时指定初始值，系统才会对该final类变量执行“宏替换”

```java
public class Test {
    // 定义两个final类变量
    static final String str1;
    static final String str2 = "Java";

    // str1在静态初始化块中初始化
    static {
        str1 = "Java";
    }

    public static void main(String[] args) {
        System.out.println((str1 + str1) == "JavaJava"); // false
        System.out.println((str2 + str2) == "JavaJava"); // true
    }
}
```

上面程序中定义了2个final类变量，但只有str2在定义该变量时指定了初始值，str1则在静态初始化块中指定初始值，因此系统不会对str1执行“宏替换”，但会对str2执行“宏替换”



