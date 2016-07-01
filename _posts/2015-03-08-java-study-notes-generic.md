---
layout: post
blog_id: "java-study-notes-generic"
title: "Java学习笔记08--泛型"
date: 2015-03-08 00:00:00 -0700
tags: Java
category: Java
summary: 泛型可以解决数据类型的安全性问题，它主要的原理，是在类声明的时候通过一个标识标识类中某个属性的类型或者是某个方法的返回值及参数类型。这样在类声明或实例化的时候只要指定好需要的类型即可。
comments: false
---
<br>

泛型可以解决数据类型的<span style="color:red">安全性问题</span>，它主要的原理，是在类声明的时候通过一个标识标识类中某个属性的类型

或者是某个方法的返回值及参数类型。这样在类声明或实例化的时候只要指定好需要的类型即可。

```java
class Point<T>{  
    private T var;     //var的类型由T决定 即由外包决定  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Point<String> p = new Point<String>();  //设置为String类型  
        Point<Integer> p2 = new Point<Integer>();  //设置为Integer类型  
        p.setVar("itmyhome");  
        //p2.setVar("hello");  //p2设置为Integer类型  如果传入String类型就错误  
        System.out.println(p.getVar());  
    }  
}
```

#### 构造方法中使用泛型

构造方法可以为类中的属性初始化，那么如果类中的属性通过泛型指定，而又需要通过构造设置属性内容的时候，

那么构造方法的定义与之前并无不同，不需要像声明类那样指定泛型。

```java
class Point<T>{  
    private T var;     //var的类型由T决定 即由外包决定  
    public Point(T var){  
        this.var = var;  
    }  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Point<String> p = new Point<String>("itmyhome");  //设置为String类型  
        System.out.println(p.getVar());  
    }  
}
```

#### 设置多个泛型

```java
class Point<K,V>{  
    private K key;  
    private V value;  
    public K getKey() {  
        return key;  
    }  
    public void setKey(K key) {  
        this.key = key;  
    }  
    public V getValue() {  
        return value;  
    }  
    public void setValue(V value) {  
        this.value = value;  
    }  
      
}  
public class T {  
    public static void main(String[] args) {  
        Point<String,Integer> p = new Point<String,Integer>();  
        p.setKey("itmyhome");  
        p.setValue(23);  
        System.out.println(p.getKey());  
        System.out.println(p.getValue());  
    }  
}
```

#### 泛型的安全警告

![License Badge]({{ site.baseurl}}/images/java/08/1.png)

#### **通配符**

#### 匹配任意类型的通配符

在开发中对象的引用传递是最常见的，但是如果在泛型类的操作中，<span style="color:red">在进行引用传递的时候泛型类型必须匹配才可以传递，</span>

<span style="color:red">否则是无法传递的。</span>

```java
class Info<T>{  
    private T var;  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Info<String> info = new Info<String>();   //设置泛型类型为String  
        info.setVar("itmyhome");  
        <span style="color:#ff0000;">fun(info);      </span>//此处无法传递类型不匹配  
    }  
    public static void fun(Info<Object> obj){  //接受Object泛型类型的info对象  
        System.out.println(obj.getVar());  
    }  
}
```

#### 使用？通配符

```java
class Info<T>{  
    private T var;  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Info<String> info = new Info<String>();   //设置泛型类型为String  
        info.setVar("itmyhome");  
        fun(info);        
    }  
    public static void fun(Info<?> obj){  //接受?泛型类型的info对象  
        //obj.setVar("change");  //使用？只能接受 不可以修改  
        System.out.println(obj.getVar());  
    }  
}
```

<span style="color:red">如果使用？意味着可以接受任意的内容，但是此内容却无法直接使用<?>修饰的泛型对象进行修改。</span>

#### 受限泛型

之前设置泛型类型的时候，实际上都是可以任意设置的，只要是类就可以设置，但是在java的泛型中可以指定一个泛型的

