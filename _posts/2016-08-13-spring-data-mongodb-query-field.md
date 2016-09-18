---
layout: post
blog_id: "spring-data-mongodb-query-field"
title: "Spring Data MongoDB 查询指定字段"
date: 2016-08-13 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: DBRef 就是在两个Collection之间定义的一个关联关系
comments: false
---
<br>

```java
DBObject dbObject = new BasicDBObject();
//dbObject.put("name", "zhangsan");  //查询条件

BasicDBObject fieldsObject=new BasicDBObject();
//指定返回的字段
fieldsObject.put("name", true);  
fieldsObject.put("age", true);  
fieldsObject.put("sex", true);  

Query query = new BasicQuery(dbObject,fieldsObject);
List<Person> user = mongoTemplate.find(query, Person.class);
```