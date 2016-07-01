---
layout: post
blog_id: "octopress-build-blog"
title: "Octopress博客搭建"
date: 2015-02-09 00:00:00 -0700
tags: Octopress
category: Octopress
summary: Octopress是个非常好的Jekyll-blog解决方案,尤其是在Jekyll0.x时代,Octopress有不错的模版,丰富的扩展功能,缺点就是麻烦,需要在本地生成页面。
comments: false
---
<br>

环境：基于Windows

需要准备以下工作：

+ 安装Ruby

+ 安装DevKit

+ 安装Python

+ 安装Git - msysgit

以上软件如果是初次安装，可能还是有一些麻烦的，特别是版本的选择。

因为之前搭建过jekyll，也要求安装以上软件，在此就不介绍了，可参考[Windows上安装Jekyll](http://blog.itmyhome.com/2015/01/jekyll-installed-on-windows)

#### **安装Octopress**

#### 一：clone Octopress

进入任意盘(比如D盘),打开Git Bash 将Octopress代码clone到本地

```bash
git clone git://github.com/imathis/octopress.git octopress
```

#### 二：安装依赖项

在刚才的Git Bash中进入到octopress目录，输入下面命令进行依赖项的安装

```bash
cd octopress
gem install bundler
bundle install
```

这个可能需要一段时间

**注：如果执行gem install bundler过程中出现下列错误 则需先执行第三步然后再跳回第二步**

```bash
ERROR:  Could not find a valid gem 'bundler' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - SSL_connect retur
ned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (
https://rubygems.org/latest_specs.4.8.gz)
```

```bash
Successfully installed bundler-1.7.12
Parsing documentation for bundler-1.7.12
WARNING:  Unable to pull data from 'https://rubygems.org/': SSL_connect returned
=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (htt
ps://rubygems.org/latest_specs.4.8.gz)
1 gem installed
```

#### 三、更换gem的更新源

安装Octopress的依赖项，安装依赖项需要用到Ruby的gem，

使用下面的命令可以更换gem的更新源，使用国内的淘宝镜像(你懂的)。

```bash
gem sources -a http://ruby.taobao.org/
gem sources -r http://rubygems.org/
gem sources -l
```

修改Octopress目录下的Gemfile文件，将第一行的`http://rubygems.org/` 修改为`http://ruby.taobao.org/`

#### 四、安装默认Octopress主题

```bash
rake install
```

#### 五、本地预览

到此所有的安装工作已经结束，输入下面的命令可以在本地进行预览。

```bash
rake preview
```

`http://localhost:4000/`进行预览

#### 六、发布文章

使用下面命令可以在Octopress中添加文章

```bash
rake new_post['my blog']
```

然后就会在octopress/source/_posts目录下生成一个后缀为.markdown的文件，打开进行编辑。

也可直接在_posts目录下新建文章

**注：如出现编码错误请注意编码格式**

#### 七、发布到Github

首先有个Github账号，新建一个名为username.github.com的repository

比如我创建的为itgreen.github.com

进入Octopress所在的目录下，Git Bash中输入命令：

```bash
rake setup_github_pages
```

提示输入Repo地址，输入`https://github.com/itgreen/itgreen.github.com.git`

或`git@github.com:itgreen/itgreen.github.com.git` 都可

接着输入：

```bash
rake generate
rake deploy
```

最后把所有源文件发布到source分支下面：

```bash
git add .
git commit -m "add source"
git push origin source
```

OK,完成

#### 总结：

这次对Octopress的体验不是很好。

+ 一、目录结构相对比较复杂(相比jekyll)

+ 二、安装步骤和shell命令比较繁琐(相对而言)

+ 二、Octopress默认主题实在是有点丑(个人认为)

+ 三、博客访问速度太慢(可能是我没进行优化)

+ 四、最重要的可能是我心已有所属

最后附上成果：<a href="http://itgreen.github.io/">http://itgreen.github.io/</a>

