---
layout: post
blog_id: "java-arraylist-vector"
title: "ArrayList和Vector的区别"
date: 2017-07-24 00:00:00 -0700
tags: Java
category: Java
summary: ArrayList和Vector都实现了List接口，底层都是基于Java数组来存储集合元素
comments: false
---

Vector和ArrayList这两个集合类的本质并没有太大的不同，它们都实现了List接口，而且底层都是基于Java数组来存储集合元素。

在ArrayList集合类的源代码中可以看到如下一行。

```java
//采用elementData数组来保存集合元素
private transient Object[] elementData;
```

在Vector集合类的源代码中也可看到类似的一行。

```java
//采用elementData数组来保存集合元素
protected Object[] elementData;
```

从上面代码可以看出，ArrayList使用 `transient` 修饰了 elementData 数组。这保证系统序列化ArrayList对象时不会直接序列号elementData数组，而是通过ArrayList提高的writeObject、readObject方法来实现定制序列化；但对于Vector而言，它没有使用transient修饰elementData数组，而且Vector只提供了一个writeObject方法，并未完全实现定制序列化。

从序列化机制的角度来看，ArrayList的实现比Vector的实现更安全。除此之外，`Vector其实就是ArrayList的线程安全版本`，ArrayList和Vector绝大部分方法的实现都是相同的，只是Vector的方法增加了 `synchronized`修饰。

下面先来看**ArrayList中的add(int index, E element)**方法的源代码

```java
public void add(int index, E element) {
	//如果添加位置大于集合长度或者小于0，抛出异常
	if (index > size || index < 0)
	    throw new IndexOutOfBoundsException(
		"Index: "+index+", Size: "+size);
	
	//保证ArrayList底层的数组可以保存所有集合元素
	ensureCapacity(size+1);  // Increments modCount!!
	//将elementData数组中index位置之后的所有元素向后移动一位
	//也就是将elementData数组的index位置的元素空出来
	System.arraycopy(elementData, index, elementData, index + 1,
			 size - index);
	//将新元素放入elementData数组的index位置
	elementData[index] = element;
	size++;
}
```

再来看**Vector中add(int index, E element)**方法的源代码，如下所示。

```java
public void add(int index, E element) {
    insertElementAt(element, index);
}
```

从上面代码可以看出：Vector的add(int index, E element)方法其实就是insertElementAt(element, index)方法。下面是insertElementAt(element, index) 方法的源代码。

```java
public synchronized void insertElementAt(E obj, int index) {
	//增加集合的修改次数
	modCount++;                                //①
	//如果添加位置大于集合长度，抛出异常
	if (index > elementCount) {
	    throw new ArrayIndexOutOfBoundsException(index
						     + " > " + elementCount);
	}
	//保证ArrayList底层的数组可以保存所有集合元素
	ensureCapacityHelper(elementCount + 1);
	//将elementData数组中index位置之后的所有元素向后移动一位
	//也就是将elementData数组的index位置的元素空出来
	System.arraycopy(elementData, index, elementData, index + 1, elementCount - index);
	//将新元素放入elementData数组的index位置
	elementData[index] = obj;
	elementCount++;
}
```

将ArrayList中的add(int index, E element)方法和Vector的insertElementAt(E obj, int index)方法进行对比，可以发现Vector的方法只是多了synchronized修饰，而且多了①行代码。这并不代表ArrayList的add(int index, E element)方法就没有这行代码，ArrayList只是将这行代码放在ensureCapacity(size + 1)中完成。

> ArrayList中使用size实例变量来保存集合中元素的个数，而Vector中使用elementCount实例变量来保存集合元素的个数。两个变量的作用没有任何区别，只是size变量名更简洁。

**下面是ArrayList的ensureCapacity(int minCapacity)方法的源代码**

```java
public void ensureCapacity(int minCapacity) {
	//增加ArrayList的修改次数
	modCount++;
	//保存ArrayList底层数组的长度
	int oldCapacity = elementData.length;
	//如果minCapacity大于原数组的长度
	if (minCapacity > oldCapacity) {
	    //创建一个新数组变量保存elementData数组
	    Object oldData[] = elementData;
	    //将新容量扩充为原来的1.5倍
	    int newCapacity = (oldCapacity * 3)/2 + 1;
	    //如果newCapacity依然小于minCapacity,直接将minCapacity赋给newCapacity
    	    if (newCapacity < minCapacity)
		newCapacity = minCapacity;
            // minCapacity is usually close to size, so this is a win:
	    //通过Arrays的copyof复制一个新数组，新数组长度为newCapacity
        elementData = Arrays.copyOf(elementData, newCapacity);
	}
}
```

类似地，Vector提供了ensureCapacityHelper(int minCapacity)方法来完成类似地功能，如下所示。

```java
private void ensureCapacityHelper(int minCapacity) {
	//保存Vector底层数组的长度
	int oldCapacity = elementData.length;
	//如果minCapacity大于原数组的长度
	if (minCapacity > oldCapacity) {
	    //创建一个新数组变量保存elementData数组
	    Object[] oldData = elementData;
	    //如果capacityIncrement > 0，则newCapacity等于oldCapacity加capacityIncrement
	    //否则，将新容量扩充为原来的2倍
	    int newCapacity = (capacityIncrement > 0) ?
		(oldCapacity + capacityIncrement) : (oldCapacity * 2);
    	    if (newCapacity < minCapacity) {
		newCapacity = minCapacity;
	    }
            elementData = Arrays.copyOf(elementData, newCapacity);
	}
}
```

将ArrayList中的ensureCapacity(int minCapacity)方法和Vector的ensureCapacityHelper(int minCapacity)方法进行对比，可以发现这两个方法几乎完全相同，只是在扩充底层数组的容量时略有区别而已。`ArrayList总是将底层容量扩充为原来的1.5倍，但Vector则多了一个选择：当capacityIncrement实例变量大于0时，扩充后的容量等于原来的容量加上capacityIncrement的值`。

Vector的ensureCapacityHelper(int minCapacity)方法在扩充底层数组容量时多一个选择是因为，创建Vector可以传入一个capacityIncrement参数，如下构造器所示。

```java
Vector(int initialCapacity, int capacityIncrement)
```

以initialCapacity作为底层数组的初始长度，以capacityIncrement作为数组长度扩充时的增大步长来创建Vector对象。但对于ArrayList而言，它的构造器最多只能指定一个initialCapacity参数。

#### 总结：

+ ArrayList和Vector都实现了List接口，底层都是基于Java数组来存储集合元素
+ ArrayList使用transient修饰了elementData数组，而Vector则没有
+ Vector是ArrayList的线程安全版本
+ 容量扩充 ArrayList为0.5倍+1，而Vector若指定了增长系数，则新的容量="原始容量+增长系数", 否则增长为原来的1倍









