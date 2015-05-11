---
layout: post
blog_id: "springmvc-5-multiactioncontroller"
title: "springMVC3学习(五)--MultiActionController"
date: 2015-05-05 00:00:00 -0700
tags: springMVC
category: springMVC
summary: Spring提供一个多动作控制器，使用它你可以将几个动作合并在一个控制器里，这样可以把功能组合在一起。
comments: false
---
</br>
Spring提供一个多动作控制器，使用它你可以将几个动作合并在一个控制器里，这样可以把功能组合在一起。

多动作控制器存在在一个单独的包中——org.springframework.web.mvc.multiaction——它能够将请求映射到方法名，

然后调用正确的方法。比如当你在一个控制器中有很多公共的功能，但是想多个入口到控制器使用不同的行为，

使用多动作控制器就特别方便。

</br>
**MultiActionController类实现**

类定义：public class MultiActionController extends  AbstractController implements LastModified，

继承了AbstractController，并实现了LastModified接口，默认返回-1；

</br>
**核心属性：**

delegate: 功能处理的委托对象，即我们要调用请求处理方法所在的对象，默认是this；

methodNameResolver：功能处理方法名解析器，即根据请求信息来解析需要执行的delegate的功能处理方法的方法名。

</br>
**接下来看一个使用ParameterMethodNameResolver的例子**

```java
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import org.springframework.web.servlet.ModelAndView;  
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;  
  
public class UserController extends MultiActionController {  
      
    public ModelAndView add(HttpServletRequest request,HttpServletResponse response) {  
        ModelAndView mv = new ModelAndView();   
        mv.addObject("message","add");   
        mv.setViewName("add");   
        return mv;   
    }  
    public ModelAndView delete(HttpServletRequest request,HttpServletResponse response) {  
        ModelAndView mv = new ModelAndView();   
        mv.addObject("message","delete");   
        mv.setViewName("delete");   
        return mv;   
    }  
}
```

**springMVC.xml配置**

```xml
<bean class="org.springframework.web.servlet.handler.SimpleUrlHandlerMapping">  
      <property name="mappings">  
            <props>  
                  <prop key="userAction.do">userAction</prop>  
        </props>  
      </property>  
</bean>  
<bean id="userAction" class="com.itmyhome.UserController">  
      <property name="methodNameResolver">  
        <bean class="org.springframework.web.servlet.mvc.multiaction.ParameterMethodNameResolver">  
           <!-- 指定参数名为action -->  
           <property name="paramName" value="action" />  
        </bean>  
      </property>  
</bean>
```

测试URL：

`http://localhost:8080/spring_MultiActionController/userAction.do?action=add`

`http://localhost:8080/spring_MultiActionController/userAction.do?action=delete`

</br>