---
layout: post
blog_id: "java-web-service-simple-example"
title: "Java Web Service 简单实例"
date: 2017-05-26 00:00:00 -0700
tags: WebService
category: WebService
summary: Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序
comments: false
---

#### 一、准备工作

+ MyEclipse8.5
+ JDK1.6

#### 二、创建服务端

**1、新建【Web Service Project】，命名【TheService】**

**2、创建Class类，命名【MyService】,放在【com.ithome】包下**

**3、编写服务端代码**

```java
package com.ithome;

import javax.jws.WebService;
import javax.xml.ws.Endpoint;

@WebService
public class MyService {

	/**
	 * 供客户端调用方法
	 * @param name
	 * @return
	 */
	public String sayHello(String name){ 
		return "hello:" + name;
	}
	public static void main(String[] args) {
		Endpoint.publish("http://localhost:8001/Service/MyService", new MyService());
		System.out.println("service success");
	}

}
```

**4、进行编译**

![License Badge]({{ site.baseurl}}/images/webservice/ws1.png)

说明发布成功

**5、测试结果**

浏览器中输入：http://localhost:8001/Service/MyService?wsdl

![License Badge]({{ site.baseurl}}/images/webservice/ws2.png)

#### 三、生成客户端

**1、新建【Web Service Project】，命名【TheClient】**

**2、CMD命令提示窗口执行生成命令。**

格式：wsimport -s "src目录" -p "生成类所在包名" -keep "wsdl发布地址"

示例：

```java
wsimport -s D:\\MyEclipse2015\\TheClient\\src -p com.ithome -keep http://localhost:8001/Service/MyService?wsdl
```

![License Badge]({{ site.baseurl}}/images/webservice/ws3.png)

**3、刷新项目**

![License Badge]({{ site.baseurl}}/images/webservice/ws4.png)

**4、客户端测试**

新建Class类，命名【ServiceTest】,放在【com.test】包下

```java
package com.test;

import com.ithome.MyService;
import com.ithome.MyServiceService;

public class ServiceTest {
	public static void main(String[] args) {
		MyService ms = new MyServiceService().getMyServicePort(); //初始化对象
		String name = ms.sayHello("itmyhome"); //调用对象中的方法
		System.out.println(name);
	}
}
```

**5、输出结果**

![License Badge]({{ site.baseurl}}/images/webservice/ws5.png)