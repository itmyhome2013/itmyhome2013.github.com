---
layout: post
blog_id: "hibernate-primary-key-generation-policy"
title: "Hibernate主键生成策略"
date: 2017-02-08 00:00:00 -0700
tags: Hibernate
category: Hibernate
summary: 主要方式包括assigned、sequence、identity、native、UUID
comments: false
---
<br>

#### 1、assigned

主键由外部程序负责生成，在save()之前必须指定一个，Hibernate不负责维护主键生成。与Hibernate和底层数据库都无关，

可以跨数据库。

```xml
<id name="groupid" column="GROUPID">
	<generator class="assigned" />
</id>
```

#### 2、sequence

采用数据库提供的sequence机制生成主键，需要数据库支持sequence，如Oracle、DB2。MySQL不支持

```xml
<id name="groupid" column="GROUPID">
	<generator class="sequence">
		<param name="sequence">hibernate_id</param>
	</generator>
</id>
```

Hibernate生成主键时，查找sequence并赋给主键值，主键值由数据库生成，Hibernate不负责维护，

使用时必须先创建一个sequence，如果不指定sequence名称，则使用Hibernate默认的sequence，

名称为hibernate_sequence，前提要在数据库中创建该sequence。

#### 3、identity

identity由底层数据库生成标识符。identity是由数据库自己生成的，但这个主键必须设置为自增长，

使用identity的前提条件是底层数据库支持自动增长字段类型，如DB2、SQL Server、MySQL、Sybase

和HypersonicSQL等，Oracle这类没有自增字段的则不支持。

```xml
<id name="groupid" column="GROUPID">
	<generator class="identity" />
</id>
```

如果使用MySQL数据库，**则主键字段必须设置成auto_increment**

```sql
id int(11) primary key auto_increment
```

#### 4、native

native由hibernate根据使用的数据库自行判断采用identity、hilo、sequence其中一种作为主键生成方式，灵活性很强。

如果能支持identity则使用identity，如果支持sequence则使用sequence。

```xml
<id name="groupid" column="GROUPID">
	<generator class="native" />
</id>
```

例如：**MySQL使用identity，Oracle使用sequence**

#### 5、UUID

UUID：Universally Unique Identifier，是指在一台机器上生成的数字，它保证对在同一时空中的所有机器都是唯一的。

```xml
<id name="groupid" column="GROUPID">
	<generator class="uuid" />
</id>
```

Hibernate在保存对象时，生成一个UUID字符串作为主键，保证了唯一性，但其并无任何业务逻辑意义，只能作为主键，

唯一缺点长度较大，32位（Hibernate将UUID中间的"-"删除了）的字符串，占用存储空间大，但是有两个很重要的优点，

Hibernate在维护主键时，不用去数据库查询，从而提高效率，而且它是跨数据库的，以后切换数据库极其方便。

特点：uuid长度大,占用空间大,跨数据库,不用访问数据库就生成主键值，所以效率高且能保证唯一性，移植非常方便，推荐使用。

#### 小结

以上为Hibernate常用的自带生成策略，也包括increment、hilo、guid、foreign等等

+ 手动指定用assigned

+ Oracle用sequence

+ MySQL用identity

+ 更灵活用native

+ 推荐使用UUID



