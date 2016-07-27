---
layout: post
blog_id: "mongodb-sort-document"
title: "MongoDB 排序文档"
date: 2016-07-26 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 要在 MongoDB 中的文档进行排序，需要使用sort()方法
comments: false
---
<br>

#### sort() 方法

要在 MongoDB 中的文档进行排序，需要使用sort()方法。 sort() 方法接受一个文档，其中包含的字段列表连同他们的排序顺序。

要指定排序顺序1和-1。 1用于升序排列，而-1用于降序。

#### 语法:

sort() 方法的基本语法如下

```ruby
> db.COLLECTION_NAME.find().sort({KEY:1})
```

#### 例子

以下数据为 person 集合。

```ruby
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
```

下面的例子将显示按年龄降序排序的记录。

```ruby
> db.person.find().sort({"age":-1})
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
>
```

请注意，如果不指定排序优先，然后sort() 方法将文档显示在升序排列。

