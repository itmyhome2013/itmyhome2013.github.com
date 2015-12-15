---
layout: post
blog_id: "jquery-custom-content-scroller"
title: "jQuery自定义内容滚动条插件"
date: 2015-12-15 00:00:00 -0700
tags: jQuery
category: jQuery
summary: 高度可定制的自定义滚动条jQuery插件。功能包括垂直和/或水平滚动条,可调节的滚动势头,鼠标滚轮
comments: false
---
</br>
#### 使用方法：

首先下载插件：http://manos.malihu.gr/jquery-custom-content-scroller/

#### 一、HTML

引入以下文件

```html
<link rel="stylesheet" href="/jquery.mCustomScrollbar.css" />
<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="js/jquery.mCustomScrollbar.concat.min.js"></script>
```

</br>
#### 二、CSS

首先必须要有滚动条出现，给DIV限定高度,并指定overflow样式为auto,

这样当内容超出后就会自动出现滚动条了

```css
<style>
  .div-height {
	width: 300px;
	height: 300px;
	overflow: auto;
  }
</style>
```

</br>
#### 三、初始化HTML

```html
<div class="content" data-mcs-theme="dark">
   <!-- your content -->
</div>
```

</br>
#### 四、初始化JS

```js
<script>
    $(function(){
	 $(".content").mCustomScrollbar();
    })
</script>
```

</br>
效果演示：http://itmyhome.com/jquery_scroller/

官网：http://manos.malihu.gr/jquery-custom-content-scroller/

</br>