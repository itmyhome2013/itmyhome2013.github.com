---
layout: post
blog_id: "say-to-realize-interface-optimization"
title: "多说实现界面优化"
date: 2015-01-27 00:00:00 -0700
tags: duoshuo
category: duoshuo
summary: 之前就感觉这个默认的界面有点丑(当然是我自认为)，但又指不出来是哪里。本来的初衷只是想改一下评论框里的提示文字，Google百度了很多资料 楞是没找到。
comments: false
---
</br>

之前就感觉这个默认的界面有点丑(当然是我自认为)，但又指不出来是哪里。

本来的初衷只是想改一下评论框里的提示文字，Google百度了很多资料 楞是没找到。

最后发现在多说的后台管理里是可以自定义的 ⊙﹏⊙b汗

![License Badge]({{ site.baseurl}}/images/duoshuo/1.png)

查资料的过程中，发现了别人的一些样式风格，于是借鉴一下，就这样顺便也把我这个给改了...

</br>
###**完善了以下内容**

</br>
####修改评论框背景色

```css
#ds-thread #ds-reset .ds-textarea-wrapper {
	background: #ffffff;
}
```

</br>
####修改评论框文字格式

```css
#ds-thread #ds-reset .ds-textarea-wrapper textarea,#ds-thread #ds-reset .ds-textarea-wrapper .ds-hidden-text{
	display: block;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	line-height: 20px;
	border: none;
}
```

</br>
####自定义头像css效果

```css
#ds-reset .ds-avatar img,#ds-reset .ds-avatar img:hover{   
    -webkit-animation-fill-mode: both;   
    -moz-animation-fill-mode: both;   
    -ms-animation-fill-mode: both;   
    -o-animation-fill-mode: both;   
    animation-fill-mode: both;   
    -webkit-animation-duration: 0s;   
    -moz-animation-duration: 0s;   
    -ms-animation-duration: 0s;   
    -o-animation-duration: 0s;   
    animation-duration: 0s;   
    -webkit-animation-duration: 0.7s;   
    -moz-animation-duration: 0.7s;   
    -ms-animation-duration: 0.7s;   
    -o-animation-duration: 0.7s;   
    animation-duration: 0.7s;   
}   
  
@-webkit-keyframes swing {   
    20%, 40%, 60%, 80%, 100% { -webkit-transform-origin: top center; }   
    20% { -webkit-transform: rotate(15deg); }      
    40% { -webkit-transform: rotate(-10deg); }   
    60% { -webkit-transform: rotate(5deg); }       
    80% { -webkit-transform: rotate(-5deg); }      
    100% { -webkit-transform: rotate(0deg); }   
}   
  
@-moz-keyframes swing {   
    20% { -moz-transform: rotate(15deg); }     
    40% { -moz-transform: rotate(-10deg); }   
    60% { -moz-transform: rotate(5deg); }      
    80% { -moz-transform: rotate(-5deg); }     
    100% { -moz-transform: rotate(0deg); }   
}   
  
@-o-keyframes swing {   
    20% { -o-transform: rotate(15deg); }       
    40% { -o-transform: rotate(-10deg); }   
    60% { -o-transform: rotate(5deg); }    
    80% { -o-transform: rotate(-5deg); }       
    100% { -o-transform: rotate(0deg); }   
}   
  
@keyframes swing {   
    20% { transform: rotate(15deg); }      
    40% { transform: rotate(-10deg); }   
    60% { transform: rotate(5deg); }       
    80% { transform: rotate(-5deg); }      
    100% { transform: rotate(0deg); }   
}   
  
#ds-reset .ds-avatar img:hover{   
    -webkit-transform-origin: top center;   
    -moz-transform-origin: top center;   
    -o-transform-origin: top center;   
    transform-origin: top center;   
    -webkit-animation-name: swing;   
    -moz-animation-name: swing;   
    -o-animation-name: swing;   
    animation-name: swing;   
} 
```

</br>
####修改发布按钮

```css
#ds-thread #ds-reset .ds-post-button {
	font-weight: normal;
	font-size: 12px;
	text-shadow: none;
	border: 0;
	line-height: 23px;
	width: 100px;
	background: #00a3cf;
	color: #fff;
}
```

</br>
来窥视一下修改之前和之后的对比

![License Badge]({{ site.baseurl}}/images/duoshuo/modifyago.png)

![License Badge]({{ site.baseurl}}/images/duoshuo/modifyafter.png)

</br>
多少还算是有一点改观的(对于有洁癖的本博主 必须要有所改观o(╯□╰)o)

参考资料：[多说自定义CSS 让你的多说评论动感起来](http://www.vsay.cn/one-more-custom-css-lets-you-say-comments-city.html)
