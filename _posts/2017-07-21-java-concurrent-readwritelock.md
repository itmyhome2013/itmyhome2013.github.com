---
layout: post
blog_id: "java-concurrent-readwritelock"
title: "Java并发编程之读写锁"
date: 2017-07-21 00:00:00 -0700
tags: 并发
category: 并发
summary: 读写锁维护了一对相关的锁，一个用于只读操作，一个用于写入操作
comments: false
---

读写锁维护了一对相关的锁，一个用于只读操作，一个用于写入操作。只要没有writer，读取锁可以由多个reader线程同时保持。写入锁是独占的。

#### 可重入读写锁 ReentrantReadWriteLock

ReentrantReadWriteLock对象提供了**readLock()**和**writeLock()**方法, 用于获取读取锁和写入锁. 

+ 读取锁允许多个reader线程同时持有, 而写入锁最多只能有一个writter线程持有.
+ 读写锁的使用场合: 读取共享数据的频率远大于修改共享数据的频率. 在上述场合下, 使用读写锁控制共享资源的访问, 可以提高并发性能.
+ 如果一个线程已经持有了写入锁, 则可以再持有读写锁. 相反, 如果一个线程已经持有了读取锁, 则在释放该读取锁之前, 不能再持有写入锁.
+ 可以调用写入锁的newCondition()方法获取与该写入锁绑定的Condition对象, 此时与普通的互斥锁并没有什么区别. 但是调用读取锁的newCondition()方法将抛出异常. 

##### 例子

```java
package com.home;

import java.util.Random;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;


class ReadWrte {
    // 共享数据，可以多个线程读数据，只能有一个线程写数据
    private int data;

    // 创建读写锁
    ReadWriteLock rwLock = new ReentrantReadWriteLock();

    /**
     * 读数据，上读锁
     */
    public void get() {
        // 读锁
        rwLock.readLock().lock();

        try {
            System.out.println(Thread.currentThread().getName() + ",Read!");
            Thread.sleep((long) Math.random() * 1000);
            System.out.println(Thread.currentThread().getName() + " 读出的数据为：" +
                this.getData());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            rwLock.readLock().unlock();
        }
    }

    /**
     * 写数据，上写锁
     *
     * @param data
     */
    public void put(int data) {
        // 写锁
        rwLock.writeLock().lock();

        try {
            System.out.println(Thread.currentThread().getName() + ",Write!");
            Thread.sleep((long) Math.random() * 1000);
            this.setData(data);
            System.out.println(Thread.currentThread().getName() + " 写入的数据为：" +
                this.getData());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    public int getData() {
        return data;
    }

    public void setData(int data) {
        this.data = data;
    }
}


/**
 * 测试类
 *
 * @author itmyhome
 *
 */
public class ReadWriteLockTest {
    /**
     * @param args
     */
    public static void main(String[] args) {
        // 创建ReadWrte对象
        final ReadWrte rw = new ReadWrte();

        for (int i = 0; i < 10; i++) {
            // 创建并启动10个读线程
            new Thread(new Runnable() {
                    @Override
                    public void run() {
                        rw.get();
                    }
                }).start();

            // 创建并启动10个写线程
            new Thread(new Runnable() {
                    @Override
                    public void run() {
                        // 写入一个随机数
                        rw.put(new Random().nextInt(8));
                    }
                }).start();
        }
    }
}
```

程序运行结果如图：

![License Badge]({{ site.baseurl}}/images/java/readwritelock.png)

从图中我们可以看出，可以多个线程同时读，但只能一个线程写，即写数据和写入数据一并完成。