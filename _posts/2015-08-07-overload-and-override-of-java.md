---
layout: post
blog_id: "overload-and-override-of-java"
title: "Java方法的重载(Overload)与重写(Override)"
date: 2015-08-07 00:00:00 -0700
tags: Java
category: Java
summary: Java支持方法重载,这种机制为类似功能的方法提供了统一的名称,但可根据参数行的不同而自动调用对应的方法
comments: false
---
</br>

Java支持方法重载，这种机制为类似功能的方法提供了统一的名称，但可根据参数行的不同而自动调用对应的方法。

一个例子可以从String 类上提供的一些方法看到，像String的valueOf()方法就提供了多个版本。

```java
static String valueOf(boolean b);  
static String valueOf(char c);  
static String valueOf(int i);  
static String valueOf(double d); 
```

虽然调用的方法名称都是valueOf(),但是根据所传递的参数数据类型不同，会调用对应版本的方法来进行对应的动作。

例如若是String.valueOf(10)，因为10是int类型，所以会执行的方法是valueOf(int  i)的版本，而若是String.valueOf(10.12)

因为10.12是double类型，则会执行的方法是valueOf(double  d)的版本。

</br>
####**重载**

方法重载的功能使得程序设计人员能较少苦恼于方法名称的设计，以统一的名称来调用相同功能的方法。

<span style="color:red">方法重载不仅可根据传递参数的数据类型不同来调用对应的方法，参数行的参数个数也可以用来设计方法重载。</span>

例如 可以这么重载someMethod()方法

```java
class A{  
    public void someMethod(){  
        //...  
    }  
    public void someMethod(int i){  
        //...  
    }  
    public void someMethod(float f){  
        //...  
    }  
    public void someMethod(int i,float f){  
        //...  
    }  
} 
```

</br>
要注意的是<span style="color:red">**返回值类型不可用作为方法重载的区别根据**</span>。例如如下的方法重载是不正确的。

```java
class A{  
    public int someMethod(int i){  
        return 0;  
    }  
    public double someMethod(int i){  
        return 0.0;  
    }  
}
```

</br>
在J2SE5.0后当使用方法重载时，要注意到autoboxing和unboxing的问题。

看下面的例子结果会是什么？

```java
public static void main(String[] args) {  
	// TODO Auto-generated method stub  
	someMethod(10);  
	  
}  
public static void someMethod(Integer i){  
	System.out.println("Integer 版本被调用");  
}  
public static void someMethod(int i){  
	System.out.println("int 版本被调用");  
}
```

结果会显示"int  版本被调用"，不能期待装箱(boxing)的动作会发生。如果想要调用参数行为Integer版本的方法，要明确指定。

例如someMethod(new Integer(10));

</br>

####**重写**

在继承的关系中也存在着方法重写的概念，所谓的方法重写就是指子类定义了与父类中同名的方法，

但是在方法覆写时必须考虑到权限即：<span style="color:red">被子类覆写的方法不能拥有比父类方法更加严格的访问权限</span>。

```java
class Person{  
    void say(){  
        System.out.println("person");  
    }  
}  
class Student extends Person{  //定义继承关系  
    public void say(){         //重写父类方法  
        System.out.println("student");  
    }  
} 
```

以上代码是正确的操作，下面看一个不正确的。

```java
class Person{  
    public void say(){  
        System.out.println("person");  
    }  
}  
class Student extends Person{  //定义继承关系  
    void say(){         //错误的，降低了访问权限  
        System.out.println("student");  
    }  
}
```

</br>
<span style="color:red">问题：如果现在将父类的一个方法定义成private访问权限，在子类中将此方法声明为default访问权限，那么这样还叫重写吗？</span>

```java
class Person{  
    private void say(){  
        System.out.println("person");  
    }  
    public void fun(){   //定义一个public方法  调用say()  
        this.say();  
    }  
}  
class Student extends Person{  //定义继承关系  
    void say(){          
        System.out.println("student");  
    }  
}  
  
public class T {  
    /** 
     * @param args 
     */  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        Person p = new Student();  
        p.fun();  //输出为person   并未重写   
    }  
}
```

此时方法并没有被重写，而是相当于在子类中又重新定义了一个方法出来。

![License Badge]({{ site.baseurl}}/images/java/overload.png)

</br>

