---
layout: post
blog_id: "every-derived-table-must-have-its-own-alias"
title: "Every derived table must have its own alias"
date: 2017-02-07 00:00:00 -0700
tags: Hibernate
category: Hibernate
summary: 每个派生出来的表都必须有一个自己的别名
comments: false
---
<br>

如下SQL语句：

```sql
SELECT * FROM 
( SELECT ID,URL FROM alone_action  WHERE STATE = '1' ) 
```

在Oracle中可以执行，但在MySQL下无法通过，错误如下:

```bath
查询：SELECT * FROM ( SELECT ID,URL FROM alone_action WHERE STATE = '1' ) LIMIT 0, 1000

错误代码： 1248
Every derived table must have its own alias
```

Every derived table must have its own alias 意思是说 **每个派生出来的表都必须有一个自己的别名** ,因为进行嵌套查询的时候子查询出来的的结果是作为一个派生表来进行上一级的查询的，所以子查询的结果必须要有一个别名，把MySQL语句改为如下即可

```sql
SELECT * FROM 
( SELECT ID,URL FROM alone_action  WHERE STATE = '1' ) as t
```

- - -

作者出现上述错误的原因不是单纯执行SQL的问题，而是有个项目是Oracle的需要迁移到MySQL，数据库迁移成功之后 运行报错

```bath
Caused by: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: Every derived table must have its own alias
```

原因是因为Hibernate的dialect方言问题，将配置文件中Oracle的方言改为MySQL即可

```xml
<property name="dialect">
	org.hibernate.dialect.MySQLDialect
</property>
```

<br>



