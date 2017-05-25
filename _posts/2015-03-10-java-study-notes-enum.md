---
layout: post
blog_id: "java-study-notes-enum"
title: "Java学习笔记10--枚举"
date: 2015-03-10 00:00:00 -0700
tags: Java
category: Java
summary: 所谓的枚举就是规定好了指定的取值范围，所有的内容只能从指定的范围中取得。
comments: false
---
<br>

在JDK1.5之前，java可以有两种方式定义新类型：类和接口。对于大部分面向对象编程来说，这两种方法看起来似乎足够了，但是在一些特殊情况下，这些方法就不适合。例如，想定义一个Color类，它只能有Red 、Green、Blue三种值，其他的任何值都是非法的，那么JDK1.5之前虽然可以构造这样的代码，但是要做很多的工作，也有可能带来各种不安全的问题。而JDK1.5之后引入的枚举类型（Enum）就能避免这些问题。
<span style="color:red">所谓的枚举就是规定好了指定的取值范围，所有的内容只能从指定的范围中取得。</span>使用简单类完成颜色的固定取值问题。

```java
package com.itmyhome;  
  
class Color{  
    public static final Color colorRed =  new Color("红色");  
    public static final Color colorGreen =  new Color("蓝色");  
    public static final Color colorBlue =  new Color("绿色");  
    private String name;  
    public Color(String name){  
        this.name = name;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
}  
public class T {  
    public static void main(String[] args) throws Exception{  
        Color cRed = Color.colorRed;  
        System.out.println(cRed.getName());  
    }  
}
```

此时，程序限定了所能取的对象的范围，所以达到了枚举的功能，以上是一种枚举的方式，在最早的java开发中因为没有枚举这种概念，所以有时候也使用接口表示。

```java
interface Color{  
    public static final int RED = 1;  
    public static final int GREEN = 2;  
    public static final int BLUE = 3;  
}
```

#### 定义一个枚举类型

在JDK1.5之后，引入了一个新的关键字类型 enum，可以直接定义枚举类型，格式如下：

【public】 enum  枚举类型名称{
		枚举对象1，枚举对象2，.......枚举对象n;
}

使用enum关键字定义。

```java
public enum Color {  
    RED,GREEN,BLUE;  
}
```

因为枚举已经指定好了范围，所以可以使用foreach 进行全部的输出，使用“枚举.values()”的形式取得全部的枚举内容。

```java
package com.itmyhome;  
  
enum Color {  
    RED,GREEN,BLUE;  
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        for(Color c:Color.values()){  
            System.out.println(c);  
        }  
    }  
}
```

还可以直接将内容在switch语句上使用。

```java
package com.itmyhome;  
  
enum Color {  
    RED, GREEN, BLUE;  
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        for(Color c:Color.values()){  
            print(c);  
        }  
    }  
    public static void print(Color color){  
        switch(color){  
            case RED:{  
                System.out.println("红色");  
                break;  
            }  
            case GREEN:{  
                System.out.println("绿色");  
                break;  
            }  
            case BLUE:{  
                System.out.println("蓝色");  
                break;  
            }  
            default:{  
                System.out.println("未知颜色");  
            }  
        }  
    }  
}
```

#### **Enum**

从前面已经清楚的知道，使用enum关键字可以定义一个枚举，实际上此关键字表示的是 java.lang.Enum类型，
即：使用enum声明的枚举类型，就相当于定义一个类，而此类则默认继承java.lang.Enum类。
java.lang.Enum类的定义如下：

```java
public abstract class Enum<E extends Enum<E>>  
extends Object   
implements Comparable<E>, Serializable
```

此类定义的时候使用了泛型机制,而且实现了Comparable接口以及Serializable接口,证明此中类型是可以比较,可以被序列化的。

#### 枚举类的主要方法

![License Badge]({{ site.baseurl}}/images/java/10/1.png)

#### Enum类的构造方法：

```java
protected  Enum(String name, int ordinal)
```

<span style="color:red">构造方法中接收两个参数，一个表示枚举的名字，一个表示枚举的序号。</span> 

```java
for(Color c:Color.values()){  
	System.out.println(c.name()+"----"+c.ordinal());  
}
```

希望可以使用一些文字表示颜色的信息，则可以按照最早的Color类的形式，在枚举中定义属性及自己的构造方法，
但是一旦定义有参构造之后，在声明枚举对象的时候就必须明确的调用构造方法，并传递参数。

```java
package com.itmyhome;  
  
enum Color {  
    RED("红色"), GREEN("绿色"), BLUE("蓝色");   //传入参数  
    private String name;  
    private Color(String name){  //定义构造方法  
        this.name = name;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
      
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        for(Color c:Color.values()){  
            System.out.println(c.ordinal()+"----"+c.name()+"----"+c.getName());  
        }  
    }  
}
```

java.util.EnumSet和java.util.EnumMap是两个枚举集合。EnumSet保证集合中的元素不重复；EnumMap中的 key是enum类型，而value则可以是任意类型

<br>