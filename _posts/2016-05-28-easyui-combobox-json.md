---
layout: post
blog_id: "easyui-combobox-json"
title: "EasyUI combobox 加载JSON数据"
date: 2016-05-28 00:00:00 -0700
tags: EasyUI
category: EasyUI
summary: Action返回JSON格式 包含total和rows，将rows下面的内容显示在combobox中
comments: false
---
<br>

Action返回 JSON 格式如下：

```bash
jsonResult = 
{
  total=7,rows=[
     {TEXT=技术支持, ID=402894ca4419acf1014419b148a10000}, 
     {TEXT=开发部, ID=402894ca4419acf1014419beb1bc0001}, 
     {TEXT=实施, ID=4028e439476b55be01477bbf0fab0000}, 
     {TEXT=技术支持, ID=4028e439476b55be01477bbfb80e0001},
     {TEXT=客户服务, ID=4028e439476b55be01477bc015a80002}]
}
```

json中包含**total**和**rows**，我们需要rows下面的内容来显示在combobox中，API规定必须用下面格式的json：

```bash
[{  
    "id":1,  
    "text":"text1"  
},{  
    "id":2,  
    "text":"text2"  
},{  
    "id":3,  
    "text":"text3",  
    "selected":true  
},{  
    "id":4,  
    "text":"text4"  
},{  
    "id":5,  
    "text":"text5"  
}]
```

官方给出了一个示例

```js
$('#cc').combobox({  
    url:'combobox_data.json',  
    valueField:'id',  
    textField:'text'  
}); 
```

一直不明白只需一个url 如何返回数据？百思不得姐

#### 以下是两种解决方法

##### **第一种：**

```js
var url = "admin/FrmQueryAllGroup.do";
$.getJSON(url,function(json) {
    $('#cc').combobox({
        data: json.jsonResult.rows,
        valueField: 'ID',
        textField: 'TEXT'
    });
});
```

##### **第二种：**

```js
$.ajax({
    type: "POST",
    url: 'admin/FrmQueryAllGroup.do',
    dataType: "json",
    success: function(json) {
        $('#cc').combobox({
            data: json.jsonResult.rows,
            valueField: 'ID',
            textField: 'TEXT'
        });
    }
});
```

`注：jsonResult 为Action中返回值，rows 为 jsonResult 中的属性`

struts.xml

```xml
<package name="FrmTaskUser_Ajax_code" extends="json-default">
	<action name="FrmQueryAllGroup" method="queryAllGroup"
		class="org.bkgd.autoform.web.action.ActionTaskuserFormQuery">
		<result type="json"></result>
	</action>
</package>
```

<br>




















