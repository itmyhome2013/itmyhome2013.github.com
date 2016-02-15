---
layout: post
blog_id: "jsoup-parsing-html-information"
title: "jsoup 解析HTML信息"
date: 2016-02-15 00:00:00 -0700
tags: jsoup
category: jsoup
summary: jsoup是一款Java的HTML解析器，可直接解析某个URL地址、HTML文本内容
comments: false
---
<br>

- <a href="#introduction">jsoup简介</a>
- <a href="#major">jsoup的主要功能如下</a>
- <a href="#document-input">文档输入</a>
- <a href="#extract">数据抽取</a>
  * <a href="#extract">使用DOM方法来遍历一个文档</a>
  * <a href="#selected">使用选择器语法来查找元素</a>
  * <a href="#text-html">从元素抽取属性,文本和HTML</a>
- <a href="#update">修改数据</a> <a name="introduction"></a>
- <a href="#clean">HTML文档清理</a>  

#### jsoup简介

<a name="major"></a>

jsoup是一款Java的HTML解析器，可直接解析某个URL地址、HTML文本内容。它提供了一套非常省力的API，

可通过DOM，CSS以及类似于jQuery的操作方法来取出和操作数据。

#### jsoup的主要功能如下

+ 1、从一个URL，文件或字符串中解析HTML

+ 2、使用DOM或CSS选择器来查找、取出数据

+ 3、可操作HTML元素、属性、文本

jsoup的主要类层次结构如图所示：

![License Badge]({{ site.baseurl}}/images/jsoup/1.png)

<a name="document-input"></a>

### 文档输入

jsoup可以从包括字符串、URL地址以及本地文件来加载HTML文档，并生成Document对象实例。

```java
// 直接从字符串中输入 HTML 文档
String html = "<html><head><title>learn jsoup</title></head>"
	+ "<body id='body'><p>Parse and traverse an HTML document.</p></body></html>";
Document doc = Jsoup.parse(html);

// 从URL直接加载 HTML 文档
Document doc = Jsoup.connect("http://itmyhome.com/").get();
String title = doc.title();

// 从文件中加载HTML文档
File input = new File("D:/index.html");
Document doc = Jsoup.parse(input, "UTF-8","http://itmyhome.com");
```

第三种方式parse方法也可以不指定第三个参数，因为HTML文档中会有很多例如链接、图片以及所引用的外部脚本、css文件等，

而第三个名为baseURL的参数的意思就是当HTML文档使用相对路径方式引用外部文件时，

jsoup会自动为这些URL加上一个前缀，也就是这个 baseURL。

<a name="extract"></a>

例如 `<a href=/project>itmyhome</a>` 会被转换成 `<a href=http://itmyhome.com/project>itmyhome</a>`。

### 数据抽取

#### 使用DOM方法来遍历一个文档

```java
String html = "<html><head><title>learn jsoup</title></head>"
		+ "<body id='content'><a href='itmyhome.com'>hello</a>"
		+ "<a href='blog.itmyhome.com'>jsoup</a></body></html>";

Document doc = Jsoup.parse(html);
Element content = doc.getElementById("content");
Elements links = content.getElementsByTag("a");
for (Element link : links) {
	String linkHref = link.attr("href");
	String linkText = link.text();

	System.out.println(linkHref + ", " + linkText);
}
```

打印

```bash
itmyhome.com, hello
blog.itmyhome.com, jsoup
```

**说明**

Elements这个对象提供了一系列类似于DOM的方法来查找元素，抽取并处理其中的数据。具体如下：

**查找元素**

+ getElementById(String id)

+ getElementsByTag(String tag)

+ getElementsByClass(String className)

+ getElementsByAttribute(String key) (and related methods)

+ Element siblings: siblingElements(), firstElementSibling(), lastElementSibling(); nextElementSibling(), previousElementSibling()

+ Graph: parent(), children(), child(int index)

**元素数据**

+ attr(String key)获取属性 attr(String key, String value)设置属性

+ attributes()获取所有属性

+ id(), className() and classNames()

+ text()获取文本内容text(String value) 设置文本内容

+ html()获取元素内HTMLhtml(String value)设置元素内的HTML内容

+ outerHtml()获取元素外HTML内容

+ data()获取数据内容（例如：script和style标签)

+ tag() and tagName()

**操作HTML和文本**

+ append(String html), prepend(String html)

+ appendText(String text), prependText(String text)

<a name="selected"></a>

+ appendElement(String tagName), prependElement(String tagName)

+ html(String value)

#### 使用选择器语法来查找元素

```java
Document doc = Jsoup.connect("http://itmyhome.com/").get();
Elements links = doc.select("a[href]"); // 带有href属性的a元素
Elements pngs = doc.select("img[src$=.png]");// 扩展名为.png的图片
Element icons = doc.select("span.icon").first();// class等于icon的span标签
Elements resultLinks = doc.select("#header p"); // id为header元素之后的p元素
```

