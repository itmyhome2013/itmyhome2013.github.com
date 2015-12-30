---
layout: post
blog_id: "upgrading-to-jekyll-3"
title: "升级Jekyll 3.0"
date: 2015-12-30 00:00:00 -0700
tags: jekyll
category: jekyll
summary: 每一次的升级都得重新折腾一次，jekyll也不例外
comments: false
---
<br>
每一次的升级都得重新折腾一次，jekyll也不例外

从jekyll 2.5.2 升级为jekyll 3.0.1

#### 错误一: 

```bash
jekyll 3.0.1 | Error:  Permission denied - bind(2) for 127.0.0.1:4000
```

端口被占有，打开_config.yml 在最后加上一行 port: 5001 (其他也可)问题解决

#### 错误二:

```bash
  Dependency Error: Yikes! It looks like you don't have redcarpet or one of its
dependencies installed. In order to use Jekyll as currently configured, you'll n
eed to install this gem. The full error message from Ruby is: 'cannot load such
file -- redcarpet' If you run into trouble, you can find helpful resources at ht
tp://jekyllrb.com/help/!
  Conversion error: Jekyll::Converters::Markdown encountered an error while conv
erting '_posts/2014-12-28-first-blog.md':
                    redcarpet
             ERROR: YOUR SITE COULD NOT BE BUILT:
                    ------------------------------------
                    redcarpet
```

_config.yml中的<font color="red">markdown</font>改为<font color="red">kramdown</font>

Jekyll 3 使用<font color="red">Rouge</font>而不是<font color="red">Pygments</font>

最后 删除highlighter,markdown 添加:

```bash
kramdown:
  input: GFM
  syntax_highlighter: rouge
```

ps:只在本地运行jekyll的时候会出现这些问题，在github上还一切正常。

在 _post 下添加一篇文章还要执行一下build命令 (⊙﹏⊙)b)

```bash
jekyll build
# => 当前文件夹中的内容将会生成到 ./site 文件夹中。
```

参考：<a href="http://kersulis.github.io/2015/10/31/jekyll-3/">http://kersulis.github.io/2015/10/31/jekyll-3/</a>

<br>