---
layout: post
blog_id: "recent-visitors-say-use-common-code"
title: "多说最近访客通用代码使用方法"
date: 2015-02-13 00:00:00 -0700
tags: duoshuo
category: duoshuo
summary: 对于通用代码,可以通过添加代码来调用【最近访客】,添加代码 然后修改您的多说二级域名
comments: false
---
<br>

添加[最近访客],请在页面中添加如下代码：

```html
<ul class="ds-recent-visitors"></ul>
<!--多说js加载开始，一个页面只需要加载一次 -->
<script type="text/javascript">
var duoshuoQuery = {short_name:"您的多说二级域名"};
(function() {
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = 'http://static.duoshuo.com/embed.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
})();
</script>
<!--多说js加载结束，一个页面只需要加载一次 -->
```

**注意修改您的多说二级域名：short_name**(在多说后台设置中找到,格式如 abcd.duoshuo.com ,只需填 abcd 即可)

#### 参数说明

data-num-items="10"    //显示访客的数量

data-avatar-size="30"  //头像大小,单位px

使用方法：如下：

```html
<ul class="ds-recent-visitors" data-num-items="10" data-avatar-size="30"></ul>
```

<br>