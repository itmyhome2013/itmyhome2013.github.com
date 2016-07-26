---
layout: post
blog_id: "mongodb-projection-document"
title: "MongoDB 投影"
date: 2016-07-24 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: mongodb 投影意思是只选择必要的数据而不是选择一个文件的数据的整个
comments: false
---
<br>

mongodb 投影意思是只选择必要的数据而不是选择一个文件的数据的整个。例如一个文档有5个字段，只需要显示其中3个

#### find() 方法

在MongoDB中，当执行find()方法，那么它会显示一个文档所有字段。要限制这一点，需要设置的字段列表值1或0。

**1用来显示字段而0是用来隐藏字段。**

#### 语法:

find()方法具有投影基本语法如下

```ruby
> db.COLLECTION_NAME.find({},{KEY:1})
```

#### 例子

以下数据为 person 集合。

```ruby
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
```

只显示name字段，隐藏age字段

```ruby
> db.person.find({},{"name":1})
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan" }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi" }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu" }
```

请注意_id字段始终显示在执行find()方法，如果不想这个字段，那么需要将其设置为0
