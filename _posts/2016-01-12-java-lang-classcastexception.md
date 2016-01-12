---
layout: post
blog_id: "java-lang-classcastexception"
title: "java.lang.ClassCastException: [Ljava.lang.Object; cannot be cast to"
date: 2016-01-12 00:00:00 -0700
tags: Exception
category: Exception
summary: 如果使用原生sql语句进行query查询时，hibernate是不会自动把结果包装成实体的。
comments: false
---
<br>

本例错误是Hibernate产生

```java
Session session= sessionFatory.getCurrentSession();
SQLQuery sqlquery= session.createSQLQuery("select * from FRM_FIELD");
List<FrmField> fields = sqlquery.list();
```

上面的查询是返回标量值的，<font color="red">Object类型</font>，也就是从resultset中返回的"裸"数据。

如果使用原生sql语句进行query查询时，hibernate是不会自动把结果包装成实体的。

下面通过加上 <font color="red">addEntity()</font> 让原生查询返回实体对象。

```java
sqlquery.addEntity(FrmField.class);
```

标量和实体查询对比

<table class="table table-bordered table-condensed"> 
	  <tr>
		<td>Object类型</td>
		<td>实体对象</td>
	  </tr>
	  <tr> 
		 <td> <img src="{{ site.baseurl}}/images/exception/1.png" /> </td> 
		 <td> <img src="{{ site.baseurl}}/images/exception/2.png" /> </td> 
	  </tr> 
</table>

<br>