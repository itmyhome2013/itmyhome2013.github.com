---
layout: post
blog_id: "java-instance-variables-and-class-variables"
title: "Java实例变量和类变量"
date: 2017-09-02 00:00:00 -0700
tags: Java
category: Java
summary: Java程序的变量大体可分为成员变量和局部变量
comments: false
---

Java程序的变量大体可分为成员变量和局部变量。其中局部变量可分为如下3类。

+ **形参**：在方法签名中定义的局部变量，由方法调用者负责为其赋值，随方法的结束而消亡。
+ **方法内的局部变量**：在方法内定义的局部变量，必须在方法内对其进行显示初始化。这种类型的局部变量从初始化完成后开始生效，随方法的结束而消亡。
+ **代码块的局部变量**：在代码块内定义的局部变量，必须在代码块内对其进行显式初始化，这种类型的局部变量从初始化完成后开始生效，随代码的结束而消亡。

局部变量的作用时间很短暂，它们都被存储在方法的`栈内存`中。类体内定义的变量被称为成员变量（英文是Field）。<span style="text-decoration: underline;">如果定义该成员变量时没有使用static修饰，该成员变量又被称为非静态变量或实例变量；如果使用了static修饰，则该成员变量又可被称为静态变量或类变量</span>

> 对于static关键字而言，从词义上来看，它是“静态”的意思。但从Java程序的角度来看，static的作用就是将实例成员变为类成员。static只能修饰在类里定义的成员部分，包括成员变量、方法、内部类、初始化块、内部枚举类。如果没有使用static修饰这里类里的成员，这里成员属于该类的实例；如果使用了static修饰，这些成员就属于类本身。从这个意义上看，static只能修饰类里的成员，不能修饰外部类，不能修改局部变量、局部内部类。

表明上看,Java类里定义成员变量时没有先后顺序,但实际上Java要求定义成员变量时必须采用合法的前后引用。示例如下

```java
public class ErrorDef {
	int num1 = num2 + 5; //Cannot reference a field before it is defined
	int num2 = 20;
}
```

上面程序中定义num1成员变量的初始值时，需要根据num2变量的值进行计数，这就是“非法前后引用”。<br>
类似地，两个类变量也不允许采用这样“非法前后引用”，示例如下。

```java
public class ErrorDef {
	static int num1 = num2 + 5; //Cannot reference a field before it is defined
	static int num2 = 20;
}
```

但如果一个是实例变量，一个是类变量，则实例变量总是可以引用类变量，示例如下

```java
public class RightDef {
	int num1 = num2 + 5;
	static int num2 = 20;
}
```

上面程序中num1是一个实例变量，而num2是一个类变量。虽然num2位于num1之后被定义，但nun1的初始值却可根据num2计算得到。这是因为，num2变量是一个类变量，num1是实例变量，而类变量的初始化时机总是处于实例变量的初始化时机之前。所以，虽然源代码中先定义了num1，再定义了num2，但num2的初始化时机总是位于num1之前，因此num1变量的初始化可根据num2的值计算得到

#### 实例变量和类变量的属性

使用static修饰的成员变量是类变量，属于该类本身；没有使用static修饰的成员变量是实例变量，属于该类的实例。在同一个JVM内，每个类只对应一个Class对象，但每个类可以创建多个Java对象。

由于同一个JVM内每个类只对应一个Class对象，因此同一个JVM内的一个类的类变量只需一块内存空间；但对于实例变量而言，该类每创建一次实例，就需要为实例变量分配一块内存空间。也就是说，程序中有几个实例，实例变量就需要几块内存空间。

下面程序可以很好地表现出来实例变量属于对象，而类变量属于类的特性。

```java

class Person {
    static int eyeNum;
    String name;
    int age;

    public void info() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}


public class FieldTest {
    public static void main(String[] args) {
        // 类变量属于该类本身，只要改类初始化完成，程序即可使用类变量
        Person.eyeNum = 2; // ①

        // 通过Person类访问 eyeNum类变量
        System.out.println("Person的eyeNum属性：" + Person.eyeNum);

        // 创建第一个Person对象
        Person p1 = new Person();
        p1.name = "zhangsan";
        p1.age = 22;

        System.out.println("通过p1变量访问eyeNum类变量：" + p1.eyeNum); // ②
        p1.info();

        // 创建第二个Person对象
        Person p2 = new Person();
        p2.name = "lisi";
        p2.age = 30;
        p2.info();

        // 通过p2修改Person类的eyeNum类变量
        p2.eyeNum = 4; // ③

        System.out.println("通过p1变量访问eyeNum类变量：" + p1.eyeNum);
        System.out.println("通过p2变量访问eyeNum类变量：" + p2.eyeNum);
        System.out.println("通过Person类访问eyeNum类变量：" + Person.eyeNum);
    }
}
```

