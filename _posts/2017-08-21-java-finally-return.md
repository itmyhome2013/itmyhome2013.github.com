---
layout: post
blog_id: "java-finally-return"
title: "关于Java中try finally return语句的执行顺序分析"
date: 2017-08-21 00:00:00 -0700
tags: Java
category: Java
summary: finally语句块一定会执行吗？
comments: false
---

### 问题分析

finally语句块一定会执行吗？<br>
可能很多人第一反应是肯定要执行的，但仔细一想，如果一定会执行的话 也就不会这么SB的问了。

#### Demo1

```java
public class Test {
	public static void main(String[] args) {
		System.out.println("return value of test(): " + test());
	}

	public static int test() {
		int i = 1;

		// if (i == 1) {
		// return 0;
		// }
		System.out.println("the previous statement of try block");
		i = i / 0;

		try {
			System.out.println("try block");

			return i;
		} finally {
			System.out.println("finally block");
		}
	}
}
```

Demo1的执行结果如下：

```bath
the previous statement of try block
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at com.becoda.bkms.bus.basics.web.Test2.test(Test2.java:15)
	at com.becoda.bkms.bus.basics.web.Test2.main(Test2.java:5)
```

另外，如果去掉上例中的注释，执行结果则是：

```java
return value of test(): 0
```

以上两种情况，finally语句块都没有执行，说明什么问题？只有与finally相对应的try语句块得到执行的情况下，finally语句块才会执行，而上面都是在try语句块之前返回(return)或者抛出异常，所以try对应的finally语句块没有执行。那么，即使与finally相对应的try语句块得到执行的情况下，finally语句块一定会执行吗？但下面例子

#### Demo2

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("return value of test(): " + test());
    }

    public static int test() {
        int i = 1;

        try {
            System.out.println("try block");
            System.exit(0);

            return i;
        } finally {
            System.out.println("finally block");
        }
    }
}
```

Demo2的执行结果如下：

```java
try block
```

finally语句块还是没有执行，为什么呢？因为我们在try语句块中执行了System.exit(0)语句，终止了Java虚拟机的运行，虽然一般情况下我们不会这么干。还有情况是当一个线程在执行try语句块或者catch语句块时被打断(interrupted)或者被终止(killed)，与其对应的finally语句块可能不会执行。还有更极端的情况，就是在线程运行 try 语句块或者 catch 语句块时，突然死机或者断电，finally 语句块肯定不会执行了。


### finally 语句示例说明

下面看一个简单的例子

#### Demo3

```java
public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("try block");

            return;
        } finally {
            System.out.println("finally block");
        }
    }
}
```

Demo3的执行结果为：

```java
try block
finally block
```

Demo3说明 finally 语句块在 try 语句块中的 return 语句之前执行。我们再来看另一个例子。

#### Demo4

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("reture value of test() : " + test());
    }

    public static int test() {
        int i = 1;

        try {
            System.out.println("try block");
            i = 1 / 0;

            return 1;
        } catch (Exception e) {
            System.out.println("exception block");

            return 2;
        } finally {
            System.out.println("finally block");
        }
    }
}
```

Demo4的执行结果为：

```java
try block
exception block
finally block
reture value of test() : 2
```

Demo4说明了 finally 语句块在 catch 语句块中的 return 语句之前执行。

从上面的Demo3和Demo4，我们可以看出，其实finally语句块时在try或者catch中的return语句之前执行的，更加一般的说法是，finally语句块应该是在控制转移语句之前执行，控制转移语句除了return外，还有break和continue。

再来看下面两个例子 

#### Demo5

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("return value of getValue(): " + getValue());
    }

    public static int getValue() {
        try {
            return 0;
        } finally {
            return 1;
        }
    }
}

```

Demo5的执行结果为：

```java
return value of getValue(): 1
```

#### Demo6

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("return value of getValue(): " + getValue());
    }

    public static int getValue() {
        int i = 1;

        try {
            return i;
        } finally {
            i++;
        }
    }
}
```

Demo6的执行结果为：

