---
layout: post
blog_id: "java-study-notes-dynamic-proxy"
title: "Java学习笔记14--动态代理"
date: 2015-03-14 00:00:00 -0700
tags: Java
category: Java
summary: Proxy类是专门完成代理的操作类，可以通过此类为一个或多个接口动态地生成实现类
comments: false
---
<br>

#### InvocationHandler接口

```java
public interface InvocationHandler{  
    public Object invoke(Object proxy,Method method,Object[] args)throws Throwable  
}
```

参数说明：

<span style="color:red">Object  proxy：被代理的对象</span>

<span style="color:red">Method  method：要调用的方法</span>

<span style="color:red">Object   args[]：方法调用时所需要的参数</span>

#### Proxy类

Proxy类是专门完成代理的操作类，可以通过此类为一个或多个接口动态地生成实现类，此类提供了如下的操作方法：

```java
public static Object newProxyInstance(ClassLoader loader,  
			Class<?>[] interfaces,  
			InvocationHandler h)  
			throws IllegalArgumentException 
```

参数说明：

<span style="color:red">ClassLoader  loader：类加载器</span>

<span style="color:red">Class<?>[]  interfaces：得到全部的接口</span>

<span style="color:red">InvocationHandler  h：得到InvocationHandler接口的子类实例</span>

#### 动态代理：

```java
package com.itmyhome;  
  
import java.lang.reflect.InvocationHandler;  
import java.lang.reflect.Method;  
import java.lang.reflect.Proxy;  
  
interface IHello{    //定义接口  
    public void sayHello();  
}  
class HelloImpl implements IHello{  
  
    @Override  
    public void sayHello() {  
        // TODO Auto-generated method stub  
        System.out.println("hello itmyhome");  
    }  
}  
class MyInvocationHandler implements InvocationHandler{  
  
    private Object obj;   //真实主题类  
    public Object bind(Object obj){  
        this.obj = obj;  
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(),
			   obj.getClass().getInterfaces(), this);  
    }  
    @Override  
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {  
        System.out.println("***before***");  
        Object temp = method.invoke(obj, args);  
        System.out.println("***after***");  
        return temp;  
    }  
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        IHello h = (IHello)new MyInvocationHandler().bind(new HelloImpl());  
        h.sayHello();  
    }  
}
```

<br>