---
layout: post
blog_id: "springmvc-2-modelandview"
title: "springMVC3学习(二)--ModelAndView对象"
date: 2015-05-02 00:00:00 -0700
tags: springMVC
category: springMVC
summary: 当控制器处理完请求时，通常会将包含视图名称或视图对象以及一些模型属性的ModelAndView对象返回到DispatcherServlet。
comments: false
---
<br>

当控制器处理完请求时，通常会将包含视图名称或视图对象以及一些模型属性的ModelAndView对象返回到DispatcherServlet。

因此，经常需要在控制器中构造ModelAndView对象。ModelAndView类提供了几个重载的构造器和一些方便的方法，

让你可以根据自己的喜好来构造ModelAndView对象。这些构造器和方法以类似的方式支持视图名称和视图对象。

当你只有一个模型属性要返回时，可以在构造器中指定该属性来构造ModelAndView对象

<br>

**在上篇的基础上，只修改Login类**

```java
package com.itmyhome;  
  
import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.List;  
import java.util.Map;  
  
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.servlet.ModelAndView;  
  
@Controller  
public class Login {  
  
    @RequestMapping(value="login")  
    public ModelAndView login(){  
        ModelAndView mav = new ModelAndView();  
        mav.setViewName("welcome"); //返回的文件名  
          
        mav.addObject("message","hello kitty");  
          
        //List  
        List<String> list = new ArrayList<String>();  
        list.add("java");  
        list.add("c++");  
        list.add("oracle");  
        mav.addObject("bookList", list);  
          
        //Map  
        Map<String,String> map = new HashMap<String,String>();  
        map.put("zhangsan", "北京");  
        map.put("lisi", "上海");  
        map.put("wangwu", "深圳");  
        mav.addObject("map",map);  
          
        return mav;  
    }  
}
```

亦或如下方法来构建你的ModelAndView对象

```java
@RequestMapping(value="logout")  
public ModelAndView logout(){  
    String message = "欢迎下次光临！";  
    return new ModelAndView("logout","message",message);  
}
```

然后修改welcome.jsp输出数据

遍历集合可使用jstl表达式，需在jsp中引入头文件

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
```

**lib下导入jstl.jar和standard.jar。**

首先这两个jar在哪里可以找到，当然可以在网上下载。

另外在tomcat下面就有，在**\webapps\examples\WEB-INF\lib**下

前提是你还没有把webapps下面的一些无用项目删掉。

**welcome.jsp**

```html
<body>  
   <!-- 输出普通字符 -->  
   ${message } <br/>  
   <!-- 输出List -->  
   <p>书籍列表</p>  
   <c:forEach items="${bookList}" var="node">  
        <c:out value="${node}"></c:out>  
   </c:forEach>  
   <br/>  
   <br/>  
     
   <!-- 输出Map -->  
   <c:forEach items="${map}" var="node">  
        姓名：<c:out value="${node.key}"></c:out>  
        住址：<c:out value="${node.value}"></c:out>  
        <br/>  
   </c:forEach>  
</body>
```

结果如图：

![License Badge]({{ site.baseurl}}/images/springmvc/02/1.png)

<br>