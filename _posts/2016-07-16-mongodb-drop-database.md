---
layout: post
blog_id: "mongodb-drop-database"
title: "MongoDB 删除数据库"
date: 2016-07-16 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB db.dropDatabase() 命令是用来删除一个现有的数据库
comments: false
---
<br>

#### dropDatabase() 方法

MongoDB db.dropDatabase() 命令是用来删除一个现有的数据库。

#### 语法:

dropDatabase() 命令的基本语法如下：

```ruby
db.dropDatabase()
```

这将删除选定的数据库。如果还没有选择任何数据库，然后它会删除默认的 ' test' 数据库

#### 示例:

首先，检查列表数据库通过使用命令 show dbs

```ruby
> show dbs
ithome  0.000GB
local   0.000GB
test    0.035GB
>
```

如果想删除新数据库 <ithome>,  那么 dropDatabase() 命令如下：

```ruby
> use ithome
switched to db ithome
> db.dropDatabase()
{ "dropped" : "ithome", "ok" : 1 }
>
```

现在检查的数据库列表

```ruby
> show dbs
local  0.000GB
test   0.035GB
>
```














