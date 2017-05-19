---
layout: post
blog_id: "mongodb-insert-document"
title: "MongoDB 插入文档"
date: 2016-07-20 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 要插入数据到 MongoDB 集合，需要使用 MongoDB 的 insert() 或 save() 方法
comments: false
---
<br>

#### insert() 方法

要插入数据到 MongoDB 集合，需要使用 MongoDB 的 insert() 或 save() 方法。 

#### 语法

insert() 命令的基本语法如下：

```ruby
> db.COLLECTION_NAME.insert(document)
```

#### 例子

```ruby
> db.person.insert({
   _id: ObjectId(868c1d92ad9c),
   name: 'Hello MongoDB', 
   age: 26
   Occupation: 'Engineer',
   Education: 'University',
   blog: 'http://itmyhome.com',
   tags: ['Java', 'jQuery', 'NoSQL'],
   income: 100000
})
```

这里 mycol  是集合的名称，如前面的教程中创建。如果集合在数据库中不存在，那么MongoDB 将创建此集合，然后把它插入文档。插入文档中，如果我们不指定_id参数，然后MongoDB 本文档分配一个独特的ObjectId。_id 是12个字节的十六进制数，唯一一个集合中的每个文档。 12个字节被划分如下：

```ruby
_id: ObjectId(4 bytes timestamp, 3 bytes machine id, 2 bytes process id, 3 bytes incrementer)
```

要插入单个查询的多个文档，可以传递一个数组 insert() 命令的文件。 


#### 示例

```ruby
> db.person.insert([
{
   name: 'ZhangSan', 
   age: 30
   Occupation: 'Engineer',
   Education: 'University',
   blog: 'http://itmyhome.com',
   tags: ['Java', 'jQuery', 'NoSQL'],
   income: 100000
},
{
   name: 'WangWu', 
   age: 8
   Occupation: 'Engineer',
   Education: 'University',
   blog: 'http://itmyhome.com',
   Children: [	
      {
         name:'xiaoming',
         message: 'Hes cute.',
         birthday: new Date(1900,05,08,2,11),
         height: 100 
      }
   ]
   income: 120000
}
])
```

要插入文件，也可以使用  db.person.save(document)。 如果不指定_id在文档中，
然后将其 save() 方法和 insert()方法工作一样。如果指定_id，它会替换整个数据文件，其中包含_id 指定save()方法。 

