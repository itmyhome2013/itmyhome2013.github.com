---
layout: post
blog_id: markdown-quick-start"
title: "Markdown快速入门"
date: 2015-01-27 00:00:00 -0700
tags: markdown
category: markdown
summary: Markdown语法虽然很多，但真正用到的其实并不多，以下语法基本可以涵盖我们平常所使用到的
comments: false
---
</br>
Markdown语法虽然很多，但真正用到的其实并不多，以下语法基本可以涵盖我们平常所使用到的

</br>
###**段落、标题、区块代码**

一个段落是由一个以上的连接的行句组成，而一个以上的空行则会划分出不同的段落

Markdown支持两种标题的语法，Setext和atx形式。Setext形式是用底线的形式，

利用 `=` (最高阶标题)和 `-` (第二阶标题)，Atx形式在行首插入1到 6个`#` ，对应到标题1到6阶。

区块引用则使用email形式的 `>` 角括号。

Markdown 语法:

```diff
第一级标题
=================
第二级标题
-----------------

### Header 3
#### Header 4

> 区块
> 
> 区块第二段
```

效果：

![License Badge]({{ site.baseurl}}/images/markdown/1.png)

</br>
###**修辞和强调**

Markdown使用星号和底线来标记需要强调的区段。

Markdown语法:

```diff
这句话是 *强调*.
这句话 _也是强调_.
使用两个星号为 **高度强调**.
或者使用这个方式, __两个下划线__.
```

效果：

![License Badge]({{ site.baseurl}}/images/markdown/2.png)

</br>
###**列表**

无序列表使用星号、加号和减号来做为列表的项目标记，这些符号是都可以使用的

使用星号：

```diff
* 北京.
* 深圳.
* 郑州.
```

加号：

```diff
+ 北京.
+ 深圳.
+ 郑州.
```

减号：

```diff
- 北京.
- 深圳.
- 郑州.
```

有序的列表则是使用一般的数字接着一个英文句点作为项目标记：

```diff
1. Red
2. Green
3. Blue
```

`注意：星号、加号、减号后面要有一个空格`

</br>
###**链接**

Markdown支持两种形式的链接语法：`行内`和`参考`两种形式，两种都是使用`角括号`来把文字转成链接。

行内形式是直接在后面用括号直接接上链接：

```diff
这是一个[链接](http://example.com/)
```

你也可以选择性的加上title属性：

```diff
这是一个[链接](http://example.com/ "我是title")
```

参考形式的链接让你可以为链接定一个名称，之后你可以在文件的其他地方定义该链接的内容：

```diff
我是一个参考式链接有以下几种形式 [方式一][1] or [方式二][2] or [方式三][3].
[1]: http://google.com/ 
[2]: http://baidu.com/ 
[3]: http://itmyhome.com "这是我的博客"
```

![License Badge]({{ site.baseurl}}/images/markdown/3.png)

</br>
###**图片**

图片的语法和链接很像。

行内形式(title是选择性的)

```diff
![alt text](/img.jpg "Title")
```

参考形式：

```diff
![alt text][id]
[id]: /img.jpg "Title"
```

上面两种方法都会输出 HTML 为：

```diff
<img src="/img.jpg" alt="alt text" title="Title" />
```

</br>
###**代码**

在一般的段落文字中，你可以使用反引号`来标记代码区段，区段内的 &、< 和 > 都会被自动的转换成 HTML 实体，

这项特性让你可以很容易的在代码区段内插入HTML：

Markdown语法:

```diff
这是一段代码 `hello world` 标记.
区段内的 &、< 和 > 会被解析成HTML `&mdash;`、 `&#8212;`、`<hello>`
```

效果：

![License Badge]({{ site.baseurl}}/images/markdown/4.png)
