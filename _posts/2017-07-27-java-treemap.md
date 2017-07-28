---
layout: post
blog_id: "treemap"
title: "TreeMap实现原理及源码分析"
date: 2017-07-27 00:00:00 -0700
tags: Java
category: Java
summary: TreeMap是一个有序的key-value集合，基于红黑树(Red-Black tree)实现
comments: false
---

TreeMap是一个有序的key-value集合，基于`红黑树(Red-Black tree)`实现。该映射根据其键的自然顺序进行排序，或者根据创建时提供的`Comparator`进行排序、

对于TreeMap而言，每个Entry都被当成“红黑树”的一个节点对待，示例如下：

```java
public class TreeMapTest {
    public static void main(String[] args) {
        TreeMap<String, Float> map = new TreeMap<String, Float>();
        map.put("B", 88.0f);
        map.put("C", 95.0f);
        map.put("A", 90.0f);

        System.out.println(map);
    }
}
```

当程序执行map.put(“B”, 88.0f);时，系统将直接把 “B”-88.0f 这个Entry放入Map中，这个Entry就是该“红黑树”的根节点。接着程序执行 map.put(“C”, 95.0f); 时，会将 “C”-95.0f 作为新节点添加到已有的红黑树中。

以后每向TreeMap中放入一个key-value对，系统都需要将该Entry当成一个新节点，添加到已有红黑树中，通过这种方式就可以保证TreeMap中所有key总是由小到大地排列。例如，输出上面程序，将看到如下结果(所有key由小到大地排列)。

```bath
{A=90.0, B=88.0, C=95.0}
```

对于TreeMap而言，由于它底层采用一颗“红黑树”来保存集合中的Entry，这意味着TreeMap添加元素、取出元素的性能都比HashMap低。当TreeMap添加元素时，需要通过循环找到新增Entry的插入位置，因此比较耗性能；当从TreeMap中取出元素时，需要通过循环才能找到合适的Entry，也比较耗性能。但TreeMap、TreeSet相比HashMap、HashSet的优势在于：TreeMap中的所有Entry总是按key根据指定排序规则保存有序状态，TreeSet中的所有元素总是根据指定排序规则保存有序状态。

> 红黑树是一种自平衡二叉查找树，树中每个节点的值，都大于或等于在它的左子树中的所有节点的值，并且小于或等于在它的右子树中的所有节点的值，这确保红黑树运行时可以快速地在树中查找和定位的所需节点。

对于TreeMap集合而言，其关键就是put(K key, V value), 该方法实现了将Entry放入TreeMap的Entry链，并保证该Entry链总是处于有序状态。下面是该方法的源代码。

```java
public V put(K key, V value) {
    // 先以 t 保存链表的 root 节点
    Entry<K,V> t = root;
    // 如果 t==null，表明是一个空链表，即该 TreeMap 里没有任何 Entry
    if (t == null) {
        // 将新的key-value创建一个 Entry,并将该 Entry 作为 root
        root = new Entry<K,V>(key, value, null);
	//设置该Map集合的size为1,代表包含一个Entry
        size = 1;
	//记录修改次数为1
        modCount++;
        return null;
    }
    int cmp;
    Entry<K,V> parent;
    // split comparator and comparable paths
    Comparator<? super K> cpr = comparator;
    // 如果比较器 cpr 不为 null,即表明采用定制排序
    if (cpr != null) {
        do {
            // 使用 parent 上次循环后的 t 所引用的 Entry
            parent = t;
	    // 拿新插入的key和t的key进行比较
            cmp = cpr.compare(key, t.key);
	    // 如果新插入的key小于t的key，t等于t的左边节点
            if (cmp < 0)
                t = t.left;
	    // 如果新插入的key大于t的key，t等于t的右边节点
            else if (cmp > 0)
                t = t.right;
	    // 如果两个key相等，新value覆盖原有的value，并返回原有的value
            else
                return t.setValue(value);
        } while (t != null);
    }
    else {
        if (key == null)
            throw new NullPointerException();
        Comparable<? super K> k = (Comparable<? super K>) key;
        do {
	    // 使用parent上次循环后的t所引用的Entry
            parent = t;
	    // 拿新插入的key和t的key进行比较
            cmp = k.compareTo(t.key);
	    // 如果新插入的key小于t的key，t等于t的左边节点
            if (cmp < 0)
                t = t.left;
	    // 如果新插入的key大于t的key，t等于t的右边节点
            else if (cmp > 0)
                t = t.right;
	    // 如果两个key相等，新value覆盖原有的value，并返回原有的value
            else
                return t.setValue(value);
        } while (t != null);
    }
    // 将新插入的节点作为parent节点的子节点
    Entry<K,V> e = new Entry<K,V>(key, value, parent);
    // 如果新插入key小于parent的key，则e作为parent的左子节点
    if (cmp < 0)
        parent.left = e;
    // 如果新插入key小于parent的key，则e作为parent的右子节点
    else
        parent.right = e;
    // 修复红黑树
    fixAfterInsertion(e);          //①
    size++;
    modCount++;
    return null;
}
```

