---
layout: post
blog_id: "java-gets-the-number-specified-string-appears"
title: "Java 获取指定字符串出现的次数"
date: 2016-03-10 00:00:00 -0700
tags: Java
category: Java
summary: Java中获取指定字符串在另一个字符串中出现的次数
comments: false
---
<br>

Java中 获取指定字符串在另一个字符串中出现的次数

##### **方式一**

```java
/**
 * @param args
 */
public static void main(String[] args) {

	String srcText = "Hello World";
	String findText = "e";
	int num = appearNumber(srcText, findText);
	System.out.println(num);
}

/**
 * 获取指定字符串出现的次数
 * 
 * @param srcText 源字符串
 * @param findText 要查找的字符串
 * @return
 */
public static int appearNumber(String srcText, String findText) {
	int count = 0;
	Pattern p = Pattern.compile(findText);
	Matcher m = p.matcher(srcText);
	while (m.find()) {
		count++;
	}
	return count;
}
```

##### **方式二**

```java
/**
 * @param args
 */
public static void main(String[] args) {

	String srcText = "Hello World";
	String findText = "e";
	int num = appearNumber(srcText, findText);
	System.out.println(num);
}


/**
 * public int indexOf(int ch, int fromIndex)
 * 返回在此字符串中第一次出现指定字符处的索引，从指定的索引开始搜索
 * 
 * @param srcText
 * @param findText
 * @return
 */
public static int appearNumber(String srcText, String findText) {
	int count = 0;
	int index = 0;
	while ((index = srcText.indexOf(findText, index)) != -1) {
		index = index + findText.length();
		count++;
	}
	return count;
}
```

<br>
