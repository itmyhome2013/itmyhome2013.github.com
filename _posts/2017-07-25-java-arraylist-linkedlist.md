---
layout: post
blog_id: "arraylist-linkedlist"
title: "ArrayList和LinkedList的区别"
date: 2017-07-25 00:00:00 -0700
tags: Java
category: Java
summary: ArrayList底层采用数组来保存每个集合元素，LinkedList则是一种链式存储的线性表
comments: false
---

List代表一种线性表的数据结构，ArrayList则是一种顺序存储的线性表。ArrayList底层采用**数组**来保存每个集合元素，LinkedList则是一种**链式存储**的线性表。其本质上就是一个双向链表，但它不仅实现了List接口，还实现了Deque接口。也就是说LinkedList既可以当成双向链表使用，也可以当成队列使用，还可以当成栈来使用(Deque代表双端队列，即具有队列的特征，也具有栈的特征)。

ArrayList底层采用一个elementData数组来保存所有的集合元素，因此ArrayList在插入元素时需要完成下面两件事情。

+ 保证ArrayList底层封装的数组长度大于集合元素的个数；
+ 将插入位置之后的所有数组元素“整体搬家”，向后移动一“格”。

反过来，当删除ArrayList集合中指定位置的元素时，程序也要进行”整体搬家”，而且还需将被删索引处的数组元素赋为null。下面是ArrayList集合的remove(int index)方法的源代码。

```java
public E remove(int index) {
	//如果index是大于或等于size,抛出异常
	RangeCheck(index);

	modCount++;
	//index索引处的元素
	E oldValue = (E) elementData[index];
	//计算需要"整体搬家"的元素个数
	int numMoved = size - index - 1;
	//当numMoved大于0时，开始搬家
	if (numMoved > 0)
	    System.arraycopy(elementData, index+1, elementData, index,
			     numMoved);
	//释放被删除的元素
	elementData[--size] = null; // Let gc do its work

	return oldValue;
}
```

`对于ArrayList集合而言，当程序向ArrayList中添加、删除集合元素时，ArrayList底层都需要对数组进行”整体搬家” 因此性能非常差。`

但如果程序调用get(int index)方法来取出ArrayList集合中的元素时，性能和数组几乎相同--非常快。下面是ArrayList集合get(int index)方法的源代码。

```java
public E get(int index) {
	RangeCheck(index);
	//取出index索引处的元素
	return (E) elementData[index];
}
```

LinkedList本质上就是一个`双向链表`，因此它使用如下内部类来保存每个集合元素。

```java
private static class Entry<E> {
	//集合元素
	E element;
	//保存指向下一个链表节点的引用
	Entry<E> next;
	//保存指向上一个链表节点的引用
	Entry<E> previous;
	//普通构造器
	Entry(E element, Entry<E> next, Entry<E> previous) {
	    this.element = element;
	    this.next = next;
	    this.previous = previous;
	}
}
```

从上面代码可以看出，一个Entry对象代表双向链表的一个节点，该对象中next变量指向下一个节点，previous则指向上一个节点。

由于LinkedList采用双向链表来保存集合元素，因此它在添加集合元素时候，只要对链表进行如图所示的操作即可添加一个新节点。

![License Badge]({{ site.baseurl}}/images/java/linkedlist/1.png)

下面是LinkedList添加节点的源代码

```java
//在指定位置插入新节点
public void add(int index, E element) {
    //如果index==size，直接在header之前插入新节点
    //否则，在index索引处的节点之前插入新节点
    addBefore(element, (index==size ? header : entry(index)));
}
```

从上面代码看出，由于LinkedList本质上就是一个双向链表，因此它可以非常方便地在指定节点之前插入新节点，LinkedList在指定位置添加新节点也是通过这种方式来实现的。

上面add(int index, E element)方法实现中用到了以下两个方法。

