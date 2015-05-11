---
layout: post
blog_id: "springmvc-7-interceptor"
title: "springMVC3学习(七)--Interceptor拦截器"
date: 2015-05-07 00:00:00 -0700
tags: springMVC
category: springMVC
summary: Spring为我们提供了：HandlerInterceptor接口,HandlerInterceptorAdapter适配器.实现这个接口或继承此类,可以非常方便的实现自己的拦截器。
comments: false
---
</br>
Spring为我们提供了：org.springframework.web.servlet.HandlerInterceptor接口，

org.springframework.web.servlet.handler.HandlerInterceptorAdapter适配器，

实现这个接口或继承此类，可以非常方便的实现自己的拦截器。

有以下三个方法：

</br>
**Action之前执行**

```java
public boolean preHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler)
```

</br>
**生成视图之前执行**

```java
public void postHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler, ModelAndView modelAndView)
```

</br>
**最后执行，可用于释放资源**

```java
public void afterCompletion(HttpServletRequest request,  
            HttpServletResponse response, Object handler, Exception e) 
```

分别实现预处理、后处理（调用了Service并返回ModelAndView，但未进行页面渲染）、返回处理（已经渲染了页面）

在preHandle中，可以进行编码、安全控制等处理；

在postHandle中，有机会修改ModelAndView；

在afterCompletion中，可以根据ex是否为null判断是否发生了异常，进行日志记录。

参数中的Object handler是下一个拦截器。

</br>
**如何使用拦截器**

自定义一个拦截器，要实现HandlerInterceptor接口：

```java
public class MyInterceptor implements HandlerInterceptor {...}  
```

</br>
在springMVC的配置文件中配置有三种方法

**一、拦截所有URL**

```xml
<mvc:interceptors>  
	<bean class="com.itmyhome.MyInterceptor" />  
</mvc:interceptors>
```

</br>
**二、拦截匹配的URL**

```xml
<mvc:interceptors>  
    <mvc:interceptor>  
        <mvc:mapping path="/login" />  
        <bean class="com.itmyhome.MyInterceptor"></bean>  
    </mvc:interceptor>  
</mvc:interceptors> 
```

</br>
**三、HandlerMappint上的拦截器**

```xml
<bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping">  
    <property name="interceptors">  
        <list>  
            <bean class="com.itmyhome.MyInterceptor"></bean>  
        </list>  
    </property>  
</bean>
```

如果使用了\<mvc:annotation-driven /\>， 它会自动注册DefaultAnnotationHandlerMapping 与

AnnotationMethodHandlerAdapter 这两个bean,所以就没有机会再给它注入interceptors属性，就无法指定拦截器。

当然我们可以通过人工配置上面的两个Bean，不使用 \<mvc:annotation-driven /\>，

就可以给interceptors属性注入拦截器了。

</br>
**拦截器MyInterceptor类**

```java
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import org.springframework.web.servlet.HandlerInterceptor;  
import org.springframework.web.servlet.ModelAndView;  
  
public class MyInterceptor implements HandlerInterceptor {  
  
    public void afterCompletion(HttpServletRequest request,  
            HttpServletResponse response, Object handler, Exception e)  
            throws Exception {  
        System.out.println("******afterCompletion******");  
  
    }  
  
    public void postHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler, ModelAndView arg3)  
            throws Exception {  
        System.out.println("******postHandle******");  
  
    }  
  
    /** 
     * 如果返回false 从当前拦截器往回执行所有拦截器的afterCompletion方法，再退回拦截器链 如果返回true 
     * 执行下一个拦截器，直到所有拦截器都执行完毕 再运行被拦截的Controller 
     * 然后进入拦截器链从最后一个拦截器往回运行所有拦截器的postHandle方法 
     * 接着依旧是从最后一个拦截器往回执行所有拦截器的afterCompletion方法 
     */  
    public boolean preHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler) throws Exception {  
        System.out.println("******preHandle******");  
        return true;  
    }  
}
```

</br>
**spring配置文件**

```xml
<!-- 拦截所以URL  
<mvc:interceptors>  
	<bean class="com.itmyhome.MyInterceptor" />  
</mvc:interceptors>  
 -->  
 <!-- 拦截匹配URL -->  
<mvc:interceptors >  
	<mvc:interceptor>  
		<mvc:mapping path="/login" />  
		<bean class="com.itmyhome.MyInterceptor"></bean>  
	</mvc:interceptor>  
</mvc:interceptors>  
  
<!-- HandlerMappint上的拦截器  
<bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping">  
	<property name="interceptors">  
		<list>  
			<bean class="com.itmyhome.MyInterceptor"></bean>  
		</list>  
	</property>  
</bean>-->  
  
  
<!-- 默认扫描的包路径-->  
<context:component-scan base-package="com.itmyhome" />   
<!-- 添加注解驱动 -->  
<mvc:annotation-driven />  
  
<!-- 如果使用HandlerMappint拦截器则注释以上注册驱动的方法，使用以下人工配置bean -->  
<!--  <bean class="com.itmyhome.Login"></bean>-->  
  
<!-- 处理器 -->  
<bean name="/login" class="com.itmyhome.Login"></bean>  
  
<!-- HandlerMapping   
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"></bean>-->  
<!-- HandlerAdapter   
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"></bean>-->  
  
<!-- 定义跳转的文件的前后缀 -->  
<bean id="viewResolver"  
	class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
	<property name="prefix" value="/" />  <!-- 默认放在WebRoot下 -->  
	<property name="suffix" value=".jsp" />   
</bean>
```

测试URL：`http://localhost:8080/spring_Interceptor/login`

查看后台会执行拦截器代码

</br>