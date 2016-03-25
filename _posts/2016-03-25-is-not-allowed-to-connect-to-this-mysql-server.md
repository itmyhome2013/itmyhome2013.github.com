---
layout: post
blog_id: "is-not-allowed-to-connect-to-this-mysql-server"
title: "MySQL远程连接：Host 'x' is not allowed to connect to this MySQL server"
date: 2016-03-24 00:00:00 -0700
tags: MySQL
category: MySQL
summary: 远程连接MySQL时发现如下错误,is not allowed to connect to this MySQL server
comments: false
---
<br>
远程连接MySQL时发现如下错误：

```bash
java.sql.SQLException: null,  message from server: "Host '192.168.30.23' is not allowed to connect to this MySQL server"
```

##### **解决方法：**

进入MySQL的bin目录,执行如下代码：

```sql
mysql -u root -proot
mysql> user mysql;
mysql> update user set host = '%' where user = 'root';
mysql> flush privileges;
```

![License Badge]({{ site.baseurl}}/images/mysql/mysql.png)

<br>
