---
layout: post
blog_id: "springmvc-3-handlermapping"
title: "springMVC3学习(三)--handlerMapping和handlerAdapter"
date: 2015-05-03 00:00:00 -0700
tags: springMVC
category: springMVC
summary: BeanNameUrlHandlerMapping:表示将请求的URL和Bean名字映射SimpleControllerHandlerAdapter:表示所有实现了org.springframework.web.servlet.mvc.Controller接口的Bean可以作为Spring Web MVC中的处理器
comments: false
---
</br>
基本结构和 [springMVC3学习(一)--框架搭建](http://itmyhome.com/2015/05/springmvc-1-frame-to-build/) 差不多,这里不再用Annotation注解的方式

</br>
以下只说明需要修改的部分：

####1、在Spring配置文件中配置HandlerMapping、HandlerAdapter

```xml
<!-- HandlerMapping -->  
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"></bean>  
<!-- HandlerAdapter -->  
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"></bean>
```

**BeanNameUrlHandlerMapping：**表示将请求的 URL和Bean名字映射如URL为“上下文/hello” ，则Spring配置文件

必须有一个名字为“/hello”的 Bean，上下文默认忽略。

**SimpleControllerHandlerAdapter：**表示所有实现了org.springframework.web.servlet.mvc.Controller接口的Bean可以作为

Spring Web MVC中的处理器。如果需要其他类型的处理器可以通过实现HadlerAdapter来解决。

</br>
####2、修改页面控制器Login

```java
package com.itmyhome;  
  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import org.springframework.web.servlet.ModelAndView;  
import org.springframework.web.servlet.mvc.Controller;  
  
public class Login implements Controller {  
  
    public ModelAndView handleRequest(HttpServletRequest arg0,  
            HttpServletResponse arg1) throws Exception {  
          
        return new ModelAndView("welcome"); //返回welcome.jsp页面  
    }  
}
```

org.springframework.web.servlet.mvc.Controller：

页面控制器/处理器必须实现Controller接口，注意别选错了；是servlet不是portlet

public  ModelAndView  handleRequest(HttpServletRequest req, HttpServletResponse resp)：

功能处理方法，实现相应的功能处理，比如收集参数、验证参数、绑定参数到命令对象、

将命令对象传入业务对象进行业务处理、最后返回ModelAndView对象;

ModelAndView：包含了视图要实现的模型数据和逻辑视图名;

mv.addObject("message", "Hello World!"); 表示添加模型数据， 此处可以是任意POJO对象;

mv.setViewName("hello"); 表示设置逻辑视图名为"hello" , 视图解析器会将其解析为具体的视图。

</br>
####3、我们还需要将其添加到Spring配置文件springMVC.xml，让其接受SpringIoC容器管理

```xml
<!-- 处理器 -->  
<bean name="/login" class="com.itmyhome.Login"></bean>
```

name="/login"：前边配置的BeanNameUrlHandlerMapping，表示如果请求的URL为“上下文/login”，

则将会交给该Bean进行处理。

</br>
	