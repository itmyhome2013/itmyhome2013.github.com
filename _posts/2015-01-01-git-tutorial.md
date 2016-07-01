---
layout: post
blog_id: "git-tutoria"
title: "Git入门教程"
date: 2015-01-01 00:00:00 -0700
tags: Git
category: Git
summary: 1、首先注册一个账号。2、注册成功以后，新建一个repository(仓库)。<br>3、下载安装客户端msysgit。4、创建版本库。5、把文件添加到版本库
comments: false
---
<br>

#### 1、首先在 [***https://github.com/***](https://github.com/)  上注册一个账号.
   
#### 2、注册成功以后,新建一个repository(仓库).
    
![License Badge]({{ site.baseurl}}/images/git/github1.png)

新建界面如下：
  
![License Badge]({{ site.baseurl}}/images/git/github2.png)
  
输入项目名称,其他全部默认即可

创建成功后,浏览器跳转到一个新页面,如下：
![License Badge]({{ site.baseurl}}/images/git/github3.png)

红色标注的地址要记住 接下来要用到。
  
这里提示你如何通过命令行提交项目到你刚才新建的Repository。刚才新建Repository的时候,就生成了一个唯一的地址,
  
在本示例中是: https://github.com/itmyhome2013/mygithub.git

#### 3、下载安装客户端msysgit

下载地址：http://msysgit.github.io/  下载后安装,一直下一步即可

装完msysgit后右键鼠标会多出一些选项来,在本地仓库里右键选择Git Init Here,会多出来一个.git文件夹，

这就表示本地git创建成功。右键GitBash进入git命令行,打开GitBash如下界面

![License Badge]({{ site.baseurl}}/images/git/github4.png)

#### 4、创建版本库

什么是版本库呢?版本库又名仓库,英文名repository,你可以简单理解成一个目录,这个目录里面的所有文件都可以被Git管理起来,

每个文件的修改、删除,Git都能跟踪,以便任何时刻都可以追踪历史,或者在将来某个时刻可以"还原"。

所以,创建一个版本库非常简单。

**第一步:首先,选择一个合适的地方,创建一个空目录(本示例在D盘)：**

```js
$ cd d:  
$ mkdir mygithub  
$ cd mygithub  
$ pwd  
/d/mygithub 
```

![License Badge]({{ site.baseurl}}/images/git/github6.png)

cd是进入到一个目录,mkdir表示新建。

pwd命令用于显示当前目录。我的仓库位于/d/mygithub

**第二步:通过git init命令把这个目录变成Git可以管理的仓库**

```js
$ git init  
Initialized empty Git repository in d:/mygithub/.git/ 
```

瞬间Git就把仓库建好了,而且告诉你是一个空的仓库(empty Git repository),到mygithub目录下我们返现多了一个.git的目录,

这个目录是Git来跟踪管理版本库的,没事千万不要手动修改这个目录里面的文件,不然改乱了,就把Git仓库给破坏了。

#### 5、把文件添加到版本库

在/d/mygithub目录下 新建一个README.txt文件,内容为hello github

**第一步:用命令git add告诉Git,把文件添加到仓库：**
 
```js
$ git add README.txt 
```

执行上面的命令,没有任何显示,这就对了,Unix的哲学是"没有消息就是好消息",说明添加成功。

如果你要将所有文件都添加上去的话,使用git add .  "."表示添加当前目录中的所有文件

**第二步:用命令git commit告诉Git,把文件提交到仓库：**

```javascript
$ git commit -m "hello github"  
[master (root-commit) 0db7ba5]  
1 file changed, 1 insertion(+)  
create mode 100644 README.txt  
```

**第三步:输入远程地址**

```js
$ git remote add origin https://github.com/itmyhome2013/mygithub.git 
```

上面origin 后面的https: 即是刚开始新建repository的时候生成的一个唯一的地址。

**第四步:上传到github：**

```javascript
$ git push -u origin master  
```

然后会提示输入用户名密码：

```javascript
Username for 'https://github.com': yourUsername  
Password for 'https://itmyhome2013@github.com': yourPassword  
```

注意:密码不会显示在控制台。

提交成功后就可以进入github查看自己的项目了

![License Badge]({{ site.baseurl}}/images/git/github8.png)

附上所有命令操作：

![License Badge]({{ site.baseurl}}/images/git/github7.png)

**总结：**

一、注册github账号

二、新建repository仓库

三、安装msysgit客户端

四、创建版本库

+ 创建目录

+ 使用命令git init 把该目录变成git可管理的仓库

五、把文件添加到版本库

+ 使用命令git add 注意,可反复多次使用,添加多个文件

+ 使用命令git commit 提交到仓库

+ 使用命令git remote 输入远程地址

+ 使用命令git push 上传到github
	   
	   
	   
[id]: http://example.com/  "Optional Title Here"