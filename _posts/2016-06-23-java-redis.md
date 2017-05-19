---
layout: post
blog_id: "java-redis"
title: "Java 使用 Redis"
date: 2016-06-23 00:00:00 -0700
tags: Redis
category: Redis
summary: 开始在Java中使用Redis前,我们需要确保已经安装了redis服务
comments: false
---
<br>

#### 安装

开始在 Java 中使用 Redis 前， 我们需要确保已经安装了 redis 服务(<a href="http://blog.csdn.net/itmyhome1990/article/details/51555324">Windows 64位下安装Redis教程</a>)及 Java redis 驱动，且你的机器上能正常使用 Java。接下来让我们安装 Java redis 驱动：

+ 首先你需要下载驱动包，下载 <a href="http://mvnrepository.com/artifact/redis.clients/jedis">jedis.jar</a>，确保下载最新驱动包。
+ 将该驱动包引入到classpath中

#### 连接到Redis服务器

```java
import redis.clients.jedis.Jedis;

public class RedisJava {

	public static void main(String[] args) {
		// 连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");
		// 查看服务是否运行
		System.out.println("Server is running: " + jedis.ping());
	}
}
```

运行上面的程序来测试连接Redis服务器。运行前确保Redis服务器已启动

```java
Connection to server sucessfully
Server is running: PONG
```

#### Redis和Java String(字符串)实例

```java
import redis.clients.jedis.Jedis;

public class RedisJava {

	public static void main(String[] args) {
		// 连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");
		// 设置 redis 字符串数据
		jedis.set("itmyhome", "麦田技术博客");
		// 获取存储的数据并输出
		System.out.println("Stored string in redis:: " + jedis.get("itmyhome"));
	}
}
```

运行上面程序

```java
Connection to server sucessfully
Stored string in redis:: 麦田技术博客
```

#### Redis和Java List(列表)实例

```java
import java.util.List;
import redis.clients.jedis.Jedis;

public class RedisJava {

	public static void main(String[] args) {
		// 连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");
		// 存储数据到列表中
		jedis.lpush("language-list", "Java");
		jedis.lpush("language-list", "Redis");
		jedis.lpush("language-list", "PHP");
		// 获取存储的数据并输出
		List<String> list = jedis.lrange("language-list", 0, 5);
		for (int i = 0; i < list.size(); i++) {
			System.out.println("Stored string in redis:: " + list.get(i));
		}
	}
}
```

运行上面程序

```java
Connection to server sucessfully
Stored string in redis:: PHP
Stored string in redis:: Redis
Stored string in redis:: Java
```

#### Redis和Java的Keys(键)实例

```java
import java.util.Iterator;
import java.util.Set;
import redis.clients.jedis.Jedis;

public class RedisJava {

	public static void main(String[] args) {
		// 连接本地的 Redis 服务
		Jedis jedis = new Jedis("localhost");
		System.out.println("Connection to server sucessfully");

		// 获取数据并输出
		Set<String> sets = jedis.keys("*");
		Iterator<String> ite = sets.iterator();
		while (ite.hasNext()) {
			Object obj1 = ite.next();
			System.out.println("stored keys:: " + obj1);
		}
	}
}
```

运行上面程序

```java
Connection to server sucessfully
stored keys:: language-list
stored keys:: itmyhome
```

<br>




















