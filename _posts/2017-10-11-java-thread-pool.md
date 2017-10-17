---
layout: post
blog_id: "java-thread-pool"
title: "Java线程池实现原理"
date: 2017-10-11 00:00:00 -0700
tags: [多线程,并发]
category: 多线程
summary: 在面向对象编程中,创建和销毁对象是很费时间的,因为创建一个对象要获取内存资源或者其他更多资源
comments: false
---

#### 前言

在面向对象编程中，创建和销毁对象是很费时间的，因为创建一个对象要获取内存资源或者其他更多资源。在Java中更是如此，虚拟机将试图跟踪每一个对象，以便能够在对象销毁后进行垃圾回收。Java中的线程池是运用场景最多的并发框架，几乎所有需要异步或并发执行任务的程序都可以使用线程池。在开发过程中，合理地使用线程池能够带来3个好处。

+ 第一：降低资源消耗。
+ 第二：提高响应速度。
+ 第三：提高线程的可管理性。

线程是稀缺资源，如果无限制地创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一分配、调优和监控。

#### 线程池的实现原理

当向线程池提交一个任务之后，线程池是如何处理这个任务的呢？下图为线程池的主要处理流程

![License Badge]({{ site.baseurl}}/images/thread-pool/1.png)

从图中可以看出，当提交一个新任务到线程池时，线程池的处理流程如下。

+ 1、线程池判断核心线程池里的线程是否都在执行任务。如果不是，则创建一个新的工作线程来执行任务。如果核心线程池里的线程都在执行任务，则进入下个流程。
+ 2、线程池判断工作队列是否已经满。如果工作队列没有满，则将新提交的任务存储在这个工作队列里。如果工作队列满了，则进入下个流程。
+ 3、线程池判断线程池的线程是否都处于工作状态。如果没有，则创建一个新的工作线程来执行任务。如果已经满了，则交给饱和策略来处理这个任务。

**ThreadPoolExecutor执行execute()方法的示意图**

![License Badge]({{ site.baseurl}}/images/thread-pool/2.png)

ThreadPoolExecutor执行execute方法分下面4种情况。

+ 1、如果当前运行的线程少于corePoolSize，则创建新线程来执行任务（注意，执行这一步骤需要获取全局锁）。
+ 2、如果运行的线程等于或多于corePoolSize，则将任务加入BlockingQueue。
+ 3、如果无法将任务加入BlockingQueue(队列已满)，则创建新的线程来处理任务(注意，执行这一步骤需要获取全局锁)。
+ 4、如果创建新线程将使当前运行的线程超出maximumPoolSize，任务将被拒绝，并调用RejectedExecutionHandler.rejectedExecution()方法。

#### 线程池的使用

先看下面例子：

```java
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class ExecutorTest {
    private static Executor executor = Executors.newFixedThreadPool(5);

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            executor.execute(new Task());
        }
    }

    static class Task implements Runnable {
        @Override
        public void run() {
            // TODO Auto-generated method stub
            System.out.println(Thread.currentThread().getName());
        }
    }
}

```

+ 1、Executors.newFixedThreadPool(5)：初始化一个包含:5个线程的线程池executor；
+ 2、通过executor.execute方法提交10个任务，每个任务打印当前的线程名；
+ 3、负责执行任务的线程的生命周期都由Executor框架进行管理；

#### 线程池的创建

我们可以通过ThreadPoolExecutor来创建一个线程池。

```java
public ThreadPoolExecutor(int corePoolSize,
		      int maximumPoolSize,
		      long keepAliveTime,
		      TimeUnit unit,
		      BlockingQueue<Runnable> workQueue) {
   this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
      Executors.defaultThreadFactory(), defaultHandler);
}
```

创建一个线程池时需要输入几个参数，如下。

