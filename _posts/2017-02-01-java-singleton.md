---
layout: post
blog_id: "java-singleton"
title: "Java 单例模式的写法"
date: 2017-02-01 00:00:00 -0700
tags: Java
category: Java
summary: 提供静态方法 供外部调用,加入synchronized保证同步
comments: false
---
<br>

```java
public class Singleton {
    /**
     * 如果一个字段被声明成volatile
     * java线程内存模型确保所有线程看到这个变量的值是一致的。
     */
    private volatile static Singleton singleton;

    /**
     * 构造方法私有，外部无法实例化
     */
    private Singleton() {
    }

    /**
     * 提供静态方法 供外部调用
     * 加入synchronized保证同步
     * 双重检查锁定
     * @return
     */
    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }

        return singleton;
    }
}

```

