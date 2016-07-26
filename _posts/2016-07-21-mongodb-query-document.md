---
layout: post
blog_id: "mongodb-query-document"
title: "MongoDB 查询文档"
date: 2016-07-21 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 要从MongoDB 查询集合数据，需要使用MongoDB 的 find() 方法
comments: false
---
<br>

#### find() 方法

要从MongoDB 查询集合数据，需要使用MongoDB 的 find() 方法。

#### 语法

基本的find()方法语法如下

```ruby
> db.COLLECTION_NAME.find()
```

find() 方法将在非结构化的方式显示所有的文件。

#### pretty() 方法

结果显示在一个格式化的方式，可以使用 pretty() 方法.

#### 语法:

```ruby
> db.mycol.find().pretty()
```

#### 例子

```ruby
> db.person.find().pretty()
{
   "_id" : ObjectId("578c3d846775f085b5fea8ec"),
   "name" : "ithome",
   "age" : 19
}
>
```

除了find() 方法外，还有一个 findOne() 法，返回一个文件。


#### 查询条件

##### **1、大于，小于，大于等于，小于等于**

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>$gt</td> 
     <td>大于 > </td> 
    </tr>
	<tr> 
     <td>$lt</td> 
     <td>小于 < </td> 
    </tr>
	<tr> 
     <td>$gte</td> 
     <td>大于或等于 >= </td> 
    </tr>
	<tr> 
     <td>$lte</td> 
     <td>小于等于 <= </td>  
    </tr>
</table>

##### 示例

```bash
db.person.find({age:{$gt:26}});  // 年龄大于26岁，不包含26岁

SQL:SELECT * FROM person WHERE age>26
```

```bash
db.person.find({age:{$lte:18}}); // 年龄小于等于18岁的，包含18岁

SQL:SELECT * FROM person WHERE age<=18
```

也可以将两个条件合并，如下

```ruby
db.person.find({age:{$gt:18,$lt:26}}) ;//18<age<26;
```


##### **2、不等于**

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>$ne</td> 
     <td>不等于 != </td> 
    </tr>
</table>

```Perl
db.person.find({age:{$ne:18}})  ; // 年龄不等于18
```

##### **3、in,not in**

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>$in</td> 
     <td>包含</td> 
    </tr>
	<tr> 
     <td>$nin</td> 
     <td>不包含</td> 
    </tr>
</table>

#### 示例:

```ruby
db.collection.find({id:{$in:[1,2,3,4]}})
db.collection.find({id:{$nin:[1,2,3,4]}});
```

