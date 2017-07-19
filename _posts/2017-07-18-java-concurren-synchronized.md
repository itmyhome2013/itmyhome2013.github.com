---
layout: post
blog_id: "java-concurren-synchronized"
title: "Java并发编程之synchronized"
date: 2017-07-18 00:00:00 -0700
tags: 并发
category: 并发
summary: Java语言的关键字,当它用来修饰一个方法或者一个代码块的时候,能够保证在同一个时间,只有一个线程可以进行操作
comments: false
---

Java语言的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证在同一个时间，只有一个线程可以进行操作。多线程的同步机制对资源进行加锁，同步用以解决多个线程同时访问时可能出现的问题。

+ 对于普通同步方法，锁是当前实例对象。
+ 对于静态同步方法，锁是当前类的Class对象。
+ 对于同步方法块，锁是Synchonized括号里配置的对象。

当一个线程试图访问同步代码块时，它首先必须得到锁，退出或抛出异常时必须释放锁。

#### 1.是否使用synchronized关键字的不同

```java
package com.itmyhome;

class Thread1 extends Thread {
    private Example example;

    public Thread1(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute();
    }
}


class Example {
    public synchronized void execute() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("Hello: " + i);
        }
    }
}


public class ThreadTest {
    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Example example = new Example();
        Thread t1 = new Thread1(example);
        Thread t2 = new Thread1(example);
        t1.start();
        t2.start();
    }
}
```

是否在execute()方法前加上synchronized关键字，这个例子程序的执行结果会有很大的不同。
如果不加synchronized关键字，则两个线程同时执行execute()方法，输出是两组并发的。
如果加上synchronized关键字，则会先输出一组0到9，然后再输出下一组，说明两个线程是顺次执行的。

#### 2.多个方法的多线程情况

将程序改动一下，Example类中再加入一个方法execute2()。之后再写一个线程类Thread2，Thread2中的run()方法执行的是execute2()。Example类中的两个方法都是被synchronized关键字修饰的。

```java
package com.itmyhome;

class Thread1 extends Thread {
    private Example example;

    public Thread1(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute();
    }
}


class Thread2 extends Thread {
    private Example example;

    public Thread2(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute2();
    }
}


class Example {
    public synchronized void execute() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("Hello: " + i);
        }
    }

    public synchronized void execute2() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("Hello: " + i);
        }
    }
}


public class ThreadTest {
    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Example example = new Example();
        Thread t1 = new Thread1(example);
        Thread t2 = new Thread2(example);
        t1.start();
        t2.start();
    }
}
```

如果一个对象有多个synchronized方法，某一时刻某个线程已经进入到了某个synchronized方法，那么在该方法没有执行完毕前，其他线程是无法访问该对象的任何synchronized方法的。

**结论：**

当synchronized关键字修饰一个方法的时候，该方法叫做同步方法。Java中的每个对象都有一个锁(lock)，或者叫做监视器(monitor)，当一个线程访问某个对象的synchronized方法时，<span style="color:red">将该对象上锁，其他任何线程都无法再去访问该对象的synchronized方法了(这里是指所有的同步方法，而不仅仅是同一个方法)</span>，直到之前的那个线程执行方法完毕后（或者是抛出了异常），才将该对象的锁释放掉，其他线程才有可能再去访问该对象的synchronized方法。注意这时候是给对象上锁，如果是不同的对象，则各个对象之间没有限制关系。
**尝试在代码中构造第二个线程对象时传入一个新的Example对象，则两个线程的执行之间没有什么制约关系。**

#### 3.考虑静态的同步方法

当一个synchronized关键字修饰的方法同时又被static修饰，之前说过，非静态的同步方法会将对象上锁，但是静态方法不属于对象，而是属于类，它会<span style="color:red">将这个方法所在的类的Class对象上锁</span>。

**一个类不管生成多少个对象，它们所对应的是同一个Class对象。**

```java
package com.itmyhome;

class Thread1 extends Thread {
    private Example example;

    public Thread1(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute();
    }
}


class Thread2 extends Thread {
    private Example example;

    public Thread2(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute2();
    }
}


class Example {
    // 静态同步
    public synchronized static void execute() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("Hello: " + i);
        }
    }

    public synchronized static void execute2() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("Hello: " + i);
        }
    }
}


public class ThreadTest {
    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Example example = new Example();

        // 此处即便传入不同的对象，静态方法同步仍然不允许多个线程同时执行
        Example example2 = new Example();
        Thread t1 = new Thread1(example);
        Thread t2 = new Thread2(example2);
        t1.start();
        t2.start();
    }
}
```

所以如果是静态方法的情况(execute()和execute2()都加上static关键字)，即便是向两个线程传入不同的Example对象，这两个线程仍然是互相制约的，必须先执行完一个，再执行下一个。

**结论：**

如果某个synchronized方法是static的，那么当线程访问该方法时，它锁的并不是synchronized方法所在的对象，而是synchronized方法所在的类所对应的Class对象。Java中，无论一个类有多少个对象，这些对象会对应唯一一个Class对象，因此当线程分别访问同一个类的两个对象的两个static，synchronized方法时，它们的执行顺序也是顺序的，也就是说一个线程先去执行方法，执行完毕后另一个线程才开始。

#### 4. synchronized块

synchronized块写法：

```java
synchronized(object)
{　 

}
```

表示线程在执行的时候会将object对象上锁。（注意这个对象可以是任意类的对象，也可以使用this关键字）。
这样就可以自行规定上锁对象。	

```java
package com.itmyhome;

class Thread1 extends Thread {
    private Example example;

    public Thread1(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute();
    }
}


class Thread2 extends Thread {
    private Example example;

    public Thread2(Example example) {
        this.example = example;
    }

    @Override
    public void run() {
        example.execute2();
    }
}


class Example {
    private Object object = new Object();

    public void execute() {
        synchronized (object) {
            for (int i = 0; i < 10; i++) {
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                System.out.println("Hello: " + i);
            }
        }
    }

    public void execute2() {
        synchronized (object) {
            for (int i = 0; i < 10; i++) {
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                System.out.println("Hello: " + i);
            }
        }
    }
}


public class ThreadTest {
    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Example example = new Example();
        Thread t1 = new Thread1(example);
        Thread t2 = new Thread2(example);
        t1.start();
        t2.start();
    }
}
```

例子程序4所达到的效果和例子程序2的效果一样，都是使得两个线程的执行顺序进行，而不是并发进行，当一个线程执行时，将object对象锁住，另一个线程就不能执行对应的块。

synchronized方法实际上等同于用一个synchronized块包住方法中的所有语句，然后在synchronized块的括号中传入this关键字。当然，如果是静态方法，需要锁定的则是class对象。

可能一个方法中只有几行代码会涉及到线程同步问题，所以synchronized块比synchronized方法更加细粒度地控制了多个线程的访问，只有synchronized块中的内容不能同时被多个线程所访问，方法中的其他语句仍然可以同时被多个线程所访问（包括synchronized块之前的和之后的）。

注意：被synchronized保护的数据应该是私有的。

**结论：**

+ **synchronized方法**是一种粗粒度的并发控制，某一时刻，只能有一个线程执行该synchronized方法；
+ **synchronized块**则是一种细粒度的并发控制，只会将块中的代码同步，位于方法内、synchronized块之外的其他代码是可以被多个线程同时访问到的。