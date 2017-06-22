---
layout: post
blog_id: "oracle-view-and-extend-tablespace"
title: "Oracle 查看和扩展表空间"
date: 2017-06-21 00:00:00 -0700
tags: Oracle
category: Oracle
summary: 对于Oracle数据库的表空间,除了用手动增加大小外,还可以增加数据文件等方式扩展表空间大小
comments: false
---

#### 一、查询表空间使用情况

```sql
select a.tablespace_name as "表空间名",
       a.bytes / 1024 / 1024 as "表空间大小(M)",
       (a.bytes - b.bytes) / 1024 / 1024 as "已使用空间(M)",
       b.bytes / 1024 / 1024 "空闲空间(M)",
       round(((a.bytes - b.bytes) / a.bytes) * 100, 2) "使用比"
  from (select tablespace_name, sum(bytes) bytes
          from dba_data_files
         group by tablespace_name) a,
       (select tablespace_name, sum(bytes) bytes, max(bytes) largest
          from dba_free_space
         group by tablespace_name) b
 where a.tablespace_name = b.tablespace_name
 order by ((a.bytes - b.bytes) / a.bytes) desc;
```

![License Badge]({{ site.baseurl}}/images/tablespace/1.png)

#### 二、扩展表空间

**1、查看表空间的名字及文件所在位置**

```sql
select tablespace_name,
       file_id,
       file_name,
       round(bytes / (1024 * 1024), 0) total_space
  from dba_data_files
order by tablespace_name
```

![License Badge]({{ site.baseurl}}/images/tablespace/2.png)

**2、扩展所需表空间大小**

```sql
alter database datafile 'F:\ORACLE\PRODUCT\10.2.0\ORADATA\ORCL\xxx.DBF' resize 1024m;
```

> 对于Oracle数据库的表空间，除了用手动增加大小外，还可以增加数据文件等方式扩展表空间大小。
 
方法一：增加数据文件个数

```sql
alter tablespace 表空间名称 add datafile 'F:\ORACLE\PRODUCT\10.2.0\ORADATA\ORCL\new_xxx.DBF' size 500m
```

方法二：设置表空间自动扩展。

```sql
ALTER DATABASE DATAFILE 'xxx\xxx.dbf' AUTOEXTEND ON;//打开自动增长
ALTER DATABASE DATAFILE 'xxx\xxx.dbf' AUTOEXTEND ON NEXT 200M ;//每次自动增长200m
ALTER DATABASE DATAFILE 'xxx\xxx.dbf' AUTOEXTEND ON NEXT 200M MAXSIZE 1024M;//每次自动增长200m，表空间最大不超过1G
```


