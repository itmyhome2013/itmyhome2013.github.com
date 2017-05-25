---
layout: post
blog_id: "springmvc-4-accessing-static-files"
title: "springMVC3学习(四)--访问静态文件如js,jpg,css"
date: 2015-05-04 00:00:00 -0700
tags: springMVC
category: springMVC
summary: 如果你的DispatcherServlet拦截的是*.do这样的URL,就不存在访问不到静态资源的问题.如果你的DispatcherServlet拦截了"/"所有的请求,那同时对.js,.jpg的访问也就被拦截了。
comments: false
---
<br>

如果你的DispatcherServlet拦截的是*.do这样的URL，就不存在访问不到静态资源的问题
如果你的DispatcherServlet拦截了"/"所有的请求，那同时对*.js,*.jpg的访问也就被拦截了。
我们在进行springMVC开发时，必定会在jsp页面引入js、img和css等文件。
大多数人会将这些分类存放在WebRoot文件下新建的文件夹下面。
同时，会在web.xml文件中配置拦截所有请求。这样就造成了页面无法访问到js、img和css文件夹中的文件了

#### 方法一：在web.xml中配置defaultServlet来处理静态文件

```xml
<servlet-mapping>  
	<servlet-name>default</servlet-name>  
	<url-pattern>*.jpg</url-pattern>  
</servlet-mapping>  
<servlet-mapping>  
	<servlet-name>default</servlet-name>  
	<url-pattern>*.js</url-pattern>  
</servlet-mapping>  
<servlet-mapping>  
	<servlet-name>default</servlet-name>  
	<url-pattern>*.css</url-pattern>  
</servlet-mapping>
```

#### 方法二：在Springmvc中可以利用mvc:resources

springmvc的<mvc:resources location="**" mapping="**"/>标签是在spring3.0.4出现的,主要是用来进行静态资源的访问。

```xml
<!-- 对静态资源文件的访问 -->  
<mvc:resources location="/js/" mapping="/js/**"/>  
<mvc:resources location="/img/" mapping="/img/**"/> 
```

location指定静态资源的位置

#### 方法三：使用\<mvc:default-servlet-handler/\>

```xml
<mvc:default-servlet-handler/> 
```

最后再说明一下,如何你的DispatcherServlet拦截*.do这样的URL,就不存上述问题了。

<br>

