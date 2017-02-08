---
layout: post
blog_id: "jquery-verity-text-are-not-empty"
title: "jQuery验证文本框内容不为空"
date: 2017-02-06 00:00:00 -0700
tags: jQuery
category: jQuery
summary: 通过$.fn 扩展jQuery方法
comments: false
---
<br>

##### 通过$.fn 扩展jQuery方法

```js
/**
 * 校验文本是否为空
 * tips：提示信息
 * 使用方法：$("#id").validate("提示文本");
 * @itmyhome
 */
$.fn.validate = function(tips){
	if($(this).val() == "" || $.trim($(this).val()).length == 0){
    	alert(tips + "不能为空！");
    	throw SyntaxError(); //如果验证不通过，则不执行后面
    }
}
```

##### 使用

```html
<form action="">
      姓名: <input type="text" id="name" name="name" />
      年龄：<input type="text" id="age" name="age" />
      地址：<input type="text" id="address" name="address" />
      <input type="button" value="提交" onclick="submit();" />
</form>
```
```js
function submit(){
      //调用validate()
      $("#name").validate("姓名");
      $("#age").validate("年龄");
      $("#address").validate("地址");
}
```


