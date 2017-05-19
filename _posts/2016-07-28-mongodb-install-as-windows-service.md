---
layout: post
blog_id: "mongodb-install-as-windows-service"
title: "MongoDB 安装成为Windows服务"
date: 2016-07-28 00:00:00 -0700
tags: MongoDB
category: MongoDB
summary: 使用命令将MongoDB安装成为Windows服务
comments: false
---
<br>

使用以下命令将MongoDB安装成为Windows服务。

```ruby
mongod --logpath d:\data\logs.txt --dbpath d:\data --directoryperdb --serviceName MongoDB --install
```

**说明**

logpath 为日志文件
dbpath 为MongoDB数据库目录
serviceName 为Windows服务名(可随意)
查看logs.txt文件

```bath
Trying to install Windows service 'MongoDB'
Error connecting to the Service Control Manager: 拒绝访问。 (5)
```

如果出现以上信息，这是操作系统权限问题。**`cmd必须以管理员身份运行才行！！！`**
安装成功后查看Windows服务 MongoDB出现在列表中

![License Badge]({{ site.baseurl}}/images/mongodb/3.png)

**使用**

+ 启动MongoDB：net start MongoDB
+ 停止MongoDB：net stop MongoDB
+ 删除MongoDB：sc delete MongoDB

![License Badge]({{ site.baseurl}}/images/mongodb/2.png)

