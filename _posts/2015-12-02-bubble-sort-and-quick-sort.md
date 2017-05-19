---
layout: post
blog_id: "bubble-sort-and-quick-sort"
title: "冒泡排序、快速排序"
date: 2015-12-02 00:00:00 -0700
tags: Java
category: Java
summary: 冒泡排序总的平均时间复杂度为0(n2),冒泡排序是就地排序,且它是稳定的。快速排序不是一种稳定的排序算法时间复杂度为o(n2)
comments: false
---

**冒泡排序算法的运作如下：**

+ 1、比较相邻的元素。如果第一个比第二个大，就交换他们两个。
+ 2、对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
+ 3、针对所有的元素重复以上的步骤，除了最后一个。
+ 4、持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

冒泡排序<span style="color:red">最好</span>的时间复杂度为<span style="color:red">0(n)</span>
冒泡排序<span style="color:red">最坏</span>的时间复杂度为<span style="color:red">0(n2)</span> //n的平方
因此冒泡排序总的<span style="color:red">平均时间</span>复杂度为<span style="color:red">0(n2)</span>
冒泡排序是就地排序，且它是稳定的。

```java
public class Test {  
  
    public static void main(String[] args) {  
        int temp[] = {13,52,3,8,5,16,41,29};  
        //执行temp.length次  
        for (int i = 0; i < temp.length; i++) {  
            for (int j = 0; j < temp.length-i-1; j++) {  
                if(temp[j]>temp[j+1]){ //前一个数和后一个数比较  
                    int a = temp[j];  
                    temp[j] = temp[j+1];  
                    temp[j+1] = a;  
                }  
            }  
        }  
        for (int i = 0; i < temp.length; i++) {  
            System.out.print(temp[i]+" ");  
        }  
    }  
}
```

**快速排序(Quicksort)是对冒泡排序的一种改进**。它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，
其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，
整个排序过程可以递归进行，以此达到整个数据变成有序序列
<span style="color:red">快速排序不是一种稳定的排序算法时间复杂度为o(n2)</span>。

```java
import java.util.Arrays;  
public class T {  
    public static void main(String[] ary) {  
        int[] arry = { 49, 38, 65, 97, 76, 13, 27 };  
        sort(arry, 0, arry.length - 1);  
    }  
  
    private static int sortUnit(int[] array, int low, int high) {  
        int key = array[low];  
        while (low < high) {  
            while (array[high] >= key && high > low)  
                --high;  
            array[low] = array[high];  
            while (array[low] <= key && high > low)  
                ++low;  
            array[high] = array[low];  
        }  
        array[high] = key;  
        System.out.println(Arrays.toString(array));  
        return high;  
    }  
  
    public static void sort(int[] array, int low, int high) {  
        if (low >= high)  
            return;  
        int index = sortUnit(array, low, high);  
        sort(array, low, index - 1);  
        sort(array, index + 1, high);  
    }  
} 
```

<br>