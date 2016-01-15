---
layout: post
blog_id: "remove-the-last-of-the-extra-comma"
title: "Java拼接字符串时,去掉最后一个多余的逗号"
date: 2016-01-15 00:00:00 -0700
tags: Java
category: Java
summary: 当我们遍历拼接字符串的时候，最后会多出一个我们添加的字符, 可使用substring、replace、deleteCharAt
comments: false
---
<br>

当我们遍历拼接字符串的时候，最后会多出一个我们添加的字符(比如逗号)

可使用如下三种方法去掉最后多余的符号

```java
String str[] = { "hello", "beijing", "world", "shenzhen" };
StringBuffer buf = new StringBuffer();

for (int i = 0; i < str.length; i++) {
	buf.append(str[i]).append(",");
}

if (buf.length() > 0) {
	//方法一  : substring
	System.out.println(buf.substring(0, buf.length()-1));
	//方法二 ：replace
	System.out.println(buf.replace(buf.length() - 1, buf.length(), ""));
	//方法三： deleteCharAt
	System.out.println(buf.deleteCharAt(buf.length()-1));
}
```

<br>