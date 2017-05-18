---
layout: post
blog_id: "ora-12541-tns-no-listener"
title: "ORA-12541: TNS: 无监听程序"
date: 2016-11-06 00:00:00 -0700
tags: Oracle
category: Oracle
summary: 
comments: false
---
<br>

在用PL/SQL Developer连接Oracle 11g时报错"ORA-12541: TNS: 无监听程序"，
如下图所示。解决方法如下步骤：

![License Badge]({{ site.baseurl}}/images/ora-12541/1.png)

#### 1、 从开始菜单中打开“Net Configuration Assistance”，选择“监听程序配置”，

#### 如下图所示，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/2.png)

#### 2、选择“重新配置”，如下图所示，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/3.png)

#### 3、选择监听程序，如下图所示，选择协议，一般默认就好，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/4.png)

![License Badge]({{ site.baseurl}}/images/ora-12541/5.png)

![License Badge]({{ site.baseurl}}/images/ora-12541/6.png)

#### 4、选择端口号，如下图所示，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/7.png)

#### 5、选择“否”，如下图所示，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/8.png)

#### 6、监听程序配置完成，如下图所示，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/9.png)

#### 7、选择“本地网络服务名配置”，如下图所示，点击下一步。

![License Badge]({{ site.baseurl}}/images/ora-12541/10.png)

#### 8、选择“重新配置”，点击下一步。

#### 9、"网络服务名"选择你自己数据库的名字，点击下一步

#### 10、 填写"服务名"，其实就是你创建数据库时的全数据库名，如orcl，点击下一步。

#### 11、选择协议，默认选择"TCP"，点击下一步。

#### 12、 填写"主机名"，可以是你的IP地址，也可以是你的主机名；选择端口号，点击下一步。

#### 13、 选择"是，进行测试"，点击下一步。

#### 14、选择"更改登陆"，填写"用户名"和"口令"，点击"确定"会显示"

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在连接…测试成功。"，点击下一步。

#### 15、填写"网络服务名"，就是你自己的数据库名，我的是"orcl"，点击下一步。

#### &nbsp;&nbsp;&nbsp;&nbsp;"是否配置另一个服务名？"选择"否"，点击下一步，完成。



