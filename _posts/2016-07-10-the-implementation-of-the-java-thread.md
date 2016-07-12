---
layout: post
blog_id: "the-implementation-of-the-java-thread"
title: "Java中线程的实现"
date: 2016-07-10 00:00:00 -0700
tags: Java
category: Java
summary: 在Java中要想实现多线程代码有两种方法，一种是继承 Thread 类，另一种就是实现 Runnable 接口
comments: false
---
<br>

在Java中要想实现多线程代码有两种方法，一种是*继承 Thread 类*，另一种就是*实现 Runnable 接口*

#### 一、继承 Thread 类

Thread 类是在 java.lang 包中定义的，一个类只要继承了 Thread 类，此类就称为多线程操作类。

在 Thread 子类中，必须明确地覆写 Thread 类中的  run() 方法，此方法为线程的主体

例子：继承Thread类实现多线程

```java
class MyThread extends Thread {  //继承Thread类
	private String name;

	public MyThread(String name) {
		this.name = name;
	}

	public void run() {   //覆写Thread类中的run 方法
		for(int i=0;i<5;i++){
			System.out.println(name + " 运行：i = " + i);
		}
	}
}

public class ThreadDemo {

	public static void main(String[] args) {
		MyThread mt1 = new MyThread("线程A");
		MyThread mt2 = new MyThread("线程B");
		mt1.run();
		mt2.run();
	}

}
```

程序运行结果

```bath
线程A 运行：i = 0
线程A 运行：i = 1
线程A 运行：i = 2
线程A 运行：i = 3
线程A 运行：i = 4
线程B 运行：i = 0
线程B 运行：i = 1
线程B 运行：i = 2
线程B 运行：i = 3
线程B 运行：i = 4
```

发现以上的程序是先执行完mt1对象之后再执行mt2对象，并没有交错运行，也就是说，此时线程实际上并没有被启动，

还是属于顺序式的执行方式，那么该如何启动线程呢？如果要正确地启动线程，是不能直接调用run()方法的，而应该

是调用从 Thread 类中继承而来的 **start()** 方法，具体代码如下：

例子：启动线程

```java
class MyThread extends Thread {  //继承Thread类
	private String name;

	public MyThread(String name) {
		this.name = name;
	}

	public void run() {   //覆写Thread类中的run 方法
		for(int i=0;i<5;i++){
			System.out.println(name + " 运行：i = " + i);
		}
	}
}

public class ThreadDemo {

	public static void main(String[] args) {
		MyThread mt1 = new MyThread("线程A");
		MyThread mt2 = new MyThread("线程B");
		mt1.start();   //启动多线程
		mt2.start();
	}

}
```

程序运行结果(可能的一种结果)

```bath
线程A 运行：i = 0
线程B 运行：i = 0
线程A 运行：i = 1
线程B 运行：i = 1
线程A 运行：i = 2
线程B 运行：i = 2
线程A 运行：i = 3
线程B 运行：i = 3
线程A 运行：i = 4
线程B 运行：i = 4
```

从程序的运行结果中可以发现，两个线程现在是交错运行的，哪个线程对象抢到了CPU资源，哪个线程就可以运行，

所以程序每次的运行结果是不一样的，在线程启动时虽然调用的是start()方法，但实际上调用的却是run()方法的主体

#### 二、实现 Runnable 接口

在Java中也可以通过实现 Runnable 接口的方式实现多线程，Runnable 接口中只定义了一个抽象方法： *public void run();*

例子：实现Runnable接口

```java
class MyThread implements Runnable {  //实现Runnable接口
	private String name;

	public MyThread(String name) {
		this.name = name;
	}

	public void run() {   //覆写Runnable类中的run 方法
		for(int i=0;i<5;i++){
			System.out.println(name + " 运行：i = " + i);
		}
	}
}
```

以上代码通过实现Runnable接口实现多线程，从之前代码中可以知道，要想启动一个多线程必须要使用start()方法完成

如果继承了Thread类，则可以直接从Thread类中使用start()方法 但是现在实现的是Runnable接口，该如何启动多线程呢？

实际上，此时还是要依靠Thread类完成启动，在Thread类中提供了 

*public Thread(Runnable target)* 和 *public Thread(Runnable target,String name)* 两个构造方法

