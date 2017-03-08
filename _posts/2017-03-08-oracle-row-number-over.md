---
layout: post
blog_id: "oracle-row-number-over"
title: "ROW_NUMBER() OVER函数使用方法"
date: 2017-03-08 00:00:00 -0700
tags: Oracle
category: Oracle
summary: ROW_NUMBER是一个分析函数
comments: false
---
<br>

ROW_NUMBER是一个分析函数，语法如下：

```sql
ROW_NUMBER( )
   OVER ([ query_partition_clause ] order_by_clause)
```

它为order_by_caluse中指定的有序顺序序列(从1开始)分配一个唯一的数字到它应用的每一行


#### 例子：

##### 统计每一个部门下所有员工工资排行

测试数据

```sql
create table employee(
       empid int,           --ID
       deptid int,          --部门ID
       ename varchar2(20),  --姓名
       salary decimal(10,2) --工资
);

insert into employee values(1,10,'刘一',8800.00);
insert into employee values(2,10,'陈二',6200.00);
insert into employee values(3,10,'张三',9100.00);
insert into employee values(4,20,'李四',10200.00);
insert into employee values(5,20,'王五',9500.00);
insert into employee values(6,20,'赵六',7500.00);
insert into employee values(7,30,'孙七',12000.00);
insert into employee values(8,30,'周八',5800.00);
insert into employee values(9,30,'吴九',10100.00);
insert into employee values(10,30,'郑十',9500.00);
```

SQL脚本

```sql
select ename,
       deptid,
       row_number() over(partition by deptid order by salary desc) rank
  from employee
```

![License Badge]({{ site.baseurl}}/images/oracle/rownumber.png)



