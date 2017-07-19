---
layout: post
blog_id: "java-concurren-lock"
title: "Java并发编程之Lock"
date: 2017-07-19 00:00:00 -0700
tags: 并发
category: 并发
summary: Lock是一个接口提供了无条件的、可轮询的、定时的、可中断的锁获取操作,所有加锁和解锁的方法都是显式的
comments: false
---

Lock是一个接口提供了无条件的、可轮询的、定时的、可中断的锁获取操作，所有加锁和解锁的方法都是显式的。
我们知道，synchronized是Java的关键字，是Java的内置特性，在JVM层面实现了对临界资源的同步互斥访问，但synchronized粒度有些大，在处理实际问题时存在诸多局限性，比如响应中断等。Lock提供了比synchronized更广泛的锁操作，它能以更优雅的方式处理线程同步问题。

#### 一、synchronized的局限性与Lock的优点

如果一个代码块被synchronized关键字修饰，当一个线程获取了对应的锁，并执行该代码块时，其他线程便只能一直等待直至占有锁的线程释放锁。事实上，占有锁的线程释放锁一般会是以下三种情况之一：

+ 占有锁的线程执行完了该代码块，然后释放对锁的占有;
+ 占有锁线程执行发生异常，此时JVM会让线程自动释放锁;
+ 占有锁线程进入 WAITING 状态从而释放锁，例如在该线程中调用wait()方法等。

#### 二、java.util.concurrent.locks包下常用的类与接口

**1、Lock**

由于Lock是一个接口，因此需要使用其中一个实现来使用Lock，这是一个简单的例子：

```java
Lock lock = new ReentrantLock();
lock.lock();
//critical section
lock.unlock();
```

Lock接口有如下方法：

```java
public abstract void lock();
public abstract void lockInterruptibly() throws InterruptedException;
public abstract boolean tryLock();
public abstract boolean tryLock(long paramLong, TimeUnit paramTimeUnit)
	throws InterruptedException;
public abstract void unlock();
public abstract Condition newCondition();
```

下面来逐个分析Lock接口中每个方法。lock()、tryLock()、tryLock(long time, TimeUnit unit) 和 lockInterruptibly()都是用来获取锁的。unLock()方法是用来释放锁的。newCondition() 返回 绑定到此 Lock 的新的 Condition 实例 ，用于线程间的协作

+ **lock()**: 获取锁，如果锁不可用，出于线程调度目的，将禁用当前线程，并且在获得锁之前，该线程将一直处于休眠状态。
+ **lockInterruptibly()**：如果当前线程未被中断，则获取锁。如果锁可用，则获取锁，并立即返回。如果锁不可用，出于线程调度目的，将禁用当前线程，并且在发生以下两种情况之一以前，该线程将一直处于休眠状态：锁由当前线程获得；或者其他某个线程中断 当前线程，并且支持对锁获取的中断。如果当前线程：在进入此方法时已经设置了该线程的中断状态；或者在获取锁时被中断 ，并且支持对锁获取的中断，则将抛出  InterruptedException ，并清除当前线程的已中断状态。
+ **tryLock()**：仅在调用时锁为空闲状态才获取该锁。如果锁可用，则获取锁，并立即返回值  true 。如果锁不可用，则此方法将立即返回值  false 。通常对于那些不是必须获取锁的操作可能有用。
+ **tryLock(long timeout, TimeUnit timeUnit)**：如果锁在给定的等待时间内空闲，并且当前线程未被中断，则获取锁。如果锁可用，则此方法将立即返回值  true 。如果锁不可用，出于线程调度目的，将禁用当前线程
+ **unlock()**：释放锁

#### 三、Lock和synchronized的比较

+ Lock是一个接口，是JDK层面的实现；而synchronized是Java中的关键字，是Java的内置特性，是JVM层面的实现；
+ synchronized 在发生异常时，会自动释放线程占有的锁，因此不会导致死锁现象发生；而Lock在发生异常时，如果没有主动通过unLock()去释放锁，则很可能造成死锁现象，因此使用Lock时需要在finally块中释放锁；
+ Lock 可以让等待锁的线程响应中断，而使用synchronized时，等待的线程会一直等待下去，不能够响应中断；
+ 通过Lock可以知道有没有成功获取锁，而synchronized却无法办到；
+ Lock可以提高多个线程进行读操作的效率。

在性能上来说，如果竞争资源不激烈，两者的性能是差不多的。而当竞争资源非常激烈时（即有大量线程同时竞争），此时Lock的性能要远远优于synchronized。所以说，在具体使用时要根据适当情况选择。




