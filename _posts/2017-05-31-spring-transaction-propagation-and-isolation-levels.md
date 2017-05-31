---
layout: post
blog_id: "spring-transaction-propagation-and-isolation-levels"
title: "Spring事务传播属性和隔离级别"
date: 2017-05-31 00:00:00 -0700
tags: Spring
category: Spring
summary: Spring在TransactionDefinition接口中规定了7种类型的事务传播行为
comments: false
---

Spring在TransactionDefinition接口中规定了7种类型的事务传播行为，
它们规定了事务方法和事务方法发生嵌套调用时事务如何进行传播：

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>事务传播行为类型</td> 
     <td>说明</td> 
    </tr> 
	<tr> 
     <td>PROPAGATION_REQUIRED</td> 
     <td>如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。这是最常见的选择。</td> 
    </tr> 
	 <tr> 
     <td>PROPAGATION_SUPPORTS</td> 
     <td>支持当前事务，如果当前没有事务，就以非事务方式执行。</td> 
    </tr>
	<tr> 
     <td>PROPAGATION_MANDATORY</td> 
     <td>使用当前的事务，如果当前没有事务，就抛出异常。</td> 
    </tr>

	<tr> 
     <td>PROPAGATION_REQUIRES_NEW</td> 
     <td>新建事务，如果当前存在事务，把当前事务挂起。</td> 
    </tr> 
	<tr> 
     <td>PROPAGATION_NOT_SUPPORTED</td> 
     <td>以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。</td> 
    </tr> 
	<tr> 
     <td>PROPAGATION_NEVER</td> 
     <td>以非事务方式执行，如果当前存在事务，则抛出异常。</td> 
    </tr> 
	<tr> 
     <td>PROPAGATION_NESTED</td> 
     <td>如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与PROPAGATION_REQUIRED类似的操作。</td> 
    </tr>  	
</table>


在Spring中定义了四种不同的事务隔离级别：

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>事务隔离级别</td> 
     <td>说明</td> 
    </tr> 
	<tr> 
     <td>read_uncommitted</td> 
     <td>读未提交，一个事务可以操作另外一个未提交的事务，不能避免脏读，不可重复读，幻读，隔离级别最低，并发性能最高</td> 
    </tr> 	
	<tr> 
     <td>read_committed</td> 
     <td>读已提交，一个事务不可以操作另外一个未提交的事务， 能防止脏读，不能避免不可重复读，幻读。</td> 
    </tr> 
	<tr> 
     <td>repeatable_read</td> 
     <td>能够避免脏读，不可重复读，不能避免幻读</td> 
    </tr>
	<tr> 
     <td>serializable</td> 
     <td>隔离级别最高，消耗资源最低，代价最高，能够防止脏读， 不可重复读，幻读</td> 
    </tr> 	
</table>