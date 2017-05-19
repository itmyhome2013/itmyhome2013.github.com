---
layout: post
blog_id: "mongodb-for-java"
title: "MongoDB for Java"
date: 2016-08-06 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 在 Java 程序中使用 MongoDB
comments: false
---
<br>

##### 开发环境

+ 操作系统：Windows7
+ IDE: MyEclipse
+ Database: MongoDB

##### 开发依赖库

+ bson-3.0.1.jar
+ mongodb-driver-3.0.1.jar
+ mongodb-driver-core-3.0.1.jar
+ junit-4.12.jar
+ hamcrest-core-1.3.jar

PS：前三个必须引入(版本可不同)，后两个为junit测试所用

#### 一、准备环境

##### **1、下载mongoDB对Java支持的驱动包**

下载地址：<a href="https://oss.sonatype.org/content/repositories/releases/org/mongodb/">mongodb</a> 也可以使用Maven管理，Maven 代码片段如下：

```xml
<dependencies>
	<dependency>
		<groupId>org.mongodb</groupId>
		<artifactId>bson</artifactId>
		<version>3.0.1</version>
	</dependency>

	<dependency>
		<groupId>org.mongodb</groupId>
		<artifactId>mongodb-driver</artifactId>
		<version>3.0.1</version>
	</dependency>

	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.12</version>
	</dependency>
</dependencies>
```

##### **2、建立Java Project工程，导入驱动包，目录结构如下**

![License Badge]({{ site.baseurl}}/images/mongodb/mongoClient.png)

#### 二、Java操作 MongoDB

##### **1、建立连接**

连接数据库，需要指定数据库名，如果数据库不存在，MongoDB会自动创建它。
使用 MongoClient 来连接 MongoDB,代码片段如下：

```ruby
// connect to mongodb server
MongoClient mongoClient = new MongoClient("localhost", 27017);
// connect database
MongoDatabase mongoDatabase = mongoClient.getDatabase("mydb");
```

##### **2、创建集合**

要创建集合，使用 com.mongodb.client.MongoDatabase 类的 createCollection() 方法。

```ruby
mongoDatabase.createCollection("person");
```

##### **3、获取一个集合列表**

要获取数据库中的所有集合，使用 com.mongodb.client.MongoDatabase 类的 listCollectionNames() 方法。

```ruby
MongoIterable<String> result = mongoDatabase.listCollectionNames();

Iterator ite = result.iterator();
while (ite.hasNext()) {
	System.out.println("集合名字：" + ite.next());
}
```

##### **4、获取/选择一个集合**

要从数据库中获得/选择一个集合，使用 com.mongodb.client.MongoDatabase 类的 getCollection() 方法。
代码片段获取/选择一个集合

```ruby
MongoCollection<Document> collection = mongoDatabase.getCollection("person");
```

##### **5、插入文档**

为了将文档插入MongoDB中，使用 com.mongodb.client.MongoCollection 类的 insertOne() 方法。
代码片段插入一个文件

```ruby
MongoCollection<Document> collection = mongoDatabase.getCollection("person");
Document document = new Document("title", "MongoDB")
		.append("description", "database")
		.append("by","itmyhome");
collection.insertOne(document);
```

##### **6、检索所有文件**

要检索一个集合中的所有文件，使用 com.mongodb.client.MongoCollection 类的 find() 方法。

```ruby
MongoCollection<Document> collection = mongoDatabase.getCollection("person");

FindIterable<Document> document = collection.find();
Iterator ite = document.iterator();

while (ite.hasNext()) {
	System.out.println(ite.next());
}
```

##### **7、更新文件**

从集合中更新文件，使用 com.mongodb.client.MongoCollection 类的 updateMany() 和 updateOne() 方法。
下面代码片段是将name为zhangsan的mobile信息修改为11011

```ruby
MongoCollection<Document> collection = mongoDatabase.getCollection("person");
collection.updateOne(Filters.eq("name", "zhangsan"), new Document("$set", new Document("mobile", "11011")));
```

##### **8、删除文件**

从集合中删除文件，使用 com.mongodb.client.MongoCollection 类的 deleteMany() 和 deleteOne() 方法。
下面代码片段是删除title为MongoDB的所有文件

```ruby
MongoCollection<Document> collection = mongoDatabase.getCollection("person");
collection.deleteMany(Filters.all("title", "MongoDB"));
```

#### 完整代码

```java
import java.util.Iterator;
import org.bson.Document;
import org.junit.Test;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;
import com.mongodb.client.model.Filters;

public class CopyOfDBUtil {

	// 连接到 mongodb 服务
	MongoClient mongoClient = null;
	// 连接到数据库
	MongoDatabase mongoDatabase = null;

	/**
	 * 构造方法实例化
	 */
	public CopyOfDBUtil() {
		mongoClient = new MongoClient("localhost", 27017);
		mongoDatabase = mongoClient.getDatabase("mydb");
		System.out.println("Connect to database successfully: " + mongoDatabase);

	}

	/**
	 * 创建集合
	 */
	@Test
	public void createCollection(String collectionName) {
		mongoDatabase.createCollection(collectionName);
		System.out.println("集合: " + collectionName + " 创建成功");
	}

	/**
	 * 获取所有集合
	 */
	@Test
	public void getCollection() {
		MongoIterable<String> result = mongoDatabase.listCollectionNames();

		Iterator ite = result.iterator();
		while (ite.hasNext()) {
			System.out.println("集合名字：" + ite.next());
		}
	}

	/**
	 * 删除集合
	 */
	@Test
	public void dropCollection(String collectionName) {
		mongoDatabase.getCollection(collectionName).drop();
		System.out.println("集合：" + collectionName + " 删除成功");
	}

	/**
	 * 插入文档
	 */
	@Test
	public void insert() {

		// 获取所插入集合
		MongoCollection<Document> collection = mongoDatabase.getCollection("person");
		Document document = new Document("title", "MongoDB")
				.append("description", "database")
				.append("by","itmyhome");
		collection.insertOne(document);
	}

	/**
	 * 检索所有文件
	 */
	@Test
	public void queryAll() {
		MongoCollection<Document> collection = mongoDatabase.getCollection("person");

		FindIterable<Document> document = collection.find();
		Iterator ite = document.iterator();

		while (ite.hasNext()) {
			System.out.println(ite.next());
		}
	}
	
	/**
	 * 更新文件
	 */
	@Test
	public void update(){
		MongoCollection<Document> collection = mongoDatabase.getCollection("person");
		collection.updateOne(Filters.eq("name", "zhangsan"), 
			new Document("$set", new Document("mobile", "11011")));
	}

	/**
	 * 删除文档
	 */
	@Test
	public void deleteAllDocument() {
		MongoCollection<Document> collection = mongoDatabase.getCollection("person");
		collection.deleteMany(Filters.all("title", "MongoDB"));
		System.out.println("删除成功");
	}

	/**
	 * 条件查询
	 */
	@Test
	public void find() {
		MongoCollection<Document> collection = mongoDatabase.getCollection("person");
		//查询likes为100的数据
		FindIterable<Document> document = collection.find(Filters.lt("likes",100));
		
		Iterator ite = document.iterator();
		while (ite.hasNext()) {
			System.out.println(ite.next());
		}
	}
}
```
