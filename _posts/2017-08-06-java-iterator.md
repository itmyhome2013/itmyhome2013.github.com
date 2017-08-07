---
layout: post
blog_id: "java-iterator"
title: "Iterator迭代器"
date: 2017-08-06 00:00:00 -0700
tags: 集合
category: 集合
summary: Iterator是一个迭代器接口，它专门用于迭代各种Collection集合，包括Set集合和List集合
comments: false
---

Iterator是一个迭代器接口，它专门用于迭代各种Collection集合，包括Set集合和List集合。如果查阅JDK的API文档将发现，Iterator迭代器接口只有一个Scanner实现类。显然Scanner并不能用于迭代Set、List集合，那迭代List、Set集合的Iterator迭代器实现类在哪里

下面测试使用Iterator迭代各种集合所返回的Iterator对象。

```java
enum Color {RED,
    YELLOW;
}
public class T {
    /**
     * @param args
     */
    public static void main(String[] args) {
        HashSet<String> hashSet = new HashSet<String>();
        System.out.println("HashSet的Iterator：" + hashSet.iterator());

        LinkedHashSet<String> linkedHashSet = new LinkedHashSet<String>();
        System.out.println("LinkedHashSet的Iterator：" +
            linkedHashSet.iterator());

        TreeSet<String> treeSet = new TreeSet<String>();
        System.out.println("TreeSet的Iterator：" + treeSet.iterator());

        EnumSet<Color> enumSet = EnumSet.allOf(Color.class);
        System.out.println("EnumSet的Iterator：" + enumSet.iterator());

        ArrayList<String> arrayList = new ArrayList<String>();
        System.out.println("ArrayList的Iterator：" + arrayList.iterator());

        Vector<String> vector = new Vector<String>();
        System.out.println("Vector的Iterator：" + vector.iterator());

        LinkedList<String> linkedList = new LinkedList<String>();
        System.out.println("LinkedList的Iterator：" + linkedList.iterator());

        ArrayDeque<String> arrayDeque = new ArrayDeque<String>();
        System.out.println("ArrayDeque的Iterator：" + arrayDeque.iterator());
    }
}

```

上面程序创建了Java的各种集合，然后调用这些集合的iterator()方法来获取各种集合对应的Iterator对象。运行上面程序，结果如下

```java
HashSet的Iterator：java.util.HashMap$KeyIterator@1428ea
LinkedHashSet的Iterator：java.util.LinkedHashMap$KeyIterator@18a49e0
TreeSet的Iterator：java.util.TreeMap$KeyIterator@3c9217
EnumSet的Iterator：java.util.RegularEnumSet$EnumSetIterator@127fa12
ArrayList的Iterator：java.util.ArrayList$Itr@192c8d9
Vector的Iterator：java.util.Vector$Itr@1c05ffd
LinkedList的Iterator：java.util.LinkedList$ListItr@de1b8a
ArrayDeque的Iterator：java.util.ArrayDeque$DeqIterator@1c0f2e5
```

从上面运行结果来看，除了EnumSet集合的Iterator就是RegularEnumSet的一个内部类之外，所有Set集合对应的Iterator都是它`对应的Map类的内部类KeyIterator。这是因为，Set集合底层是通过Map来实现的`。

ArrayList和Vector的实现基本相同，除了ArrayList是线程不安全的，而Vector是线程安全的。因此，它们两个对应的Iterator都是相同的，即AbstractList的内部类Itr。LinkedList集合对应的Iterator是其内部类ListItr。ArrayDeque集合对应的Iterator是ArrayDeque$DeqIterator。

通过上面介绍不难发现，对于Iterator迭代器而言，它只是一个接口。Java要求各种集合都提供一个iterator()方法，该方法可以返回一个Iterator用于遍历该集合中的元素，至于返回的Iterator到底是哪种实现类，程序并不关心，这就是典型的“迭代器模式”。

