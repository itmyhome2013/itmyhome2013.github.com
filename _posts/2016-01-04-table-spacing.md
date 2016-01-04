---
layout: post
blog_id: "table-spacing"
title: "table中设置tr行间距"
date: 2016-01-04 00:00:00 -0700
tags: css
category: css
summary: CSS border-collapse 属性设置表格的边框是否被合并为一个单一的边框
comments: false
---
<br>
CSS border-collapse 属性设置表格的边框是否被合并为一个单一的边框

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>值</td> 
     <td>描述</td> 
    </tr> 
	<tr> 
     <td>separate</td> 
     <td>默认值。边框会被分开。不会忽略 border-spacing 和 empty-cells 属性。</td> 
    </tr> 
	 <tr> 
     <td>collapse</td> 
     <td>如果可能，边框会合并为一个单一的边框。会忽略 border-spacing 和 empty-cells 属性。</td> 
    </tr>
	<tr> 
     <td>inherit</td> 
     <td>规定应该从父元素继承 border-collapse 属性的值。</td> 
    </tr> 	
</table>

border-collapse属性加上border-spacing属性就可以设置tr行间距

```html
<table style="border-collapse:separate; border-spacing:0px 10px;">
   <tr>
	<td>那片笑声躺我想起我的那些花儿</td>
   </tr>
   <tr>
	<td>在我生命每个角落静静为我开着</td>
   </tr>
</table>
```

演示：http://itmyhome.com/table-spacing

<br>