从以上可以看出jsoup使用跟jQuery一模一样的选择器对元素进行检索，jsoup的选择器还支持表达式功能

下表是jsoup选择器的所有语法详细列表。

**表1. 基本用法：**

<table class="table table-bordered table-striped table-condensed"> 
    <tr>
		<td>
			tagname
		</td>
		<td>
			使用标签名来定位，例如 a
		</td>
	</tr>
	<tr>
		<td>
			ns|tag
		</td>
		<td>
			使用命名空间的标签定位，例如 fb:name 来查找 &lt;fb:name&gt; 元素
		</td>
	</tr>
	<tr>
		<td>
			#id
		</td>
		<td>
			使用元素 id 定位，例如 #logo
		</td>
	</tr>
	<tr>
		<td>
			.class
		</td>
		<td>
			使用元素的 class 属性定位，例如 .head
		</td>
	</tr>
	<tr>
		<td>
			[attribute]
		</td>
		<td>
			使用元素的属性进行定位，例如 [href] 表示检索具有 href 属性的所有元素
		</td>
	</tr>
	<tr>
		<td>
			[^attr]
		</td>
		<td>
			使用元素的属性名前缀进行定位，例如 [^data-] 用来查找 HTML5 的 dataset 属性
		</td>
	</tr>
	<tr>
		<td>
			[attr=value]
		</td>
		<td>
			使用属性值进行定位，例如 [width=500] 定位所有 width 属性值为 500 的元素
		</td>
	</tr>
	<tr>
		<td>
			[attr^=value], [attr$=value], [attr*=value]
		</td>
		<td>
			这三个语法分别代表，属性以 value 开头、结尾以及包含
		</td>
	</tr>
	<tr>
		<td>
			[attr~=regex]
		</td>
		<td>
			使用正则表达式进行属性值的过滤，例如 img[src~=(?i)\.(png|jpe?g)]
		</td>
	</tr>
	<tr>
		<td>
			*
		</td>
		<td>
			定位所有元素
		</td>
	</tr>
</table>

以上是最基本的选择器语法，这些语法也可以组合起来使用，下面是 jsoup 支持的组合用法：

**表2：组合用法：**

<table class="table table-bordered table-striped table-condensed"> 
	<tr>
		<td>
			el#id
		</td>
		<td>
			定位 id 值某个元素，例如 a#logo -&gt; &lt;a id=logo href= … &gt;
		</td>
	</tr>
	<tr>
		<td>
			el.class
		</td>
		<td>
			定位 class 为指定值的元素，例如 div.head -&gt; &lt;div
			class=head&gt;xxxx&lt;/div&gt;
		</td>
	</tr>
	<tr>
		<td>
			el[attr]
		</td>
		<td>
			定位所有定义了某属性的元素，例如 a[href]
		</td>
	</tr>
	<tr>
		<td>
			以上三个任意组合
		</td>
		<td>
			例如 a[href]#logo 、a[name].outerlink
		</td>
	</tr>
	<tr>
		<td>
			ancestor child
		</td>
		<td>
			这五种都是元素之间组合关系的选择器语法，其中包括父子关系、合并关系和层次关系。
		</td>
	</tr>
	<tr>
		<td>
			parent &gt; child
		</td>
	</tr>
	<tr>
		<td>
			siblingA + siblingB
		</td>
	</tr>
	<tr>
		<td>
			siblingA ~ siblingX
		</td>
	</tr>
	<tr>
		<td>
			el, el, el
		</td>
	</tr>
</table>

除了一些基本的语法以及进行组合外，jsoup还支持使用表达式进行元素过滤选择。下面是jsoup支持的所有表达式一览表：

**表3：表达式：**

<table class="table table-bordered table-striped table-condensed"> 
	<tr>
		<td>
			:lt(n)
		</td>
		<td>
			例如 td:lt(3) 表示 小于三列
		</td>
	</tr>
	<tr>
		<td>
			:gt(n)
		</td>
		<td>
			div p:gt(2) 表示 div 中包含 2 个以上的 p
		</td>
	</tr>
	<tr>
		<td>
			:eq(n)
		</td>
		<td>
			form input:eq(1) 表示只包含一个 input 的表单
		</td>
	</tr>
	<tr>
		<td>
			:has(seletor)
		</td>
		<td>
			div:has(p) 表示包含了 p 元素的 div
		</td>
	</tr>
	<tr>
		<td>
			:not(selector)
		</td>
		<td>
			div:not(.logo) 表示不包含 class=logo 元素的所有 div 列表
		</td>
	</tr>
	<tr>
		<td>
			:contains(text)
		</td>
		<td>
			包含某文本的元素，不区分大小写，例如 p:contains(oschina)
		</td>
	</tr>
	<tr>
		<td>
			:containsOwn(text)
		</td>
		<td>
			文本信息完全等于指定条件的过滤
		</td>
	</tr>
	<tr>
		<td>
			:matches(regex)
		</td>
		<td>
			使用正则表达式进行文本过滤：div:matches((?i)login) <a name="text-html"></a>
		</td>
	</tr>
	<tr>
		<td>
			:matchesOwn(regex)
		</td>
		<td>
			使用正则表达式找到自身的文本
		</td>
	</tr>
