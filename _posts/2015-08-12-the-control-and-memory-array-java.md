---
layout: post
blog_id: "the-control-and-memory-array-java"
title: "Java之数组与内存控制 "
date: 2015-08-12 00:00:00 -0700
tags: Java
category: Java
summary: 数组是大多数编程语言提供的一种复合结构，如果程序需要多个类型相同的变量时，就可以考虑定义一个数组
comments: false
---
<br>

使用Java数组之前必须先对数组对象进行初始化。当数组的所有元素都被分配了合适的内存空间，并指定了初始值时，数组初始化完成。程序以后将不能重新改变数组对象在内存中的位置和大小。从用法角度来看，数组元素相当于普通变量，程序既可以把数组元素的值赋给普通变量，也可把普通变量的值赋给数组元素。

#### **数组初始化**

数组是大多数编程语言提供的一种复合结构，如果程序需要多个类型相同的变量时，就可以考虑定义一个数组。Java语言的数组变量是引用类型的变量，因此具有Java独有的特性。

**Java数组是静态的**

Java语言是典型的静态语言，因此Java的数组是静态的，即当数组被初始化之后，该数组的长度是不可变的。Java程序中的数组必须经初始化才可使用。所谓初始化，就是为数组对象的元素分配内存空间，并为每个数组元素指定初始值。

数组的初始化有以下两种方式。

<span style="color:red">静态初始化：初始化时由程序员显式指定每个数组元素的初始值，由系统决定数组长度。</span>
<span style="color:red">动态初始化：初始化时程序员只指定数组长度，由系统为数组分配初始值。</span>

不管采用哪种方式初始化java数组，一旦初始化完成，该数组的长度就不可改变，java语言允许通过数组的length属性来访问数组的长度

```java
public class T {  
  
	public static void main(String[] args) {  
		//采用静态初始化方式初始化第一个数组  
		String books[] = new String[]{"java学习笔记","SQL案例解析","研读设计模式"};  
		//采用静态初始化的简化形式初始化第二个数组  
		String names[] = {"zhangsan","lisi","wangwu"};  
		//采用动态初始化的语法初始化第三个数组  
		String strArr[] = new String[5];  
		  
		//访问三个数组的长度  
		System.out.println("第一个数组长度: "+books.length);  
		System.out.println("第二个数组长度: "+names.length);  
		System.out.println("第三个数组长度: "+strArr.length);  
	}  
}
```

上面代码声明并初始化了三个数组。这三个数组的长度将会始终不变，程序输出三个数组的长度依次为3,3,5。前面已经指出，java语言的数组变量是引用类型的变量，books,names,strArr这三个变量以及各自引用的数组在

内存中的分配如图所示。

![License Badge]({{ site.baseurl}}/images/java/arrays/1.png)

从图中可以看出，对于静态初始化而言，程序员无需指定数组长度，指定该数组的数组元素，由系统来决定该数组的长度即可。例如books数组，为它指定了3个数组元素，那它的长度就是3。执行动态初始化时，程序员只需指定数组的长度，即为每个数组元素指定所需的内存空间，系统将负责为这些数组元素分配初始值。指定初始值时，系统将按如下规则分配初始值。

<span style="color:red">数组元素的类型是基本类型中的整数类型（byte、short、int和long），则数组元素的值是0</span>
<span style="color:red">数组元素的类型是基本类型中的浮点类型（float、double），则数组元素的值是0.0</span>
<span style="color:red">数组元素的类型是基本类型中的字符类型（char），则数组元素的值是'\u0000'</span>
<span style="color:red">数组元素的类型是引用类型（类、接口、和数组），则数组元素的值是null</span>
<span style="color:red">**注意：不要同时使用静态初始化和动态初始化，也就是说，不要在进行数组初始化时，即指定数组的长度，也为每个数组元素分配初始值。**</span>

Java的数组是静态的，一旦为数组初始化完成，数组元素的内存空间分配即结束，程序只能改变数组元素的值，而无法改变数组的长度。需要指出的是，<span style="color:red">Java的数组变量是一种引用类型的变量，数组变量并不是数组本身，它只是指向堆内存中</span><span style="color:red">的数组对象</span>。因此可以改变一个数组变量所引用的数组，这样可以造成数组长度可变的假象。

假设，在上面程序后面增加如下几行。

```java
books = names;  
strArr = names;  
System.out.println("books数组长度："+books.length);  
System.out.println("strArr数组长度："+strArr.length);  
books[1]="李四";  
System.out.println("names数组的第二个元素是："+names[1]);
```

上面程序中将books数组变量，strArr数组变量都指向names数组变量所引用的数组，这样做的结果就是books  strArr names 这三个变量引用同一个数组对象。此时，三个引用变量和数组对象在内存中的分配如图

![License Badge]({{ site.baseurl}}/images/java/arrays/2.png)

从图可以看出，此时strArr,names和books数组变量实际上引用同一个数组对象。因此，当访问books数组，strArr数组的长度时，将看到输出3。这很容易造成一个假想：strArr数组的长度从5变成了3,实际上,数组对象本身的长度并没有发生改变,变的是strArr数组变量。当然，从图中还可以看出，原来books变量所引用的数组长度依然是3，但不再有任何引用变量引用该数组，因此它将会变成垃圾等着垃圾回收机制来回收。

**数组一定要初始化吗**

始终记住：java的数组变量时引用类型的变量，它并不是数组对象本身，只要让数组变量指向有效的数组对象，

程序中即可使用该数组变量

```java
public class T {  
  
    /** 
     * @param args 
     */  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        //定义并初始化nums数组  
        int nums[] = new int[]{3,13,4,6};  
        //定义一个prices数组变量  
        int prices[];  
        //让prices数组指向nums所引用的数组  
        prices = nums;  
        for(int i=0;i<prices.length;i++){  
            System.out.println(prices[i]);  
        }  
        //将prices数组的第三个元素赋值为100  
        prices[2] = 100;  
        //访问nums数组的第三个元素 将看到数组100  
        System.out.println(nums[2]);  
    }  
} 
```

从上面代码可以看出，程序定义了prices数组之后，并未对prices数组进行初始化。 当执行int  prices[]之后，

程序的内存分配如图

![License Badge]({{ site.baseurl}}/images/java/arrays/3.png)

从图可以看出，此时的prices数组还未指向任何有效的内存，未指向任何数组对象，此时的程序还不可使用prices数组变量。当程序执行prices = nums之后，prices变量将指向nums变量所引用的数组，此时prices变量和nums变量引用同一个数组对象执行这条语句之后，prices变量已经指向有效的内存及一个长度为4的数组对象，因此程序完全可以正常使用prices变量了。<span style="color:red">对于数组变量来说，它并不需要进行所谓的初始化，只要让数组变量指向一个有效的数组对象，程序即可正常使用该数组变量。</span>

<br>