---
layout: post
blog_id: "java-static-import"
title: "Java 静态导入"
date: 2016-04-27 00:00:00 -0700
tags: Java
category: Java
summary: 在JDK1.5之后提供了静态导入(Static import)功能,可以直接使用import static的方式导入
comments: false
---

在JDK1.5之后提供了静态导入(Static import)功能。如果一个类中的方法全部是使用static声明的静态方法或变量，
则在导入时就可以直接使用 **import static** 的方式导入，格式如下：

```bash
import static 包.类.* ;
```

##### 下面介绍如何使用静态导入。

在包中定义这样一个类

```java
package com.ithome;

public class Constant {
	public static String URL = "http://itmyhome.com";  //静态变量
}
```

然后在另一个包中使用时，先不使用静态导入

```java
package com.ithome2;

import com.ithome.Constant;

public class StaticImportTest {
	public static void main(String[] args) {
		System.out.println(Constant.URL);
	}
}
```

#### <span style="color:red">使用静态导入</span>

```java
package com.ithome2;

import static com.ithome.Constant.URL;;

public class StaticImportTest {
	public static void main(String[] args) {
		System.out.println(URL); 
	}
}
```

可直接使用静态变量 *URL* 无需前缀类名Constant

#### <span style="color:red">优点：</span>

减少代码输入，提高效率

#### <span style="color:red">缺点：</span>

过度地使用静态导入会在一定程度上降低代码的可读性。

<br>