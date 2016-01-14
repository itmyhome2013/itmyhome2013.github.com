---
layout: post
blog_id: "transaction-on-oracle-ddl"
title: "关于Oracle处理DDL和DML语句的事务管理"
date: 2016-01-14 00:00:00 -0700
tags: Oracle
category: Oracle
summary: 如果使用原生sql语句进行query查询时，hibernate是不会自动把结果包装成实体的。
comments: false
---
<br>

#### SQL主要程序设计语言

数据定义语言DDL(Data Definition Language) 如 create、alter、drop，

数据操作语言DML(Data Munipulation Language) 如 insert、update、delete，

数据控制语言DCL(Data Control Language) 如 grant、revoke

```java
Connection conn = DBUtil.getConnection();
Statement st = null;
try {
	conn.setAutoCommit(false);  //关闭自动提交
	st = conn.createStatement();
	st.executeUpdate("alter table test rename column name to name2");  //①直接commit
	st.executeUpdate("alter table test rename column address too address2"); //②故意将to写为too
	conn.commit();
} catch (SQLException e) {
	try {
	   conn.rollback();  //③回滚
	} catch (SQLException e1) {
	   e1.printStackTrace();
	}
} finally {
	DBUtil.closeAll(null, st, conn);
}
```

上面例子是执行修改字段名称 ①正常执行，在②语句中故意产生错误，报异常然后跳到③

最后结果是 address未做修改，name已经修改为了name2

&nbsp;<font color="red">Oracle在执行DDL语句时会先执行commit，所以就不能对DDL语句进行回滚</font>

如果非要进行回滚的话，可进行反向操作，就是在②出错的时候再将①中的name改回去

如果语句很多的话，未免太麻烦。不知道有没有方法可解决

<br>