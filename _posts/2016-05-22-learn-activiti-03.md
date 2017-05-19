---
layout: post
blog_id: "learn-activiti-03"
title: "核心API"
date: 2016-05-22 00:00:00 -0700
tags: Activiti
category: Activiti
summary: ProcessEngine是Activiti中最核心的类，其他的类都是由他而来。
comments: false
---
<br>

#### 1、ProcessEngine

ProcessEngine是Activiti中最核心的类，其他的类都是由他而来。Activiti流程引擎的配置文件是名为 activiti.cfg.xml 的XML文件。获得 ProcessEngine 最简单的办法是 使用 org.activiti.engine.ProcessEngines 类：

```java
ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine()
```

它会在classpath下搜索 activiti.cfg.xml， 并基于这个文件中的配置构建引擎。 

#### 2、RepositoryService

是Activiti的仓库服务类。所谓的仓库指流程定义文档的两个文件：bpmn文件和流程图片。

产生方式

```java
RepositoryService repositoryService = processEngine.getRepositoryService();
```

可以产生DeploymentBuilder，用来定义流程部署的相关参数

```
DeploymentBuilder deploymentBuilder = repositoryService.createDeployment();
```

删除流程定义

```java
repositoryService.deleteDeployment(deploymentId);
```

#### 3、RuntimeService

是activiti的流程执行服务类。可以从这个服务类中获取很多关于流程执行相关的信息。

#### 4、TaskService

是activiti的任务服务类。可以从这个类中获取任务的信息

#### 5、HistoryService

是activiti的查询历史信息的类。在一个流程执行完成后，这个对象为我们提供查询历史信息。

#### 6、ProcessDefinition

流程定义类。可以从这里获得资源文件等。

#### 7、ProcessInstance

代表流程定义的执行实例。一个流程实例包括了所有的运行节点。我们可以利用这个对象来了解当前流程实例的进度等信息。流程实例就表示一个流程从开始到结束的最大的流程分支，即一个流程中流程实例只有一个。

#### 8、Execution

Activiti用这个对象去描述流程执行的每一个节点。在没有并发的情况下，Execution就是同ProcessInstance。流程按照流程定义的规则执行一次的过程，就可以表示执行对象Execution。
