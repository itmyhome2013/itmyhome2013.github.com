---
layout: post
blog_id: "activiti-database-table-automatic-generation-strategy"
title: "Activiti 数据库表自动生成策略"
date: 2016-10-12 00:00:00 -0700
tags: Activiti
category: Activiti
summary: Activiti引擎启动时默认会检测数据库版本与程序版本是否相符,不相符就会抛出异常停止引擎的初始化
comments: false
---
<br>

Activiti 引擎启动时默认会检测数据库版本与程序版本是否相符，不相符就会抛出异常停止引擎的初始化。 

这一策略可以通过引擎的初始化配置参数databaseSchemaUpdate来控制， 

如下图的spring创建流程引擎的配置文件：

```xml
<bean id="processEngineConfiguration" class="org.activiti.spring.SpringProcessEngineConfiguration">
    <property name="dataSource" ref="dataSource" />
    <property name="transactionManager" ref="TransactionManager" />
    <!-- 
        databaseSchemaUpdate:允许在流程引擎启动和关闭时设置处理数据库模式的策略。
        false(默认):创建流程引擎时检查数据库模式的版本是否与函数库要求的匹配，如果版本不匹配就会抛出异常。
        true:构建流程引擎时，执行检查，如果有必要会更新数据库模式。如果数据库模式不存在，就创建一个。
        create:引擎启动时创建表
        create-drop:创建流程引擎时创建数据库模式，关闭流程引擎时删除数据库模式.
        drop-create - 引擎启动时先删除表再重新创建表。
     -->
    <property name="databaseSchemaUpdate" value="true" />

    <property name="jobExecutorActivate" value="false"/>
    <property name="history" value="full"/>
    <property name="processDefinitionCacheLimit" value="10"/>
    <property name="databaseSchema" value="ITHOME"/>

</bean>
```