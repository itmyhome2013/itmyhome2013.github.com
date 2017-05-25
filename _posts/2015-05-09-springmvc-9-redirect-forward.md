---
layout: post
blog_id: "springmvc-9-redirect-forward"
title: "springMVC3学习(九)--redirect和forward跳转"
date: 2015-05-09 00:00:00 -0700
tags: springMVC
category: springMVC
summary: forward跳转后地址栏URL不会改变 而redirect会改变.
comments: false
---
<br>

```java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Login {
	/** 转发 **/
	@RequestMapping("/login.do")
	public String login(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("message", "hello");
		return "forward:/index.do"; // forward在跳转后可以取到message值
	}
	@RequestMapping("/index.do")
	public String index(HttpServletRequest request, HttpServletResponse response) {
		return "welcome";
	}
	/** 重定向 **/
	@RequestMapping("/logout.do")
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("message", "hello");
		return "redirect:/register.do"; // redirect在跳转后无法取到message值
	}
	@RequestMapping("/register.do")
	public String register(HttpServletRequest request, HttpServletResponse response) {
		return "register";
	}
}
```

**另外forward跳转后地址栏URL不会改变 而redirect会改变**

测试URL：

`http://localhost:8080/spring_forward/login.do`
`http://localhost:8080/spring_forward/logout.do`

<br>