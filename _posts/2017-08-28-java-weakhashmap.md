---
layout: post
blog_id: "java-weakhashmap"
title: "WeakHashMap实现原理及源码分析"
date: 2017-08-28 00:00:00 -0700
tags: 集合
category: 集合
summary: 和HashMap一样，WeakHashMap 也是一个散列表
comments: false
---

和HashMap一样，WeakHashMap 也是一个散列表，它存储的内容也是键值对(key-value)映射，而且键和值都可以是null。不过WeakHashMap的键是“弱键”。在 WeakHashMap 中，当某个键不再正常使用时，会被从WeakHashMap中被自动移除。这个“弱键”的原理大致上就是，通过WeakReference和ReferenceQueue实现的。

WeakHashMap特点是当除了自身有对Key的引用外，如果此Key没有其他引用，那么此Map会自动丢弃该值。如清单1所示代码声明了两个Map对象，一个是HashMap，一个是WeakHashMap，同时向两个map中放入 A、B 两个对象，当HashMap删除 A，并且 A、B 都指向Null时，WeakHashMap中的 A 将自动被回收掉。出现这个状况的原因是，对于 A 对象而言，当HashMap删除并且将 A 指向Null后，除了WeakHashMap中还保存 A 外已经没有指向 A 的指针了，所以WeakHashMap会自动舍弃掉 a，而对于 B 对象虽然指向了null，但HashMap中还有指向 B 的指针，所以WeakHashMap将会保留 B 对象。

##### 清单1

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.WeakHashMap;


public class Test {
    public static void main(String[] args) {
        String a = new String("A");
        String b = new String("B");

        // HashMap
        HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap.put(a, "AAA");
        hashMap.put(b, "BBB");

        // WeakHashMap
        WeakHashMap<String, String> weakHashMap = new WeakHashMap<String, String>();
        weakHashMap.put(a, "AAA");
        weakHashMap.put(b, "BBB");

        hashMap.remove(a);
        a = null;
        b = null;
        System.gc();

        Iterator<Entry<String, String>> ite = hashMap.entrySet().iterator();
        System.out.println("***输出HashMap***");

        while (ite.hasNext()) {
            Entry<String, String> entry = ite.next();
            System.out.println(entry.getKey() + " --> " + entry.getValue());
        }

        Iterator<Entry<String, String>> ite2 = weakHashMap.entrySet().iterator();
        System.out.println("***输出WeakHashMap***");

        while (ite2.hasNext()) {
            Entry<String, String> entry = ite2.next();
            System.out.println(entry.getKey() + " --> " + entry.getValue());
        }
    }
}

```

输出结果：

```java
***输出HashMap***
B --> BBB
***输出WeakHashMap***
B --> BBB
```

WeakHashMap 主要通过 `expungeStaleEntries` 这个函数来实现移除其内部不用的条目，从而达到自动释放内存的目的。基本上只要对 WeakHashMap 的内容进行访问就会调用这个函数，从而达到清除其内部不再为外部引用的条目。但是如果预先生成了 WeakHashMap，而在 GC 以前又不曾访问该 WeakHashMap, 那不是就不能释放内存了吗？

##### 清单2

```java
import java.util.ArrayList;
import java.util.List;
import java.util.WeakHashMap;


public class WeakHashMapTest1 {
    public static void main(String[] args) throws Exception {
        List<WeakHashMap<byte[][], byte[][]>> maps = new ArrayList<WeakHashMap<byte[][], byte[][]>>();

        for (int i = 0; i < 1000; i++) {
            WeakHashMap<byte[][], byte[][]> d = new WeakHashMap<byte[][], byte[][]>();
            d.put(new byte[1000][1000], new byte[1000][1000]);
            maps.add(d);
            System.gc();
            System.out.println(i);
        }
    }
}

```

不改变任何 JVM 参数的情况运行上面所示代码，由于 Java 默认内存是 64M，抛出内存溢出了错误

```java
240
241
242
243
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at com.becoda.bkms.bus.basics.web.WeakHashMapTest1.main(WeakHashMapTest1.java:12)
```

果不其然，WeakHashMap 这个时候并没有自动帮我们释放不用的内存。清单3 所示代码不会出现内存溢出问题。

##### 清单3

```java
import java.util.ArrayList;
import java.util.List;
import java.util.WeakHashMap;