```java
return value of getValue(): 1
```

利用我们上面分析得出的结论：finally 语句块是在 try 或者 catch 中的 return 语句之前执行的。 由此，可以轻松的理解Demo5 的执行结果是 1。因为 finally 中的 return 1；语句要在 try 中的 return 0；语句之前执行，那么 finally 中的 return 1；语句执行后，把程序的控制权转交给了它的调用者 main（）函数，并且返回值为 1。那为什么Demo6 的返回值不是 2，而是 1 呢？按照Demo5 的分析逻辑，finally 中的 i++；语句应该在 try 中的 return i；之前执行啊？i 的初始值为 1，那么执行 i++；之后为 2，再执行 return i；那不就应该是 2 吗？怎么变成 1 了呢？

说明这个问题需要了解Java虚拟机是如何编译finally语句块的。

Java方法是在栈帧中执行，栈帧是线程私有栈的单位，执行方法的线程会为每一个方法分配一小块空间来作为该方法执行时的内存空间，栈帧分为三个区域：

+ 1、操作数栈，用来保存正在执行的表达式中的操作数
+ 2、局部变量区，用来保存方法中使用的变量，包括方法参数，方法内部声明的变量，以及方法中使用到的对象的成员变量或类的成员变量（静态变量），最后两种变量会复制到局部变量区，因此在多线程环境下，这种变量需要根据需要声明为volatile类型
+ 3、字节码指令区


例如下面这段代码

```java
try{
   return expression;
}finally{
   do some work;
}
```

首先我们知道，finally语句是一定会执行，但他们的执行顺序是怎么样的呢？他们的执行顺序如下：

+ 1、执行：expression，计算该表达式，结果保存在操作数栈顶；
+ 2、执行：操作数栈顶值（expression的结果）复制到局部变量区作为返回值；
+ 3、执行：finally语句块中的代码；
+ 4、执行：将第2步复制到局部变量区的返回值又复制回操作数栈顶；
+ 5、执行：return指令，返回操作数栈顶的值；

我们可以看到，在第一步执行完毕后，整个方法的返回值就已经确定了，由于还要执行finally代码块，因此程序会将返回值暂存在局部变量区，腾出操作数栈用来执行finally语句块中代码，等finally执行完毕，再将暂存的返回值又复制回操作数栈顶。所以无论finally语句块中执行了什么操作，都无法影响返回值，所以试图在finally语句块中修改返回值是徒劳的。因此，finally语句块设计出来的目的只是为了让方法执行一些重要的收尾工作，而不是用来计算返回值的。

这样就能解释Demo6的问题了

让我们再来看以下 3 个例子。

#### Demo7

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("return value of getValue(): " + getValue());
    }

    @SuppressWarnings("finally")
    public static int getValue() {
        int i = 1;

        try {
            i = 4;
        } finally {
            i++;

            return i;
        }
    }
}
```

Demo7的执行结果为：

```java
return value of getValue(): 5
```

#### Demo8

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("return value of getValue(): " + getValue());
    }

    public static int getValue() {
        int i = 1;

        try {
            i = 4;
        } finally {
            i++;
        }

        return i;
    }
}
```

Demo8的执行结果为：

```java
return value of getValue(): 5
```

#### Demo9

```java
public class Test {
    public static void main(String[] args) {
        System.out.println(test());
    }

    public static String test() {
        try {
            System.out.println("try block");

            return test1();
        } finally {
            System.out.println("finally block");
        }
    }

    public static String test1() {
        System.out.println("return statement");

        return "after return";
    }
}
```

Demo9的执行结果为：

```java
try block
return statement
finally block
after return
```

### 总结：

+ 1、finally 语句块不一定会被执行
+ 2、finally 语句块在 try 语句块中的 return 语句之前执行
+ 3、finally 语句块在 catch 语句块中的 return 语句之前执行
+ 4、finally 语句块中的 return 语句会覆盖 try 块中的 return 返回
+ 5、试图在 finally 语句块中修改返回值不一定会被改变
