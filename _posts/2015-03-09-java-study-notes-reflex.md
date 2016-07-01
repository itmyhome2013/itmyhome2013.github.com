---
layout: post
blog_id: "java-study-notes-reflex"
title: "Java学习笔记09--反射机制"
date: 2015-03-09 00:00:00 -0700
tags: Java
category: Java
summary: 反射是java语言的一个特性，它允许程序在运行时来进行自我检查并且对内部的成员进行操作。例如它允许一个java的类获取他所有的成员变量和方法并且显示出来。
comments: false
---
<br>

#### 什么是反射：

反射是java语言的一个特性，它允许程序在运行时来进行自我检查并且对内部的成员进行操作。例如它允许一个java的类获取

他所有的成员变量和方法并且显示出来。java的反射机制的实现要借助4个类：Class,Constructor,Field,Method 

其中Class代表的是类对象，Constructor 类的构造器对象，Field 类的属性对象，Method 类的方法对象。通过这四个对象

我们可以粗略的看到一个类的各个组成部分。在正常情况下，必须知道一个类的完整路径之后才可以实例化对象，但是在java

中也允许通过一个对象来找到其所在的类的信息，那么这实际上就是Class类的功能。

```java
package com.itmyhome;  
  
class A{  
      
}  
public class T {  
  
    public static void main(String[] args) {  
        // TODO Auto-generated method stub  
        A a = new A();  
        System.out.println(a.getClass().getName());  //com.itmyhome.A  
    }
}
```

#### Object类的支持

在Object类中定义了以下的方法，此方法将被所有子类继承：

public  final  Class getClass()

以上的方法返回值的类型是一个"Class"类，实际上此类是java反射的源头，实际上所谓反射从程序的运行结果来看也很好理解，

即:可以通过对象反射求出类的名称。

![License Badge]({{ site.baseurl}}/images/java/09/1.png)

#### Class类

Class本身表示一个类的本身，通过Class可以完整的得到一个类中的完整结构，包括此类中的方法定义，属性定义等。

![License Badge]({{ site.baseurl}}/images/java/09/2.png)

#### 实例化Class类对象

有三种方法实例化Class对象：

+ 第一种：通过forName()方法

+ 第二种：类.class

+ 第三种：对象.getClass()

```java
package com.itmyhome;  
  
class A{  
      
}  
public class T {  
  
    public static void main(String[] args) throws ClassNotFoundException {  
        // TODO Auto-generated method stub  
        Class<?> c1 = Class.forName("com.itmyhome.A");  
        Class<?> c2 = A.class;  
        Class<?> c3 = new A().getClass();  
        System.out.println(c1.getName());  
        System.out.println(c2.getName());  
        System.out.println(c3.getName());  
    }
}
```

Class主要是反射的源头，不光可以取得对象所在类的信息，也可以直接通过Class类的方法进行对象的实例化操作正常情况下，

使用关键字new为对象实例化，如果现在已经实例化好了Class对象，则就可以通过Class类中提供的

![License Badge]({{ site.baseurl}}/images/java/09/3.png)

实例化对象

```java
package com.itmyhome;  
  
class Person {  
    private String name;  
    private int age;  
      
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getAge() {  
        return age;  
    }  
    public void setAge(int age) {  
        this.age = age;  
    }  
    public String toString() {  
        // TODO Auto-generated method stub  
        return "name: " + name + ",age: " + age;  
    }  
}  
  
public class T {  
  
    public static void main(String[] args) throws ClassNotFoundException {  
        Class<?> c = Class.forName("com.itmyhome.Person");  
        Person person = null;  
        try {  
            person = (Person) c.newInstance();  //实例化对象  
        } catch (InstantiationException e) {  
            e.printStackTrace();  
        } catch (IllegalAccessException e) {  
            e.printStackTrace();  
        }  
        person.setName("itmyhome");  
        person.setAge(23);  
        System.out.println(person);  
    }
}
```

通过以上的代码，可以发现，即使不使用关键字new对象也可以进行实例化操作，反射的作用。但是，

在使用以上操作的时候有一点必须注意，在操作中类中必须存在无参构造方法，否则无法实例化 报以下异常

```diff
java.lang.InstantiationException: com.itmyhome.Person  
    at java.lang.Class.newInstance0(Class.java:340)  
    at java.lang.Class.newInstance(Class.java:308)  
    at com.itmyhome.T.main(T.java:35)  
Exception in thread "main" java.lang.NullPointerException  
    at com.itmyhome.T.main(T.java:41) 
```

对于以上的程序也并非没有解决的方法，也是可以通过其他的方式进行实例化操作的，只是在操作的时候需要明确的调用类中的

构造方法，并将参数传递进去之后才可以进行实例化操作，操作步骤如下：

+ 1、通过Class类中的getConstructors()取得本类中的全部构造方法。

+ 2、向构造方法中传递一个对象数组进去，里面包含了构造方法中所需的各个参数。

+ 3、之后通过Constructor实例化对象。

![License Badge]({{ site.baseurl}}/images/java/09/4.png)

