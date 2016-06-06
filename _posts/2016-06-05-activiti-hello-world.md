---
layout: post
blog_id: "activiti-hello-world"
title: "Activiti学习之HelloWorld程序 "
date: 2016-06-05 00:00:00 -0700
tags: Activiti
category: Activiti
summary: 模拟流程的执行
comments: false
---
<br>

流程图

![License Badge]({{ site.baseurl}}/images/activiti/process.png)

#### 部署流程定义

```java
/**
 * 部署流程定义
 */
@Test
public void deploymentProcessDefinition() {
	ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
	Deployment deployment = processEngine.getRepositoryService()// 与流程定义和部署对象相关的Service
			.createDeployment() // 创建一个部署对象
			.name("activiti").addClasspathResource("helloworld.bpmn")// 从classpath的资源中加载
			.addClasspathResource("helloworld.png").deploy(); // 完成部署

	System.out.println("ID: " + deployment.getId());
	System.out.println("name: " + deployment.getName());
}
```

这里使用 <font color="red">RepositoryService</font> 部署流程定义 addClasspathResource表示从类路径下加载资源文件，一次只能加载一个文件

#### 启动流程实例

```java
/**
 * 启动流程实例
 */
@Test
public void startProcessInstance() {
	ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
	String processDefinitionKey = "helloworld";
	ProcessInstance pi = processEngine.getRuntimeService()
			.startProcessInstanceByKey(processDefinitionKey);

	System.out.println("流程实例ID：" + pi.getId());
	System.out.println("流程定义ID：" + pi.getProcessDefinitionId());
}
```

这里使用 <font color="red">RuntimeService</font> 启动流程实例

#### 查看我的个人任务

```java
/**
 * 查询当前人的个人认为
 */
@Test
public void findMyPersonTask() {
	ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
	String assignee = "张三";
	List<Task> list = processEngine.getTaskService().createTaskQuery()
			.taskAssignee(assignee).list();
	for (Task task : list) {
		System.out.println(task.getId());
		System.out.println(task.getName());
		System.out.println(task.getCreateTime());
		System.out.println(task.getAssignee());
	}
}
```

这里使用 <font color="red">TaskService</font> 完成任务的查询

#### 完成我的个人任务

```java
/**
 * 完成我的任务
 */
@Test
public void completeMyPersonTask() {
	ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();
	String taskId = "104";
	processEngine.getTaskService().complete(taskId);

	System.out.println("完成任务：" + taskId);
}
```

这里使用 <font color="red">TaskService</font> 完成任务的办理

<br>




















