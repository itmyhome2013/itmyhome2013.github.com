---
layout: post
blog_id: "mongodb-create-database"
title: "MongoDB 创建数据库"
date: 2016-07-15 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB use DATABASE_NAME 用于创建数据库
comments: false
---
<br>

#### user 命令

MongoDB use DATABASE_NAME 用于创建数据库

#### 语法

use DATABASE 语句的基本语法如下：

```ruby
> use DATABASE_NAME
```


#### 示例:

如果想创建一个数据库名称 <**ithome**>, 那么 **use DATABASE** 语句如下：

```ruby
> use ithome
switched to db ithome
```

要检查当前选择的数据库使用命令 **db**

```ruby
> db
ithome
```

如果想检查数据库列表，使用命令 **show dbs**

```ruby
> show dbs
local   0.000GB
test    0.035GB
```

创建的数据库ithome 列表中是不存在的。要显示的数据库，需要把它插入至少一个文件。

```ruby
> db.person.insert({"name":"hello mongodb"})
> show dbs
ithome  0.000GB
local   0.000GB
test    0.035GB
```

在 MongoDB 默认数据库test。如果没有创建任何数据库，然后集合将被存储在测试数据库。















