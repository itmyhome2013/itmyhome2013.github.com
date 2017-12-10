---
layout: post
blog_id: "mysql-start-with-connect-by"
title: "MYSQL实现Oracle的Start with…Connect By递归树查询"
date: 2017-12-09 00:00:00 -0700
tags: MySQL
category: MySQL
summary: 可以通过自定义函数的方式来实现Oracle的Start with…Connect By递归树查询
comments: false
---

因项目迁移，使用的数据库也需要从Oracle迁移到MySQL 其中有个功能使用到了Oracle的Start with…Connect By递归树查询，而MySQL中没有此函数，但可以通过自定义函数的方式来解决这个问题

**创建表**

```sql
create table treeList(
   id varchar(10), -- 节点ID
   name varchar(10), -- 节点名称
   pId varchar(10) -- 父ID
)
```

**插入测试数据**

```sql
insert into treeList values(1,'中国',null);
insert into treeList values(2,'北京',1);
insert into treeList values(3,'上海',1);
insert into treeList values(4,'深圳',1);
insert into treeList values(5,'海淀',2);
insert into treeList values(6,'朝阳',2);
insert into treeList values(7,'昌平',2);
insert into treeList values(8,'丰台',2);
```

**创建函数getChildList**

```sql
CREATE FUNCTION getChildList (rootId VARCHAR(100)) -- rootId为要查询的节点
RETURNS VARCHAR(1000)
BEGIN
    DECLARE pTemp VARCHAR(1000);  
    DECLARE cTemp VARCHAR(1000); -- 定义两个临时变量
       
    SET pTemp = '';  
    SET cTemp = rootId;
       
    WHILE cTemp is not null DO  
       if (pTemp = '') then
         SET pTemp = cTemp;
         elseif(pTemp <> '') then
         SET pTemp = concat(pTemp,',',cTemp); -- 所有节点连接成字符串
         end if;
         SELECT group_concat(id) INTO cTemp FROM treeList   
         WHERE FIND_IN_SET(pId,cTemp)>0; 
     END WHILE;  
     RETURN pTemp;  
END
```

**执行方法 查询节点为“2”下的所有节点**

```sql
select getChildList('2') as ids
```

运行结果

![License Badge]({{ site.baseurl}}/images/mysql/function.png)