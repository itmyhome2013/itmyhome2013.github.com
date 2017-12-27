---
layout: post
blog_id: "java-concurrent-programming-volatile"
title: "Java并发编程之volatile"
date: 2017-12-26 00:00:00 -0700
tags: [Java并发,并发]
category: [Java并发,并发]
summary: volatile可以说是Java虚拟机提供的最轻量级的同步机制，Java内存模型对volatile专门定义了一些特殊的访问规则
comments: false
---

volatile可以说是Java虚拟机提供的最轻量级的同步机制，Java内存模型对volatile专门定义了一些特殊的访问规则。

当一个变量定义为volatile之后，它将具备两种特性，`第一是保证此变量对所有线程的可见性`，这里的“可见性”是指当一条线程修改了这个变量的值，新值对于其他线程来说是可以立即得知的。 而普通变量不能做到这一点，普通变量的值在线程间传递均需要通过主内存来完成，例如，线程A修改一个普通变量的值，然后向主内存进行回写，另外一条线程B在线程A回写完成了之后再从主内存进行读取操作，新变量值才会对线程B可见。

关于volatile变量的可见性，需要注意的是`volatile变量的运算必须是原子操作`，演示例子如下：

```java
/**
 * volatile变量自增运算测试
 * @author itmyhome
 *
 */
 public class VolatileTest {
    public static volatile int count = 0;

    public static void increase() {
        count++;
    }

    public static void main(String[] args) {
        Thread[] threads = new Thread[10];

        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(new Runnable() {
                        @Override
                        public void run() {
                            for (int i = 0; i < 10000; i++) {
                                increase();
                            }
                        }
                    });
            threads[i].start();
        }

        while (Thread.activeCount() > 1)
            Thread.yield();

        System.out.println(count);
    }
}
```

这段代码发起了10个线程，每个线程对race变量进行10000次自增操作，如果这段代码能够正确并发的话，最后输出的结果应该是100000，但运行完这段代码之后，并不会获得期望的结果，而且会发现每次运行输出的结果都不一样，都是一个小于100000的数字。

问题出在count++之中，`自增操作不具备原子性`，它包括读取变量的原始值、进行加1操作、写入工作内存。那么就是说自增操作的三个子操作可能会分割开执行

为达到预期效果可用如下的任何一种解决方法(代码略)

+ 1、使用synchronized
+ 2、使用Lock
+ 3、采用AtomicInteger

使用volatile变量的`第二个语义是禁止指令重排序优化`，普通的变量仅仅会保证在该方法的执行过程中所有依赖赋值结果的地方都能获取到正确的结果，而不能保证变量赋值操作的顺序与程序代码中的执行顺序一致。 因为在一个线程的方法执行过程中无法感知到这点，这也就是Java内存模型中描述的所谓的“线程内表现为串行的语义”（Within-Thread As-If-Serial Semantics）。演示代码如下：

```java
//线程1
boolean stop = false;
while(!stop){
    doSomething();
}
 
//线程2
stop = true;
```

使用字段stop作为执行标识，但一定会执行doSomething()方法吗，答案是不一定。如果定义stop变量时没有使用volatile修饰，就可能会由于指令重排序的优化，导致线程2“stop = true”被提前执行，这样线程1中使用stop进行判断就可能出现错误，而volatile关键字则可以避免此类情况的发生。

下面列举实际操作运行的例子来分析volatile关键字是如何禁止指令重排序优化的，如下代码是一段标准的DCL单例代码，可以观察加入volatile和未加入volatile关键字时所生成汇编代码的差别

```java
public class Singleton {
    private volatile static Singleton instance;

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
    public static void main(String[] args) {
        Singleton.getInstance();
    }
}
```

编译后，这段代码对instance变量赋值部分如下代码所示。

```java
0x01a3de0f：mov$0x3375cdb0，%esi；……beb0cd75 33
；{oop（'Singleton'）}
0x01a3de14：mov%eax，0x150（%esi）；……89865001 0000
0x01a3de1a：shr$0x9，%esi；……c1ee09
0x01a3de1d：movb$0x0，0x1104800（%esi）；……c6860048 100100
0x01a3de24：lock addl$0x0，（%esp）；……f0830424 00
；*putstatic instance
；-
Singleton：getInstance@24
```

通过对比就会发现，关键变化在于有volatile修饰的变量，赋值后（前面mov%eax，0x150（%esi）这句便是赋值操作）多执行了一个`“lock addl ＄0x0，（%esp）”`操作，这个操作相当于一个内存屏障（Memory Barrier或Memory Fence，指重排序时不能把后面的指令重排序到内存屏障之前的位置），只有一个CPU访问内存时，并不需要内存屏障；但如果有两个或更多CPU访问同一块内存，且其中有一个在观测另一个，就需要内存屏障来保证一致性了。 

<hr>

参考文献：<a href="http://itmyhome.com/java-virtual-machine/" target="_blank">深入理解Java虚拟机</a> 周志明 著