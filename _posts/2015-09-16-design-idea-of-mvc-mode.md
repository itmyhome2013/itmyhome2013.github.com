---
layout: post
blog_id: "design-idea-of-mvc-mode"
title: "MVC模式的设计思想"
date: 2015-09-16 00:00:00 -0700
tags: MVC
category: Java
summary: MVC模式将交互式应用分成模型(Model)、视图(View)和控制器(Controller)三部分
comments: false
---
<br>

MVC模式是一种近年来使用比较广泛的为许多IT厂家和开发者所认可的一种设计模式，它和Web应用程序并没有直接的

关系(事实上，它在很多非WEB应用程序中得到了使用)，它不仅使得系统层次分明、职责清晰，而且使得系统更易于维护。

在MVC模式中的三个关键部件及其主要功能职责是：

<span style="color:red">The Model Component：主要负责业务域的业务目标的实现。</span>

<span style="color:red">The View Component：主要负责对业务域的数据展现给客户端。</span>

<span style="color:red">The Controller Component：主要负责控制系统流程和用户输入状态</span>


在基于Java技术的Web应用程序中，Model部分的主要组件是JavaBean和EJB，View部分的主要组件是HTML和JSP程序，

Controller部分的主要组件是Servlet和Action部分。

下面列出了一些使用MVC模式的好处：

+ 1、它将业务逻辑与展现分离开来，避免了将业务逻辑与展现混杂在一起带来的显示的不一致性和业务逻辑代码重复地分布在用于展现的代码中。

+ 2、层次清晰，易于开发者对这三个部分分工与协作，易于维护者识别不同的层次实施不同的维护策略。

+ 3、系统具有更好的重用性，包括用户界面的重用和业务逻辑处理包的重用，特别是业务逻辑处理包，如果遵循相应的java规范，它不仅可以在web应用程序中使用，而且可以在包括桌面、分布式环境下的得到重用。

+ 4、系统更易于扩展和移植。

+ 5、系统更易于维护。

+ 6、采用MVC模式开发的系统更健壮。

+ 7、对于大型的应用程序优势更为明显。

谈到设计模式，可以想一下我们常用的jsp+bean和jsp+servlet+bean的模式

JSP Model1

JSP Model2

上图中，JSP Model1即JSP+JavaBean的模式，在这种模式下，处理客户端的请求和将输出展现给客户端都是由JSP页面负责的，

在模式1中，整个过程没有Servlet的参与，它将主要的业务逻辑放到JavaBean中实现，而将页面展现和请求控制交给JSP处理。

不可否认jsp的开发模式简化了开发Web应用程序的复杂度，但是其缺点是显而易见的，由于jsp是在html中嵌入java代码的方式

实现的，不可避免地，它也面临很多问题：如页面展现与业务逻辑混合在一起，仍然无法在开发过程中将不同的角色更清晰

地区分开来；jsp页面中将会夹杂大量的java代码，维护变得困难；同时，业务逻辑的改动也将面临动一发而影响全局的窘境。

JSP Model2即JSP+Servlet+JavaBean的模式，它和模式1的最大不同是它多了Servlet层，用于控制用户的请求和将JavaBean的

业务输出传递给JSP来展现，这样就将数据展现、业务控制、业务逻辑实现分离开来，这就是早期的MVC(Model－View－Control)模式。显然，这种模式相对于jsp+bean的模式来说应用程序更具扩展性和灵活性，并且更易于维护。但是这种简单的MVC模式也有缺点，

第一、没有成熟的MVC框架中所带有的各种强大和实用的功能，第二、配置文件不好管理，成熟的MVC框架支持多配置文件，

而servlet的配置都写在web.xml中，这会导致web.xml文件难以管理。因此有必要掌握一种成熟的MVC的开发框架。

对于现有较成熟的Model-View-Control(MVC)框架而言，其解决的主要问题有下面几部分：

+ <span style="color:red">将Web页面中的输入元素封装为一个（请求）数据对象。</span>

+ <span style="color:red">根据请求的不同，调度相应的逻辑处理单元，并将（请求）数据对象作为参数传入。</span>

+ <span style="color:red">逻辑处理单元完成运算后，返回一个结果数据对象。</span>

+ <span style="color:red">将结果数据对象中的数据与预先设计的表现层相融合并展现给用户。</span>

MVC模式将交互式应用分成模型（Model）、视图（View）和控制器（Controller）三部分。

模型是指<span style="color:red">从现实世界中挖掘出来的对象模型，是应用逻辑的反映</span>。模型封装了数据和对数据的操作，是实际进行数据处理的计算

的地方。视图是<span style="color:red">应用和用户之间的接口</span>，它负责将应用显现给用户和显示模型的状态。控制器<span style="color:red">负责视图和模型之间的交互</span>，控制对用户输入的响应方式和流程，它主要负责两方面的动作：把用户的请求分发到相应的模型；将模型的改变及时反应到视图上。

MVC将这些对象分离以提高灵活性和复用性。MVC模式的结构如下图所示：

![License Badge]({{ site.baseurl}}/images/article/design-idea-of-mvc-mode/1.jpg)

<br>