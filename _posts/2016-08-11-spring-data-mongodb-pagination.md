---
layout: post
blog_id: "spring-data-mongodb-pagination"
title: "Spring Data MongoDB 分页查询"
date: 2016-08-11 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 定义公用分页参数类，实现 Pageable 接口
comments: false
---
<br>

在上篇文章<a href="http://blog.itmyhome.com/2016/08/spring-data-mongodb-environment-build">Spring Data MongoDB 环境搭建</a>基础上进行分页查询

#### 定义公用分页参数类，实现 Pageable 接口

```java
import java.io.Serializable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class SpringDataPageable implements Serializable, Pageable {
	private static final long serialVersionUID = 1;
	// 当前页
	private Integer pagenumber = 1;
	// 当前页面条数
	private Integer pagesize = 10;
	// 排序条件
	private Sort sort;

	// 当前页面
	@Override
	public int getPageNumber() {
		return getPagenumber();
	}

	// 每一页显示的条数
	@Override
	public int getPageSize() {
		return getPagesize();
	}

	// 第二页所需要增加的数量
	@Override
	public int getOffset() {
		return (getPagenumber() - 1) * getPagesize();
	}

	@Override
	public Sort getSort() {
		return sort;
	}

	public Integer getPagenumber() {
		return pagenumber;
	}

	public void setPagenumber(Integer pagenumber) {
		this.pagenumber = pagenumber;
	}

	public Integer getPagesize() {
		return pagesize;
	}

	public void setPagesize(Integer pagesize) {
		this.pagesize = pagesize;
	}
	
	public void setSort(Sort sort) {
		this.sort = sort;
	}

	@Override
	public Pageable first() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hasPrevious() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Pageable next() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pageable previousOrFirst() {
		// TODO Auto-generated method stub
		return null;
	}
}
```

#### 接口 PersonDao

```java
/**
 * 分页查询
 * @param pageNum  开始页
 * @return
 */
public Page<Person> paginationQuery(Integer pageNum);
```

#### 接口实现 PersonDaoImpl

```java
public Page<Person> paginationQuery(Integer pageNum) {

	SpringDataPageable pageable = new SpringDataPageable();
	Query query = new Query();
	List<Order> orders = new ArrayList<Order>();  //排序
	orders.add(new Order(Direction.DESC, "age"));
	Sort sort = new Sort(orders);

	// 开始页
	pageable.setPagenumber(pageNum);
	// 每页条数
	pageable.setPagesize(10);
	// 排序
	pageable.setSort(sort);
	// 查询出一共的条数
	Long count = mongoTemplate.count(query, Person.class);
	// 查询
	List<Person> list = mongoTemplate.find(query.with(pageable), Person.class);
	// 将集合与分页结果封装
	Page<Person> pagelist = new PageImpl<Person>(list, pageable, count);

	return pagelist;
}
```

#### 测试

```java
/**
 * 分页查询
 */
@Test
public void paginationQuery(){
	Page<Person> persons = personDao.paginationQuery(2);
	for(Person p : persons){
		System.out.println(p.getName());
	}
}
```