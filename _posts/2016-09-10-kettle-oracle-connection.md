---
layout: post
blog_id: "kettle-oracle-connection"
title: "Kettle 连接 Oracle 问题总结"
date: 2016-09-10 00:00:00 -0700
tags: Kettle Oracle
category: Kettle
summary: jdbc连接数据库的时候，需要使用数据库的sid_name，而不是数据库的services_name
comments: false
---
<br>

##### **一、**

```ruby
Driver class 'oracle.jdbc.driver.OracleDriver' could not be found, make sure the 'Oracle' driver (jar file) is installed.
oracle.jdbc.driver.OracleDriver
```

缺少Oracle JDBC jar包，将ojdbc-x.jar 放在lib目录下

##### **二、**

```ruby
Error connecting to database: (using class oracle.jdbc.driver.OracleDriver)
Listener refused the connection with the following error:
ORA-12505, TNS:listener does not currently know of SID given in connect descriptor
```

jdbc连接数据库的时候，需要使用数据库的sid_name，而不是数据库的services_name

![License Badge]({{ site.baseurl}}/images/kettle/kettle.png)