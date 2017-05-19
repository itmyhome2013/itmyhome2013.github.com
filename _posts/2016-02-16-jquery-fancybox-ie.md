---
layout: post
blog_id: "jquery-fancybox-ie"
title: "jQuery fancybox ie 无法显示关闭按钮"
date: 2016-02-16 00:00:00 -0700
tags: fancybox
category: fancybox
summary: IE无法显示关闭按钮,打开jquery.fancybox-1.3.4.css 注释一行代码
comments: false
---

如果版本是: 1.3.1  **IE无法显示关闭按钮**
如果版本是: 1.3.4  **IE6无法显示关闭按钮**

#### 解决办法:

##### Version: 1.3.1

打开fancybox.css 注释掉此行：

```css
.fancybox-ie #fancybox-close {
	background: transparent;
	filter: progid : DXImageTransform.Microsoft.AlphaImageLoader ( src =
		'images/fancy_close.png', sizingMethod = 'scale' );
}
```

##### Version: 1.3.4

打开jquery.fancybox-1.3.4.css 注释掉此行：

```css
.fancybox-ie6 #fancybox-close {
	background: transparent;
	filter: progid : DXImageTransform.Microsoft.AlphaImageLoader ( src =
		'fancybox/fancy_close.png', sizingMethod = 'scale' );
}
```

<br>