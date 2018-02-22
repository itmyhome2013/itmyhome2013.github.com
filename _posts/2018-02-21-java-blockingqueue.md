---
layout: post
blog_id: "java-blockingqueue"
title: "Java使用阻塞队列BlockingQueue实现生产者消费者"
date: 2018-02-21 00:00:00 -0700
tags: [Java并发,并发]
category: [Java并发,并发]
summary: 阻塞队列(BlockingQueue)是一个支持两个附加操作的队列。这两个附加的操作支持阻塞的插入和移除方法
comments: false
---

#### 什么是阻塞队列

阻塞队列(BlockingQueue)是一个支持两个附加操作的队列。这两个附加的操作支持阻塞的插入和移除方法。

+ 1、支持阻塞的插入方法：意思是当队列满时，队列会阻塞插入元素的线程，直到队列不满。
+ 2、支持阻塞的移除方法：意思是在队列为空时，获取元素的线程会等待队列变为非空。

阻塞队列常用于生产者和消费者的场景，生产者是向队列里添加元素的线程，消费者是从队列里取元素的线程。
阻塞队列就是生产者用来存放元素、消费者用来获取元素的容器。

Java中提供了几个对BlockingQueue的实现类，如: ArrayBlockingQueue, LinkedBlockingQueue, PriorityBlockingQueue, SynchronousQueue 等

在处理生产者/消费者问题上 我们将会使用ArrayBlockingQueue来实现，如下是我们需知道的重要方法：

+ **put(E e):** 这个方法用于向队列中插入元素，如果队列已满，需要等待可用的这间。
+ **E take():** 这个方法用于从队列头部获取或者移除元素，如果队列为空则需要等待可用的元素。

<hr>

#### 使用BlockingQueue来解决生产者/消费者 示例

##### **Mantou类**

Producer产生的普通Java对象，并添加到队列中。

```java
/**
 * Producer产生的馒头类
 * @author itmyhome
 *
 */
public class Mantou {
    private String mantou;

    public Mantou(String mantou) {
        this.mantou = mantou;
    }

    public String getMantou() {
        return mantou;
    }

    public void setMantou(String mantou) {
        this.mantou = mantou;
    }
}

```

##### **Producer生产者类**

Producer这个类会产生消息并将其放入队列中。

```java
import java.util.concurrent.BlockingQueue;

public class Producer implements Runnable {
    BlockingQueue<Mantou> queue;

    public Producer(BlockingQueue<Mantou> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        // 生产馒头
        for (int i = 0; i < 100; i++) {
            Mantou mt = new Mantou("" + i);

            try {
                Thread.sleep(100);
                queue.put(mt);
                System.out.println("生产馒头: " + mt.getMantou());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        // 添加退出消息
        Mantou msg = new Mantou("exit");

        try {
            queue.put(msg);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

```

##### **Consumer消费者类**

Consumer类会从队列获取消息进行处理。如果获取的是退出消息则结束。

```java
import java.util.concurrent.BlockingQueue;

public class Consumer implements Runnable {
    BlockingQueue<Mantou> queue;

    public Consumer(BlockingQueue<Mantou> queue) {
        this.queue = queue;
    }

    @Override
    public void run() {
        try {
            Mantou mantou;

            // 获取并处理消息直到接收到“exit”消息
            while (!(mantou = queue.take()).getMantou().equals("exit")) {
                Thread.sleep(100);
                System.out.println("消费馒头： " + mantou.getMantou());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

##### **ProducerConsumerService**

生产者/消费者的服务类将会产生固定大小的BlockingQueue，生产者和消费者同时共享该BlockingQueue，该服务类会起启动生产者和消费者线程。

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * @author itmyhome
 *
 */
public class ProducerConsumerService {
    public static void main(String[] args) {
        // 创建大小为10的 BlockingQueue
        BlockingQueue<Mantou> queue = new ArrayBlockingQueue<Mantou>(10);
        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);

        // 开启 producer线程向队列中生产消息
        new Thread(producer).start();

        //开启 consumer线程 中队列中消费消息
        new Thread(consumer).start();
        System.out.println("Producer and Consumer has been started");
    }
}
```

程序运行结果：

```java
Producer and Consumer has been started
生产馒头： 0
生产馒头： 1
消费馒头： 0
消费馒头： 1
生产馒头： 2
消费馒头： 2
生产馒头： 3
消费馒头： 3
生产馒头： 4
消费馒头： 4
生产馒头： 5
消费馒头： 5
生产馒头： 6
消费馒头： 6
......
```

<br>

##### **参考**

`[1]`: Java并发编程的艺术<br>
`[2]`: <a href="http://www.cnblogs.com/tonyspark/p/3722013.html" target="_blank">http://www.cnblogs.com/tonyspark/p/3722013.html</a>


