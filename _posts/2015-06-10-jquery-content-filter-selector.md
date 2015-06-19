---
layout: post
blog_id: "jquery-content-filter-selector"
title: "jQuery选择器之内容过滤选择器"
date: 2015-06-10 00:00:00 -0700
tags: jQuery
category: jQuery
summary: 本篇文章主要介绍jQuery选择器之基本过滤选择器,包括:empty、contains(text)、has(selector)、parent...
comments: false
---
</br>

先写出DOM元素的HTML结构：

```css
<style type="text/css">  
    /*高亮显示*/  
    .highlight{     
            background-color: gray  
    }  
</style>
```

```html
<div>John Resign</div>  
<div>George Martin</div>  
<div>Malcom John Sinclair</div>  
<div>J.Ohn</div>  
<div></div>  
<p></p>  
<div><p>Has p</p></div> 
```

</br>
####一、:contains(text)

选取含有文本内容为"text"的元素

```js
$("div:contains('John')").addClass("highlight"); //查找所有包含 "John" 的 div 元素 
```

![License Badge]({{ site.baseurl}}/images/jquery/content-filter-selector/1.png)

</br>
####二、:empty

选取不含任何子元素或文本的空元素

```js
$("div:empty").addClass("highlight");
```

用chrome浏览器审查元素可发现div为empty 的class样式已改变

![License Badge]({{ site.baseurl}}/images/jquery/content-filter-selector/2.png)

</br>
####三、:has(selector)

选取含有选择器所匹配的元素的元素

```js
$("div:has(p)").addClass("highlight"); //查找所有包含p的div元素  
```

![License Badge]({{ site.baseurl}}/images/jquery/content-filter-selector/3.png)

</br>
####四、:parent

选取含有子元素或者文本的元素标签

```js
$("div:parent").addClass("highlight");  //查找所有含有子元素或者文本的div元素
```

![License Badge]({{ site.baseurl}}/images/jquery/content-filter-selector/4.png)

</br>