---
layout: post
blog_id: "cell-editing-in-datagrid"
title: "EasyUI DataGrid 编辑单元格"
date: 2016-02-26 00:00:00 -0700
tags: EasyUI
category: EasyUI
summary: 
comments: false
---
<br>

之前文章 <a href="http://blog.csdn.net/itmyhome1990/article/details/46971341" target="_blank">EasyUI DataGrid可编辑单元格 </a>实现可编辑单元格，如果有多列都需要可编辑 当点击一个单元格 则此整行都会进行编辑

如下图： 

![License Badge]({{ site.baseurl}}/images/easyui/2.jpg)

现改为单击某个单元格只对此单元格进行可编辑

#### <TABLE>标记添加 onClickCell

```html
<table id="dg" class="easyui-datagrid" data-options="onClickCell: onClickCell">
```

#### 需要进行编辑的列上添加 editor

```html
<th data-options="field:'itemId',editor:'numberbox'"></th>
```

也可以指定

+ 小数位数：editor:{type:'numberbox',options:{precision:1}}

+ 文本类型：editor:'text'

+ checkbox：editor:{type:'checkbox',options:{on:'启动',off:'关闭'}}

效果如下：

![License Badge]({{ site.baseurl}}/images/easyui/3.jpg)

#### 核心代码

```js
<script type="text/javascript">
		
$.extend($.fn.datagrid.methods, {
	editCell : function(jq, param) {
		return jq.each(function() {
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields', true).concat(
					$(this).datagrid('getColumnFields'));
			for ( var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field) {
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for ( var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

var editIndex = undefined;
//结束编辑 
function endEditing() {
	if (editIndex == undefined) {
		return true
	}
	if ($('#dg').datagrid('validateRow', editIndex)) {
		$('#dg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
//单击单元格 
function onClickCell(index, field) {
	if (endEditing()) {
		$('#dg').datagrid('selectRow', index).datagrid('editCell', {
			index : index,
			field : field
		});
		editIndex = index;
	}
}
</script>
```

<br>
