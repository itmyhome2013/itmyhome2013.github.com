---
layout: post
blog_id: "java-concurrent-cyclicbarrier"
title: "Java并发编程之CyclicBarrier"
date: 2017-07-13 00:00:00 -0700
tags: 并发
category: 并发
summary: CyclicBarrier 的字面意思是可循环使用(Cyclic)的屏障(Barrier)
comments: false
---

#### 一、场景描述

有四个游戏玩家玩游戏，游戏有三个关卡，每个关卡必须要所有玩家都到达后才能允许通过。其实这个场景里的玩家中如果有玩家A先到了关卡1，他必须等到其他所有玩家都到达关卡1时才能通过，也就是说线程之间需要相互等待。这和CountDownLatch的应用场景有区别，CountDownLatch里的线程是到了运行的目标后继续干自己的其他事情，而这里的线程需要等待其他线程后才能继续完成下面的工作。

#### 二、CyclicBarrier介绍

CyclicBarrier 的字面意思是可循环使用(Cyclic)的屏障(Barrier)。它要做的事情是，让一组线程到达一个屏障(也可以叫同步点)时被阻塞，直到最后一个线程到达屏障时，屏障才会开门，所有被屏障拦截的线程才会继续干活。CyclicBarrier默认的构造方法是CyclicBarrier(int parties)，其参数表示屏障拦截的线程数量，每个线程调用await方法告诉CyclicBarrier我已经到达了屏障，然后当前线程被阻塞。

CyclicBarrier类有两个常用的构造方法：

**1. CyclicBarrier(int parties)**

这里的parties也是一个计数器，例如，初始化时parties里的计数是3，于是拥有该CyclicBarrier对象的线程当parties的计数为3时就唤醒，注：这里parties里的计数在运行时当调用CyclicBarrier:await()时,计数就加1，一直加到初始的值

**2. CyclicBarrier(int parties, Runnable barrierAction)**

这里的parties与上一个构造方法的解释是一样的，这里需要解释的是第二个入参(Runnable barrierAction),这个参数是一个实现Runnable接口的类的对象，也就是说当parties加到初始值时就出发barrierAction的内容。

#### 代码示例

```java
package com.itmyhome;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;


/**
 * 玩家类
 * @author itmyhome
 *
 */
class Player implements Runnable {
    private CyclicBarrier cyclicBarrier;
    private int id;

    public Player(int id, CyclicBarrier cyclicBarrier) {
        this.cyclicBarrier = cyclicBarrier;
        this.id = id;
    }

    @Override
    public void run() {
        try {
            System.out.println("玩家" + id + "正在玩第一关...");
            cyclicBarrier.await();
            System.out.println("玩家" + id + "进入第二关...");
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (BrokenBarrierException e) {
            e.printStackTrace();
        }
    }
}


public class CyclicBarrierTest {
    public static void main(String[] args) {
        // CyclicBarrier cyclicBarrier = new CyclicBarrier(4);
        CyclicBarrier cyclicBarrier = new CyclicBarrier(4,
                new Runnable() {
                    @Override
                    public void run() {
                        System.out.println("所有玩家进入第二关！");
                    }
                });

        for (int i = 0; i < 4; i++) {
            new Thread(new Player(i, cyclicBarrier)).start();
        }
    }
}
```

输出结果:

```bath
玩家0正在玩第一关...
玩家3正在玩第一关...
玩家2正在玩第一关...
玩家1正在玩第一关...
所有玩家进入第二关！
玩家3进入第二关...
玩家1进入第二关...
玩家2进入第二关...
玩家0进入第二关...
```

#### CyclicBarrier和CountDownLatch的区别

+ CountDownLatch: 一个线程(或者多个)， 等待另外N个线程完成某个事情之后才能执行。  
+ CyclicBarrier: N个线程相互等待，任何一个线程完成之前，所有的线程都必须等待。
+ CountDownLatch的计数器只能使用一次。而CyclicBarrier的计数器可以使用reset() 方法重置。所以CyclicBarrier能处理更为复杂的业务场景，比如如果计算发生错误，可以重置计数器，并让线程们重新执行一次。
+ CountDownLatch：减计数方式，CyclicBarrier：加计数方式