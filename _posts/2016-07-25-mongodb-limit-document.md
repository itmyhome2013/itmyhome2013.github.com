---
layout: post
blog_id: "mongodb-limit-document"
title: "MongoDB Limit/限制记录"
date: 2016-07-25 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 要限制 MongoDB 中的记录，需要使用 limit() 方法
comments: false
---
<br>

#### Limit() 方法

要限制 MongoDB 中的记录，需要使用 limit() 方法。 limit() 方法接受一个数字型的参数，这是要显示的文档数。

#### 语法:

limit() 方法的基本语法如下

```ruby
> db.COLLECTION_NAME.find().limit(NUMBER)
```

#### 示例

以下数据为 person 集合。

```ruby
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
```

下面的例子将显示只有2条记录

```ruby
> db.person.find().limit(2)
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
>
```

如果不指定数量 limit() 方法的参数，它会显示从集合中的所有文件。 

#### MongoDB Skip() 方法

除了limit() 方法，还有一个方法skip() 也接受数字类型的参数，并使用跳过的文档数。

#### 语法:

skip()方法基本语法如下

```ruby
> db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```

#### 示例:

下面的例子将只显示第二条记录。

```ruby
> db.person.find().limit(1).skip(1)
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
>
```

请注意，skip()方法的默认值是0