+ entry(int idnex): 搜索指定索引处的元素。
+ addBefore(E element, Entry ref): 在ref节点之前插入element新节点

entry(int index)实际上就是get(int index)方法的底层实现。对于ArrayList而言，由于它底层采用数组来保存集合元素，因此可以直接根据数组索引取出index位置的元素；但对于LinkedList就比较麻烦了，LinkedList必须一个元素一个元素地搜索，直到找到第index个元素为止。

下面是entry(int index)方法的源代码

```java
//获取指定索引处的节点
private Entry<E> entry(int index) {
    //如果index越界，抛出异常
    if (index < 0 || index >= size)
        throw new IndexOutOfBoundsException("Index: "+index+
                                            ", Size: "+size);
    //从链表的头开始搜索
    Entry<E> e = header;
    //如果index小于size/2
    if (index < (size >> 1)) {
        //从链表的头端开始搜索
        for (int i = 0; i <= index; i++)
            e = e.next;
    }
    //如果index大于size/2
    else {
        //从链表的尾端开始搜索
        for (int i = size; i > index; i--)
            e = e.previous;
    }
    return e;
}
```

上面entry(int index)方法就是一个元素一个元素的找到index索引处的元素，只是由于LinkedList是一个双向链表，因此程序先根据index的值判断它到底离链表头端近(当index<size/2时),还是离链表尾端近。如果离头端近则从头端开始搜索，如果离尾端近则从尾端搜索。LinkedList的get(int index)方法只是对上面entry(int index)方法的简单包装。get(int index)方法的源代码如下。

```java
public E get(int index) {
    return entry(index).element;
}
```

无论如何，LinkedList为了获取指定索引处的元素都是比较麻烦的，系统开销也会比较大。但单纯的插入操作就比较简单了，只要修改几个节点里的previous、next引用的值。下面是addBefore(E element,Entry ref)方法的源代码。

```java
//值指定节点(entry)之前添加一个新节点
private Entry<E> addBefore(E e, Entry<E> entry) {
	//创建新节点，新节点的下一个节点指向entry，上一个节点指向entry的上一个节点
	Entry<E> newEntry = new Entry<E>(e, entry, entry.previous);
	//让entry的上一个节点向后指向新节点
	newEntry.previous.next = newEntry;
	//让entry向前指向新节点
	newEntry.next.previous = newEntry;
	size++;
	modCount++;
	return newEntry;
}
```

如果只是单纯地添加某个节点，LinkedList的性能会非常好，可惜如果需要向指定索引处添加节点，LinkedList必须先找到指定索引处的节点 -- 这个搜索过程的系统开销并不小，因此LinkedList的add(int index,E element)方法的性能并不是特别好。如果希望从LinkedList中删除一个节点，底层双向链表可按如图所示操作。

![License Badge]({{ site.baseurl}}/images/java/linkedlist/2.png)

类似地，LinkedList为了实现remove(int index)方法 -- 删除指定索引处的节点，也必须先通过entry(int index)方法找到index索引处的节点，然后修改它前一个节点的next引用以及后一个节点的previous引用。下面是LinkedList的remove(int index)方法的源代码

```java
public E remove(int index) {
    //搜索到index索引处的节点，然后删除该节点
    return remove(entry(index));
}
```

从上面代码可以看出，程序先调用entry(index)搜索到index索引处的节点，然后调用remove(Entry entry)方法删除指定节点。删除entry节点时只需修改entry前一个节点next引用，修改entry后一个节点的previous引用。下面是该方法的源代码。

```java
private E remove(Entry<E> e) {
	if (e == header)
	    throw new NoSuchElementException();

	//先保存e节点的元素
        E result = e.element;
	e.previous.next = e.next;
	e.next.previous = e.previous;
	//将被删除的元素的两个引用、元素都赋为null、以便垃圾回收
        e.next = e.previous = null;
        e.element = null;
	size--;
	modCount++;
        return result;
}
```




