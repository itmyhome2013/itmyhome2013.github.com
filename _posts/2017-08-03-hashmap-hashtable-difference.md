---
layout: post
blog_id: "hashmap-hashtable-difference"
title: "HashMap和Hashtable的区别"
date: 2017-08-03 00:00:00 -0700
tags: 集合
category: 集合
summary: 继承和实现方式不同、线程安全不同、对null值的处理不同
comments: false
---

#### 相同点

HashMap和Hashtable都是存储“键值对(key-value)”的散列表。存储的思想都是：通过table数组存储，数组的每一个元素都是一个Entry；而一个Entry就是一个单向链表，Entry链表中的每一个节点保存了key-value键值对数据。

添加key-value键值对：首先，根据key值计算出哈希值，再计算出数组索引。然后，根据数组索引找到Entry(单向链表)，再遍历单向链表，将key和链表中的每一个节点的key进行对比。若key依据存在Entry链表中，则用该value值取代旧的value值；若key不存在Entry链表中，则新建一个key-value节点，并将该节点插入Entry链表的表头位置。

#### 不同点

##### **1、继承和实现方式不同**

HashMap定义如下

```java
public class HashMap<K,V>
    extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable
```

Hashtable定义如下

```java
public class Hashtable<K,V>
    extends Dictionary<K,V>
    implements Map<K,V>, Cloneable, java.io.Serializable
```

从中，我们可以看出

+ HashMap和Hashtable都实现了Map、Cloneable、java.io.Serializable接口
+ `HashMap继承于AbstractMap，而Hashtable继承于Dictionary`

##### **2、线程安全不同**

+ Hashtable的几乎所有函数都是`同步的，即它是线程安全的，支持多线程`。
+ 而HashMap的函数则是`非同步的，它不是线程安全的`。若要在多线程中使用HashMap，需要我们额外的进行同步处理。 对HashMap的同步处理可以使用Collections类提供的synchronizedMap静态方法，或者直接使用JDK 5.0之后提供的java.util.concurrent包里的ConcurrentHashMap类。

##### **3、对null值的处理不同**

+ HashMap的key、value都可以为null
+ Hashtable的key、value都不可以为null

HashMap的添加key-value的方法

```java
public V put(K key, V value) {
    if (table == EMPTY_TABLE) {
        inflateTable(threshold);
    }
    //如果key为null，调用putForNullKey方法进行处理
    if (key == null)
        return putForNullKey(value);
    //根据key计算Hash值
    int hash = hash(key);
    //搜索指定hash值在对应table中的索引
    int i = indexFor(hash, table.length);
    //如果i索引处的Entry不为null，通过循环不断遍历e元素的下一个元素
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
    //找到指定key与需要放入的key相等(hash值相同，通过equals比较放回true)
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }
    //如果i索引处的Entry为null，表明此处还没有Entry
    modCount++;
    //将key、value添加到i索引处
    addEntry(hash, key, value, i);
    return null;
}
```

Hashtable的添加key-value的方法

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

从上面代码，我们可以看出：

Hashtable的key或value，都不能为null！否则，会抛出异常NullPointerException。

HashMap的key、value都可以为null。 当HashMap的key为null时，HashMap会将其固定的插入table[0]位置(即HashMap散列表的第一个位置)；而且table[0]处只会容纳一个key为null的值，当有多个key为null的值插入的时候，table[0]会保留最后插入的value。

##### **4、支持的遍历种类不同**

+ HashMap只支持Iterator(迭代器)遍历。
+ 而Hashtable支持Iterator(迭代器)和Enumeration(枚举器)两种方式遍历。

##### **5、容量的初始值和增加方式都不一样**

+ HashMap默认的容量大小是16；增加容量时，每次将容量变为“原始容量x2”。
+ Hashtable默认的容量大小是11；增加容量时，每次将容量变为“原始容量x2 + 1”。

##### **6、添加key-value时的hash值算法不同**

+ HashMap添加元素时，是使用自定义的哈希算法。
+ Hashtable没有自定义哈希算法，而直接采用的key的hashCode()。

HashMap添加元素时，是使用自定义的哈希算法。

```java
static int hash(int h) {
     h ^= (h >>> 20) ^ (h >>> 12);
     return h ^ (h >>> 7) ^ (h >>> 4);
}

int hash = hash(key.hashCode());
```

Hashtable没有自定义哈希算法，而直接采用的key的hashCode()。

```java
int hash = key.hashCode();
```






