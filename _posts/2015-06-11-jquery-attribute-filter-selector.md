---
layout: post
blog_id: "jquery-attribute-filter-selector"
title: "jQuery选择器之属性过滤选择器 "
date: 2015-06-11 00:00:00 -0700
tags: jQuery
category: jQuery
summary: 本篇文章主要介绍jQuery选择器之属性过滤选择器,包括:[attribute]、[attribute=value]、[attribute!=value]、[attribute^=value]...
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
  <div>  
	  <p>Hello</p>  
  </div>  
  <div id="test">ID为test的DIV</div>  
  <input type="checkbox" id="s1" name="football" value="足球" />足球  
  <input type="checkbox" name="volleyball" value="排球" />排球  
  <input type="checkbox" id="s3" name="basketball" value="篮球" />篮球  
  <input type="checkbox" id="s4" name="other" value="其他" />其他  
</body>  
```

</br>
####1、[attribute]用法

定义：匹配包含给定属性的元素

```js
$("div[id]").addClass("highlight"); //查找所有含有ID属性的div元素
```

</br>
####2、[attribute=value]用法

定义：匹配给定的属性是某个特定值的元素

```js
$("input[name='basketball']").attr("checked",true);   //name属性值为basketball的input元素选中
```

</br>
####3、[attribute!=value]用法

定义：匹配给定的属性是不包含某个特定值的元素

```js
$("input[name!='basketball']").attr("checked",true);   //name属性值不为basketball的input元素选中   
//此选择器等价于:not([attr=value])要匹配含有特定属性但不等于特定值的元素，请使用[attr]:not([attr=value])  
$("input:not(input[name='basketball'])").attr("checked",true); 
```

</br>
####4、[attribute^=value]用法

定义：匹配给定的属性是以某些值开始的元素

```js
$("input[name^='foot']").attr("checked",true);  //查找所有 name 以 'foot' 开始的 input 元素
```

</br>
####5、[attribute$=value]用法

定义：匹配给定的属性是以某些值结尾的元素

```js
$("input[name$='ball']").attr("checked",true); //查找所有 name 以 'ball' 结尾的 input 元素  
```

</br>
####6、[attribute*=value]用法

定义：匹配给定的属性是以包含某些值的元素

```js
$("input[name*='sket']").attr("checked",true);  //查找所有 name 包含 'sket' 的 input 元素 
```

</br>
####7、[selector1][selector2][selectorN]用法

定义：复合属性选择器，需要同时满足多个条件时使用

```js
$("input[id][name$='ball']").attr("checked",true);  //找到所有含有 id属性，并且它的 name属性是以 ball结尾的  
```	

</br>