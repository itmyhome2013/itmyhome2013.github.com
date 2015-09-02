---
layout: post
blog_id: "several-objects-java-explained"
title: "Java的几种对象解释"
date: 2015-08-05 00:00:00 -0700
tags: Java
category: Java
summary: PO：persistent object 持久对象,VO：value object 值对象
comments: false
---
</br>

####一、PO：persistent object 持久对象

可以看成是与数据库中的表相映射的Java对象。最简单的PO就是对象数据库中某个表中的一条记录，

多个记录可以用PO的集合。PO中应该不包含任何数据库的操作

</br>
####二、VO：value object 值对象

通常用于业务层之间的数据传递，和PO一样也时仅仅包含数据而已。但应是抽象出的业务对象，

可以和表对应，也可以不，这根据业务的需要。个人觉得同DTO(数据传输对象)，在web上传递。

</br>
####三、DAO：data access object 数据访问对象

此对象用于访问数据库。通常和PO结合使用，DAO中包含了各种数据库的操作方法。通过它的方法，结合PO对数据库进行相关的操作

</br>
####四、BO:business object 业务对象

封装业务逻辑的Java对象，通过调用DAO方法，结合PO，VO进行业务操作

</br>
####五、POJO：plain ordinary java object 简单无规则Java对象

我个人觉得它和其他不是一个层面上的东西，VO和PO应该都属于它。

</br>