---
layout: post
blog_id: "easyui-combobox-multiple"
title: "EasyUI combobox 多选及回显赋值"
date: 2016-05-29 00:00:00 -0700
tags: EasyUI
category: EasyUI
summary: multiple boolean 决定是否支持多项选择
comments: false
---
<br>

multiple boolean 决定是否支持多项选择.

```js
$('#cc').combobox({  
    url:'combobox_data.json', 
    multiple:true, //支持多选
    valueField:'id',  
    textField:'text'  
});
```

##### 单选赋值：setValue

```js
$('#cc').combobox('setValues', '001');
```

##### 多选赋值：setValues

```js
var group = "001,002,003"
$('#cc').combobox('setValues',group.split(","));
```

<br>




















