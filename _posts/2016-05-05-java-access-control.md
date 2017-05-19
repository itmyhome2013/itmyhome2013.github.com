---
layout: post
blog_id: "java-access-control"
title: "Java访问控制权限"
date: 2016-05-05 00:00:00 -0700
tags: Java
category: Java
summary: 在Java中一共存在四种访问控制权限，即 private、default(默认)、protected和public
comments: false
---

在Java中一共存在四种访问控制权限，即 private、default(默认)、protected和public

##### **1、private 访问权限**

private属于私有访问权限，可以用在属性的定义、方法的声明上，一旦使用了private关键字声明，则只能在本类中进行访问

##### **2、default(默认)访问权限**

如果一个类中的属性或方法没有使用任何的访问权限声明，则就是默认的访问权限，默认的访问权限可以被本包中的其他类所访问，但是不能被其他包的类所访问。

##### **3、protected 访问权限**

protected属于受保护的访问权限。一个类中的成员如果使用了protected访问权限，则只能被本包及不同包的子类访问。

##### **4、public 访问权限**

public属于公共访问权限，如果一个类中的成员使用了public访问权限，就可以在所有类中被访问，不管是否在同一个包中。

----------------

*使用表来总结上述的访问控制权限。*

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>范围</td> 
     <td>private</td>
	 <td>default</td>
	 <td>protected</td>
	 <td>public</td>
    </tr> 
	<tr> 
     <td>同一类</td> 
     <td>√</td>
	 <td>√</td>
	 <td>√</td>
	 <td>√</td>
    </tr> 
	 <tr> 
     <td>同一包中的类</td> 
     <td></td>
	 <td>√</td>
	 <td>√</td>
	 <td>√</td>
    </tr>
	<tr> 
     <td>不同包中的子类</td> 
     <td></td>
	 <td></td>
	 <td>√</td>
	 <td>√</td> 
    </tr>
	<tr> 
     <td>其他包中的类</td> 
     <td></td>
	 <td></td>
	 <td></td>
	 <td>√</td> 
    </tr>  	
</table>

**下面介绍protected访问控制权限的作用**

在 com.home.a 包中定义一个HelloDemo类，其中包含一个 protected 访问权限

```java
package com.home.a;

public class HelloDemo {
	protected String url = "http://itmyhome.com"; //只能被本包及不同包的子类访问
}
```

在 com.home.b 包中的子类访问此类中的 url 属性

```java
package com.home.b;

import com.home.a.HelloDemo;

class SubHelloDemo extends HelloDemo{ //定义HelloDemo子类
	public void print(){
		System.out.println("访问受保护属性： " + url); //可以访问protected权限
	}
}

public class ProtectedTest {
	public static void main(String[] args) {
		SubHelloDemo sub = new SubHelloDemo();
		sub.print();
	}
}
```

**程序运行结果**

```bath
访问受保护属性： http://itmyhome.com
```

以上程序中在不同包的子类里访问了 protected 属性，而如果现在由不同包的类直接访问HelloDemo类中的protected 属性，则会出现编译错误。

```java
package com.home.b;

import com.home.a.HelloDemo;

public class ProtectedTest {
	public static void main(String[] args) {
		HelloDemo demo = new HelloDemo();
		System.out.println(demo.url); // The field HelloDemo.url is not visible
	}
}
```
