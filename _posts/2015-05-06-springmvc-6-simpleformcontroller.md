---
layout: post
blog_id: "springmvc-6-simpleformcontroller"
title: "springMVC3学习(六)--SimpleFormController"
date: 2015-05-06 00:00:00 -0700
tags: springMVC
category: springMVC
summary: 大多数Web应用都会遇到需要填写表单的页面，当表单提交成功后，表单的数据被传送给Web服务器中处理。
comments: false
---
</br>
SimpleFormController提交表单流程如下：

![License Badge]({{ site.baseurl}}/images/springmvc/06/1.png)

</br>
**login.jsp**

```html
<form action="login" method="post">  
    用户名：<input type="text" name="username"/></br>  
    密码：<input type="password" name="password"/></br>  
    <input type="submit" value="提交">  
</form> 
```

</br>
**springMVC.xml**

```xml
<!-- 处理器 -->  
<bean name="/login" class="com.itmyhome.Login">  
    <!-- 返回处理成功页面  success.jsp -->  
    <property name="successView" value="success"/>  
</bean>  
  
<!-- HandlerMapping -->  
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"></bean>  
<!-- HandlerAdapter -->  
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"></bean>  
  
<!-- 定义跳转的文件的前后缀 -->  
<bean id="viewResolver"  
    class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
    <property name="prefix" value="/" />  <!-- 默认放在WebRoot下 -->  
    <property name="suffix" value=".jsp" />   
</bean>
```

</br>
**UserModel.java**

```java
public class UserModel {  
    private String username;  
    private String password;  
  
    public String getUsername() {  
        return username;  
    }  
  
    public void setUsername(String username) {  
        this.username = username;  
    }  
  
    public String getPassword() {  
        return password;  
    }  
  
    public void setPassword(String password) {  
        this.password = password;  
    }  
}
```

</br>
**Login.java**

```java
import org.springframework.web.servlet.mvc.SimpleFormController;  
  
public class Login extends SimpleFormController {  
    public Login() {  
        setCommandClass(UserModel.class);// 设置命令对象实现类  
        setCommandName("user");// 设置命令对象的名字  
    }  
    //以下内容省略  
    /*protected Object formBackingObject(HttpServletRequest request) throws Exception {  
        return null; 
    }  
    protected Map referenceData(HttpServletRequest request) throws Exception {  
        return null; 
    }*/  
    public void doSubmitAction(Object obj) throws Exception {  
        UserModel user = (UserModel) obj;  
        System.out.println(user);  
    }  
}
```

</br>
**success.jsp**

```html
<body>  
  注册成功,欢迎: ${user.username }！  
</body> 
```

</br>
测试：

浏览器中输入：`http://localhost:8080/spring_SimpleFormController/login.jsp` 进入登录页面

注册成功页面：

![License Badge]({{ site.baseurl}}/images/springmvc/06/2.png)

</br>