---
layout: post
blog_id: "oracle-delete-table-before-judgment-table-exists"
title: "Oracle删除表之前判断表是否存在"
date: 2016-01-21 00:00:00 -0700
tags: Oracle
category: Oracle
summary: 在Oracle中若删除一个不存在的表,则会提示:ORA-00942:表或视图不存在
comments: false
---
<br>
在Oracle中若删除一个不存在的表,如 "DROP TABLE tableName",则会提示:
ORA-00942:表或视图不存在
若在程序中执行该语句则会报异常,这就需要我们在删除表前先判断该表是否存在,若存在则删除. 

```sql
DECLARE
  num NUMBER;
BEGIN
  SELECT COUNT(1)
    INTO num
    FROM USER_TABLES
   WHERE TABLE_NAME = UPPER('tableName');
  IF num > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE tableName';
  END IF;
END;
```

<br>