上限和下限  在引用传递中，泛型操作中也可以设置一个泛型对象的范围上限和范围下限。<span style="color:red">范围上限使用extends关键字声明，</span>

表示参数化的类型可能是所指定的类型，或者是此类型的子类，<span style="color:red">而范围下限使用super进行声明，</span>

表示参数化的类型可能是所指定的类型，或者是此类型的父类型，直至Object类。

#### 设置上限

```java
class Info<T>{  
    private T var;  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Info<Integer> info1 = new Info<Integer>();     
        Info<Float> info2 = new Info<Float>();     
        Info<String> info3 = new Info<String>();   //定义泛型类型为String     
        info1.setVar(23);  
        info2.setVar(50.0f);  
        info3.setVar("itmyhome");  
        fun(info1);  
        fun(info2);  
        fun(info3);     //泛型上限设置为Number 无法进行传递  
    }  
    public static void fun(Info<? extends Number> obj){  //只能接受Number及其Number的子类  
        System.out.println(obj.getVar());  
    }  
}
```

#### 设置下限

```java
class Info<T>{  
    private T var;  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Info<String> info1 = new Info<String>();     
        Info<Object> info2 = new Info<Object>();     
        Info<Integer> info3 = new Info<Integer>();     
        info1.setVar("itmyhome");  
        info2.setVar("object");  
        info3.setVar(23);  
        fun(info1);  
        fun(info2);  
        fun(info3);   //泛型下限受限 ，无法进行传递  
    }  
    public static void fun(Info<? super String> obj){  //只能接受String和Object类型的泛型  
        System.out.println(obj.getVar());  
    }  
}
```

解释：泛型与子类继承的限制

一个类的子类可以通过对象的多态性，为其父类实例化，但是在泛型操作中，

子类的泛型类型是无法使用父类的泛型类型接受的，例如：Info\<String\>不能使用Info\<Object\>接收

#### 泛型接口

之前的所有操作都是在类中直接使用泛型操作的，那么，对于java来说，也可以直接在接口中定义及使用泛型。

泛型接口实现的两种方式

定义子类，在子类的定义上也声明泛型类型

```java
interface Info<T>{            //在接口上定义泛型  
    public T getVar();        //定义抽象方法 抽象方法的返回值就是泛型类型  
}  
class InfoImpl<T> implements Info<T>{    //定义泛型接口的子类  
    private T var;  
    public InfoImpl(T var){  
        this.var = var;  
    }  
    public T getVar() {  
        return var;  
    }  
    public void setVar(T var) {  
        this.var = var;  
    }  
      
}  
public class T {  
    public static void main(String[] args) {  
        Info<String> info = new InfoImpl<String>("itmyhome");  
        System.out.println(info.getVar());  
    }  
}
```

如果现在实现接口的子类不想使用泛型声明，则在实现接口的时候直接指定好操作的类型即可。

```java
interface Info<T>{            //在接口上定义泛型  
    public T getVar();        //定义抽象方法 抽象方法的返回值就是泛型类型  
}  
class InfoImpl implements Info<String>{    //定义泛型接口的子类,直接指定类型  
    private String var;  
    public InfoImpl(String var){  
        this.var = var;  
    }  
    public String getVar() {  
        return var;  
    }  
    public void setVar(String var) {  
        this.var = var;  
    }  
  
}  
public class T {  
    public static void main(String[] args) {  
        Info info = new InfoImpl("itmyhome");  
        System.out.println(info.getVar());  
    }  
}
```

泛型方法

```java
class Demo{  
    public<T> T fun(T var){  
        return var;  
    }  
}  
public class T {  
    public static void main(String[] args) {  
        Demo d1 = new Demo();  
        Demo d2 = new Demo();  
        System.out.println(d1.fun("itmyhome"));  
        System.out.println(d2.fun(23));  
    }  
}
```

<br>