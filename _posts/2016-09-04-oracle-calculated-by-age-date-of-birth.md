---
layout: post
blog_id: "oracle-calculated-by-age-date-of-birth"
title: "Oracle 通过出生日期计算年龄"
date: 2016-09-04 00:00:00 -0700
tags: Oracle
category: Oracle
summary: SELECT TRUNC(months_between(sysdate, birth)/12) AS age from mytable
comments: false
---
<br>

#### 方法一：

```sql
SELECT TRUNC(months_between(sysdate, birth)/12) AS age
from mytable
```

#### 方法二：

```sql
select TRUNC((to_char(sysdate, 'yyyyMMdd') - to_char(birth, 'yyyyMMdd')) / 10000) as age
from mytable
```

**注：sysdate 为系统日期时间，birth 为表中出生日期字段**