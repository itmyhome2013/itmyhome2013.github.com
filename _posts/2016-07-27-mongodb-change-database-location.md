---
layout: post
blog_id: "mongodb-change-database-location"
title: "MongoDB 更改数据库位置"
date: 2016-07-27 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB在Windows中默认的数据库目录是C:\data
comments: false
---
<br>

MongoDB在Windows中默认的数据库目录是 `C:\data`。如果在没有该目录的情况下，执行命令mongod，则会报如下错误：

![License Badge]({{ site.baseurl}}/images/mongodb/1.png)

如果我们不想把mongoDB的数据库放在C盘，可以使用如下两种方法更换数据库目录

#### 1、命令方式

首先创建数据库目录，例如 d:\data 然后运行命令

```txt
mongod –dbpath d:\data
```

#### 2、配置文件方式

在任意位置创建一个配置文件，例如D盘根目录下创建一个名为mongo.cfg的文件，

内容为 **dbpath=d:\data**。然后运行命令

```txt
mongod –config d:\mongo.cfg
```

