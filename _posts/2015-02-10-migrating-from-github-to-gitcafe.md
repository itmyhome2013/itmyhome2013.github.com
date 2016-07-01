---
layout: post
blog_id: "migrating-from-github-to-gitcafe"
title: "由Github迁移到GitCafe"
date: 2015-02-10 00:00:00 -0700
tags: GitCafe
category: Github
summary: 一直困扰github的访问速度,最近提交一些代码,半天传不上去 最后无法连接,github也打不开。准备把其中一个博客迁移到gitcafe先用着，体验一下。
comments: false
---
<br>

一直困扰github的访问速度,最近提交一些代码,半天传不上去 最后无法连接,github也打不开。我也是怒了...

准备把其中一个博客迁移到gitcafe先用着，[体验一下](http://diary.itmyhome.com/)。

#### 1、注册gitcafe账号并创建项目。项目名和用户名一致

![License Badge]({{ site.baseurl}}/images/gitcafe/1.png)

#### 2、设置SSH。和Github一样，不明白的请参考[GitHub创建SSH Keys](http://blog.itmyhome.com/2015/01/github-create-SSH-Keys)

![License Badge]({{ site.baseurl}}/images/gitcafe/2.png)

#### 3、修改_config.yml

```bash
deploy:
  type: github
  repository: git@gitcafe.com:itmyhome/itmyhome.git
  branch: gitcafe-pages
```

以上itmyhome改为你的用户名

#### 4、上传到gitcafe

```bash
hexo clean
hexo generate
hexo deploy
```

成功之后就可以通过`http://yourusername.gitcafe.com/`进行访问了。

#### 5、绑定域名

在gitcafe自定义域名中输入你想设置的域名

然后域名管理界面添加一个CNAME记录 IP为 207.226.141.135

![License Badge]({{ site.baseurl}}/images/gitcafe/3.png)

参考：[点击这里](https://gitcafe.com/GitCafe/Help/wiki/Pages-%E7%9B%B8%E5%85%B3%E5%B8%AE%E5%8A%A9)

总感觉gitcafe用户界面用着不舒服，可能github用的习惯了。


