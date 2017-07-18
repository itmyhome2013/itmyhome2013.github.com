---
layout: post
blog_id: "java-concurrent-countdownlatch"
title: "Java并发编程之CountDownLatch"
date: 2017-07-12 00:00:00 -0700
tags: 并发
category: 并发
summary: CountDownLatch是一个同步工具类,它允许一个或多个线程一直等待,直到其他线程的操作执行完后再执行
comments: false
---

#### 一、场景描述

在多线程程序设计中，经常会遇到一个线程等待一个或多个线程的场景

例如：百米赛跑，十名运动员同时起跑，由于速度的快慢，肯定有先到达和后到达的，而终点有个统计成绩的仪器，当所有选手到达终点时，它会统计所有人的成绩并进行排序，然后把结果发送到汇报成绩的系统。

再例如：当我们需要解析一个Excel里多个sheet的数据时，可以考虑使用多线程，每个线程解析一个sheet里的数据，等到所有的sheet都解析完之后，程序需要提示解析完成。在这个需求中，要实现主线程等待所有线程完成sheet的解析操作。

以上场景是一个线程等待多个线程，则就可以使用CountDownLatch来实现比较好的控制

#### 二、CountDownLatch如何工作的

正如Java文档所描述的那样，CountDownLatch是一个同步工具类，它允许一个或多个线程一直等待，直到其他线程的操作执行完后再执行。CountDownLatch是在Java1.5被引入的，跟它一起被引入的并发工具类还有CyclicBarrier、Semaphore、ConcurrentHashMap和BlockingQueue，它们都存在于java.util.concurrent包下。

CountDownLatch是通过一个计数器来实现的，计数器的初始值为线程的数量。每当一个线程完成了自己的任务后，计数器的值就会减1。当计数器值到达0时，它表示所有的线程已经完成了任务，然后在闭锁上等待的线程就可以恢复执行任务。

#### 三、方法说明

> public void CountDownLatch(int count) {...}

构造器中的**计数值(count)实际上就是闭锁需要等待的线程数量**。这个值只能被设置一次，而且CountDownLatch**没有提供任何机制去重新设置这个计数值**。

> public void countDown()

其他线程必须引用闭锁对象，因为他们需要通知CountDownLatch对象，他们已经完成了各自的任务。这种通知机制是通过CountDownLatch.countDown()方法来完成的，每调用一次这个方法，在构造函数中初始化的count值就减1.所以当N个线程都调用了这个方法，count的值等于0，然后主线程就能通过await()方法，恢复执行自己的任务。

> public void await()

当线程调用了 await()，则这个线程就等待这个计数器变为0，当这个计数器变为0时，这个线程继续自己下面的工作。

#### 代码示例：

```java
package com.itmyhome;

import java.util.concurrent.CountDownLatch;

/**
 * 运动员
 * @author itmyhome
 *
 */
class Athlete implements Runnable {
    private String name; // 姓名
    private CountDownLatch beginSignal;
    private CountDownLatch endSignal;

    public Athlete(String name, CountDownLatch begin, CountDownLatch end) {
        this.name = name;
        this.beginSignal = begin;
        this.endSignal = end;
    }

    @Override
    public void run() {
        try {
            beginSignal.await();
            System.out.println("运动员：" + name + " 到达终点...");
            endSignal.countDown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

/**
 * 终点统计类
 * @author itmyhome
 *
 */
public class CountDownLatchTest {
    public static void main(String[] args) {
        CountDownLatch begSignal = new CountDownLatch(1);
        CountDownLatch endSignal = new CountDownLatch(10);

        for (int i = 0; i < 10; i++) {
            new Thread(new Athlete("name" + i, begSignal, endSignal)).start();
        }

        try {
            begSignal.countDown(); // 统一起跑
            endSignal.await(); // 等待运动员到达终点
            // Thread.sleep(1);
            System.out.println("结果发送到汇报成绩的系统");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

输出结果：

```bath
运动员：name0 到达终点...
运动员：name4 到达终点...
运动员：name9 到达终点...
运动员：name5 到达终点...
运动员：name3 到达终点...
运动员：name6 到达终点...
运动员：name1 到达终点...
运动员：name7 到达终点...
运动员：name8 到达终点...
运动员：name2 到达终点...
结果发送到汇报成绩的系统
```
