---
layout: post
blog_id: "oracle-between-and"
title: "Oracle BETWEEN AND 边界问题"
date: 2017-06-15 00:00:00 -0700
tags: Oracle
category: Oracle
summary: Oracle的BETWEEN..AND..前后都是闭区间，也就是说包含两个端的数
comments: false
---

#### BETWEEN条件的语法为：

```sql
expression BETWEEN value1 AND value2;
```

Oracle BETWEEN条件将返回表达式在value1和value2（含）范围内的记录。

**例子：**

![License Badge]({{ site.baseurl}}/images/between/1.png)

`Oracle的BETWEEN..AND..前后都是闭区间，也就是说包含两个端的数`


#### 使用NOT运算符

Oracle BETWEEN条件也可以与Oracle NOT运算符组合。 以下是将BETWEEN条件与NOT运算符组合的示例。

**例子：**

![License Badge]({{ site.baseurl}}/images/between/2.png)
