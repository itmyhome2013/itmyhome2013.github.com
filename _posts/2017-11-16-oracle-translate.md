---
layout: post
blog_id: "oracle-translate"
title: "Oracle中的translate函数用法"
date: 2017-11-16 00:00:00 -0700
tags: Oracle
category: Oracle
summary: translate提供了与replate函数相关的功能, 进行多个单字符，一对一的替换
comments: false
---

#### 语法：

```sql
translate(expr, from_strimg, to_string)
```

#### 简介：

translate返回expr，其中from_string中的**每个字符**的所有出现都被to_string中的**相应字符**替换。expr中不在from_string中的字符不会被替换。如果expr是一个字符串，那么你必须把它放在单引号中。 from_string的参数可以包含比to_string更多的字符。在这种情况下，from_string末尾的多余字符在to_string中没有对应的字符。如果这些额外的字符出现在字符中，那么它们将从返回值中移除。

您不能使用to_string的空字符串从返回值中删除from_string中的所有字符。Oracle数据库将空字符串解释为空，如果此函数具有空参数，则返回null。

translate提供了与replate函数相关的功能。 replace让你用一个字符串替换另一个字符串，以及删除字符串。 translate允许您在一个操作中进行多个单字符，一对一的替换。

该函数不直接支持CLOB数据。但是，CLOB可以通过隐式数据转换作为参数传递。

#### 例子：

以下语句将一句话转换为具有下划线分隔的字符串。from_string包含四个字符：井号，美元符号，空格，星号。to_string只包含一个@符号和两个下划线。 这使得from_string中的第四个字符没有相应的替换，所以星号从返回的值中删除。

```sql
SELECT TRANSLATE('itmyhome#163.com$is my* email', '#$ *', '@__') from dual

----------
itmyhome@163.com_is_my_email
```

#### 和replace函数的区别

```sql
select translate('itmyhome#163%com', '#%', '@.') from dual;
select replace('itmyhome#163%com', '#%', '@.') from dual;

---------
itmyhome@163.com
itmyhome#163%com
```

上面的translate函数是将#替换为@，%替换为. <br>
而replace却没有实现此效果，是因为没有找到#%整体的组合