---
layout: post
blog_id: "java-array-is-divided-into-sub-arrays"
title: "Java数组分隔成子数组"
date: 2016-01-19 00:00:00 -0700
tags: Java
category: Java
summary: 
comments: false
---
<br>
有这样一个需求，循环数组输出动态表单为一行两列

分隔数组每两个为一组，如果单数最后一个为一组

![License Badge]({{ site.baseurl}}/images/java/fengeshuzu.png)

```java
import java.util.ArrayList;
import java.util.List;

public class SplitArray {
	public static void main(String[] args) {
		String ary[] = { "a", "b", "c", "d", "e" };  //分隔的数组
		int splitSize = 2;    //分隔的大小

		Object subAry[] = splitAry(ary, splitSize);
		for (Object obj : subAry) {
			String subItem[] = (String[]) obj;
			for (int i = 0; i < subItem.length; i++) {
				System.out.print(subItem[i] + ",");
			}
			System.out.println();
		}
	}

	/**
	 *  比如 { "a", "b", "c", "d", "e" }
	 *  分隔成
	 *  a, b
	 *  c, d
	 *  e
	 */
	private static Object[] splitAry(String ary[], int subSize) {

		int count = ary.length % subSize == 0 ? ary.length / subSize
				: ary.length / subSize + 1;

		List<List<String>> subAryList = new ArrayList<List<String>>();
		for (int i = 0; i < count; i++) {
			int index = i * subSize;
			List<String> list = new ArrayList<String>();
			int j = 0;
			while (j < subSize && index < ary.length) {
				list.add(ary[index++]);
				j++;
			}
			subAryList.add(list);
		}
		//将List<List<String>> 封装为 Object[],也可以不需要
		Object[] subAry = new Object[subAryList.size()];
		for (int i = 0; i < subAryList.size(); i++) {
			List<String> subList = subAryList.get(i);
			String[] subAryItem = new String[subList.size()];
			for (int j = 0; j < subList.size(); j++) {
				subAryItem[j] = subList.get(j);
			}
			subAry[i] = subAryItem;
		}
		return subAry;
	}
}
```

<br>