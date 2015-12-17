---
layout: post
blog_id: "ie-browser-settings-document-mode"
title: "页面中设置IE浏览器的文档模式"
date: 2015-12-17 00:00:00 -0700
tags: 其他
category: 其他
summary: 由于历史的原因,各个浏览器在对页面的渲染上存在差异,甚至同一浏览器在不同版本中,对页面的渲染也不同
comments: false
---
</br>
项目在IE浏览器中打开默认是Quirks模式，导致兼容性不太好

![License Badge]({{ site.baseurl}}/images/ie/1.png)

当然可以手动修改为Internet Explorer8 以上模式，但我们不可能引导用户这样去做

</br>
可以在代码里通过**设置DTD**声明让浏览器决定用何种模式

将

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
```

改为

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

这样问题就解决了

</br>
**PS:**

在IE11以及360浏览器文档模式默认为IE7版本，可以通过设置**meta标签**改变为其他模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=9" />
```

扩展阅读：https://imququ.com/post/browser-mode-and-document-mode-in-ie.html

</br>