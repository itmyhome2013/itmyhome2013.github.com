---
layout: post
blog_id: "struts-servlet-to-achieve-coexistence"
title: "Struts2和Servlet实现共存"
date: 2016-11-15 00:00:00 -0700
tags: Struts2
category: Struts2
summary: 在项目中，如果我们用到了Struts2和Servlet，项目运行时有可能无法正常访问Servlet
comments: false
---
<br>

在一个项目中，如果我们既用到了Struts2又用到了Servlet，项目运行时有可能无法正常访问Servlet，原因是在配置Struts的过滤器的时候，拦截了所有请求。

```xml
<filter-mapping>
     <filter-name>struts2</filter-name>
     <url-pattern>/*</url-pattern>
</filter-mapping>
```

下面是servlet的配置

```xml
<servlet>
     <servlet-name>MyServlet</servlet-name>
     <servlet-class>com.itmyhome.MyServlet</servlet-class>
</servlet>

<servlet-mapping>
     <servlet-name>MyServlet</servlet-name>
     <url-pattern>/MyServlet</url-pattern>
</servlet-mapping>
```

当我们在页面发出请求时，struts2将会拦截所有请求，对于servlet请求将不能够正常响应
报错信息为：`HTTP Status 404 - There is no Action mapped for namespace / and action name MyServlet.`
**这是因为struts2把servlet当成action了，因为servlet和action都是没有后缀的.**

#### 解决方法：

下面介绍三种方法

#### **方法1：**

在servlet后面加上.servlet结尾,包括web.xml配置文件中和页面上使用servlet的地方(当然是什么都可以，比如hello)

```xml
<servlet-mapping>
     <servlet-name>MyServlet</servlet-name>
     <url-pattern>/MyServlet.servlet</url-pattern> <!-- MyServlet.hello 也是可以的 -->
</servlet-mapping>
```

页面访问 http://localhost:8080/project/MyServlet.servlet

#### **方法2：**

在struts.xml中的<struts>的节点下面添加struts2处理的请求后缀 常量：

```xml
<constant name="struts.action.extension" value="action" />
```

该属性指定需要Struts2处理的请求后缀，该属性的默认值是action，即所有匹配*.action的请求都由Struts2处理。 
如果用户需要指定多个请求后缀，则多个后缀之间以英文逗号(,)隔开。 

#### **方法3：**

在web.xml中修改struts2拦截页面请求的配置：
原来的

```xml
<filter>
	<filter-name>struts2</filter-name>
	<filter-class>org.apache.struts2.dispatcher.FilterDispatcher</filter-class>
</filter>
<filter-mapping>
	<filter-name>struts2</filter-name>
	<url-pattern>/*</url-pattern>
</filter-mapping>
```

改为

```xml
<filter-mapping>
	<filter-name>struts2</filter-name>
	<url-pattern>*.action</url-pattern>
</filter-mapping>
<filter-mapping>
	<filter-name>struts2</filter-name>
	<url-pattern>*.jsp</url-pattern>
</filter-mapping>
<filter-mapping>
	<filter-name>struts2</filter-name>
	<url-pattern>/admin/*</url-pattern>
</filter-mapping>
```

servlet的请求路径不改变





