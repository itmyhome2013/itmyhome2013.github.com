---
layout: post
blog_id: "jquery-basic-filter-selector"
title: " jQuery选择器之基本过滤选择器"
date: 2015-06-08 00:00:00 -0700
tags: jQuery
category: jQuery
summary: 本篇文章主要介绍jQuery选择器之基本过滤选择器，包括:first、:last()、:not(selector)...
comments: false
---
</br>

```css
<style type="text/css">  
	/*高亮显示*/  
	.highlight{     
		background-color: gray  
	}  
</style>
```

```html
<body>  
	<h3>各省市行政区划</h3>  
	<table border="1" width="50%">  
		<thead>  
			<tr>  
				<th>北京</th>  
				<th>上海</th>  
				<th>商丘</th>  
			</tr>  
		</thead>  
		<tbody>  
			<tr>  
				<td>海淀</td>  
				<td>徐汇</td>  
				<td>睢阳</td>  
			</tr>  
			<tr>  
				<td>朝阳</td>  
				<td>闸北</td>  
				<td>梁园</td>  
			</tr>  
			<tr>  
				<td>昌平</td>  
				<td>黄埔</td>  
				<td>柘城</td>  
			</tr>  
		</tbody>  
	</table>  
</body> 
```

</br>
####一、:first

```js
$("tr:first").addClass("highlight"); //获取匹配的第一个tr元素  
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/1.png)

</br>
####二、:last()

```js
$("tr:last").addClass("highlight"); //获取匹配的最后一个tr元素 
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/2.png)

</br>
####三、:not(selector)

```js
$("td:not(:even)").addClass("highlight");//获取除了索引是偶数的td  
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/3.png)

</br>
####四、:even

```js
$("tr:even").addClass("highlight");  //匹配所有索引值为偶数的元素，从 0 开始计数
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/4.png)

</br>
####五、:odd

```js
$("tr:odd").addClass("highlight");  //匹配所有索引值为奇数的元素，从 0 开始计数
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/5.png)

</br>
####六、:eq(index)

```js
$("tr:eq(2)").addClass("highlight");   //匹配一个给定索引值的元素
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/6.png)

</br>
####七、:gt(index)

```js
$("tr:gt(1)").addClass("highlight");  //匹配所有大于给定索引值的元素
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/7.png)

</br>
####八、:lt(index)

```js
$("tr:lt(2)").addClass("highlight");  //匹配所有小于给定索引值的元素
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/8.png)

</br>
####九、:header

```js
$(":header").addClass("highlight");   //匹配如 h1, h2, h3之类的标题元素
```

![License Badge]({{ site.baseurl}}/images/jquery/basic-filter-selector/9.png)

</br>

#[**效果演示**](http://itmyhome.com/jquery-basic-selector) 

</br>