```java
package com.itmyhome;  
  
import java.lang.reflect.Constructor;  
  
class Person {  
    private String name;  
    private int age;  
      
    public Person(String name,int age){  
        this.name = name;  
        this.age = age;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getAge() {  
        return age;  
    }  
    public void setAge(int age) {  
        this.age = age;  
    }  
    public String toString() {  
        // TODO Auto-generated method stub  
        return "name: " + name + ",age: " + age;  
    }  
}  
  
public class T {  
  
    public static void main(String[] args) throws ClassNotFoundException{  
        Class<?> c = Class.forName("com.itmyhome.Person");  
        Constructor<?> cons[] = c.getConstructors();  
        Person person = null;  
        try {  
            person = (Person) cons[0].newInstance("itmyhome",23);  //实例化对象  
        } catch (Exception e) {  
            e.printStackTrace();  
        }   
        person.setName("itmyhome");  
        person.setAge(23);  
        System.out.println(person);  
    }
}
```

#### 反射机制的深入--取得类的结构

在实际开发中，以上的程序就是反射应用最多的地方，当然，反射机制所提供的功能远不止如此，还可以通过反射得到一个类

的完整结构，那么这就要使用到java.lang.reflect包中的以下几个类：

+ Constructor：表示类中的构造方法

+ Field：表示类中的属性

+ Method：表示类中的方法

这三个类都是AccessibleObject类中的子类

```java
package com.itmyhome;  
  
interface IPerson{  
    public static final String NAME = "itmyhome";  
    public String toSay();  
    public String toEat(String name,int age);  
}  
class Person implements IPerson{  
    private String name;  
    private int age;  
    public Person(){    //无参构造  
          
    }  
    public Person(String name,int age){  
        this.name = name;  
        this.age = age;  
    }  
    @Override  
    public String toSay() {  
        return "hello!";  
    }  
      
    @Override  
    public String toEat(String name, int age) {  
        return "name: "+name+",age: "+age;  
    }  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getAge() {  
        return age;  
    }  
    public void setAge(int age) {  
        this.age = age;  
    }  
}
```

#### 取得类所实现的全部接口

要想取得一个类所实现的全部接口，则必须使用Class类中的getInterfaces()方法，此方法定义如下：

```java
public Class[] getInterfaces()  
```

此方法返回一个Class类的对象数组，之后就可以直接利用Class类中的getName()方法输出即可。

<span style="color:red">因为一个类可以同时实现多个接口，所以在此处就以一个数组的形式返回实现的全部接口。</span>

```java
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> cl = Class.forName("com.itmyhome.Person");  //实例化对象  
        Class<?> c[] = cl.getInterfaces();   //以数组形式返回实现的全部接口  
        for (int i = 0; i < c.length; i++) {  
            System.out.println(c[i].getName());   //输出接口名称  
        }  
    }  
}
```

#### 取得类所继承的父类

一个类可以实现多个接口，但是只能继承一个父类，所以如果要想取得一个类的父类，可以直接使用Class类中的

<span style="color:red">getSuperClass()</span>方法。此方法定义如下：

```java
public Class<? super T> getSuperClass()  
```

此方法返回的是Class实例，和之前的得到接口一样，可以通过getName()方法取得名次。

一个类只继承一个父类，如果一个类中没有明确的指明继承哪个类，则肯定继承的是Object类。

```java
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> cl = Class.forName("com.itmyhome.Person");  //实例化对象  
        Class<?> c = cl.getSuperclass();   //取得继承父类  
        System.out.println(c.getName());  
    }  
}
```

#### 取得类中的全部构造方法

```java
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> cl = Class.forName("com.itmyhome.Person");  //实例化对象  
        Constructor<?> c[] = cl.getConstructors();  
        for (int i = 0; i < c.length; i++) {  
            System.out.println(c[i]);  
        }  
    }  
}
```

#### 取得类中的方法

要想取得一个类中的全部方法，可以使用Class类中的getDeclaredMethods()方法，此方法返回一个Method类的对象数组，

而如果要想进一步取得方法的具体信息，例如：方法的参数，抛出的异常等等，则就必须依靠Method类

<span style="color:red">public  Method[]  getDeclaredMethods()  输出本类中的全部方法</span>

<span style="color:red">public  Method[]  getMethods()  输出全部的方法</span>

```java
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> cl = Class.forName("com.itmyhome.Person");  //实例化对象  
        Method m1[] = cl.getMethods();  
        for (int i = 0; i < m1.length; i++) {  
            System.out.println(m1[i]);  
        }  
        System.out.println("*************");  
        Method m2[] = cl.getDeclaredMethods();  
        for (int i = 0; i < m2.length; i++) {  
            System.out.println(m2[i]);  
        }  
    }  
}
```

#### 取得类中的属性

<span style="color:red">public  Field[]  getFields()  得到实现的接口和父类中的公共属性</span>

<span style="color:red">public  Field[]  getDeclaredFields()  得到本类中的全部属性</span>

以上方法返回的都是Field的数组，每一个Field对象就表示类中的一个属性

```java
public class T {  
    public static void main(String[] args) throws Exception{  
        Class<?> cl = Class.forName("com.itmyhome.Person");  //实例化对象  
        Field f1[] = cl.getFields();  
        for (int i = 0; i < f1.length; i++) {  
            System.out.println(f1[i]);  
        }  
        System.out.println("*********");  
        Field f2[] = cl.getDeclaredFields();   //本类中的属性  
        for (int i = 0; i < f2.length; i++) {  
            System.out.println(f2[i]);  
        }  
    }  
}
```

<br>