public class WeakHashMapTest2 {
    public static void main(String[] args) throws Exception {
        List<WeakHashMap<byte[][], byte[][]>> maps = new ArrayList<WeakHashMap<byte[][], byte[][]>>();

        for (int i = 0; i < 1000; i++) {
            WeakHashMap<byte[][], byte[][]> d = new WeakHashMap<byte[][], byte[][]>();
            d.put(new byte[1000][1000], new byte[1000][1000]);
            maps.add(d);
            System.gc();
            System.err.println(i);

            for (int j = 0; j < i; j++) {
                System.err.println(j + " size" + maps.get(j).size());
            }
        }
    }
}

```

运行结果发现这次测试输出正常, 不再出现内存溢出问题。<span style="text-decoration: underline;">总的来说，WeakHashMap 并不是你什么也不干它就能自动释放内部不用的对象的，而是在你访问它的内容的时候释放内部不用的对象</span>。WeakHashMap 实现弱引用，是因为它的 Entry<K,V>是继承自 WeakReference<K>的，在 WeakHashMap$Entry<K,V>的类定义及构造函数里面如 清单4 所示。

##### 清单4. WeakHashMap 类定义

```java
private static class Entry<K,V> extends WeakReference<K> 
implements Map.Entry<K,V> Entry(K key, V value, ReferenceQueue<K> queue,int hash, Entry<K,V> next) { 
    super(key, queue); 
    this.value = value; 
    this.hash = hash; 
    this.next = next; 
}
```

请注意它构造父类的语句：“super(key, queue);”，传入的是 Key，因此 Key 才是进行弱引用的，Value 是直接强引用关联在 this.value 之中。在 System.gc() 时，Key 中的 Byte 数组进行了回收，而 Value 依然保持 (Value 被强关联到 Entry 上，Entry 又关联在 Map 中，Map 关联在 ArrayList 中)。

For 循环中每次都 New 一个新的 WeakHashMap，在 Put 操作后，虽然 GC 将 WeakReference 的 Key 中的 Byte 数组回收了，并将事件通知到了 ReferenceQueue，但后续却没有相应的动作去触发 WeakHashMap 去处理 ReferenceQueue，所以 WeakReference 包装 Key 依然存在于 WeakHashMap 中，其对应的 value 也当然存在。

<span style="text-decoration: underline;">那 value 是何时被清除的呢? 对清单 2 和清单 3 两个示例程序进行分析可知，清单 3 的 maps.get(j).size() 触发了 Value 的回收，那又如何触发的呢？查看 WeakHashMap 源码可知,Size 方法调用了 expungeStaleEntries 方法，该方法对 JVM 要回收的的 Entry(Quene 中) 进行遍历，并将 Entry 的 Value 置空，回收了内存。所以效果是 Key 在 GC 的时候被清除，Value 在 Key 清除后访问 WeakHashMap 被清除。</span>

WeakHashMap 类是线程不同步的，可以使用 Collections.synchronizedMap 方法来构造同步的 WeakHashMap, 每个键对象间接地存储为一个弱引用的指示对象。因此，不管是在映射内还是在映射之外，只有在垃圾回收器清除某个键的弱引用之后，该键才会自动移除。需要注意的是，WeakHashMap 中的值对象由普通的强引用保持。因此应该小心谨慎，确保值对象不会直接或间接地强引用其自身的键，因为这会阻止键的丢弃。注意，值对象可以通过 WeakHashMap 本身间接引用其对应的键，这就是说，某个值对象可能强引用某个其他的键对象，而与该键对象相关联的值对象转而强引用第一个值对象的键。

处理此问题的一种方法是，在插入前将值自身包装在 WeakReferences 中，如：m.put(key, new WeakReference(value))，然后，分别用 get 进行解包，该类所有“collection 视图方法”返回的迭代器均是快速失败的，在迭代器创建之后，如果从结构上对映射进行修改，除非通过迭代器自身的 Remove 或 Add 方法，其他任何时间任何方式的修改，迭代器都将抛出 ConcurrentModificationException。因此，面对并发的修改，迭代器很快就完全失败，而不是冒着在将来不确定的时间任意发生不确定行为的风险。

注意，我们不能确保迭代器不失败，一般来说，存在不同步的并发修改时，不可能做出任何完全确定的保证。
