---
layout: post
blog_id: "springmvc-8-exception"
title: "springMVC3学习(八)--全局的异常处理"
date: 2015-05-08 00:00:00 -0700
tags: springMVC
category: springMVC
summary: 通过SimpleMappingExceptionResolver我们可以将不同的异常映射到不同的jsp页面,同时我们也可以为所有的异常指定一个默认的异常提示页面
comments: false
---
<br>

在springMVC的配置文件中：

```xml
<bean id="exceptionResolver" class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">  
    <property name="defaultErrorView">  
        <value>/error</value><!-- 表示当抛出异常但没有在exceptionMappings里面找到对应的异常时 返回名叫error的视图-->  
    </property>  
    <property name="defaultStatusCode" value="404"/><!-- 表示在发生异常时默认的HttpServletResponse的返回码，默认是404-->  
    <property name="statusCodes"><!-- 定义在发生异常时视图跟返回码的对应关系 -->  
        <props>  
            <!-- 表示在发生NumberFormatException时返回视图number，然后这里定义发生异常时视图number对应的HttpServletResponse的返回码是500 -->  
            <prop key="number">500</prop>  
            <prop key="null">503</prop>  
        </props>  
    </property>  
    <property name="exceptionMappings">  
        <props>  
            <prop key="NumberFormatException">number</prop><!-- 表示当抛出NumberFormatException的时候就返回名叫number的视图-->  
            <prop key="NullPointerException">null</prop>  
        </props>  
    </property>  
</bean>
```

这里主要的类是SimpleMappingExceptionResolver类，和他的父类AbstractHandlerExceptionResolver类。

你也可以实现HandlerExceptionResolver接口，写一个自己的异常处理程序。通过SimpleMappingExceptionResolver我们可以将不同的异常映射到不同的jsp页面（通过exceptionMappings属性的配置）。同时我们也可以为所有的异常指定一个默认的异常提示页面（通过defaultErrorView属性的配置），如果所抛出的异常在exceptionMappings中没有对应的映射，则Spring将用此默认配置显示异常信息。

**Login.java测试类**

```java
import java.io.File;  
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
  
@Controller  
public class Login {  
    @RequestMapping("/null")  
    public void testNullPointerException() {  
         File file = null;  
         // 空指针异常，返回定义在SpringMVC配置文件中的null视图  
         System.out.println(file.getName());  
    }  
  
    @RequestMapping("/number")  
    public void testNumberFormatException() {  
         // NumberFormatException，返回定义在SpringMVC配置文件中的number视图  
         Integer.parseInt("abc");  
    }  
  
    @RequestMapping("/default")  
    public void testDefaultException() {  
        if (1 == 1)  
          // 由于该异常类型在SpringMVC的配置文件中没有指定，所以就会返回默认的exception视图  
          throw new RuntimeException("Error!");  
    }  
}
```

显示错误的jsp页面(以error.jsp为例)

```html
<body>  
    <%  
        Exception e = (Exception)request.getAttribute("exception");  
        out.print(e.getMessage());  
    %>  
</body>
```

测试URL：  

`http://localhost:8080/spring_exception/null`
`http://localhost:8080/spring_exception/number`
`http://localhost:8080/spring_exception/default`

<br>