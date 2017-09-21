---
layout: post
blog_id: "java-dynamic-proxy"
title: "Java动态代理"
date: 2017-09-20 00:00:00 -0700
tags: Java
category: Java
summary: 代理是一种常用的设计模式，其目的就是为其他对象提供一个代理以控制对某个对象的访问
comments: false
---

#### 代理模式：

代理是一种常用的设计模式，其目的就是为其他对象提供一个代理以控制对某个对象的访问。代理类负责为委托类预处理消息，过滤消息并转发消息，以及进行消息被委托类执行后的后续处理。

![License Badge]({{ site.baseurl}}/images/proxy.png)

**代理的实现分为**

+ 静态代理：代理类是在编译时就实现好的，也就是说Java编译完成后代理类是一个实际的class文件
+ 动态代理：代理类是在运行时生成的，也就是说Java编译完之后并没有实际的class文件，而是在运行时动态生成的类字节码，并加载到JVM中。

#### 相关的类和接口

要了解Java动态代理的机制，首先需要了解以下相关的类或接口：

+ java.lang.reflect.Proxy: 这是Java动态代理机制的主类，它提供了一组静态方法来为一组接口动态地生成代理类及其对象。

Proxy的静态方法

```java
// 方法 1: 该方法用于获取指定代理对象所关联的调用处理器
static InvocationHandler getInvocationHandler(Object proxy) 
 
// 方法 2：该方法用于获取关联于指定类装载器和一组接口的动态代理类的类对象
static Class getProxyClass(ClassLoader loader, Class[] interfaces) 
 
// 方法 3：该方法用于判断指定类对象是否是一个动态代理类
static boolean isProxyClass(Class cl) 
 
// 方法 4：该方法用于为指定类装载器、一组接口及调用处理器生成动态代理类实例
static Object newProxyInstance(ClassLoader loader, Class[] interfaces, 
    InvocationHandler h)
```

+ java.lang.reflect.InvocationHandler：这是调用处理器接口，它自定义了一个invoke方法，用于集中处理在动态代理类对象上的方法调用，通常在该方法中实现对委托类的代理访问。

InvocationHandler 的核心方法

```java
// 该方法负责集中处理动态代理类上的所有方法调用。第一个参数既是代理类实例，第二个参数是被调用的方法对象
// 第三个方法是调用参数。调用处理器根据这三个参数进行预处理或分派到委托类实例上发射执行
Object invoke(Object proxy, Method method, Object[] args)
```

每次生成动态代理类对象时都需要指定一个实现了该接口的调用处理器对象

+ java.lang.ClassLoader: 这是类装载器类，负责将类的字节码装载到Java虚拟机中并为其定义类对象，然后该类才能被使用。Proxy静态方法生成动态代理类同样需要通过类装载器来进行装载才能使用，它与普通类的唯一区别就是其字节码是由JVM在运行时动态生成的而非预存在于任何一个.class文件中。


#### 动态代理

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

interface IHello { // 定义接口
    public void sayHello();
}

class HelloImpl implements IHello {
    @Override
    public void sayHello() {
        // TODO Auto-generated method stub
        System.out.println("hello itmyhome");
    }
}

class MyInvocationHandler implements InvocationHandler {
    private Object obj; // 真实主题类

    public Object bind(Object obj) {
        this.obj = obj;

        return Proxy.newProxyInstance(obj.getClass().getClassLoader(),
            obj.getClass().getInterfaces(), this);
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
        throws Throwable {
        System.out.println("***before***");

        Object temp = method.invoke(obj, args);
        System.out.println("***after***");

        return temp;
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        IHello h = (IHello) new MyInvocationHandler().bind(new HelloImpl());
        h.sayHello();
    }
}
```

#### Java动态代理的内部实现

现在我们就会有一个问题：Java是怎么保证代理对象调用的任何方法都会调用InvocationHandler的invoke()方法的？
这就涉及到动态代理的内部实现，假设有一个接口Subject，且里面有int request(int i)方法，则生成的代理类大致如下：

```java
public final class $Proxy1 extends Proxy implements Subject{
    private InvocationHandler h;
    private $Proxy1(){}
    public $Proxy1(InvocationHandler h){
        this.h = h;
    }
    public int request(int i){
        Method method = Subject.class.getMethod("request", new  []{int.class});    //创建method对象
        return (Integer)h.invoke(this, method, new Object[]{new Integer(i)}); //调用了invoke方法
    }
}
```

通过上面的方法就成功调用了 invoke() 方法。

