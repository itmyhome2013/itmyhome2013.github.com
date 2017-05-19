---
layout: post
blog_id: "spring-data-mongodb-environment-build"
title: "Spring Data MongoDB 环境搭建"
date: 2016-08-10 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: Spring与MongoDB整合
comments: false
---
<br>

#### 一、开发环境

+ spring版本：4.0.6.RELEASE
+ spring-data-mongodb版本：1.4.1.RELEASE
+ junit版本 4.11
+ maven版本:3.0.5

#### 二、pom.xml

使用Maven管理jar包

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>mongos</groupId>
	<artifactId>mongos</artifactId>
	<packaging>jar</packaging>
	<version>0.0.1-SNAPSHOT</version>
	<name>mongos</name>
	<url>http://maven.apache.org</url>

	<properties>
		<org.springframework-version>4.0.6.RELEASE</org.springframework-version>
		<org.hibernate-version>4.3.1.Final</org.hibernate-version>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>

	<dependencies>

		<!-- mongodb spring -->
		<dependency>
			<groupId>org.springframework.data</groupId>
			<artifactId>spring-data-mongodb</artifactId>
			<version>1.4.1.RELEASE</version>
		</dependency>

		<dependency>
			<groupId>org.springframework.data</groupId>
			<artifactId>spring-data-commons-core</artifactId>
			<version>1.4.1.RELEASE</version>
		</dependency>

		<!-- spring jar -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${org.springframework-version}</version>
			<!-- Exclude Commons Logging in favor of SLF4j -->
			<exclusions>
				<exclusion>
					<groupId>commons-logging</groupId>
					<artifactId>commons-logging</artifactId>
				</exclusion>
			</exclusions>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context-support</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aop</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-beans</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aspects</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-tx</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>${org.springframework-version}</version>
		</dependency>

		<!-- hiberante 4 -->
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-core</artifactId>
			<version>${org.hibernate-version}</version>
		</dependency>

		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-validator</artifactId>
			<version>${org.hibernate-version}</version>
		</dependency>

		<dependency>
			<groupId>javax.validation</groupId>
			<artifactId>validation-api</artifactId>
			<version>1.0.0.GA</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-entitymanager</artifactId>
			<version>${org.hibernate-version}</version>
		</dependency>

		<dependency>
			<groupId>org.apache.commons</groupId>
			<artifactId>commons-dbcp2</artifactId>
			<version>2.0.1</version>
		</dependency>

		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-log4j12</artifactId>
			<version>1.6.1</version>
		</dependency>

		<dependency>
			<groupId>log4j</groupId>
			<artifactId>log4j</artifactId>
			<version>1.2.17</version>
		</dependency>

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.11</version>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>com.google.code.gson</groupId>
			<artifactId>gson</artifactId>
			<version>2.2.4</version>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>

		<!-- jackson -->
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-core</artifactId>
			<version>2.1.0</version>
		</dependency>

		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>2.1.0</version>
		</dependency>
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-annotations</artifactId>
			<version>2.1.0</version>
		</dependency>

		<dependency>
			<groupId>cglib</groupId>
			<artifactId>cglib-nodep</artifactId>
			<version>2.2.2</version>
		</dependency>

		<dependency>
			<groupId>javax.servlet.jsp.jstl</groupId>
			<artifactId>jstl-api</artifactId>
			<version>1.2</version>
		</dependency>

	</dependencies>

	<build>
		<finalName>mongos</finalName>
	</build>
