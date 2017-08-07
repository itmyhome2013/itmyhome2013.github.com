---
layout: post
blog_id: "java-concurrentmodificationexception"
title: "Java ConcurrentModificationException异常解决"
date: 2017-08-07 00:00:00 -0700
tags: [集合,并发]
category: 并发
summary: CopyOnWrite容器即写时复制的容器
comments: false
---

上篇文章介绍Iterator遍历ArrayList时有可能引发ConcurrentModificationException异常产生的原因是`modCount和expectedModCount的值不一致`，具体介绍参见 <a href="http://blog.itmyhome.com/2017/08/java-iterator">Iterator迭代器</a>

#### 异常解决方法

##### **1、单线程环境**

仔细观察我们会发现Iterator也提供了一个remove()方法，实质也是调用了ArrayList中的remove，源码如下：

```java
public void remove() {
    if (lastRet == -1)
	throw new IllegalStateException();
        checkForComodification();

    try {
	AbstractList.this.remove(lastRet);
	if (lastRet < cursor)
	    cursor--;
	lastRet = -1;
	expectedModCount = modCount;
    } catch (IndexOutOfBoundsException e) {
	throw new ConcurrentModificationException();
    }
}
```

从上面代码可以看出 增加了 **expectedModCount = modCount;** 所以不会抛出ConcurrentModificationException异常

##### **2、多线程环境**

在多线程环境下，我们再次验证上面代码

```java
public class Test {
    static List<String> list = new ArrayList<String>();

    public static void main(String[] args) {
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("D");

        // 用于读取操作的线程
        new Thread() {
                public void run() {
                    Iterator<String> ite = list.iterator();

                    while (ite.hasNext()) {
                        String str = ite.next();
                        System.out.println(Thread.currentThread().getName() +
                            ": " + str);

                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                } ;
            }.start();

        // 用于删除操作的线程
        new Thread() {
                public void run() {
                    Iterator<String> ite = list.iterator();

                    while (ite.hasNext()) {
                        String str = ite.next();

                        if ("B".equals(str)) {
                            ite.remove();
                        }
                    }
                };
            }.start();
    }
}

```

输出：

```java
Thread-0: A
Exception in thread "Thread-0" java.util.ConcurrentModificationException
	at java.util.AbstractList$Itr.checkForComodification(AbstractList.java:372)
	at java.util.AbstractList$Itr.next(AbstractList.java:343)
	at com.collection.Test$1.run(Test.java:24)

```

出现异常的原因是一个线程修改了list的modCount，而导致另一个线程进行迭代时modCount与该迭代器的expectedModCount不相等

**解决方法1、迭代前加synchronized锁**

```java
public class Test {
    static List<String> list = new ArrayList<String>();

    public static void main(String[] args) {
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("D");

        // 用于读取操作的线程
        new Thread() {
                public void run() {
                    Iterator<String> ite = list.iterator();

                    synchronized (list) { // 加锁
                        while (ite.hasNext()) {
                            String str = ite.next();
                            System.out.println(Thread.currentThread().getName() +
                                ": " + str);

                            try {
                                Thread.sleep(100);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                } ;
            }.start();

        // 用于删除操作的线程
        new Thread() {
                public void run() {
                    Iterator<String> ite = list.iterator();

                    synchronized (list) { // 加锁
                        while (ite.hasNext()) {
                            String str = ite.next();

                            if ("B".equals(str)) {
                                ite.remove();
                            }
                        }
                    }
                };
            }.start();
    }
}
```

**解决方法2、使用CopyOnWriteArrayList**

```java
public class Test {
    static List<String> list = new CopyOnWriteArrayList<String>();

    public static void main(String[] args) {
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("D");

        // 用于读取操作的线程
        new Thread() {
                public void run() {
                    Iterator<String> ite = list.iterator();

                    while (ite.hasNext()) {
                        String str = ite.next();
                        System.out.println(Thread.currentThread().getName() +
                            ": " + str);

                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                } ;
            }.start();

        // 用于删除操作的线程
        new Thread() {
                public void run() {
                    Iterator<String> ite = list.iterator();

                    while (ite.hasNext()) {
                        String str = ite.next();

                        if ("B".equals(str)) {
                            list.remove(str);
                        }
                    }
                } ;
            }.start();
    }
}
```

CopyOnWrite容器即写时复制的容器。通俗的理解是当我们往一个容器添加元素的时候，不直接往当前容器添加，而是先将当前容器进行Copy，复制出一个新的容器，然后新的容器里添加元素，添加完元素之后，再将原容器的引用指向新的容器。这样做的好处是我们可以对CopyOnWrite容器进行并发的读，而不需要加锁，因为当前容器不会添加任何元素。所以CopyOnWrite容器也是一种读写分离的思想，读和写不同的容器。


