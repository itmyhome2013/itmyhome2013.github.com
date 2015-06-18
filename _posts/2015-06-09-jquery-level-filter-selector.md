---
layout: post
blog_id: "jquery-level-filter-selector"
title: "jQuery选择器之层级过滤选择器"
date: 2015-06-09 00:00:00 -0700
tags: jQuery
category: jQuery
summary: 本篇文章主要介绍jQuery选择器之层级过滤选择器，包括:$("ancestor descendant")、$("parent > child")、$("prev + next")、$("prev ~ siblings")...
comments: false
---
</br>

```js
$("ancestor descendant"); //选取parent元素后所有的child元素  
$("parent > child");     //选取parent元素后所有的直属child元素，何谓“直属”，也就是第一级的意思了  
$("prev + next");        //prev和next是两个同级别的元素. 选中在prev元素后面的next元素  
$("prev ~ siblings");    //选择prev后面的根据siblings过滤的元素。注:siblings是过滤器 
```

后两个用的比较少，一般会有其他选择器替代

```js
$("prev + next")等价于next()  
$("prev ~ siblings")等价于nextAll()
```

</br>
实例

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
	<div>  
		<p id="p1">第一个DIV里面的P元素。</p>  
	</div>  
	<p id="p2">第一个单P元素。</p>  
	<div>  
		<span>DIV里面的SPAN元素。</span>  
		<p id="p3">第二个DIV里面的P元素。</p>  
		<span>  
			<p id="p4">DIV里面的SPAN里面的P元素。</p>  
		</span>  
	</div>  
	<table>  
		<tr>  
			<th>A</th><th>B</th><th>C</th>  
		</tr>  
		<tr>  
			<td>1</td><td>2</td><td>3</td>  
		</tr>  
	</table>  
	<p id="p5">第二个单P元素。</p>  
	<span>单SPAN元素。</span>  
</body>
```

</br>
####一、$("ancestor descendant");
```js
$("div p").addClass("highlight"); //选取div后面的所有p元素   结果为：p1,p3,p4  
```

![License Badge]({{ site.baseurl}}/images/jquery/level-filter-selector/1.png)

</br>
####二、$("parent > child");
```js
$("div > p").addClass("highlight"); //选取div后 所有第一级p元素   结果为：p1,p3。p4不会选取,因为p4不是div的直属元素
```

![License Badge]({{ site.baseurl}}/images/jquery/level-filter-selector/2.png)

</br>
####三、$("prev + next");
```js
$("div + p").addClass("highlight");   //选取div后面紧邻的p元素  结果为：p2。p5不会选取,因为p5不紧邻div  
```

![License Badge]({{ site.baseurl}}/images/jquery/level-filter-selector/3.png)

</br>
####四、$("prev ~ siblings");
```js
$("div ~ p").addClass("highlight");     //选取div后面所有紧邻的p元素  结果为：p2,p5  
```

![License Badge]({{ site.baseurl}}/images/jquery/level-filter-selector/4.png)

</br>
	
    