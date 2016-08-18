---
layout: post
blog_id: "spring-data-mongodb-cascade"
title: "Spring Data MongoDB 级联操作"
date: 2016-08-12 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: DBRef 就是在两个Collection之间定义的一个关联关系
comments: false
---
<br>

#### DBRef 方式关联

DBRef 就是在两个Collection之间定义的一个关联关系，暂不支持级联的保存功能

例子：一个Person对象有多个Book对象，一对多关系

**实体Person**

```java
public class Person implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String name; 
	private String sex; 
	private String idCard; 
	private String note; 

	@DBRef // mongodb的注解，文档之间建立关联关系，可以认为是关系型数据库中的外键
	@Field("book")
	private List<Book> book;

	//省略 set()... get()...

}
```

**实体Book**

```java
public class Book implements java.io.Serializable {
	
	@Id
	private String id;
	private String bookName; 
	private String author; 
	private String press; 
	private String isbn; 

	//省略 set()... get()...
}
```

**保存操作**

```java
@Test
public void insert() {
	
	Person person = new Person();
	person.setName("zhangsan");
	person.setSex("男");
	person.setIdCard("110112100589911");
	person.setNote("");
	
	Book book = new Book();
	book.setBookName("MongoDB实战");
	book.setAuthor("李兴华");
	book.setPress("清华大学出版社");
	book.setIsbn("333");
	
	List<Book> books = new ArrayList<Book>();
	books.add(book);
	
	person.setBook(books);  //把books设置到person中
	
	personDao.saveBook(book); //需先保存book对象
	personDao.savePerson(person);
}
```