</table>

#### 从元素抽取属性，文本和HTML

+ 要取得一个属性的值，可以使用Node.attr(String key) 方法

+ 对于一个元素中的文本，可以使用Element.text()方法

+ 对于要取得元素或属性中的HTML内容,可以使用Element.html(),或Node.outerHtml()方法

示例:

```java
String html = "<p>my <a href='http://itmyhome.com/'><b>blog</b></a> link.</p>";
Document doc = Jsoup.parse(html);// 解析HTML字符串返回一个Document实现
Element link = doc.select("a").first();// 查找第一个a元素

String text = doc.body().text(); // "my blog link" 取得字符串中的文本
String linkHref = link.attr("href"); // "http://itmyhome.com/" 取得链接地址
String linkText = link.text(); // "blog" 取得链接地址中的文本

String linkOuterH = link.outerHtml();// "<a href="http://itmyhome.com/"><b>blog</b></a>"
String linkInnerH = link.html(); // "<b>blog</b>" 取得链接内的html内容

System.out.println(text);System.out.println(linkHref);
System.out.println(linkText);System.out.println(linkOuterH);
System.out.println(linkInnerH);
```

打印：

```bash
my blog link.
http://itmyhome.com/
blog
<a href="http://itmyhome.com/"><b>blog</b></a>
<b>blog</b>
```

**说明**

上述方法是元素数据访问的核心办法。此外还其它一些方法可以使用：

+ Element.id()

+ Element.tagName() <a name="update"></a>

+ Element.className() and Element.hasClass(String className)

#### 修改数据


在解析文档的同时，我们可能会需要对文档中的某些元素进行修改，例如我们可以为文档中的所有图片增加可点击链接、修改链接地址或者是修改文本等。

下面是一些简单的例子：

```java
doc.select("div.comments a").attr("rel", "nofollow"); // 为所有链接增加 rel=nofollow 属性
doc.select("div.comments a").addClass("mylinkclass"); // 为所有链接增加 class=mylinkclass 属性
doc.select("img").removeAttr("onclick"); // 删除所有图片的 onclick 属性
doc.select("input[type=text]").val(""); // 清空所有文本输入框中的文本
```

<a name="clean"></a>

道理很简单，你只需要利用jsoup的选择器找出元素，然后就可以通过以上的方法来进行修改，

修改完直接调用 Element(s)的 html()方法就可以获取修改完的HTML文档。

#### HTML文档清理

在做网站的时候，经常会提供用户评论的功能。有些不坏好意的用户，会搞一些脚本到评论内容中，

而这些脚本可能会破坏整个页面的行为，更严重的是获取一些机要信息，例如XSS跨站点攻击之类的。

使用jsoup HTML Cleaner 方法进行清除，看看下面这段代码：

```java
String unsafe = "<p><a href='http://itmyhome.com/' onclick='stealCookies()'>itmyhome</a></p>";
String safe = Jsoup.clean(unsafe, Whitelist.basic());
System.out.println(safe); //输出 : <p><a href="http://itmyhome.com/" rel="nofollow">itmyhome</a></p>
```

jsoup使用一个Whitelist类用来对HTML文档进行过滤，该类提供几个常用方法：

<table class="table table-bordered table-striped table-condensed">
	<tr>
		<td>
			none()
		</td>
		<td>
			只允许包含文本信息
		</td>
	</tr>
	<tr>
		<td>
			basic()
		</td>
		<td>
			允许的标签包括：a, b, blockquote, br, cite, code, dd, dl, dt, em, i, li, ol,
			p, pre, q, small, strike, strong, sub, sup, u, ul, 以及合适的属性
		</td>
	</tr>
	<tr>
		<td>
			simpleText()
		</td>
		<td>
			只允许 b, em, i, strong, u 这些标签
		</td>
	</tr>
	<tr>
		<td>
			basicWithImages()
		</td>
		<td>
			在 basic() 的基础上增加了图片
		</td>
	</tr>
	<tr>
		<td>
			relaxed()
		</td>
		<td>
			这个过滤器允许的标签最多，包括：a, b, blockquote, br, caption, cite, code, col,
			colgroup, dd, dl, dt, em, h1, h2, h3, h4, h5, h6, i, img, li, ol, p,
			pre, q, small, strike, strong, sub, sup, table, tbody, td, tfoot,
			th, thead, tr, u, ul
		</td>
	</tr>
</table>

<br>