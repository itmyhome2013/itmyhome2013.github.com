---
layout: post
blog_id: "oracle-delete-fields-before-judgment-fields-exists"
title: "Oracle删除字段之前判断字段是否存在"
date: 2016-01-23 00:00:00 -0700
tags: Oracle
category: Oracle
summary: 在Oracle中若删除表中一个不存在的字段,则会提示:ORA-00904:"xxx":标识符无效
comments: false
---
<br>
在Oracle中若删除表中一个不存在的字段,如 "alter table test drop column xxx",则会提示:

ORA-00904:"xxx":标识符无效

若在程序中执行该语句则会报异常,这就需要我们在删除字段前先判断该字段是否存在,若存在则删除. 

```sql
DECLARE
  num NUMBER;
BEGIN
  SELECT COUNT(1)
    INTO num
    from cols
   where table_name = upper('tableName')
     and column_name = upper('columnName');
  IF num > 0 THEN
      execute immediate 'alter table tableName drop column columnName';
  END IF;
END;
```

<br>