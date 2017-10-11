---
layout: post
blog_id: "java-threadlocal"
title: "ThreadLocal使用"
date: 2017-10-08 00:00:00 -0700
tags: Java
category: Java
summary: ThreadLocal叫做线程本地变量，也有叫线程局部变量
comments: false
---

#### ThreadLocal含义

ThreadLocal叫做线程本地变量，也有叫线程局部变量。ThreadLocal提供了一种访问某个变量的特殊方式：访问到的变量属于当前线程，即保证每个线程的变量不一样，而同一个线程在任何地方拿到的变量都是一致的,这就是所谓的线程隔离

#### 应用场景

ThreadLocal通常用来共享数据，当需要在多个方法中使用某个变量，这个变量是当前线程的状态，其他线程不依赖这个变量，看下面例子

```java
import java.util.HashMap;
import java.util.Map;

class MyThread implements Runnable {
    private Map map = new HashMap(); // 定义HashMap

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            map.put(i, i); // 向map中添加值

            try {
                Thread.sleep(100);
            } catch (Exception ex) {
            }
        }

        System.out.println(Thread.currentThread().getName() + "# map.size()=" +
            map.size() + " # " + map);
    }
}

public class ThreadLocalTest {
    public static void main(String[] args) {
        MyThread mt = new MyThread();

        Thread[] runs = new Thread[5]; // 创建5个线程

        for (int i = 0; i < runs.length; i++) {
            runs[i] = new Thread(mt);
            runs[i].start(); // 启动线程
        }
    }
}

```

程序输出结果(视情况而定):

```java
Thread-4# map.size()=14 # {0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9}
Thread-1# map.size()=14 # {0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9}
Thread-3# map.size()=14 # {0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9}
Thread-0# map.size()=14 # {0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9}
Thread-2# map.size()=14 # {0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9}
```

启动5个线程，线程向map中写入10个整数值，然后输出map。运行该程序，观察结果我们会发现map中不止10个元素，这说明程序产生了线程安全问题

我们都知道HashMap是非线程安全的，程序启动了10个线程，他们共享了同一个map，10个线程都往map写对象，势必引起线程安全问题。

解决方法可以将map的声明放在run方法中，这样map就成了方法内部变量也可以将HashMap换成Hashtable。当然我们需要另外一种解决方案，使用ThreadLocal。

上面例子修改如下：

```java
import java.util.HashMap;
import java.util.Map;

class GetLocal {
    static ThreadLocal<HashMap> threadLocal = new ThreadLocal<HashMap>() {
            @Override
            protected HashMap initialValue() {
                return new HashMap();
            }
        };
}

class MyThread implements Runnable {
    // private Map map = new HashMap();
    @Override
    public void run() {
        Map map = GetLocal.threadLocal.get();

        for (int i = 0; i < 10; i++) {
            map.put(i, i); // 向map中添加值

            try {
                Thread.sleep(200);
            } catch (Exception ex) {
            }
        }

        System.out.println(Thread.currentThread().getName() + "# map.size()=" +
            map.size() + " # " + map);
    }
}

public class ThreadLocalTest {
    public static void main(String[] args) {
        MyThread mt = new MyThread();

        Thread[] runs = new Thread[5]; // 创建5个线程

        for (int i = 0; i < runs.length; i++) {
            runs[i] = new Thread(mt);
            runs[i].start(); // 启动线程
        }
    }
}
```

#### 实现原理

上面介绍了对ThreadLocal的简单使用，接下来看一下具体ThreadLocal是如何实现的。<br>
先了解一下ThreadLocal类提供的几个方法：

```java
public T get() { }
public void set(T value) { }
public void remove() { }
protected T initialValue() { }
```

get()方法是用来获取ThreadLocal在当前线程中保存的变量副本，set()用来设置当前线程中变量的副本，remove()用来移除当前线程中变量的副本，initialValue()是一个protected方法，一般是用来在使用时进行重写的，它是一个延迟加载方法

**get()方法源码**

```java
public T get() {
	Thread t = Thread.currentThread();
	ThreadLocalMap map = getMap(t);
	if (map != null) {
	    ThreadLocalMap.Entry e = map.getEntry(this);
	    if (e != null)
		return (T)e.value;
	}
	return setInitialValue();
}
```

**getMap方法源码**

```java
ThreadLocalMap getMap(Thread t) {
	return t.threadLocals;
}
```

get()方法的大致意思就是从当前线程中拿到ThreadLocalMap的实例threadLocals，如果threadLocals不为空，那么就以当前ThreadLocal实例为KEY从threadLocals中拿到对应的VALUE。如果不为空，那么就调用setInitialValue()方法初始化threadLocals，最终返回的是initialValue()方法的返回值。<br>
下面是setInitialValue()方法的源码

```java
private T setInitialValue() {
	T value = initialValue();
	Thread t = Thread.currentThread();
	ThreadLocalMap map = getMap(t);
	if (map != null)
		map.set(this, value);
	else
		createMap(t, value);
	return value;
}
```

我们看到map.set(this, value);这句代码将ThreadLocalMap的实例作为KEY，将initialValue()的返回值作为VALUE，set到了threadLocals中。

<br>

参考资料
<hr>

<a href="http://ifeve.com/threadlocal%E4%BD%BF%E7%94%A8/" target="_blank">http://ifeve.com/threadlocal%E4%BD%BF%E7%94%A8/</a><br>
<a href="http://www.cnblogs.com/dolphin0520/p/3920407.html" target="_blank">http://www.cnblogs.com/dolphin0520/p/3920407.html</a>



