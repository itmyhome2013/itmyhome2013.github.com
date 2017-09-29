---
layout: post
blog_id: "java-virtual-machine"
title: "Java虚拟机类加载机制"
date: 2017-09-28 00:00:00 -0700
tags: Java
category: Java
summary: 虚拟机把描述类的数据从Class文件加载到内存，并对数据进行校验、转换解析和初始化，<br>最终形成可以被虚拟机直接使用的Java类型，这就是虚拟机的类加载机制。
comments: false
---

#### 概述

虚拟机把描述类的数据从Class文件加载到内存，并对数据进行校验、转换解析和初始化，最终形成可以被虚拟机直接使用的Java类型，这就是虚拟机的类加载机制。

#### 类加载的时机

类从被加载到虚拟机内存中开始，到卸载出内存为止，它的整个生命周期包括：`加载`(Loading)、`验证`(Verification)、`准备`(Preparation)、`解析`(Resolution)、`初始化`(Initialization)、`使用`(Using)和`卸载`(Unloading)7个阶段。其中验证、准备、解析3个部分统称为连接(Linking),这7个阶段的发生顺序如图

![License Badge]({{ site.baseurl}}/images/virtual-machine/1.png)

加载、验证、准备、初始化和卸载这5个阶段的顺序是确定的，类的加载过程必须按照这种顺序按部就班的开始，而解析可以在初始化阶段之后再开始。

什么情况下需要开始类加载过程的第一个阶段：加载，Java虚拟机规范中并没有进行强制约束，这点可以交给虚拟机的具体实现来自由把握。但是对于初始化阶段，虚拟机规范则是严格规定了有且只有5中情况必须立即对类进行“初始化”(而加载、验证、准备自然需要在此之前开始)

+ 1、遇到new、 getstatic、 putstatic或invokestatic这4条字节码指令时，如果类没有进行过初始化，则需要先触发其初始化。 生成这4条指令的最常见的Java代码场景是：使用new关键字实例化对象的时候、 读取或设置一个类的静态字段（被final修饰、 已在编译期把结果放入常量池的静态字段除外）的时候，以及调用一个类的静态方法的时候。
+ 2、使用java.lang.reflect包的方法对类进行反射调用的时候，如果类没有进行过初始化，则需要先触发其初始化。
+ 3、当初始化一个类的时候，如果发现其父类还没有进行过初始化，则需要先触发其父类的初始化。
+ 4、当虚拟机启动时，用户需要指定一个要执行的主类（包含main（）方法的那个类），虚拟机会先初始化这个主类。
+ 5、当使用JDK 1.7的动态语言支持时，如果一个java.lang.invoke.MethodHandle实例最后的解析结果REF_getStatic、 REF_putStatic、 REF_invokeStatic的方法句柄，并且这个方法句柄所对应的类没有进行过初始化，则需要先触发其初始化。

对于这5种会触发类进行初始化的场景，虚拟机规范中使用了一个很强烈的限定语：“有且只有”，这5种场景中的行为称为对一个类进行主动引用。 除此之外，所有引用类的方式都不会触发初始化，称为被动引用。 下面举3个例子来说明何为被动引用，分别见代码清单1～代码清单3

**代码清单1 被动引用的例子之**

```java
/**
 *被动使用类字段演示一： 
 *通过子类引用父类的静态字段，不会导致子类初始化
 **/
class SuperClass {
    static {
        System.out.println("SuperClass init!");
    }

    public static int value = 123;
}

class SubClass extends SuperClass {
    static {
        System.out.println("SubClass init!");
    }
}

/**
 *非主动使用类字段演示
 **/
public class NotInitialization {
    public static void main(String[] args) {
        System.out.println(SubClass.value);
    }
}
```

上述代码运行之后，只会输出“SuperClass init！”,而不会输出“SubClass init！”. 对于静态字段,只有直接定义这个字段的类才会被初始化，因此通过其子类来引用父类中定义的静态字段，只会触发父类的初始化而不会触发子类的初始化。

如果在SubClass类中也添加

```java
public static int value = 456;
```

则会输出“SuperClass init!”和“SuperClass init!”


**代码清单2 被动引用的例子之二**

