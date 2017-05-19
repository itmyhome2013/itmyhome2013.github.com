---
layout: post
blog_id: "learn-activiti-02"
title: "准备Activiti开发环境"
date: 2016-05-21 00:00:00 -0700
tags: Activiti
category: Activiti
summary: 添加jar包，初始化数据库(使用代码)，使用配置文件创建工作流表
comments: false
---
<br>

##### **1、添加jar包**

在activiti-5.13 -> wars 目录下 解压 activiti-rest.war ，导入WEB-INF\lib下所有包添加到classpath中。
由于使用的是Oracle数据库,还需手动导入ojdbc14.jar 添加到classpath下

##### **2、初始化数据库(使用代码)**

```java
@Test
public void createTable(){
	//创建Activiti配置对象的实例
	ProcessEngineConfiguration configuration = ProcessEngineConfiguration.createStandaloneProcessEngineConfiguration();
	configuration.setJdbcDriver("oracle.jdbc.driver.OracleDriver"); //数据库驱动
	configuration.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:orcl"); //数据库地址
	configuration.setJdbcUsername("activiti"); //用户名
	configuration.setJdbcPassword("activiti"); //密码
	configuration.setDatabaseSchema("ACTIVITI");
	
	/**
	 * 设置流程引擎启动和关闭时如何处理数据库表。
	 * 
	 * false（默认）：检查数据库表的版本和依赖库的版本， 如果版本不匹配就抛出异常。
	 * true: 构建流程引擎时，执行检查，如果需要就执行更新。 如果表不存在，就创建。
	 * create-drop: 构建流程引擎时创建数据库表， 关闭流程引擎时删除这些表。
	 */
	configuration.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
	ProcessEngine processEngine = configuration.buildProcessEngine();
	System.out.println("23张表创建成功：processEngine: " + processEngine);
}
```

**configuration.setDatabaseSchema("ACTIVITI")** 详见 <a href="http://blog.itmyhome.com/2016/05/activiti-configuration-oracle">Activiti 配置Oracle不能自动创建表解决方法</a>
使用jUnit测试，Run As -> Junit Test
查看数据库 Activiti 23张表初始化完成

![License Badge]({{ site.baseurl}}/images/activiti/learn-activiti-01.png)

##### **3、使用配置文件创建工作流表**

src下新建 activiti-context.xml 文件 配置文件代码如下：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation=http://www.springframework.org/schema/beans　http://www.springframework.org/schema/beans/spring-beans.xsd　http://www.springframework.org/schema/context　http://www.springframework.org/schema/context/spring-context-2.5.xsd　http://www.springframework.org/schema/tx　http://www.springframework.org/schema/tx/spring-tx-3.0.xsd>

	<bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
		<!-- 连接数据库配置 -->
		<property name="jdbcDriver" value="oracle.jdbc.driver.OracleDriver"></property>
		<property name="jdbcUrl" value="jdbc:oracle:thin:@localhost:1521:orcl"></property>
		<property name="jdbcUsername" value="activiti"></property>
		<property name="jdbcPassword" value="activiti"></property>
		<property name="databaseSchema" value="ACTIVITI"></property>
		
		<!-- 如果表不存在  自动创建(数据库更新) -->
		<property name="databaseSchemaUpdate" value="true"></property>
	</bean>

</beans>
```

Java代码如下：

```java
@Test
public void createTable_2() {
	// 加载classpath下名为activiti.cfg.xml文件，创建核心流程引擎对象
	ProcessEngineConfiguration configuration = ProcessEngineConfiguration
			.createProcessEngineConfigurationFromResource("activiti.cfg.xml");
	
	ProcessEngine processEngine = configuration.buildProcessEngine();
	System.out.println("23张表创建成功：processEngine: " + processEngine);
}
```