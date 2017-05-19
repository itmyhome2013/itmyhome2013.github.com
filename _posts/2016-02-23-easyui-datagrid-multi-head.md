---
layout: post
blog_id: "easyui-datagrid-multi-head"
title: "EasyUI DataGrid 多级表头设置"
date: 2016-02-23 00:00:00 -0700
tags: EasyUI
category: EasyUI
summary: 使用EasyUI做一个报表统计，需要合并表头为多级表头
comments: false
---

使用EasyUI做一个报表统计，需要合并表头为多级表头，核心代码如下: 

```js
$('#dg').datagrid({  
    url:'datagrid_data.action',  
    fit : true,
    fitColumns : false,
    columns:
         [
             [
                {"title":"网格员考核测评表","colspan":9}
             ],
             [
                {"field":"ORGNAME","title":"网格","rowspan":3,width:"80"},
                {"field":"USERZH","title":"网格员","rowspan":3,width:"80"},
                {"title":"工作纪律","rowspan":2},
                {"title":"民主互评","rowspan":2},
                {"title":"志愿者","rowspan":2},
                {"title":"加分项","colspan":2},
                {"title":"总分","rowspan":2},
                {"title":"平均分","rowspan":2}
             ],
             [
                {"title":"信息上报","rowspan":1},
                {"title":"简报采纳","rowspan":1}
             ],
             [
                {"field":"YW1","title":"5分","rowspan":1},
                {"field":"YW2","title":"5分","rowspan":1},
                {"field":"YW3","title":"6分","rowspan":1},
                {"field":"YW4","title":"8分","rowspan":1},
                {"field":"YW5","title":"5分","rowspan":1},
                {"field":"TOTAL","title":"","rowspan":1},
                {"field":"AVG","title":"","rowspan":1}
             ]
         ]
}); 
```

效果如图：

![License Badge]({{ site.baseurl}}/images/easyui/1.png)

从以上代码和图中可以看出表头共有4行9列, 画单元格就和HTML中一样，主要利用 **rowspan**、**colspan** 属性
在将要显示内容的列上添加 **field** 属性

<br>