---
layout: post
blog_id: "springmvc-10-annotations-controller"
title: "springMVC3学习(十)--注解式控制器"
date: 2015-05-10 00:00:00 -0700
tags: springMVC
category: springMVC
summary: Spring2.5引入注解式处理器支持,通过@Controller和@RequestMapping注解定义我们的处理器类。并且提供了一组强大的注解
comments: false
---
<br>

Spring2.5引入注解式处理器支持,通过@Controller和@RequestMapping注解定义我们的处理器类。并且提供了一组强大的注解，需要通过处理器映射DefaultAnnotationHandlerMapping和处理器适配器AnnotationMethodHandlerAdapter 来开启支持@Controller和@RequestMapping注解的处理器。

+ @Controller：用于标识是处理器类；
+ @RequestMapping：请求到处理器功能方法的映射规则；
+ @RequestParam：请求参数到处理器功能处理方法的方法参数上的绑定；
+ @ModelAttribute：请求参数到命令对象的绑定；
+ @InitBinder：自定义数据绑定注册支持,用于将请求参数转换到命令对象属性的对应类型；

#### 一、简单例子

**1、控制器实现**

```java
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.servlet.ModelAndView;  
@Controller                                        //①将一个POJO类声明为处理器  
public class Login{  
      
    @RequestMapping(value="/login.do")              //②请求URL到处理器功能处理方法的映射  
    public ModelAndView hello(HttpServletRequest request,HttpServletResponse response){  
        ModelAndView mv = new ModelAndView();   
        mv.addObject("message", "Hello World!");   
        //设置逻辑视图名，视图解析器会根据该名字解析到具体的视图页面  
        mv.setViewName("login");   
        return mv;                                  //③模型数据和逻辑视图名  
    }  
}
```

①可以通过在一个POJO类上放置@Controller或@RequestMapping，即可把一个POJO类变身为处理器；
②@RequestMapping(value="/login.do")请求URL(/login.do)到处理器的功能处理方法的映射；
③模型数据和逻辑视图名的返回。

现在的处理器无需实现/继承任何接口/类，只需要在相应的类/方法上放置相应的注解说明下即可。

**2、spring配置文件springMVC.xml**

```xml
<!-- 发现无需下面处理器也可 -->  
<!--   
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"></bean>  
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter"></bean>  
 -->  
  
<!-- 处理器 -->  
<bean class="com.itmyhome.Login"></bean>  
  
<!-- 定义跳转的文件的前后缀 -->  
<bean id="viewResolver"  
    class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
    <property name="prefix" value="/" />  <!-- 默认放在WebRoot下 -->  
    <property name="suffix" value=".jsp" />  
</bean>
```

**3、视图页面(login.jsp)**

```html
<body>  
  ${message }  
</body>
```

#### 二、处理器定义

**1、@Controller**

```java
@Controller                                 
public class Login{  
   ...    
}
```

推荐使用这种方式声明处理器,它和我们的@Service、@Repository很好的对应了我们常见的三层开发架构的组件。

**2、@RequestMapping**

```java
@RequestMapping  
public class Login{  
   ...    
}
```

这种方式也是可以的,但如果在类上使用@RequestMapping注解一般是用于窄化功能处理方法的映射的详见下面

**3、窄化请求映射**

```java
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.servlet.ModelAndView;  
@Controller                                          
@RequestMapping(value="/login.do")  //①处理器的通用映射前缀  
public class Login{  
      
    @RequestMapping(value="/login2.do")   //②相对于①处的映射进行窄化  
    public ModelAndView hello(){  
         ...  
    }  
}
```

此时URL就应该为：`http://localhost:8080/springMVC/login/login2.do`

#### 三、请求映射

**1、普通URL路径映射**

@RequestMapping(value={"/login.do","/user/login.do"}):多个URL路径可以映射到同一个处理器的功能处理方法

**2、URL模板模式映射**

+ @RequestMapping(value="/users/{userId}")：{xxx}占位符,请求的URL可以是"/users/123456"或"/users/abcd"。
+ @RequestMapping(value="/users/{userId}/login.do"):这样也是可以的,请求的URL可以是"/users/123/login.do"。
+ @RequestMapping(value="/users/{userId}/channel/{channelId}"):这样也是可以的,请求的URL可以是"/users/123/channel/456"。

**3、Ant风格的URL路径映射**

+ @RequestMapping(value="/users/**"):可以匹配"/users/abc/abc"。
+ @RequestMapping(value="/model?"):可匹配"/model1"或"/modela" ,但不匹配"/model"或"/modelaa";
+ @RequestMapping(value="/model*"):可匹配"/modelabc"或"/model",但不匹配"/modelabc/abc";
+ @RequestMapping(value="/model/*"):可匹配"/model/abc",但不匹配"/modelabc";
+ @RequestMapping(value="/model/**/{modelId}")：可匹配"/model/abc/abc/123”或"/model/123",

也就是Ant风格和URI模板变量风格可混用;

**4、正则表达式风格的URL路径映射**

从Spring3.0开始支持正则表达式风格的URL路径映射,格式为{变量名:正则表达式}
@RequestMapping(value="/login/{userId:\\d+}.do"):可以匹配 "/login/123.do",但不能匹配"/login/abc.do",这样可以设计更加严格的规则。

**5、组合使用是"或"的关系**

如@RequestMapping(value={"/login.do","/user/login.do"})组合使用是或的关系，即"/login.do"或 "/user/login.do"请求URL路径都可以映射到@RequestMapping指定的功能处理方法。

<br>
	