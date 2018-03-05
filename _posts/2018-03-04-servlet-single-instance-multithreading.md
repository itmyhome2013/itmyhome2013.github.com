---
layout: post
blog_id: "servlet-single-instance-multithreading"
title: "Servlet单实例多线程模式"
date: 2018-03-04 00:00:00 -0700
tags: [Java,Servlet]
category: [Java,Servlet]
summary:Servlet容器默认采用单实例多线程的方式来处理请求,这样减少产生Servlet实例的开销,提升了对请求的响应时间
comments: false
---

> 问题：Servlet是线程安全的吗？

Servlet类本质上也是一个普通的类，并且Servlet容器默认只允许单个实例存在。当请求到达服务器时，Servlet实例如果已经存在的话则直接加载该实例，如果该Servlet类还未实例化则会先初始化这个Servlet。当请求到达Web服务器时，Web服务器中有一个线程池，它会从线程池中取一个工作线程，通过该线程调用请求的Servlet。因此，对Servlet来说，可以同时被多个请求调用，请求结束后，线程放回线程池。

### 一、Servlet容器如何同时处理多个请求

Java的内存模型JMM(Java Memory Model)
JMM主要是为了规定线程和内存之间的一些关系。根据JMM的设计，系统存在一个主内存(Main Memory)，Java中所有实例变量都存储在主存中，对于所有线程都是共享的。每条线程都有自己的工作内存(Working Memory)，工作内存由缓存和堆栈两部分组成，缓存中保存的是主存变量的拷贝，缓存可能并不总和主存同步，也就是缓存中变量的修改可能没有立刻写到主存中，堆栈中保存的线程的局部变量，线程之间无法相互直接访问堆栈中的变量。

**Servlet采用多线程来处理多个请求同时访问**。servlet依赖于一个线程池来服务请求。线程池实际上是一系列的工作者线程集合。Servlet使用一个调度线程来管理工作者线程。 
       
当容器收到一个Servlet请求，调度线程从线程池中选出一个工作者线程,将请求传递给该工作者线程，然后由该线程来执行Servlet的service方法。当这个线程正在执行的时候,容器收到另外一个请求,调度线程同样从线程池中选出另一个工作者线程来服务新的请求，容器并不关心这个请求是否访问的是同一个Servlet.当容器同时收到对同一个Servlet的多个请求的时候，那么这个Servlet的service()方法将在多线程中并发执行。 

**Servlet容器默认采用单实例多线程的方式来处理请求**，这样减少产生Servlet实例的开销，提升了对请求的响应时间，对于Tomcat可以在server.xml中通过<Connector>元素设置线程池中线程的数目。
 
### 二、如何开发线程安全的Servlet

看下面一个例子

```java
public class MyServlet extends HttpServlet {

	private String name; // 定义一个全部变量

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		name = request.getParameter("name"); // 获取参数
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		try {
			Thread.sleep(5000); // 休眠5s
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		out.print(name);

		out.flush();
		out.close();
	}

}
```

模拟两个线程分别在不同的浏览器中输入地址

![License Badge]({{ site.baseurl}}/images/servlet/1.png)

可以看到，两个显示的都是222，因为两个线程都调用同一个实例，A线程将成员变量name设置为111后，B线程又将改为了222，所以读取了相同的结果

<hr>

解决方法主要有以下三种

#### 1、实现 SingleThreadModel 接口 

该接口指定了系统如何处理对同一个Servlet的调用。如果一个Servlet被这个接口指定,那么在这个Servlet中的service方法将不会有两个线程被同时执行，当然也就不存在线程安全的问题。

![License Badge]({{ site.baseurl}}/images/servlet/2.png)

不过该接口已被废弃，不建议使用

<br>

#### 2、同步对共享数据的操作

使用synchronized 关键字能保证一次只有一个线程可以访问被保护的区段

将上述代码中的 doGet() 方法加上synchronized即可

```java
public synchronized void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
```

<br>

#### 3、避免使用实例变量，使用局部变量

本实例中的线程安全问题是由实例变量造成的，只要在Servlet里面的任何方法里面都不使用实例变量，那么该Servlet就是线程安全的。

```java
public class MyServlet extends HttpServlet {

	// private String name; // 定义一个全部变量

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String name = request.getParameter("name"); // 使用局部变量
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		try {
			Thread.sleep(5000); // 休眠5s
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		out.print(name);

		out.flush();
		out.close();
	}

}
```

参考资料：

<a target = "_blank" href="http://kakajw.iteye.com/blog/920839">http://kakajw.iteye.com/blog/920839</a>

<a target = "_blank" href="http://blog.csdn.net/hello5orld/article/details/19207053">http://blog.csdn.net/hello5orld/article/details/19207053</a>
