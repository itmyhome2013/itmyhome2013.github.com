---
layout: post
blog_id: "mongodb-delete-collection"
title: "MongoDB 删除集合"
date: 2016-07-18 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB 的 db.collection.drop() 是用来从数据库中删除一个集合
comments: false
---
<br>

#### drop() 方法

MongoDB 的 db.collection.drop() 是用来从数据库中删除一个集合。

#### 语法:

drop() 命令的基本语法如下

```ruby
db.COLLECTION_NAME.drop()
```

#### 示例:

首先，检查可用的集合在数据库 **test**

```ruby
> use test
switched to db test
> show collections
article
person
ithome
>
```

现在删除集合名称为 **article**

```ruby
> db.article.drop()
true
>
```

再次检查到数据库中的集合列表

```ruby
> show collections
person
ithome
>
```

drop() 方法将返回 true，如果选择成功收集被丢弃，否则将返回 false