> Java的Iterator和Enumeration两个接口都是迭代器模式的代表之作，它们就是迭代器模式里的“迭代器接口”，所谓迭代器模式指得是，系统为遍历多种数据列表、集合、容器提供一个标准的“迭代器接口”，这些数据列表、集合、容器就可面向相同的“迭代器接口”编程，通过相同的迭代器接口访问不同数据列表、集合、容器里的数据。不同的数据列表、集合、容器如何实现这个“迭代器接口”，则交给各数据列表、集合、容器自己完成。

#### 迭代时删除指定元素

由于Iterator迭代器只负责对各种集合所包含的元素进行迭代，它自己并没有保留集合元素，因此使用Iterator进行迭代时，通常不应该删除集合元素，否则将引发`ConcurrentModificationException`异常。当然，`Java允许通过Iterator提供的remove()方法删除刚刚迭代的集合`。

但实际上在某些特殊情况下，可以在使用Iterator迭代集合时直接删除集合中某个元素。示例如下

```java
public class Demo {
    /**
     * @itmyhome
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        ArrayList<String> list = new ArrayList<String>();
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("D");
        list.add("E");

        for (Iterator<String> ite = list.iterator(); ite.hasNext();) {
            String str = ite.next();

            if ("D".equals(str)) { //①
                // 删除集合中倒数第二个元素
                list.remove(str);
            }
        }
    }
}

```

上面程序中尝试使用Iterator遍历ArrayList集合时，直接调用List的remove()方法删除指定集合元素。运行上面程序，发现该程序完全可以正常结束，并未发生任何异常。

实际上，对于ArrayList、Vector、LinkedList等List集合而言，当使用Iterator遍历它们时，如果正在遍历倒数第2个集合元素，使用List集合的remove()方法删除集合的任意一个元素并不会引发ConcurrentModificationException异常，当正在遍历其他元素时删除其他元素就会引发该异常。也就是说，如果将程序中①行代码改为等于其他元素，就会引发ConcurrentModificationException异常。

为何使用Iterator遍历List集合的倒数第2个元素时，直接使用List集合的remove()方法删除List集合的倒数第2个元素没有引发ConcurrentModificationException异常呢？关键在于List集合对应的Iterator实现类(Itr)的hasNext()方法，下面是该方法的实现。

```java
public boolean hasNext() {
    // 如果下一步即将访问的集合元素的索引不等于集合的大小，就返回true
    return cursor != size;
}
```

对于Itr遍历器而言，它判断释放还有下一个元素的标准很简单：`如果下一步即将访问的元素的索引不等于集合的大小，就会返回true，否则就会返回false`。当程序使用Iterator遍历List集合的倒数第2个元素时，下一步即将访问的元素的索引为size()-1。如果此时通过List删除集合的任意一个元素，将导致集合size()变为size()-1，折将导致hasNext()方法返回false。也就是说，遍历将提前结束，Iterator不会访问List集合的最后一个元素。

可以在程序①行代码之前添加如下代码来输出每个被遍历到的集合元素

```java
System.out.println(str);
```

添加上面代码之后，可以看到永远不会访问到ArrayList的最后一个集合元素--这就是Itr类的hasNext()方法导致的。

也就是说，如果使用Itr正在遍历List集合的倒数第2个元素，程序直接调用List集合的remove()方法删除任意元素后，程序不会调用Itr的next()方法访问集合的下一个元素。否则Itr总是会引发ConcurrentModificationException异常。Itr的next()方法中调用checkForComodification()方法来检查集合是否被修改，代码如下：

```java
final void checkForComodification() {
    // 如果集合的修改次数和遍历之前的修改次数不相等
    if (modCount != expectedModCount)
	throw new ConcurrentModificationException();
}
```

Itr的checkForComodification()实现非常简单：遍历之前使用expectedModCount保留该集合被修改的次数，每次获取集合的下一个元素之前检查集合的当前修改次数(modCount)与遍历之前的修改次数(expectedModCount)是否相等，如果不相等就直接抛出ConcurrentModificationException异常