上面程序中①行代码直接对Person类的eyeNum类变量赋值。这没任何问题，因为eyeNum类变量是属于Person类的，当Person类初始化完成后，eyeNum类变量也随之初始化完成。因此，程序即可对该类变量赋值，也可访问该类变量的值。

执行①行代码之后，程序的内存分配如图所示。

![License Badge]({{ site.baseurl}}/images/instance-variables/1.png)

一旦Person类初始化完成，程序即可通过Person类访问eyeNum类变量。除此之外，Java还允许通过Person类的任意实例来访问eyeNum类变量

虽然Java允许通过Person对象来访问Person类的eyeNum类变量，但由于Person对象本身并没有eyeNum类变量（只有实例变量才属于Person实例），因此程序通过Person对象来访问eyeNum类变量时，底层依然会转换为通过Person访问eyeNum类变量。也就是说，不管通过哪个Person对象来访问eyeNum类变量，都与通过Person类访问eyeNum类变量的效果完全相同。因此，在②行代码处通过p1来访问eyeNum变量将再次输出2.

执行完②行代码后，程序的内存分配如图

![License Badge]({{ site.baseurl}}/images/instance-variables/2.png)

从图中可以看出，当程序创建Person对象时，系统不再为eyeNum类变量分配内存空间，执行初始化，而只为Person对象
的实例变量执行初始化 -- 因为实例变量才属于Person实例，而类变量属于Person类本身。

当Person类初始化完成之后，类变量也随之初始化完成，以后不管程序创建多少个Person对象，系统不再为eyeNum类变量分配内存，但程序每创建一个Person对象，系统将再次为name、age实例变量分配内存，并执行初始化。

当程序执行完③行代码之后，内存中再次增加了一个Person对象。当程序通过p2对eyeNum类变量进行赋值时，实际上依然是对Person类的eyeNum类变量进行赋值。此时程序的内存分配如图所示。

![License Badge]({{ site.baseurl}}/images/instance-variables/3.png)

当Person类的eyeNum类变量被改变之后，程序通过p1、p2、Person类访问eyeNum类变量都将输出4。这是由于，不管通过哪个Person对象来访问eyeNum类变量，底层都将转换为通过Person来访问eyeNum类变量。由于p1和p2两个变量指向不同的Java对象，当通过它们访问实例变量时，程序将输出不同的结果。

#### 实例变量的初始化时机

对于实例变量而言，它属于Java对象本身，每次程序创建Java对象时都需要为实例变量分配内存空间，并执行初始化。<br>
从程序运行的角度来看，每次创建Java对象都会为实例变量分配内存空间，并对实例变量执行初始化。<br>
从语法角度来看，程序可以在3个地方对实例变量执行初始化：

+ 定义实例变量时指定初始值
+ 非静态初始化块中对实例变量指定初始值
+ 构造器中对实例变量指定初始值

其中第1、2种方式(定义时指定的初始值和非静态初始化块中指定的初始值)比第3种方式（构造器中指定初始值）更早执行，但第1、2中方式的执行顺序与他们在源程序中的排列顺序相同。

```java

class Cat {
    String name;
    int age;
    
    public Cat(String name, int age) {
        System.out.println("执行非静态初始化块");
        this.name = name;
        this.age = age;
    }
	
    {
        System.out.println("执行构造器");
        weight = 3.0;
    }

    double weight = 2.5;
	
    public String toString() {
        return "Name: " + name + ", Age: " + age + "Weight: " + weight;
    }
}


public class InitTst {
    public static void main(String[] args) {
        Cat cat1 = new Cat("tom", 3); // ①
        System.out.println(cat1);

        Cat cat2 = new Cat("jiafei", 2); // ②
        System.out.println(cat2);
    }
}
```

每当程序调用指定构造器来创建Java对象时，该构造器必然会获得执行的机会。除此之外，<span style="text-decoration: underline;">该类所包含的非静态初始化块将会获得执行的机会，而且总是在构造器执行之前获得执行。</span>

当程序执行①行代码创建第一个Cat对象的时候，程序将会先执行Cat类的非静态初始化块，再调用该Cat类的构造器来初始化该Cat实例。执行完①行代码后的内存分配如图所示。

![License Badge]({{ site.baseurl}}/images/instance-variables/4.png)

从图中可以看出，该Cat对象的weight实例变量的值为2.5，二不是初始化块中指定的。这是因为，初始化块中指定初始值，定义weight时指定初始值，都属于对该实例变量执行的初始化操作，他们的执行顺序与它们的顺序相同。在本程序中，初始化块中对weight的赋值位于定义weight语句之前，因此程序将先执行初始化块中的初始化操作，执行完成后weight实例变量的值为3.0，然后再执行定义weight时指定的初始值，执行完成后weight实例变量的值为2.5。 从这个意义上来看，初始化块中对weight所指定的初始化值每次都将被2.5所覆盖。

