---
layout: post
blog_id: "popup-layer"
title: "layer 弹出层"
date: 2016-05-15 00:00:00 -0700
tags: 前端
category: 前端
summary: jQuery弹出层插件
comments: false
---
<br>

#### 使用方法：

##### **一、引入**

```js
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="layer/layer.js"></script>
```

##### **二、BODY**

```html
<button id="layer">Click me</button>
```

##### **三、JS**

```js
<script type="text/javascript">
	$(function(){
		$("#layer").click(function(){
			//iframe层-父子操作
			layer.open({
			  type: 2,
			  title:'麦田技术博客',
			  area: ['700px', '450px'],
			  fix: false, //不固定
			  maxmin: true,
			  content: 'http://itmyhome.com/'
			});
		})
	})
</script>
```


在线演示：<a href="http://blog.itmyhome.com/layer/">http://blog.itmyhome.com/layer/</a>

layer官方：<a href="http://layer.layui.com/">http://layer.layui.com/</a>

<br>




















