---
layout: post
blog_id: "java-hashtable"
title: "Hashtable实现原理及源码分析"
date: 2017-08-02 00:00:00 -0700
tags: 集合
category: 集合
summary: 和HashMap一样，Hashtable也是一个散列表，存储的内容是键值对(key-value)映射
comments: false
---

#### Hashtable简介

和HashMap一样，Hashtable也是一个散列表，存储的内容是键值对(key-value)映射。
Hashtable在Java中的定义为：

```java
public class Hashtable<K,V>
    extends Dictionary<K,V>
    implements Map<K,V>, Cloneable, java.io.Serializable
```

从源码中可以看出，Hashtable`继承于Dictionary`，实现了Map、Cloneable、Serializable接口。其中Dictionary类是任何可将键映射到相应值的类（如 Hashtable）的抽象父类。Hashtable的函数都是`同步的`，这意味着它是`线程安全`的。`key、value都不可以为null`。此外，Hashtable中的映射不是有序的。

Hashtable是通过“拉链法”实现的哈希表。它包括几个重要的成员变量：`table, count, threshold, loadFactor, modCount`。

+ table是一个Entry[]数组类型,而Entry实际上就是一个单向链表。哈希表的“key-value键值对”都是存储在Entry数组中的。
+ count是Hashtable的大小，它是Hashtable保存的键值对的数量。 
+ threshold是Hashtable的阈值，用于判断是否需要调整Hashtable的容量。threshold的值="容量*加载因子"。
+ loadFactor就是加载因子。 
+ modCount是用来实现fail-fast机制的


#### 部分源码解析：

##### 构造方法

```java
// 指定“容量大小”和“加载因子”的构造函数
public Hashtable(int initialCapacity, float loadFactor) {
	if (initialCapacity < 0)
	    throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal Load: "+loadFactor);

        if (initialCapacity==0)
            initialCapacity = 1;
	this.loadFactor = loadFactor;
	table = new Entry[initialCapacity];
	threshold = (int)(initialCapacity * loadFactor);
}

// 指定“容量大小”的构造函数
public Hashtable(int initialCapacity) {
	this(initialCapacity, 0.75f);
}

// 默认构造函数
public Hashtable() {
	// 指定容量大小为11，加载因子为0.75
	this(11, 0.75f);
}

// 构造一个与给定的 Map 具有相同映射关系的新哈希表
public Hashtable(Map<? extends K, ? extends V> t) {
	this(Math.max(2*t.size(), 11), 0.75f);
	putAll(t);
}
```

##### put() 方法

```java
public synchronized V put(K key, V value) {
	// 确保value不为空，否则抛异常
	if (value == null) {
	    throw new NullPointerException();
	}

	//确保key不在hashtable中
        //首先，通过hash方法计算key的哈希值，并计算得出index值，确定其在table[]中的位置
        //其次，迭代index索引位置的链表，如果该位置处的链表存在相同的key，则替换value，返回旧的value
	Entry tab[] = table;
	int hash = key.hashCode();
	int index = (hash & 0x7FFFFFFF) % tab.length;
	for (Entry<K,V> e = tab[index] ; e != null ; e = e.next) {
	    if ((e.hash == hash) && e.key.equals(key)) {
		V old = e.value;
		e.value = value;
		return old;
	    }
	}

	modCount++;
	if (count >= threshold) {
	    // 若超过阈值，则进行rehash扩容操作
	    rehash();

            tab = table;
            index = (hash & 0x7FFFFFFF) % tab.length;
	}

	// 将Hashtable中index位置的Entry(链表)保存到e中
	Entry<K,V> e = tab[index];
	tab[index] = new Entry<K,V>(hash, key, value, e);
	count++;
	return null;
}
```

##### get() 方法

其过程首先通过hash()方法或得key的哈希值，然后根据hash值得等index所有，然后迭代链表，返回匹配的key对应的value，没有的话返回null。

```java
public synchronized V get(Object key) {
	Entry tab[] = table;
	// 得等hash值
	int hash = key.hashCode();
	// 计算索引值
	int index = (hash & 0x7FFFFFFF) % tab.length;
	for (Entry<K,V> e = tab[index] ; e != null ; e = e.next) {
	    if ((e.hash == hash) && e.key.equals(key)) {
		return e.value;
	    }
	}
	return null;
}
```







