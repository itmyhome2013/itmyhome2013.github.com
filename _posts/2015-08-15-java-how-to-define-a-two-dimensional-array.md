---
layout: post
blog_id: "java-how-to-define-a-two-dimensional-array"
title: "Java中如何定义一个二维数组"
date: 2015-08-15 00:00:00 -0700
tags: Java
category: Java
summary: 
comments: false
---
</br>

```java
package com.itmyhome;  
  
public class T {  
  
	/** 
	 * @param args 
	 */  
	public static void main(String[] args) {  
		// TODO Auto-generated method stub  
		//较为普遍使用最多的方式  
		float f1[][] = new float[3][3];  
		  
		//对象名称f2可放在[][]前面、后面或中间  
		float []f2[] = new float[3][3];  
		  
		//测试打印f2，可正常使用   
		for(int i=0;i<f2.length;i++){  
			for(int j = 0;j<f2[i].length;j++){  
				System.out.println(f2[i][j]);  
			}  
			System.out.println();  
		}  
		//二维数组可只定义行，而不定义列，反之则不然  
		float f3[][] = new float[][3];  //此种方法错误  
		float [][]f4 = new float[3][3];  
		float [][]f5 = new float[3][];  //可以只指定行 而不指定列  
	}  
}
```
</br>