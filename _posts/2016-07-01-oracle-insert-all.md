---
layout: post
blog_id: "oracle-insert-all"
title: "Oracle INSERT ALL 语句介绍"
date: 2016-07-01 00:00:00 -0700
tags: Oracle
category: Oracle
summary: Oracle INSERT ALL 语句用来用一个 INSERT 语句添加多行
comments: false
---
<br>

#### 描述

Oracle INSERT ALL 语句用来用一个 INSERT 语句添加多行。该行可以只使用一个SQL命令插入到一个表或多个表。

#### 语法

Oracle INSERT ALL 语法如下：

```sql
INSERT ALL
  INTO mytable (column1, column2, column_n) VALUES (expr1, expr2, expr_n)
  INTO mytable (column1, column2, column_n) VALUES (expr1, expr2, expr_n)
  INTO mytable (column1, column2, column_n) VALUES (expr1, expr2, expr_n)
SELECT * FROM dual;
```

#### 参数

MYTABLE 向该表中插入记录

column1, column2, column_n 该表中插入的列

expr1, expr2, ... expr_n 该表中插入的值


#### 示例 - 插入到一个表

可以使用 INSERT INTO 语句多个记录插入到一个表。

例如，如果你想插入3行到成绩表，你可以运行下面的SQL语句：

```sql
INSERT ALL
  INTO score (s_id, s_name) VALUES (1000, 'ZS')
  INTO score (s_id, s_name) VALUES (2000, 'LS')
  INTO score (s_id, s_name) VALUES (3000, 'WZ')
SELECT * FROM dual;
```

这等同于以下3 INSERT 语句：

```sql
INSERT INTO score (s_id, s_name) VALUES (1000, 'ZS');
INSERT INTO score (s_id, s_name) VALUES (2000, 'LS');
INSERT INTO score (s_id, s_name) VALUES (3000, 'WZ');
```

#### 示例 - 插入到多个表

也可以使用 INSERT ALL 语句将多个行插入多个表中的一个命令。

例如，如果你想插入两条记录到成绩表一条记录到课程表，可以运行下面的SQL语句：

```sql
INSERT ALL
  INTO score (s_id, s_name) VALUES (1000, 'ZS')
  INTO score (s_id, s_name) VALUES (2000, 'LS')
  INTO course (c_id, c_name, c_time) VALUES (5000, 'Computer', '9:00')
SELECT * FROM dual;
```

这等同于以下3 INSERT 语句：

```sql
INSERT INTO score (s_id, s_name) VALUES (1000, 'ZS');
INSERT INTO score (s_id, s_name) VALUES (2000, 'LS');
INSERT INTO course (c_id, c_name, c_time) VALUES (5000, 'Computer', '9:00');
```

<br>




