这两个构造方法都可以接收Runnable的子类实例对象，所以就可以依靠此点启动多线程

例子：使用Thread类启动多线程

```java
class MyThread implements Runnable {  //实现Runnable接口
	private String name;

	public MyThread(String name) {
		this.name = name;
	}

	public void run() {   //覆写Runnable类中的run 方法
		for(int i=0;i<5;i++){
			System.out.println(name + " 运行：i = " + i);
		}
	}
}

public class ThreadDemo {

	public static void main(String[] args) {
		MyThread mt1 = new MyThread("线程A");  //实例化Runnable子类对象
		MyThread mt2 = new MyThread("线程B");
		Thread t1 = new Thread(mt1);   //实例化Thread类对象
		Thread t2 = new Thread(mt2);
		t1.start();  //启动线程
		t2.start();
	}

}
```

程序运行结果

```bath
线程B 运行：i = 0
线程A 运行：i = 0
线程B 运行：i = 1
线程A 运行：i = 1
线程B 运行：i = 2
线程B 运行：i = 3
线程A 运行：i = 2
线程B 运行：i = 4
线程A 运行：i = 3
线程A 运行：i = 4
```

从以上两种实现可以发现，无论使用哪种方式，最终都必须依靠Thread类才能启动多线程

#### 三、Thread类和Runnable接口

通过Thread类和Runnable接口都可以实现多线程，那两者有哪些联系和区别呢，下面观察Thread类的定义

*public class Thread extends Object implements Runnable*

从Thread类的定义可以发现，Thread类也是Runnable接口的子类。实际上Thread类和Runnable接口之间在使用上也是

有区别的，如果一个类继承Thread类,则不适合于多个线程共享资源，而实现了Runnable接口，就可以方便地实现资源的共享。

例子：继承Thread类不能资源共享

```java
class MyThread extends Thread { // 继承Thread类
	private int ticket = 5;   //一共5张票

	public void run() { // 覆写run 方法
		for (int i = 0; i < 100; i++) {
			if(ticket > 0){      //判断是否有剩余票
				System.out.println("卖票：ticket = " + ticket--);
			}
		}
	}
}

public class ThreadDemo {

	public static void main(String[] args) {
		MyThread mt1 = new MyThread(); 
		MyThread mt2 = new MyThread();
		MyThread mt3 = new MyThread();
		mt1.start();  //启动线程
		mt2.start();
		mt3.start();
	}

}
```

程序运行结果

```bath
卖票：ticket = 5
卖票：ticket = 5
卖票：ticket = 5
卖票：ticket = 4
卖票：ticket = 4
卖票：ticket = 3
卖票：ticket = 4
卖票：ticket = 2
卖票：ticket = 3
卖票：ticket = 1
卖票：ticket = 3
卖票：ticket = 2
卖票：ticket = 2
卖票：ticket = 1
卖票：ticket = 1
```

以上程序通过Thread类实现多线程，程序中启动了三个线程，但三个线程却分别卖了各自的5张票，

并没有达到资源共享的目的。

例子：实现Runnable接口可以实现资源共享

```java
class MyThread implements Runnable { // 实现Runnable接口
	private int ticket = 5;   //一共5张票

	public void run() { // 覆写run 方法
		for (int i = 0; i < 100; i++) {
			if(ticket > 0){      //判断是否有剩余票
				System.out.println("卖票：ticket = " + ticket--);
			}
		}
	}
}

public class ThreadDemo {

	public static void main(String[] args) {
		MyThread mt = new MyThread(); 
		new Thread(mt).start();  //启动线程
		new Thread(mt).start();
		new Thread(mt).start();
	}

}
```

程序运行结果

```bath
卖票：ticket = 5
卖票：ticket = 3
卖票：ticket = 4
卖票：ticket = 1
卖票：ticket = 2
```

从程序的运行结果中可以发现，虽然启动了3个线程，但是3个线程一共才卖了5张票，即ticket属性被所有的线程对象共享

可见，实现 Runnable 接口相对于继承Thread类来说，有如下显著的优势：

+ 适合多个相同程序代码的线程去处理同一资源的情况。

+ 可以避免由于Java的单继承特性带来的局限

+ 增强了程序的健壮性，代码能够被多个线程共享，代码与数据是独立的。

所以，在开发中建议使用 Runnable 接口实现多线程




