上面程序中的粗体字代码就是实现排序二叉树的关键算法。<span style="text-decoration:underline">每当程序希望添加新节点时，总是从树的根节点开始比较，即将跟节点当成当前节点。如果新增节点大于当前节点且当前节点的右子节点存在，则以右子节点作为当前节点；如果新增节点小于当前节点且当前节点的左子节点存在，则以左子节点作为当前节点；如果新增节点等于当前节点，则用新增节点覆盖当前节点，并结束循环--直到找到某个节点的左、右子节点不存在，将新节点添加为该节点的子节点。如果新节点比该节点大，则添加其为右子节点；如果新节点比该节点小，则添加其为左子节点。</span>

当TreeMap根据key来取出value时，TreeMap对应的方法如下。

```java
public V get(Object key) {
    // 根据指定key取出对应的Entry
    Entry<K,V> p = getEntry(key);
    // 返回该Entry所包含的value
    return (p==null ? null : p.value);
}
```

从上面程序代码可以看出，get(Object key)方法实质上是由getEntry()方法实现的。
这个getEntry()方法的代码如下。

```java
final Entry<K,V> getEntry(Object key) {
    // 如果comparator不为null，表明程序采用定制排序
    if (comparator != null)
	// 调用getEntryUsingComparator方法取出对应的key
        return getEntryUsingComparator(key);
    // 如果key形参的值为null,抛出NullPointerException异常
    if (key == null)
        throw new NullPointerException();
// 将key强制类型转换为Comparable实例
Comparable<? super K> k = (Comparable<? super K>) key;
    // 从树的根节点开始
    Entry<K,V> p = root;
    while (p != null) {
        // 拿key与当前节点的key进行比较
        int cmp = k.compareTo(p.key);
	// 如果key小于当前节点的key，向左子树搜索
        if (cmp < 0)
            p = p.left;
	// 如果key大于当前节点的key，向右子树搜索
        else if (cmp > 0)
            p = p.right;
	// 如果既不大于也不小于，就是找到了目标Entry
        else
            return p;
    }
    return null;
}
```

上面的getEntry(Object obj)方法也是充分利用排序二叉树的特征来搜索目标Entry。<span style="text-decoration:underline">程序依然从二叉树的根节点开始，如果被搜索节点大于当前节点，程序向“右子树”搜索；如果被搜索节点小于当前节点，程序向“左子树”搜索；如果相等，那就是找到了指定节点。</span>

当TreeMap里的comparator!=null,即表明该TreeMap采用了定制排序。在采用定制排序的方式下，TreeMap采用getEntryUsingComparator(key)方法来根据key获取Entry。下面是该方法的代码。

```java
final Entry<K,V> getEntryUsingComparator(Object key) {
	K k = (K) key;
	// 获取该TreeMap的comparator
        Comparator<? super K> cpr = comparator;
        if (cpr != null) {
	    //从根节点开始
            Entry<K,V> p = root;
            while (p != null) {
	        // 拿key与当前节点的key进行比较
                int cmp = cpr.compare(k, p.key);
		// 如果key小于当前节点的key，向“左子树”搜索
                if (cmp < 0)
                    p = p.left;
		// 如果key大于当前节点的key，向“右子树”搜索
                else if (cmp > 0)
                    p = p.right;
		// 如果既不大于也不小于，就是找到了目标Entry
                else
                    return p;
            }
        }
        return null;
}
```

其实getEntry,getEntryUsingComparator这2个方法的实现思路完全类似，只是前者对自然排序的TreeMap获取有效，后者对定制排序的TreeMap有效。

通过上面源代码的分析不难看出，TreeMap这个工具类的实现其实很简单。或者说，从内部结构来看，TreeMap本质上就是一颗“红黑树”，而TreeMap的每个Entry就是该红黑树的一个节点。