+ 1）**corePoolSize（线程池的基本大小）：**当提交一个任务到线程池时，线程池会创建一个线程来执行任务，即使其他空闲的基本线程能够执行新任务也会创建线程，等到需要执行的任务数大于线程池基本大小时就不再创建。如果调用了线程池的prestartAllCoreThreads()方法，线程池会提前创建并启动所有基本线程。
+ 2）**runnableTaskQueue（任务队列）：**用于保存等待执行的任务的阻塞队列。可以选择以下几个阻塞队列。
  + ArrayBlockingQueue：是一个基于数组结构的有界阻塞队列，此队列按FIFO（先进先出）原则对元素进行排序。
  + LinkedBlockingQueue：一个基于链表结构的阻塞队列，此队列按FIFO排序元素，吞吐量通常要高于ArrayBlockingQueue。静态工厂方法Executors.newFixedThreadPool()使用了这个队列。
  + SynchronousQueue：一个不存储元素的阻塞队列。每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于Linked-BlockingQueue，静态工厂方法Executors.newCachedThreadPool使用了这个队列。
  + PriorityBlockingQueue：一个具有优先级的无限阻塞队列。
+ 3）**maximumPoolSize（线程池最大数量）：**线程池允许创建的最大线程数。如果队列满了，并且已创建的线程数小于最大线程数，则线程池会再创建新的线程执行任务。值得注意的是，如果使用了无界的任务队列这个参数就没什么效果。
+ 4）**ThreadFactory：**用于设置创建线程的工厂，可以通过线程工厂给每个创建出来的线程设置更有意义的名字。使用开源框架guava提供的ThreadFactoryBuilder可以快速给线程池里的线程设置有意义的名字，代码如下

```java
new ThreadFactoryBuilder().setNameFormat("XX-task-%d").build();
```

+ 5）**RejectedExecutionHandler（饱和策略）：**当队列和线程池都满了，说明线程池处于饱和状态，那么必须采取一种策略处理提交的新任务。这个策略默认情况下是AbortPolicy，表示无法处理新任务时抛出异常。在JDK 1.5中Java线程池框架提供了以下4种策略。
  + AbortPolicy：直接抛出异常。
  + CallerRunsPolicy：只用调用者所在线程来运行任务。
  + DiscardOldestPolicy：丢弃队列里最近的一个任务，并执行当前任务。
  + DiscardPolicy：不处理，丢弃掉。


#### 向线程池提交任务

可以使用两个方法向线程池提交任务，分别为execute()和submit()方法。execute()方法用于提交不需要返回值的任务，所以无法判断任务是否被线程池执行成功。通过以下代码可知execute()方法输入的任务是一个Runnable类的实例。

```java
threadsPool.execute(new Runnable() {
	@Override
	public void run() {
		// TODO Auto-generated method stub
	}
});
```

submit()方法用于提交需要返回值的任务。线程池会返回一个future类型的对象，通过这个future对象可以判断任务是否执行成功，并且可以通过future的get()方法来获取返回值，get()方法会阻塞当前线程直到任务完成，而使用get（long timeout，TimeUnit unit）方法则会阻塞当前线程一段时间后立即返回，这时候有可能任务没有执行完。

```java
Future<Object> future = executor.submit(harReturnValuetask);
	try {
		Object s = future.get();
	} catch (InterruptedException e) {
		// 处理中断异常
	} catch (ExecutionException e) {
		// 处理无法执行任务异常
	} finally {
		// 关闭线程池
		executor.shutdown();
	}
```

#### 关闭线程池

可以通过调用线程池的shutdown或shutdownNow方法来关闭线程池。它们的原理是遍历线程池中的工作线程，然后逐个调用线程的interrupt方法来中断线程，所以无法响应中断的任务可能永远无法终止。但是它们存在一定的区别，shutdownNow首先将线程池的状态设置成STOP，然后尝试停止所有的正在执行或暂停任务的线程，并返回等待执行任务的列表，而shutdown只是将线程池的状态设置成SHUTDOWN状态，然后中断所有没有正在执行任务的线程。

只要调用了这两个关闭方法中的任意一个，isShutdown方法就会返回true。当所有的任务都已关闭后，才表示线程池关闭成功，这时调用isTerminaed方法会返回true。至于应该调用哪一种方法来关闭线程池，应该由提交到线程池的任务特性决定，通常调用shutdown方法来关闭线程池，如果任务不一定要执行完，则可以调用shutdownNow方法。






