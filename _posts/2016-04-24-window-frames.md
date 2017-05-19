---
layout: post
blog_id: "window-frames"
title: "window.frames在不同浏览器中的用法"
date: 2016-04-24 00:00:00 -0700
tags: 其他
category: 其他
summary: document.frames等同于window.frames，用来取得当前页面内window对象的集合。
comments: false
---

document.frames 等同于 window.frames，用来取得当前页面内 window 对象的集合。

<span style="color:red">不支持Firefox</span>，其他浏览器(chrome、opera、IE、360)均支持。

**frames**为<iframe name="">的name属性值

#### 解决方法

使用window.frames[‘framename‘] 代替 document.framename。

注意：window.frames['framename']不可写成window.frames('framename')
