---
layout: post
blog_id: "add-rss-feed-subscriptions-for-jekyll-blog"
title: "为Jekyll博客添加RSS feed订阅功能"
date: 2015-01-31 00:00:00 -0700
tags: jekyll
category: jekyll
summary: 我们都知道,很多人经常会在博客里面分享很多有价值的东西。我们通过别人的博客,获取知识,找到问题的解决办法,寻求真理。但是,如果别人的博客有了更新的时候,我们如何第一时间获取到更新的消息呢？
comments: false
---
</br>
我们都知道,很多人经常会在博客里面分享很多有价值的东西。我们通过别人的博客,获取知识,找到问题的解决办法,

寻求真理。但是,如果别人的博客有了更新的时候,我们如何第一时间获取到更新的消息呢？

RSS订阅是站点用来和其他站点之间共享内容的一种简易方式,即Really Simple Syndication(简易信息聚合)。

</br>
###1、在_config.yml文件 添加(如果没有)下列属性：

```diff
name:         blog Name  
description:  A description for your blog  
url:          http://your-blog-url.com  
```

{% raw %}这些值{{ site.name }}，{{ site.description }}，{{ site.url }}会在你的feed文件里用到。{% endraw %}

</br>
###2、在网站根目录下添加 feed.xml

我的feed.xml,代码如下：

```xml
{% raw %}
---  
layout: none  
---  
  
<?xml version="1.0" encoding="UTF-8"?>  
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">  
    <channel>  
        <title>{{ site.name }}</title>  
        <description>{{ site.description }}</description>  
        <link>{{ site.baseurl}}{{ site.url }}</link>  
        <atom:link href="{{ site.baseurl}}{{ site.url }}/feed.xml" rel="self" type="application/rss+xml" />  
        {% for post in site.posts limit:10 %}  
            <item>  
               <title>{{ post.title }}</title>  
               <description>{{ post.content | xml_escape }}</description>  
               <pubDate>{{ post.date | date: "%a, %d %b %Y %H:%M:%S %z" }}</pubDate>  
               <link>{{ site.url }}{{ site.baseurl}}{{ post.url }}</link>  
               <guid isPermaLink="true">{{ site.url }}{{ site.baseurl}}{{ post.url }}</guid>  
               </item>  
        {% endfor %}  
    </channel>  
</rss> 
{% endraw %}
```

</br>
###3、发布

在你网站的合适地方添加如下代码：

```diff
<a href="{% raw %}{{ site.url }}{% endraw %}/feed.xml">RSS订阅</a>  
```