---
layout: post
blog_id: "ie-placeholder"
title: "让IE支持placeholder属性"
date: 2015-12-29 00:00:00 -0700
tags: 其他
category: 其他
summary: placeholder 属性提供可描述输入字段预期值的提示信息 该提示会在输入字段为空时显示，并会在字段获得焦点时消失
comments: false
---
<br>
placeholder 属性提供可描述输入字段预期值的提示信息

该提示会在输入字段为空时显示，并会在字段获得焦点时消失。

但placeholder不支持IE10以下版本

在页面中只需引入placeholder.js即可

```js
/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @website itmyhome.com
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
        	
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
           
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lienHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});
```

使用方法：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head> 
    <title>IE支持placeholder</title> 
    <script type="text/javascript" src="jquery.min.js"></script> 
    <script type="text/javascript" src="placeholder.js"></script> 
 </head> 
   <body> 
    <table> 
       <tbody>
          <tr> 
             <td> <input type="text" name="username" placeholder="Username" /> </td> 
          </tr> 
          <tr> 
             <td> <input type="password" name="password" placeholder="Password" /> </td> 
          </tr> 
       </tbody>
    </table>  
   </body>
</html>
```

如果要修改placeholder内的文字样式 可在placeholder.js里`<span></span>`中添加style属性，如：

```html
<span style="font-size: 13px;padding-top: 8px;"></span>
```

这样在IE中就会显示正常

<table class="table table-bordered table-condensed"> 
	  <tr> 
		 <td> <img src="{{ site.baseurl}}/images/ie/placeholder/1.png" /> </td> 
		 <td> <img src="{{ site.baseurl}}/images/ie/placeholder/2.png" /> </td> 
	  </tr> 
</table>  

因为本例中的input文本框使用了bootstrap 所以行高会高一点，如果是普通的input 则无需添加style属性

演示：<a href="http://itmyhome.com/ie-placeholder">http://itmyhome.com/ie-placeholder</a>

<br>