</project>
```

#### 三、db.xml

spring mongodb 核心配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:mongo="http://www.springframework.org/schema/data/mongo"
	xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:aop="http://www.springframework.org/schema/aop"
	xmlns:tool="http://www.springframework.org/schema/tool"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
	                    http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
	                    http://www.springframework.org/schema/context
	                    http://www.springframework.org/schema/context/spring-context-4.0.xsd
	                    http://www.springframework.org/schema/tx
	                    http://www.springframework.org/schema/tx/spring-tx-4.0.xsd
	                    http://www.springframework.org/schema/aop 
	                    http://www.springframework.org/schema/aop/spring-aop-4.0.xsd
	                    http://www.springframework.org/schema/tool	                    
	                    http://www.springframework.org/schema/tool/spring-tool-4.0.xsd
	                 	http://www.springframework.org/schema/mvc                 
	                    http://www.springframework.org/schema/mvc/spring-mvc-4.0.xsd
	                    http://www.springframework.org/schema/data/mongo
	                    http://www.springframework.org/schema/data/mongo/spring-mongo-1.0.xsd">

	<!--
		<context:property-placeholder
		location="classpath:sysconfig/properties/mongodb.properties" />
	-->

	<!-- 定义mongo对象，对应的是mongodb官方jar包中的Mongo，replica-set设置集群副本的ip地址和端口 -->
	<mongo:mongo id="mongo" host="127.0.0.1" port="27017">
		<!-- 一些连接属性的设置 -->
		<mongo:options connections-per-host="8"
			threads-allowed-to-block-for-connection-multiplier="4"
			connect-timeout="1000" max-wait-time="1500" auto-connect-retry="true"
			socket-keep-alive="true" socket-timeout="1500" slave-ok="true"
			write-number="1" write-timeout="0" write-fsync="true" />
	</mongo:mongo>

	<!-- mongo的工厂,通过它来取得mongo实例,dbname为mongodb的数据库名,没有的话会自动创建 -->
	<mongo:db-factory id="mongoDbFactory" dbname="mydb"
		mongo-ref="mongo" />

	<!-- 映射转换器,扫描back-package目录下的文件,根据注释,把它们作为mongodb的一个collection的映射 -->
	<mongo:mapping-converter base-package="com.ithome.bean"
		id="mongoConverter" />

	<!-- mongodb的主要操作对象,所有对mongodb的增删改查的操作都是通过它完成 -->
	<bean id="mongoTemplate" class="org.springframework.data.mongodb.core.MongoTemplate">
		<constructor-arg name="mongoDbFactory" ref="mongoDbFactory" />
		<constructor-arg name="mongoConverter" ref="mongoConverter" />
	</bean>

	<!-- mongodb bean的仓库目录,会自动扫描扩展了MongoRepository接口的接口进行注入 -->
	<mongo:repositories base-package="com.ithome.bean" />

	<bean id="personDao" class="com.ithome.dao.impl.PersonDaoImpl">
		<property name="mongoTemplate" ref="mongoTemplate" />
	</bean>

</beans>
```

#### 四、实体 Bean

```java
import java.io.Serializable;

public class Person implements Serializable {

	private static final long serialVersionUID = 1L;

	private String id;
	private String name; // 姓名
	private String sex; // 性别
	private String idCard; // 身份证号码
	private String note; // 备注

	/**
	 * 省略 set() get()
	 */

}
```

#### 五、接口 PersonDao

```java
import java.util.List;
import com.ithome.bean.Person;

public interface PersonDao {

	/**
	 * 插入数据
	 * @param u
	 */
	public void insert(Person u);
	
	/**
	 * 查询全部
	 * @return
	 */
	public List<Person> queryAll();

}
```

#### 六、接口实现 PersonDaoImpl
 
```java
import java.util.List;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;
import com.ithome.bean.Person;
import com.ithome.dao.PersonDao;

@Repository
public class PersonDaoImpl implements PersonDao {

	private MongoOperations mongoTemplate;

	public void setMongoTemplate(MongoOperations mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
	}

	@Override
	public void insert(Person u) {
		mongoTemplate.insert(u);
	}

	@Override
	public List<Person> queryAll() {
		List<Person> user = mongoTemplate.findAll(Person.class);
		return user;
	}
}
```

#### 七、测试类

```java
import java.util.List;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import com.ithome.bean.Person;
import com.ithome.dao.PersonDao;

@org.junit.runner.RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:db.xml" })
public class PersonTest {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Autowired
	public PersonDao personDao;

	@Test
	public void insert() {
		Person person = new Person();
		person.setName("zhangsan");
		person.setSex("男");
		person.setIdCard("110112100589911");
		person.setNote("无");
		personDao.insert(person);
	}

	@Test
	public void getAll() {
		List<Person> list = personDao.queryAll();
		for (Person p : list) {
			System.out.println("ID: " + p.getId() + "  姓名：" + p.getName());
		}
	}

}
```