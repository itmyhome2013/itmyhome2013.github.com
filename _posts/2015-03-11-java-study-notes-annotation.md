---
layout: post
blog_id: "java-study-notes-annotation"
title: "Java学习笔记11--Annotation"
date: 2015-03-11 00:00:00 -0700
tags: Java
category: Java
summary: Annotation：在JDK1.5之后增加的一个新特性，这种特性被称为元数据特性，在JDK1.5之后称为注释，即：使用注释的方式加入一些程序的信息。java.lang.annotation Annotation接口是所有的Annotation都必须实现的接口。
comments: false
---
<br>

Annotation：在JDK1.5之后增加的一个新特性，这种特性被称为元数据特性，在JDK1.5之后称为注释，
即：使用注释的方式加入一些程序的信息。
java.lang.annotation Annotation接口是所有的Annotation都必须实现的接口。

#### 系统内建的Annotation

在JDK1.5之后，系统中已经建立了如下的三个内建的Annotation类型，用户直接使用即可。

+ <span style="color:red">@Override：覆写的Annotation</span>
+ <span style="color:red">@Deprecated：不赞成使用的Annotation</span>
+ <span style="color:red">@SuppressWarnings：压制安全警告的Annotation</span>

#### 自定义Annotation

Annotation定义格式：

【public】 @interface  Annotation名称{

&nbsp;&nbsp;&nbsp;&nbsp;数据类型   变量名称();
			 
}

```java
public @interface Meaning {  
    String value();  
}
```

之后就直接可以在程序中使用@Meaning的格式

```java
@Meaning(value="itmyhome")  
class Demo{  
      
}
```

可以在Annotation中设置一个参数，用来接收变量的内容，如上面的value，使用Annotation的时候也必须给参数赋值
如：value="itmyhome"
既然可以设置一个参数，则同时也就可以设置多个参数。

```java
public @interface Meaning {  
    String key();  
    String value();  
}
```

此Annotation在使用的时候 需要设置两个参数，一个key一个value

```java
@Meaning(key="hi",value="itmyhome")  
class Demo{  
      
}
```

也可以设置一个数组进去

```java
public @interface Meaning {  
    String[] value();  
}
```

接收的内容要传递数组

```java
@Meaning(value={"hello","world"})  
class Demo{  
      
}
```

以上所定义的全部的Annotation中有一个特点，所有的参数内容需要在使用注释的时候设置上去，
那么也可以为一个参数设置默认的内容，在声明的时候使用default即可。

```java
public @interface Meaning {  
    String value() default "";  //默认为空   
}
```

在使用的时候就可以不设置值

```java
@Meaning  
class Demo{  
      
}
```

在操作中，对于一个Annotation而言有时候会固定期取值范围，只能取固定的几个值，这个时候实际上就需要依靠枚举。

```java
public enum FormItemType {  //定义枚举类型  
    hidden,text,select,date  
}
```

#### 定义Annotation

```java
public @interface Meaning {  
    FormItemType value() ;  //设置为枚举类型  
}
```

Annotation的取值只能是枚举类型中的值

```java
@Meaning(value=FormItemType.date)  
class Demo{  
      
}
```

#### Retention和RetentionPolicy

在Annotation中，可以使用Retention定义个Annotation的保存范围，此Annotation的定义如下：

```java
@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.FIELD)  
public @interface Meaning {  
    FormItemType value() ;  //设置为枚举类型  
}
```

在以上的Retetion定义中存在了一个RetentionPolicy的变量，此变量用于指定Annotation的保存范围，RetentionPolicy包含三种范围

![License Badge]({{ site.baseurl}}/images/java/11/1.png)

<span style="color:red">在三个范围中，最重要的就是RUNTIME范围，因为在执行的时候起作用。</span>
内建Annotation的RetentionPolicy

#### 三个内建的Annotation的定义：

<span style="color:red">Override定义采用的是@Retention(RetentionPolicy.SOURCE) 只能在源文件中出现</span>
<span style="color:red">Deprecated定义采用的是@Retention(RetentionPolicy.RUNTIME)，可以在执行时出现</span>
<span style="color:red">SuppressWarnings定义采用的是@Retention(RetentionPolicy.SOURCE)，只能在源文件中出现</span>

一个Annotation如果要是想让其变得有意义，则必须结合反射机制取得Annotaion中设置的全部内容。
在Class类中存在以下几种与Annotation操作有关的方法

![License Badge]({{ site.baseurl}}/images/java/11/2.png)

```java
package com.itmyhome;  
  
import java.lang.annotation.Annotation;  
import java.lang.reflect.Method;  
  
class Demo{  
    @SuppressWarnings("unchecked")  
    @Deprecated  
    @Override  
    public String toString(){  
        return "hello";  
    }  
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> c = Class.forName("com.itmyhome.Demo");  
        Method mt = c.getMethod("toString");   //找到toString方法  
        Annotation an[] = mt.getAnnotations(); //取得全部的Annotation  
        for(Annotation a:an){  
            System.out.println(a);  
        }  
          
    }  
}
```

此时已经取得了一个Annota。以上的操作实际上是通过三个系统内建的Annotation完成的，也可以自定义一个Annotation

```java
@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.METHOD)  
public @interface Meaning {  
    FormItemType value() ;  //设置为枚举类型  
}
```

```java
package com.itmyhome;  
  
import java.lang.reflect.Method;  
  
class Demo{  
    @Meaning(value=FormItemType.select)  //自定义Annotation  
    @SuppressWarnings("unchecked")  
    @Deprecated  
    @Override  
    public String toString(){  
        return "hello";  
    }  
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> c = Class.forName("com.itmyhome.Demo");  
        Method mt = c.getMethod("toString");   //找到toString方法  
          
        //指定的注释是否存在于此元素上  
        if(mt.isAnnotationPresent(Meaning.class)){  
            Meaning m = mt.getAnnotation(Meaning.class);  //得到指定的Annotation  
            System.out.println(m.value());                //取得Annotation的值  
        }  
          
    }  
}
```

#### @Target

指示注释类型所适用的程序元素的种类。如果注释类型声明中不存在 Target 元注释，则声明的类型可以用在任一程序元素上。如果存在这样的元注释，则编译器强制实施指定的使用限制，如：@Target(ElementType.ANNOTATION_TYPE)
ElementType的保存范围

![License Badge]({{ site.baseurl}}/images/java/11/3.png)

<br>
