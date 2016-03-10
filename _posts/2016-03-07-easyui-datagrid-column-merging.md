---
layout: post
blog_id: "easyui-datagrid-column-merging"
title: "EasyUI DataGrid 相同连续列合并"
date: 2016-03-07 00:00:00 -0700
tags: EasyUI
category: EasyUI
summary: 
comments: false
---
<br>

```js
$.extend($.fn.datagrid.methods, {
    autoMergeCells: function(jq, fields) {
        return jq.each(function() {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
            j = 0,
            temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp,
            function(field, colunm) {
                $.each(colunm,
                function() {
                    var group = this;

                    if (group.length > 1) {
                        var before, after, megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index: megerIndex,
                                    field: field,
                                    rowspan: rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});
```

#### 使用方法

在datagrid的onLoadSuccess事件里面进行调用，可以实现数据加载完成后，自动合并。也可以手动调用该方法。

```js
$('#dg').datagrid({
    url: 'datagrid_data.json',
    onLoadSuccess: function(data) {
        //所有列进行合并操作
        //$(this).datagrid("autoMergeCells");
        //指定列进行合并操作
        $(this).datagrid("autoMergeCells", ['groupId', 'commId']);
    }
});
```

效果展示

![License Badge]({{ site.baseurl}}/images/easyui/4.jpg)

#### 参考资料:

+ <a href="http://www.jeasyuicn.com/jquery-easyui-datagrid-the-same-continuous-column-with-extended.html">jQuery Easyui Datagrid相同连续列合并扩展</a>

<br>