```java
/**
 *被动使用类字段演示二： 
 *通过定义对象数组，不会导致类初始化
 **/
class SuperClass {
    static {
        System.out.println("SuperClass init!");
    }

    public static int value = 123;
}

class SubClass extends SuperClass {
    static {
        System.out.println("SubClass init!");
    }
}

/**
 *非主动使用类字段演示
 **/
public class NotInitialization {
    public static void main(String[] args) {
        SuperClass[] sca = new SuperClass[10];
    }
}
```

运行上面代码发现并没有任何输出，说明并没有触发类SuperClass的初始化阶段

**代码清单3 被动引用的例子之三**

```java
/**
 *被动使用类字段演示三： 常量在编译阶段会存入调用类的常量池中， 
 *本质上并没有直接引用到定义常量的类，因此不会触发定义常量的类的初始化。
 **/
class ConstClass {
    static {
        System.out.println("ConstClass init!");
    }

    public static final String HELLOWORLD = "hello world";
}

/**
 *非主动使用类字段演示
 **/
public class NotInitialization {
    public static void main(String[] args) {
        System.out.println(ConstClass.HELLOWORLD);
    }
}
```

上述代码运行之后，也没有输出“ConstClass init！”，这是因为虽然在Java源码中引用了ConstClass类中的常量HELLOWORLD，但其实在编译阶段通过常量传播优化，已经将此常量的值“hello world”存储到了NotInitialization类的常量池中，以后NotInitialization对常量ConstClass.HELLOWORLD的引用实际都被转化为NotInitialization类对自身常量池的引用了。也就是说，实际上NotInitialization的Class文件之中并没有ConstClass类的符号引用入口，这两个类在编译成Class之后就不存在任何联系了。

### 类加载过程

Java虚拟机中类加载的全过程，包括<span style="text-decoration: underline;">加载、 验证、 准备、 解析和初始化</span>这5个阶段所执行的具体动作。

#### 加载

在加载阶段，虚拟机需要完成以下3件事情：

+ 1、通过一个类的全限定名来获取定义此类的二进制字节流。
+ 2、将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构。
+ 3、在内存中生成一个代表这个类的java.lang.Class对象，作为方法区这个类的各种数据的访问入口。

加载阶段与连接阶段的部分内容（如一部分字节码文件格式验证动作）是交叉进行的，加载阶段尚未完成，连接阶段可能已经开始，但这些夹在加载阶段之中进行的动作，仍然属于连接阶段的内容，这两个阶段的开始时间仍然保持着固定的先后顺序。

#### 验证

验证是连接阶段的第一步，这一阶段的目的是为了确保Class文件的字节流中包含的信息符合当前虚拟机的要求，并且不会危害虚拟机自身的安全。
验证阶段大致会完成下面4个阶段的检验动作：

+ 1、文件格式验证：验证字节流是否符合Class文件格式的规范，并且能被当前版本的虚拟机出来。
+ 2、元数据验证：对字节码描述的信息进行语义分析，以保证其描述的信息符合Java语言规范的要求。
+ 3、字节码验证：主要目的是通过数据流和控制流分析，确定程序语义是合法的、符合逻辑的。
+ 4、符号引用验证：目的是确保解析动作能正常执行。

对于虚拟机的类加载机制来说，验证阶段是一个非常重要的、 但不是一定必要（因为对程序运行期没有影响）的阶段。 如果所运行的全部代码（包括自己编写的及第三方包中的代码）都已经被反复使用和验证过，那么在实施阶段就可以考虑使用-Xverify：none参数来关闭大部分的类验证措施，以缩短虚拟机类加载的时间。

#### 准备

准备阶段是正式为类变量分配内存并设置类变量初始值的阶段，这些变量所使用的内存都将在方法区中进行分配。 这个阶段中有两个容易产生混淆的概念需要强调一下，首先，<span style="text-decoration: underline;">这时候进行内存分配的仅包括类变量（被static修饰的变量），而不包括实例变量，实例变量将会在对象实例化时随着对象一起分配在Java堆中</span>。 其次，这里所说的初始值“通常情况”下是数据类型的零值，假设一个类变量的定义为

