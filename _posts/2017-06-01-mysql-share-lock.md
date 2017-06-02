---
layout: post
blog_id: "mysql-share-lock"
title: "MySQL 共享锁与排他锁"
date: 2017-06-01 00:00:00 -0700
tags: MySQL
category: MySQL
summary: 共享锁又称读锁,是读取操作创建的锁,其他用户可以并发读取数据,但任何事务都不能对数据进行修改
comments: false
---

#### 共享锁(Share Lock)

共享锁又称读锁，是读取操作创建的锁。其他用户可以并发读取数据，但任何事务都不能对数据进行修改（获取数据上的排他锁），直到已释放所有共享锁。

如果事务T对数据A加上共享锁后，则其他事务只能对A再加共享锁，不能加排他锁。获准共享锁的事务只能读数据，不能修改数据。

**用法**

```sql
SELECT ... LOCK IN SHARE MODE;
```

在查询语句后面增加LOCK IN SHARE MODE，Mysql会对查询结果中的每行都加共享锁，当没有其他线程对查询结果集中的任何一行使用排他锁时，可以成功申请共享锁，否则会被阻塞。其他线程也可以读取使用了共享锁的表，而且这些线程读取的是同一个版本的数据。

#### 排他锁（eXclusive Lock）

排他锁又称写锁，如果事务T对数据A加上排他锁后，则其他事务不能再对A加任任何类型的封锁。获准排他锁的事务既能读数据，又能修改数据。

**用法**

```sql
SELECT ... FOR UPDATE;
```

在查询语句后面增加FOR UPDATE，Mysql会对查询结果中的每行都加排他锁，当没有其他线程对查询结果集中的任何一行使用排他锁时，可以成功申请排他锁，否则会被阻塞。

对于insert、update、delete，InnoDB会自动给涉及的数据加排他锁（X）；对于一般的Select语句，InnoDB不会加任何锁，事务可以通过以下语句给显示加共享锁或排他锁。

+ 共享锁：`SELECT ... LOCK IN SHARE MODE;`
+ 排他锁：`SELECT ... FOR UPDATE;`