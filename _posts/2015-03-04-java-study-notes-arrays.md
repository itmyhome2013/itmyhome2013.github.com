---
layout: post
blog_id: "java-study-notes-arrays"
title: "Java学习笔记04--数组"
date: 2015-03-04 00:00:00 -0700
tags: Java
category: Java
summary: 数组复制的方法是使用System类提供的arraycopy()方法，其语法如下：System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length);
comments: false
---
<br>

数组复制的方法是使用System类提供的`arraycopy()`方法，其语法如下：

System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length);

System.arraycopy(`源数组，源数组中的起始位置，目标数组，目标数据中的起始位置，要复制的数组元素的数量`);

```java
public class T {  
    public static void main(String args[]){  
        int arr1[] = {1,2,3,4,5};  
        int arr2[] = new int[5];  
        System.arraycopy(arr1, 0, arr2, 0, 5);  
        for (int i = 0; i < arr2.length; i++) {  
            System.out.println(arr2[i]);  
        }  
    }  
}
```

#### Arrays类

对数组的一些基本操作，像排序、搜索与比较等都是很常见的。在java中提供了Array是类可以协助您作这几个操作，

Array是类位于java.util包中，他提供了几个方法可以直接使用。

* `sort()` 帮助您对指定的数组排序，所使用的是快速排序法

* `binarySearch()`  让您对已排序的数组进行二元搜索，如果找到指定的值就返回该值所在的索引，否则就返回负值

* `fill()` 当您配置一个数组之后，会依据数据类型来给定默认值。例如整数数组就初始值为0，

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以使用Arrays.fill()方法将所有的元素设置为指定的值

* `equals()` 比较两个数组中的元素值是否全部相等，如果是将返回true，否则返回false

```java
import java.util.Scanner;  
import java.util.Arrays;  
  
public class T {  
    public static void main(String[] args) {  
        Scanner scanner = new Scanner(System.in);  
  
        int[] arr = { 93, 5, 3, 55, 57, 7, 2, 73, 41, 91 };  
  
        System.out.print("排序前: ");  
        for (int i = 0; i < arr.length; i++){  
            System.out.print(arr[i] + " ");  
        }  
        System.out.println();  
  
        Arrays.sort(arr);  
  
        System.out.print("排序后: ");  
        for (int i = 0; i < arr.length; i++){  
            System.out.print(arr[i] + " ");  
        }  
        System.out.print("\n请输入搜索值:");  
        int key = scanner.nextInt();  
        int find = -1;  
        if ((find = Arrays.binarySearch(arr, key)) > -1) {  
            System.out.println("找到值于索引 " + find + " 位置");  
        } else  
            System.out.println("找不到指定值");  
    }  
}
```

执行结果：

```diff
排序前: 93 5 3 55 57 7 2 73 41 91   
排序后: 2 3 5 7 41 55 57 73 91 93   
请输入搜索值:5  
找到值于索引 2 位置
```

下面使用Arrays来进行数组的填充与比较

```java
import java.util.Arrays;  
  
public class T {  
    public static void main(String[] args) {  
        int[] arr1 = new int[10];  
        int[] arr2 = new int[10];  
        int[] arr3 = new int[10];  
  
        Arrays.fill(arr1, 5);  
        Arrays.fill(arr2, 5);  
        Arrays.fill(arr3, 10);  
  
        System.out.print("arr1: ");  
        for (int i = 0; i < arr1.length; i++){  
            System.out.print(arr1[i] + " ");      
        }  
        System.out.println("\narr1 = arr2 ? " + Arrays.equals(arr1, arr2));  
        System.out.println("arr1 = arr3 ? " + Arrays.equals(arr1, arr3));  
    }  
}
```

执行结果

```diff
arr1: 5 5 5 5 5 5 5 5 5 5   
arr1 = arr2 ? true  
arr1 = arr3 ? false
```
	
