---
layout: post
blog_id: "mongodb-create-collection"
title: "MongoDB 创建集合"
date: 2016-07-17 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: MongoDB db.createCollection(name, options) 是用来创建集合
comments: false
---
<br>

#### createCollection() 方法

MongoDB db.createCollection(name, options) 是用来创建集合.

#### 语法:

基本的 createCollection() 命令语法如下：

```ruby
db.createCollection(name, options)
```

在命令中, name 是要创建的集合的名称. Options 是一个文件，用于指定配置的集合

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>参数</td> 
     <td>类型</td> 
	 <td>描述</td> 
    </tr>
	<tr> 
     <td>Name</td> 
     <td>String</td> 
	 <td>要创建的集合名称</td> 
    </tr>
</table>

选项参数是可选的，所以只需要到指定的集合名称。以下是可以使用的选项列表：

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>字段</td> 
     <td>类型</td> 
	 <td>描述</td> 
    </tr>
	<tr> 
     <td>capped</td> 
     <td>Boolean</td> 
	 <td>(可选)如果为true，则启用封顶集合。封顶集合是固定大小的集合，会自动覆盖最早的条目，当它达到其最大大小。如果指定true，则需要也指定尺寸参数。</td> 
    </tr>
	<tr> 
     <td>autoIndexID</td> 
     <td>Boolean</td> 
	 <td>(可选)如果为true，自动创建索引_id字段的默认值是false。</td> 
    </tr>
	<tr> 
     <td>size</td> 
     <td>number</td> 
	 <td>(可选)指定最大大小字节封顶集合。如果封顶如果是 true，那么你还需要指定这个字段。</td> 
    </tr>
	<tr> 
     <td>max</td> 
     <td>number</td> 
	 <td>(可选)指定封顶集合允许在文件的最大数量。</td> 
    </tr>
</table>

当插入文档，MongoDB 第一检查大小字段封顶集合，然后它会检查最大的字段中。

#### 例子:

createCollection() 方法不使用选项的基本语法如下：

```ruby
> use test
switched to db test
> db.createCollection("ithome")
{ "ok" : 1 }
>
```

可以检查通过使用创建的集合命令 **show collections**

```ruby
> show collections
ithome
person
```

下面的例子显示了几个重要的选项 createCollection（）方法的语法：

```ruby
> db.createCollection("person", { capped : true, autoIndexID : true, size : 6142800, max : 10000 } )
{ "ok" : 1 }
>
```

在MongoDB中，不需要创建集合。当插入一些文件 MongoDB 自动创建的集合。

```ruby
> db.article.insert({"title" : "hellomonogo"})
> show collections
ithome
person
article
>
```