```java
public static int value=123;
```

那变量value在准备阶段过后的初始值为0而不是123，因为这时候尚未开始执行任何Java方法，而把value赋值为123的putstatic指令是程序被编译后，存放于类构造器＜clinit＞（）方法之中，所以把value赋值为123的动作将在初始化阶段才会执行。 

#### 解析

解析阶段是虚拟机将常量池内的符号引用替换为直接引用的过程。解析动作主要针对类或接口、字段、类方法、接口方法、方法类型、方法句柄和调用点限定符7类符号引用进行。

如果有一个同名字段同时出现在C的接口和父类中，或者同时在自己或父类的多个接口中出现，那编译器将可能拒绝编译。 在代码清单4中，如果注释了Sub类中的“public static int A=4；”，接口与父类同时存在字段A，那编译器将提示“The field Sub.A is ambiguous”，并且拒绝编译这段代码。

**代码清单4 字段解析**

```java
public class FieldResolution {

    interface Interface0 {
        int A = 0;
    }

    interface Interface1 extends Interface0 {
        int A = 1;
    }

    interface Interface2 {
        int A = 2;
    }

    static class Parent implements Interface1 {
        public static int A = 3;
    }

    static class Sub extends Parent implements Interface2 {
        public static int A = 4;
    }
	
	public static void main(String[] args) {
        System.out.println(Sub.A);
    }
}
```

#### 初始化

类初始化阶段是类加载过程的最后一步，前面的类加载过程中，除了在加载阶段用户应用程序可以通过自定义类加载器参与之外，其余动作完全由虚拟机主导和控制。 到了初始化阶段,才真正开始执行类中定义的Java程序代码(或者说是字节码)

在准备阶段，变量已经赋过一次系统要求的初始值，而在初始化阶段，则根据程序员通过程序制定的主观计划去初始化类变量和其他资源，或者可以从另外一个角度来表达：初始化阶段是执行类构造器 ＜clinit＞( )方法的过程。 

<span style="text-decoration: underline;">＜clinit＞( )方法是由编译器自动收集类中的所有类变量的赋值动作和静态语句块（static{ }块）中的语句合并产生的，编译器收集的顺序是由语句在源文件中出现的顺序所决定的，静态语句块中只能访问到定义在静态语句块之前的变量，定义在它之后的变量，在前面的静态语句块可以赋值，但是不能访问</span>，如代码清单5中的例子所示。

**代码清单5 非法向前引用变量**

```java
public class Test {
    static {
        i = 0; // 给变量赋值可以正常编译通过
        System.out.print(i); // 这句编译器会提示"非法向前引用"
    }

    static int i = 1;
}
```

＜clinit＞( )方法与类的构造函数（或者说实例构造器＜init＞( )方法）不同，它不需要显式地调用父类构造器，虚拟机会保证在子类的＜clinit＞( )方法执行之前，父类的＜clinit＞( )方法已经执行完毕。 因此在虚拟机中第一个被执行的＜clinit＞( )方法的类肯定是java.lang.Object。

由于父类的＜clinit＞( )方法先执行，也就意味着父类中定义的静态语句块要优先于子类的变量赋值操作，如在代码清单6中，字段B的值将会是2而不是1。

**代码清单6＜clinit＞( )方法执行顺序**

```java
class Parent {
    public static int A = 1;

    static {
        A = 2;
    }
}

class Sub extends Parent {
    public static int B = A;
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Sub.B);
    }
}
```

＜clinit＞( )方法对于类或接口来说并不是必需的，如果一个类中没有静态语句块，也没有对变量的赋值操作，那么编译器可以不为这个类生成＜clinit＞( )方法。接口中不能使用静态语句块，但仍然有变量初始化的赋值操作，因此接口与类一样都会生成＜clinit＞( )方法。 但接口与类不同的是，执行接口的＜clinit＞( )方法不需要先执行父接口的＜clinit＞( )方法。 只有当父接口中定义的变量使用时，父接口才会初始化。 另外，接口的实现类在初始化时也一样不会执行接口的＜clinit＞( )方法。

<hr>

参考文献：深入理解Java虚拟机 周志明 著