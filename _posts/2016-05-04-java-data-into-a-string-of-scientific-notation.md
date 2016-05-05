---
layout: post
blog_id: "java-data-into-a-string-of-scientific-notation"
title: "Java将科学计数法数据转为字符串"
date: 2016-05-04 00:00:00 -0700
tags: Java
category: Java
summary: 如果Excel单元格数据类型为数值，数字太长会变成科学计数法
comments: false
---
<br>
如果Excel单元格数据类型为数值，数字太长会变成**科学计数法**，Java读取的时候使用如下方法可将其转为字符串

```java
BigDecimal bd = new BigDecimal("3.0000856182503598E18"); 
System.out.println(bd.toPlainString());
```

输出：

```java
3000085618250359800
```

<br>