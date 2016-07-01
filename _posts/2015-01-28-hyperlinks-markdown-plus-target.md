---
layout: post
blog_id: "hyperlinks-markdown-plus-target"
title: "markdown的超链接加上target='_blank'"
date: 2015-01-28 00:00:00 -0700
tags: jekyll
category: markdown
summary: Markdown支持两种形式的链接语法：行内式和参考式两种形式。不管是哪一种，链接文字都是用 [方括号]来标记。
comments: false
---
<br>

Markdown支持两种形式的链接语法：**行内式**和**参考式**两种形式。

不管是哪一种，链接文字都是用 **[方括号]**来标记。

要建立一个行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，

如果你还想要加上链接的title文字，只要在网址后面，用双引号把title文字包起来即可，例如：

```diff
This is [an example](http://example.com/ "Title") inline link.  
```

会产生

```html
<p>This is <a href="http://example.com/" title="Title">an example</a> inline link.</p>  
```

<br>
参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：

```diff
This is [an example][id] reference-style link. 
```

接着，在文件的任意处，你可以把这个标记的链接内容定义出来：

```diff
{% raw %}`[id]`{% endraw %}: http://example.com/  "Optional Title Here"
```

<br>
而我们打开所生产的超链接，默认是在本窗口打开的，为了有更好的阅读体验，我们往往希望在新窗口

打开超链接，并不希望影响阅读本文。markdown目前应该还不支持这种语法的，

但可以用其他方式来解决 比如jQuery 在合适的地方加上如下代码：

```js
<script type="text/javascript">  
    $(document).ready(function() {  
        //为超链接加上target='_blank'属性  
        $('a[href^="http"]').each(function() {  
            $(this).attr('target', '_blank');  
        });  
    });  
</script> 
```