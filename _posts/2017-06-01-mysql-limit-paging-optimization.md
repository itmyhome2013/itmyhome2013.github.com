---
layout: post
blog_id: "mysql-limit-paging-optimization"
title: "MySQL Limit 分页优化"
date: 2017-06-01 00:00:00 -0700
tags: MySQL
category: MySQL
summary: 在系统中需要进行分页的时候，我们通常会使用Limit加上偏移量的方法实现
comments: false
---

在系统中需要进行分页的时候，我们通常会使用Limit加上偏移量的方法实现，问题来了，在偏移量非常大的时候，例如可能是limit 10000,10这样的查询，这时MySQL需要查询10010条记录然后只返回最后的10条，前面10000条记录都被抛弃，造成效率低下。

优化此类分页查询的一个最简单的办法就是尽可能地使用索引覆盖查询，而不是查询所有的列，然后根据需要做一个关联操作再返回所需的列，对于偏移量很大的时候，这样做的效率会有很大提升

现TEST表中有1000000(百万)条数据
添加索引，不然查询速度很慢

```sql
ALTER TABLE TEST ADD PRIMARY KEY (id) 
```

#### 不同数据量读取数据效率比较：

**1、offset比较小的时候：**

```sql
SELECT * FROM test LIMIT 100,10; 
```

多次运行，时间在0.001左右

```sql
SELECT * FROM test WHERE id >= (  
  SELECT id FROM test ORDER BY id LIMIT 100,1  
) LIMIT 10
```

多次运行，时间也基本在0 ~ 0.001之间。所以，在offset较小的时候，直接使用limit效率会高点！

**2、offset比较大的时候**

```sql
SELECT * FROM test LIMIT 900000,10;
```

多次运行，时间在0.712左右

```sql
SELECT * FROM test WHERE id >= (  
  SELECT id FROM test ORDER BY id LIMIT 900000,1  
) LIMIT 10
```

多次运行，时间在0.475左右，所以，offset较大时，使用后者效率增高！这是用了id做索引的结果。

**除了上面的子查询，也可以使用表连接(INNER JOIN)进行优化**

```sql
SELECT * FROM test INNER JOIN ( SELECT id FROM test  ORDER BY id  LIMIT 900000,10) t2 USING (id)
```

效率和子查询差不多


#### 总结：

+ 1、尽可能从索引中直接获取数据，避免或减少直接扫描行数据的频率
+ 2、尽可能减少扫描的记录数，也就是先确定起始的范围，再往后取N条记录即可
