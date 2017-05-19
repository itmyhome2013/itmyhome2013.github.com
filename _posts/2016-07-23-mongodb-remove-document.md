---
layout: post
blog_id: "mongodb-remove-document"
title: "MongoDB 删除文档"
date: 2016-07-23 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB的 remove() 方法用于从集合中删除文档
comments: false
---
<br>

#### remove() 方法

MongoDB的 remove() 方法用于从集合中删除文档。remove() 方法接受两个参数。第一个是删除criteria ，第二是justOne标志：

+ deletion criteria :(可选)删除标准，根据文件将被删除。
+ justOne : (可选)如果设置为true或1，然后只删除一个文件。

#### 语法:

基本语法remove()方法如下

```ruby
> db.COLLECTION_NAME.remove(DELLETION_CRITTERIA)
```

#### 例子

以下数据为 person 集合。

```ruby
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
```

下面的例子将删除所有name是 'lisi' 的记录

```ruby
> db.person.remove({"name":"lisi"})
> db.person.find()
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
>
```

#### 删除只有一个

如果有多个记录且要删除的只有第一条记录，那么设置remove()方法中justOne参数

```ruby
> db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)
```

#### 删除所有文件

如果不指定删除条件，然后MongoDB将从集合中删除整个文件。这相当于SQL的truncate命令。

```ruby
> db.person.remove()
> db.person.find()
>
```
