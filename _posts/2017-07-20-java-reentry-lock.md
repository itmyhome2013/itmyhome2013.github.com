---
layout: post
blog_id: "java-reentry-lock"
title: "Java并发编程之重入锁"
date: 2017-07-20 00:00:00 -0700
tags: 并发
category: 并发
summary: 重入锁，顾名思义，就是支持重进入的锁，它表示该锁能够支持一个线程对资源的重复加锁
comments: false
---

重入锁，顾名思义，就是支持重进入的锁，它表示该锁能够支持一个线程对资源的重复加锁。重进入是指任意线程在获取到锁之后能够再次获取该锁而不会被锁阻塞，该特性的实现需要解决以下两个问题。

+ 1、**线程再次获取锁**。锁需要去识别获取锁的线程是否为当前占据锁的线程，如果是，则再次成功获取。
+ 2、**锁的最终释放**。线程重复n次获取了锁，随后在第n次释放该锁后，其他线程能够获取到该锁。锁的最终释放要求锁对于获取进行计数自增，计数表示当前锁被重复获取的次数，而锁被释放时，计数自减，当计数等于0时表示锁已经成功释放。

Java里面内置锁(synchronize)和Lock(ReentrantLock)都是可重入的


##### synchronized 实例

```java
package com.home;

public class SynchronizedTest implements Runnable {
    public synchronized void method1() {
        System.out.println("method1获得锁，正常运行!");
        method2();
    }

    public synchronized void method2() {
        System.out.println("method2获得锁，也正常运行!");
    }

    @Override
    public void run() {
        method1();
    }

    public static void main(String[] args) {
        SynchronizedTest st = new SynchronizedTest();
        new Thread(st).start();
        new Thread(st).start();
    }
}

```

##### Lock 实例

```java
package com.home;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;


public class LockTest implements Runnable {
    Lock lock = new ReentrantLock();

    public void method1() {
        lock.lock();
        System.out.println("method1获得锁，正常运行!");
        method2();
        lock.unlock();
    }

    public void method2() {
        lock.lock();
        System.out.println("method2获得锁，也正常运行!");
        lock.unlock();
    }

    @Override
    public void run() {
        method1();
    }

    public static void main(String[] args) {
        LockTest lt = new LockTest();
        new Thread(lt).start();
        new Thread(lt).start();
    }
}
```

两个例子最后的结果都是正确的，结果如下：

```bath
method1获得锁，正常运行!
method2获得锁，也正常运行!
method1获得锁，正常运行!
method2获得锁，也正常运行!
```

可重入锁最大的作用是**避免死锁**