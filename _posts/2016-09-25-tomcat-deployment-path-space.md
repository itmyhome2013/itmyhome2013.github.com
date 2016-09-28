---
layout: post
blog_id: "tomcat-deployment-path-space"
title: "Tomcat部署路径空格问题"
date: 2016-09-25 00:00:00 -0700
tags: Tomcat
category: Tomcat
summary: web项目发布到tomcat下，如果tomcat安装目录有空格就会出现%20问题
comments: false
---
<br>

web项目发布到tomcat下，如果tomcat安装目录为

```ruby
C:\Program Files\tomcat6\webapps\...
```

当我们获取当前类的路径时，就会出现空格(%20)问题

```ruby
C:\Program%20Files\tomcat6\webapps\...
```

这时再对该路径做文件操作，就会发生一些未知错误

两种解决方案，一种是 **replace()** 替换

```java
strPath = strPath.replace("%20", " ");
```

##### **另一种是避免文件夹空格出现(简单粗暴)**
