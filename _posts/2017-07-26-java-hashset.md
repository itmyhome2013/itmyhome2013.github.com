---
layout: post
blog_id: "java-hashset"
title: "HashSet实现原理及源码分析"
date: 2017-07-26 00:00:00 -0700
tags: Java
category: Java
summary: HashSet是Set接口实现，它按照Hash算法来存储集合中的元素
comments: false
---

#### HashSet简介

HashSet是Set接口实现，它按照Hash算法来存储集合中的元素

+ 不保证元素顺序
+ HashSet是非同步的，如果多个线程同时访问一个HashSet，要通过代码来保证其同步
+ 集合元素可以是null

对于HashSet而言，它是`基于HashMap实现`的。HashSet底层采用HashMap来保存所有元素，查看HashSet源代码，可以看到如下提示。

```java
public class HashSet<E>
	extends AbstractSet<E>
	implements Set<E>, Cloneable, java.io.Serializable
	{
	static final long serialVersionUID = -5024744406713321676L;
	
	//使用 HashMap 的 key 保存 HashSet 中的所有元素
	private transient HashMap<E,Object> map;
	
	//定义一个虚拟的 Object 对象作为 HashMap 的 value
	private static final Object PRESENT = new Object();
	
	//初始化 HashSet，底层会初始化一个 HashMap
	public HashSet() {
	map = new HashMap<E,Object>();
	}

	//以指定的 initialCapacity、loadFactor 创建 HashSet
	//其实就是以相应的参数创建 HashMap
	public HashSet(int initialCapacity, float loadFactor) {
	map = new HashMap<E,Object>(initialCapacity, loadFactor);
	}

	public HashSet(int initialCapacity) {
	map = new HashMap<E,Object>(initialCapacity);
        }

	HashSet(int initialCapacity, float loadFactor, boolean dummy) {
	map = new LinkedHashMap<E,Object>(initialCapacity, loadFactor);
        }

	//调用 map 的 keySet 来返回所有的 key
	public Iterator<E> iterator() {
	    return map.keySet().iterator();
        }
	
	//调用 HashMap 的 size() 方法返回 Entry 的数量，得到该 Set 里元素的个数
	public int size() {
	    return map.size();
        }

      //调用 HashMap 的 isEmpty() 判断该 HashSet 是否为空
	//当 HashMap 为空时，对应的 HashSet 也为空
	public boolean isEmpty() {
	return map.isEmpty();
        }

	//调用 HashMap 的 containsKey 判断是否包含指定key
	//HashSet 的所有元素就是通过 HashMap 的 key 来保存的
	public boolean contains(Object o) {
	return map.containsKey(o);
        }

	//将指定元素放入 HashSet 中，也就是将该元素作为 key 放入 HashMap
	public boolean add(E e) {
	return map.put(e, PRESENT)==null;
        }

	//调用 HashMap 的 remove 方法删除指定 Entry，也就删除了 HashSet 中对应的元素
	public boolean remove(Object o) {
	return map.remove(o)==PRESENT;
        }

	//调用 Map 的 clear 方法清空所有 Entry，也就清空了 HashSet 中所有元素
	public void clear() {
	map.clear();
        }
}
```

由上面源程序可以看出，HashSet的实现其实非常简单， 它只是封装了一个HashMap对象来存储所有的集合元素。所有放入HashSet中的集合元素实际上由HashMap的key来保存，而HashMap的value则由存储了一个PRESENT，它是一个静态的Object对象。

HashSet的绝大部分方法都是通过调用HashMap的方法来实现的，因此HashSet和HashMap两个集合在实现本质上是相同的

由于HashSet的add()方法添加集合元素时实际上转变为调用HashMap的put()方法来添加key-value对，当新放入HashMap的Entry中key与集合中原有Entry的key相同(hashCode()返回值相等，通过equals比较也返回true)时，新添加的Entry的value将覆盖原来Entry的value，但key不会有任何改变。因此，如果向HashSet中添加一个已经存在的元素，新添加的集合元素(底层由HashMap的key保存)不会覆盖已有的集合元素。

#### 判断HashSet元素是否重复

看如下代码：

```java
class Person {
	private String name;
	private int age;

	public Person(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (null != obj && obj instanceof Person) {
			Person p = (Person) obj;
			if (name.equals(p.name) && age == p.age) {
				return true;
			}
		}
		return false;
	}

}

public class HashSetTest {
	public static void main(String[] args) {
		HashSet<Person> set = new HashSet<Person>();
		Person p1 = new Person("zhangsan", 22);
		Person p2 = new Person("zhangsan", 22);

		set.add(p1);
		set.add(p2);

		System.out.println(set.size());

	}
}
```

上面程序中向HashSet里添加两个完全一样的Person("zhangsan", 22)对象，实际输出对象个数为2，这是因为HashSet判断两个对象相等的标准除了要求通过equals()方法返回true之外，还要求两个对象的hashCode()返回值相等。而上面程序没有重写Person类的hashCode()方法，两个Person对象的hashCode()返回值并不相同，因此HashSet会把它们当成2个对象处理。

由此可见，当试图把某个类的对象当成HashMap的key，或者试图将这个类的对象放入HashSet中保存时，重写该类的equals(Object obj)方法和hashCode()方法很重要，而且这两个方法的返回值必须一致。当该类的两个hashCode()返回值相同时，它们通过equals()方法比较也应该返回true。通常来说，所有参与计算hashCode()返回值的关键属性，都应该用于作为equals()比较的标准。

如下程序就正确重写了Person类的hashCode()方法和equals()方法

```java
class Person {
	private String name;
	private int age;

	public Person(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (null != obj && obj instanceof Person) {
			Person p = (Person) obj;
			if (name.equals(p.name) && age == p.age) {
				return true;
			}
		}
		return false;
	}

	@Override
	public int hashCode() {
		return this.name.hashCode();
	}
}

public class HashSetTest {
	public static void main(String[] args) {
		HashSet<Person> set = new HashSet<Person>();
		Person p1 = new Person("zhangsan", 22);
		Person p2 = new Person("zhangsan", 22);

		set.add(p1);
		set.add(p2);

		System.out.println(set.size());

	}
}
```




























