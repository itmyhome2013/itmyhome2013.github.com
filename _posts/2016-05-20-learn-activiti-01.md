---
layout: post
blog_id: "learn-activiti-01"
title: "Activiti 介绍"
date: 2016-05-20 00:00:00 -0700
tags: Activiti
category: Activiti
summary: Activiti是一个开源的工作流引擎，它实现了BPMN 2.0规范，可以发布设计好的流程定义，并通过api进行流程调度
comments: false
---
<br>

#### 一、工作流的概念

工作流(Workflow)，就是"业务过程的部分或整体在计算机应用环境下的自动化"，它主要解决的是"使在多个参与者之间按照某种预定义的规则传递文档、信息或任务的过程自动进行，从而实现某个预期的业务目标，或者促使此目标的实现"。工作流管理系统(Workflow Management System, WfMS)是一个软件系统，它完成工作量的定义和管理，并按照在系统中预先定义好的工作流规则进行工作流实例的执行。工作流管理系统不是企业的业务系统，而是为企业的业务系统的运行提供了一个软件的支撑环境。工作流管理系统的目标：管理工作的流程以确保工作在正确的时间被期望的人员所执行——在自动化进行的业务过程中插入人工的执行和干预。 

#### 二、Activiti介绍

##### **1、工作流引擎**

ProcessEngine对象，这是Activiti的核心，负责生成流程运行时的各种实例及数据、监控和管理流程的运行。

##### **2、BPMN**

业务流程建模与标注(Business Process Model and Notation，BPMN)，描述流程的基本符号，包括这些图元如何组合成一个业务流程图(Business Process Diagram)

##### **3、数据库**

Activiti 的表都以ACT_开头。 第二部分是表示表的用途的两个字母标识。 用途也和服务的API对应。

<table class="table table-bordered table-striped table-condensed">  
    <tr>  
        <td>ACT_RE_*:</td>  
		<td>'RE'表示repository。 这个前缀的表包含了流程定义和流程静态资源 （图片，规则，等等）。</td>  
    </tr>  
    <tr>  
        <td>ACT_RU_*:</td>  
		<td>'RU'表示runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务，等运行中的数据。 Activiti只在流程实例执行过程中保存这些数据， 在流程结束时就会删除这些记录。 这样运行时表可以一直很小速度很快。</td>  
    </tr> 
	<tr>  
        <td>ACT_ID_*:</td>  
		<td>'ID'表示identity。 这些表包含身份信息，比如用户，组等等。</td>  
    </tr>
	<tr>  
        <td>ACT_HI_*:</td>  
		<td>'HI'表示history。 这些表包含历史数据，比如历史流程实例， 变量，任务等等。</td>  
    </tr>
	<tr>  
        <td>ACT_GE_*:</td>  
		<td>通用数据， 用于不同场景下。</td>  
    </tr>
</table>