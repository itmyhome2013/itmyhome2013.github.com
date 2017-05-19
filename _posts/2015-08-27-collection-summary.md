---
layout: post
blog_id: "collection-summary"
title: "集合小结"
date: 2015-08-27 00:00:00 -0700
tags: Java
category: Java
summary: Collection层次结构中的根接口。Collection 表示一组对象，这些对象也称为collection的元素
comments: false
---

<span style="color:red">ArrayList和Vector是采用数组方式存储数据</span>，此数组元素数大于实际存储的数据以便增加和插入数据，都允许直接按序号索引元素，但是插入数据要涉及到数组元素移动等内容操作，所以索引数据快插入数据慢。

<span style="color:red">Vector由于使用了synchronized方法(线程安全)所以性能上比ArrayList要差</span>，<span style="color:red">LinkedList使用双向链表实现存储</span>，按序号索引数据需要进行向前或向后遍历，但是插入数据时只需要记录本项的前后项即可，所以插入速度较快。

Collection 层次结构中的根接口。Collection 表示一组对象，这些对象也称为 collection 的元素。一些collection允许有重复的元素，而另一些则不允许。一些collection是有序的，而另一些则是无序的。JDK 不提供此接口的任何直接实现：它提供更具体的子接口(如 Set 和 List)实现。此接口通常用来传递 collection，并在需要最大普遍性的地方操作这些 collection。

#### **List接口**

<span style="color:red">List是有序的Collection</span>，使用此接口能够精确的控制每个元素插入的位置。用户能够使用索引(元素在List中的位置，类似于数组下标)来访问List中的元素，这类似于java的数组.和Set不同，List允许有相同的元素。实现List接口的常用类有<span style="color:red">ArrayList LinkedList Vector和Stack</span>

#### **Set接口**

Set是一种不包含重复的元素的Collection,即任意的两个元素e1和e2都有e1.equals(e2)=false Set最多有一个null元素

#### **Map接口**

<span style="color:red">Map没有继承Collection接口</span>，Map提供key到value的映射。一个Map中不能包含相同的key,每个key只能映射一个value。Map接口提供3种集合的视图，Map的内容可以被当做一组key集合,一组value集合,或者一组key-value映射。

#### **总结**

如果涉及到堆栈，队列等操作，应该考虑用List，对于需要快速插入，删除元素，应该使用LinkedList，如果需要快速随机访问元素，应该使用ArrayList。如果程序在单线程环境中，或者访问仅仅在一个线程中进行，考虑非同步的类，其效率较高，如果多个线程可能同时操作一个类，应该使用同步的类。要特别注意对哈希表的操作，作为key的对象要正确复写equals和hashCode方法。尽量返回接口而非实际的类型，如返回List而非ArrayList，这样如果以后需要将ArrayList换成LinkedList时，客户端代码不用改变。这就是针对抽象编程。

#### **附：**

#### **Hashtable和HashMap的区别**

HashMap是Hashtable的轻量级实现(非线程安全的实现)，他们都完成了Map接口，主要区别在于HashMap允许空(null)键值(key),由于非线程安全，在只有一个线程访问的情况下，效率要高于Hashtable。 
HashMap允许将null作为一个entry的key或者value，而Hashtable不允许。
HashMap把Hashtable的contains方法去掉了,改成containsvalue和containsKey.因为contains方法容易让人引起误解. 
Hashtable继承自Dictionary类，而HashMap是Java1.2引进的Mapinterface的一个实现。 

最大的不同是，Hashtable的方法是Synchronize的，而HashMap不是，在多个线程访问Hashtable时，不需要自己为它的方法实现同步，而HashMap 就必须为之提供外同步。 
Hashtable和HashMap采用的hash/rehash算法都大概一样，所以性能不会有很大的差异。

就HashMap与HashTable主要从三方面来说。

<span style="color:red">一、历史原因:Hashtable是基于陈旧的Dictionary类的，HashMap是Java 1.2引进的Map接口的一个实现</span>
<span style="color:red">二、同步性:Hashtable是线程安全的，也就是说是同步的，而HashMap是线程序不安全的，不是同步的</span>
<span style="color:red">三、值：只有HashMap可以让你将空值作为一个表的条目的key或value</span>

#### **heap和stack有什么区别**

Java的内存分为两类，一类是栈内存，一类是堆内存。栈内存是指程序进入一个方法时，会为这个方法单独分配一块私属存储空间，用于存储这个方法内部的局部变量，当这个方法结束时，分配给这个方法的栈会释放，这个栈中的变量也将随之释放。堆是与栈作用不同的内存，一般用于存放不放在当前方法栈中的那些数据，例如,使用new创建的对象都放在堆里，所以，它不会随方法的结束而消失。方法中的局部变量使用final修饰后，放在堆中，而不是栈中。 

<br>