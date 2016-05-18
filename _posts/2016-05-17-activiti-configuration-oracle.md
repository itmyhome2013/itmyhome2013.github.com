---
layout: post
blog_id: "activiti-configuration-oracle"
title: "Activiti 配置Oracle不能自动创建表解决方法"
date: 2016-05-17 00:00:00 -0700
tags: Activiti
category: Activiti
summary: 原因是引擎在创建表之前 isTablePresent() 方法,发现schema的值为null
comments: false
---
<br>

使用配置文件创建工作流表

```xml
<bean id="processEngineConfiguration" class="org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration">
	<!-- 连接数据库配置 -->
	<property name="jdbcDriver" value="oracle.jdbc.driver.OracleDriver"></property>
	<property name="jdbcUrl" value="jdbc:oracle:thin:@localhost:1521:orcl"></property>
	<property name="jdbcUsername" value="activiti"></property>
	<property name="jdbcPassword" value="activiti"></property>
	
	<!-- 如果表不存在  自动创建 -->
	<property name="databaseSchemaUpdate" value="true"></property>
</bean>
```

启动报如下错误：

```bash
### The error may exist in org/activiti/db/mapping/entity/Property.xml
### The error may involve org.activiti.engine.impl.persistence.entity.PropertyEntity.selectProperty-Inline
### The error occurred while setting parameters
### SQL: select * from ACT_GE_PROPERTY where NAME_ = ?
### Cause: java.sql.SQLException: ORA-00942: 表或视图不存在
```

原因是引擎在创建表之前 isTablePresent() 方法 发现 **schema** 的值为null,所以需要配置属性

```xml
<property name="databaseSchema" value="activiti"></property>
```

重新启动，成功创建表。再次启动又报错

```bash
Caused by: java.sql.SQLException: ORA-00955: 名称已由现有对象使用
```

将值改为 <span style="color:red;font-size:20px;">大写</span> 即可

```xml
<property name="databaseSchema" value="ACTIVITI"></property>
```

<br>




