当执行②行代码再次创建一个Cat对象时，程序将再一次调用非静态初始化块、相应的构造器来初始化Cat对象。

执行完②行代码后，程序的内存分配如图所示。

![License Badge]({{ site.baseurl}}/images/instance-variables/5.png)

#### 类变量的初始化时机

实例变量属于Java类本身，只有当程序初始化该Java类时才会为该类的类变量分配内存空间，并执行初始化。<br>
从程序运行的角度来看，每JVM对一个Java类只初始化一次，因此Java程序每运行一次，系统只为类变量分配一次内存空间，执行一次初始化。<br>
从语法角度来看，程序可以在2个地方对类变量执行初始化：

+ 定义类变量时指定初始值
+ 静态初始化块中对类变量指定初始值。

这两种方式的执行顺序与它们在源程序中的排列顺序相同。

```java
public class StaticInitTest {
    // 定义count类变量，定义时指定初始值
    static int count = 2;

    // 通过静态初始化块为name类变量指定初始值
    static {
        System.out.println("StaticInitTest的静态初始化块");
        name = "hello";
    }

    // 定义name类变量时指定初始值
    static String name = "itmyhome";

    public static void main(String[] args) {
        System.out.println("count类变量的值" + StaticInitTest.count);
        System.out.println("name类变量的值" + StaticInitTest.name);
    }
}
```

静态初始化块中为类变量指定初始值，每次运行该程序，系统将会对StaticInitTest类执行初始化：先为所有类变量分配内存空间，再按源代码中的排序执行静态初始化块中所指定的初始值和定义类变量时所指定的初始值.

对于本例程序而已，静态初始化夸中对name变量的指定初始值位于定义name变量时指定初始值之前，因此系统先将name类变量赋值为“hello”，然后再将该name类变量赋值为“itmyhome”。每运行该程序一次，这个初始化过程只执行一次，因此运行上面程序将看到输出name类变量的值为“itmyhome”.

下面程序更清楚地表现了类变量的初始化过程。首先定义了Price类，该Price类里有一个静态的initPrice变量，用于代表初始价格。每次创建Price实例时，系统会以initPrice为基础，减去当前打折价格(由discount参数代表)即得到该Price的currentPrice变量值

```java

class Price {
    // 类成员是Price实例
    final static Price INSTANCE = new Price(2.8);

    // 再定义一个类变量
    static double initPrice = 20;

    // 定义该Price的currentPrice实例变量
    double currentPrice;

    public Price(double distinct) {
        // 根据静态变量计算实例变量
        currentPrice = initPrice - distinct;
    }
}


public class PriceTest {
    public static void main(String[] args) {
        // 通过Price的INSTANCE访问currentPrice实例变量
        System.out.println(Price.INSTANCE.currentPrice); // ①

        // 创建Price实例
        Price p = new Price(2.8);
        // 通过创建的Price实例访问currentPrice实例变量
        System.out.println(p.currentPrice); // ②
    }
}
```


上面程序中①、②行代码都访问Price实例的currentPrice实例变量，而且程序都是通过new Price(2.8)来创建Price实例的。表面上看，程序输出两个Price的currentPrice都应该返回17.2(由20减去2.8得到)，但实际上运行程序并没有输出两个17.2，而是输出-2.8和17.2

如果仅仅停留在代码表面来看这个问题，往往很难得到正确的结果，下面从内存角度来分析这个程序。第一次用到Price类时，程序开始对Price类进行初始化，初始化分成以下2个阶段。

+ (1)系统为Price的两个类变量分配内存空间。
+ (2)按初始化代码(定义时指定初始化值和初始化块中执行初始值)的排列顺序对类变量执行初始化。

初始化第一阶段，系统先为INSTANCE、initPrice两个类变量分配内存空间，此时INSTANCE、initPrice的默认值null和0.0。截止初始化进入第二个阶段，程序按顺序依次为INSTANCE、initPrice进行复制。对INSTANCE赋值时要调用Price(2.8)，创建Price实例，此时立即执行程序中③代码为currentPrice进行赋值，此时initPrice类变量的值为0，因此赋值的结果是currentPrice等于-2.8。接着，程序再次将initPrice赋为20，但此时对INSTANCE的currentPrice实例变量以及不起作用了。

当Price类初始化完成后，INSTANCE类变量引用到一个currentPrice为-2.8的Price实例，而initPrice类变量的值为20.0。当再次创建Price实例时，该Price实例的currentPrice实例变量的值才等于20.0

