---
layout: post
blog_id: "java-get-the-current-system-year"
title: "Java中获取当前系统年份"
date: 2017-02-03 00:00:00 -0700
tags: Java
category: Java
summary: 
comments: false
---
<br>

#### 方法一：

```java
public static String getCurrentYear(){
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
	Date date = new Date();
	return sdf.format(date);
}
```

#### 方法二：

```java
public static String getSysYear() {
	Calendar date = Calendar.getInstance();
	String year = String.valueOf(date.get(Calendar.YEAR));
	return year;
}
```


