---
layout: post
blog_id: "mongodb-update-document"
title: "MongoDB 更新文档"
date: 2016-07-22 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB的 update() 和 save() 方法用于更新文档的集合
comments: false
---
<br>

MongoDB的 update() 和 save() 方法用于更新文档的集合。 update()方法更新现有的文档值，

而替换现有的文档通过的文件中 save() 方法。

#### MongoDB Update() 方法

update()方法更新现有文档值。

#### 语法:

update() 方法的基本语法如下

```ruby
> db.COLLECTION_NAME.update(SELECTIOIN_CRITERIA, UPDATED_DATA)
```

#### 例子

以下数据为 person 集合。

```ruby
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 25 }
```

下面的例子将name为wangwu的age改为26

```ruby
> db.person.update({"name":"wangwu"},{$set:{"age":26}})
> db.person.find()
{ "_id" : ObjectId("578c3d306775f085b5fea8d9"), "name" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("578c3d306775f085b5fea8da"), "name" : "lisi", "age" : 18 }
{ "_id" : ObjectId("578c3d306775f085b5fea8db"), "name" : "wangwu", "age" : 26 }
>
```

MongoDB默认将只更新单一的文件，更新多个你需要设置参数置 **'multi' 为true**

```ruby
> db.person.update({"name":"wangwu"},{$set:{"age":26}},{multi:true})
```

#### MongoDB Save() 方法

save() 方法替换现有的文档和通过新的文档 save() 方法

#### 语法

MongoDB 的 save() 方法的基本语法如下：

```ruby
> db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})
```

#### 例子

下面的例子将取代文件具有_id为 '578c3d306775f085b5fea8e2'

```ruby
> db.person.save(
   {
      "_id" : ObjectId(578c3d306775f085b5fea8e2), "name" : "ithome", "age" : 24
   }
)
> db.person.find()
{ "_id" : ObjectId(578c3d306775f085b5fea8e2), "name" : "ithome", "age" : 24}
{ "_id" : ObjectId(578c3d306775f085b5fea8e3), "name" : "zhangsan"}
{ "_id" : ObjectId(578c3d306775f085b5fea8e4), "name" : "lisi"}
>
```
