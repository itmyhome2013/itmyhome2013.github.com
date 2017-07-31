---
layout: post
blog_id: "java-treeset"
title: "TreeSet实现原理及源码分析"
date: 2017-07-30 00:00:00 -0700
tags: 集合
category: 集合
summary: 类似于HashMap和HashSet之间的关系,HashSet底层依赖于HashMap实现,TreeSet底层则采用一个NavigableMap来保存TreeSet集合的元素
comments: false
---

类似于HashMap和HashSet之间的关系，HashSet底层依赖于HashMap实现，TreeSet底层则采用一个NavigableMap来保存TreeSet集合的元素。但实际上，由于NavigableMap只是一个接口，`因此底层依然是使用TreeMap来包含Set集合中的所有元素`。

下面是TreeSet类的部分源代码

```java
public class TreeSet<E> extends AbstractSet<E>
    implements NavigableSet<E>, Cloneable, java.io.Serializable
{
   
    // 使用NavigableMap的key来保存Set集合的元素
    private transient NavigableMap<E,Object> m;
    // 使用一个PRESENT作为Map集合的所有value
    private static final Object PRESENT = new Object();

    // 包访问权限的构造器，以指定的NavigableMap对象创建Set集合
    TreeSet(NavigableMap<E,Object> m) {
        this.m = m;
    }

 
    public TreeSet() {                                  // ①
        // 以自然顺序方式创建一个新的TreeMap,根据该TreeSet创建一个TreeSet
	this(new TreeMap<E,Object>());
    }

    public TreeSet(Comparator<? super E> comparator) {  // ②
        // 以定制顺序方式创建一个新的TreeMap,根据该TreeSet创建一个TreeSet
	// 使用该TreeMap的key来保存Set集合的元素
	this(new TreeMap<E,Object>(comparator));
    }

    public TreeSet(Collection<? extends E> c) {
        // 调用①号构造器创建一个TreeSet，底层以TreeMap保存集合元素
        this();
	// 向TreeSet中添加Collection集合c里的所有元素
        addAll(c);
    }

    public TreeSet(SortedSet<E> s) {
        // 调用②号构造器创建衣蛾TreeSet，底层以TreeMap保存集合元素
        this(s.comparator());
	// 向TreeSet中添加SortedSet集合s里的所有元素
	addAll(s);
    }

    public  boolean addAll(Collection<? extends E> c) {
        // Use linear-time version if applicable
        if (m.size()==0 && c.size() > 0 &&
	    c instanceof SortedSet &&
            m instanceof TreeMap) {
	    // 把c集合强制转换为SortedSet集合
            SortedSet<? extends E> set = (SortedSet<? extends E>) c;
	    // 把m集合强制转换为TreeMap集合
            TreeMap<E,Object> map = (TreeMap<E, Object>) m;
            Comparator<? super E> cc = (Comparator<? super E>) set.comparator();
            Comparator<? super E> mc = map.comparator();
            // 如果cc和mc两个Comparator相等
            if (cc==mc || (cc != null && cc.equals(mc))) {
	        // 把Collection中所有元素添加成TreeMap集合的key
                map.addAllForTreeSet(set, PRESENT);
                return true;
            }
        }
	// 直接调用父类的addAll()方法来实现
        return super.addAll(c);
    }
}
```

从上面代码可以看出，TreeSet的①号、②号构造器都是新建一个TreeMap作为实际存储Set元素的容器，而另外2个构造器则分别依赖于①号和②号构造器。由此可见，TreeSet底层实际使用的存储容器就是TreeMap。

与HashSet完全类似的是，TreeSet里绝大部分方法都是直接调用TreeMap的方法来实现的。







