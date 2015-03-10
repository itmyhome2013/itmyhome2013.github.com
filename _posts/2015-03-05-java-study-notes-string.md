---
layout: post
blog_id: "java-study-notes-string"
title: "Java学习笔记05--字符串"
date: 2015-03-05 00:00:00 -0700
tags: Java
category: Java
summary: 由字符所组成的一串文字符号被称之为字符串。在java中字符串不仅仅是字符数组，而且是String类的一个实例，可以使用String类来构建。字符串的每个字符是使用Unicode字符来构建。
comments: false
---
</br>
###String类

由字符所组成的一串文字符号被称之为字符串。`在java中字符串不仅仅是字符数组，而且是String类的一个实例`，

可以使用String类来构建。字符串的每个字符是使用Unicode字符来构建。

Sring对象上的几个方法：

<table class="table table-bordered table-striped table-condensed">
    <tr>
        <td>length()</td>
		<td>取得字符串的长度</td>
    </tr>
	<tr>
        <td>equals()</td>
		<td>判断源字符串中的字符是否等于指定字符串中的字符</td>
    </tr>
	<tr>
        <td>toLowerCase()</td>
		<td>转换字符串中的英文字符为小写</td>
    </tr>
	<tr>
        <td>toUpperCase()</td>
		<td>转换字符串中的英文字符为大写</td>
    </tr>
</table>

字符串的本质是由字符数组所组成，所以使用String类声明字符串后，该字符串会具有数组索引的性质。

<table class="table table-bordered table-striped table-condensed">
    <tr>
        <td>char charAt(int  index)</td>
		<td>返回指定索引处的字符</td>
    </tr>
	<tr>
        <td>int indexOf(int ch)</td>
		<td>返回指定字符第一个找到的索引位置</td>
    </tr>
	<tr>
        <td>int indexOf(String str)</td>
		<td>返回指定字符串第一个找到的索引位置</td>
    </tr>
	<tr>
        <td>int lastIndexOf(int ch)</td>
		<td>返回指定字符最后一个找到的索引位置</td>
    </tr>
	<tr>
        <td>String substring(int beginIndex)</td>
		<td>取出指定索引处至字符串尾端的子字符串</td>
    </tr>
	<tr>
        <td>String substring(int beginIndex ,int  endIndex)</td>
		<td>取出指定索引范围子字符串(包括beginIndex，不包括endIndex)</td>
    </tr>
	<tr>
        <td>char[] toCharArray()</td>
		<td>将字符串转换为字符数组</td>
    </tr>
</table>

```java
public class T {  
    public static void main(String[] args) {  
        String str = "hello itmyhome";  
        for(int i=0;i<str.length();i++){  
            System.out.print(str.charAt(i));  
        }  
        System.out.println();  
        System.out.println("第一个o索引位置 : "+str.indexOf("o"));  
        System.out.println("最后一个o索引位置: "+str.lastIndexOf("o"));  
          
        System.out.println("截取从第6个字符至尾：        "+str.substring(6));  
        System.out.println("截取从第6个至第8个字符："+str.substring(6, 8));  
          
        char charStr[] = str.toCharArray();  
        for (int i = 0; i < charStr.length; i++) {  
            System.out.print(charStr[i]);  
        }  
    }  
}
```

执行结果：

```diff
hello itmyhome  
第一个o索引位置 : 4  
最后一个o索引位置: 11  
截取从第6个字符至尾：        itmyhome  
截取从第6个至第8个字符：it  
hello itmyhome
```

在构建字符串对象时，除了直接在=后使用""来指定字符串常数之外，也可以使用字符数组来构建：

```java
char name[] = {'i','t','m','y','h','o','m','e'};  
String s = new String(name);
```  

</br>
###不可变字符串

在java中使用字符串有一个非常重要的规则必须记得，一个字符串对象一旦被配置，它的内容就是固定不可变的。

在java中，使用“=”将一个字符串对象指定给一个引用名称，其意义为改变该名称所引用的对象，

原来被引用的字符串对象若没有其他名称来引用它，就会在适当的时候被java的“垃圾回收”机制回收。

在java执行时会维护一个String池(Pool)，对于一些可以共享的字符串对象，

会现在String池中查找是否存在相同的String内容(字符相同)，如果有就直接返回，而不是直接创造一个新的String对象，

以减少内存的耗用。如果在程序中使用下面的方式来声明，则实际上是指向同一个字符串对象：

```java
String str1 = "itmyhome";  
String str2 = "itmyhome";  
System.out.println(str1==str2);
```

当直接在程序中使用“”来包括一个字符串时，该字符串就会在String池中。

</br>
###StringBuilder类

参考 http://blog.csdn.net/itmyhome/article/details/7232340 

</br>		
###分离字符串

可以使用String的split()进行分离字符串

需注意问题：“.”，“|”，“？”都是转义字符，必须加“\\”

```java
String s1[] = str.split("\\.");  
String s2[] = str.split("\\|");  
String s3[] = str.split("\\?");
```

如果在一个字符串中有多个分隔符，可以用“|”作为连字符。

```java
String str = "welcome?to!itmyhome bolg";
String s[] = str.split("\\?|!");
for (int i = 0; i < s.length; i++) {
	System.out.println(s[i]);
}
```

以？和！作为分隔符。
</br>	
</br>
			