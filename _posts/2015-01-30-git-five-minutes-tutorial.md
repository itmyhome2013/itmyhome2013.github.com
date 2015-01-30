---
layout: post
blog_id: git-in-5-minutes"
title: "Git五分钟教程"
date: 2015-01-30 00:00:00 -0700
tags: Git
category: Git
summary: 许多人认为Git太混乱或是复杂的版本控制系统，这篇文章是面向一些人想快速上手使用Git，对于大多数基本需求这篇文章涵盖了使用的70%至90%
comments: false
---
</br>
许多人认为Git太混乱或是复杂的版本控制系统，这篇文章是面向一些人想快速上手使用Git，

对于大多数基本需求这篇文章涵盖了使用的70%至90%

###入门

使用Git前 需要先建立一个仓库(repository)。你可以使用一个已经存在的目录作为Git仓库或创建一个空目录

使用您当前目录作为Git仓库，我们只需使它初始化

```diff
git init
```

使用我们指定目录作为Git仓库

```diff
git init newrepo
```

从现在开始，我们将假设你在Git仓库根目录下，除非另有说明

</br>
###添加新文件

我们有一个仓库，但什么也没有，可以使用add命令添加文件

```diff
git add filename
```

可以使用add... 继续添加任务文件

</br>
###提交版本

现在我们已经添加了这些文件，我们希望他们能够真正被保存在Git仓库，

为此，我们将他们提交到仓库

```diff
git commit -m "Adding files"
```

如果你不使用-m会出现编辑器来让你写自己的注释信息

当我们修改了很多文件，而不想每一个都add，想commit自动来提交本地修改，我们可以使用-a标识

```diff
git commit -a -m "Changed some files"
```

git commit 命令的-a 选项可只将所有</span>**被修改或者已删除的且已经被git管理的文档**提交倒仓库中。

<span style="color:red">千万注意，-a不会造成新文件被提交，只能修改。 </span>

</br>
###发布版本

我们先从服务器克隆一个库并上传

```diff
git clone ssh://example.com/~/www/project.git
```

现在我们修改之后可以进行推送到服务器

```diff
git push ssh://example.com/~/www/project.git
```

</br>
###取回更新

如果你已经按上面的进行push,下面命令表示，当前分支自动与唯一一个追踪分支进行合并。

```diff
git pull
```

从非默认位置更新到指定的url

```diff
git pull http://git.example.com/project.git
```

</br>
##已经超过了五分钟？

###删除

如何你想从资源库中删除文件，我们使用rm

```diff
git rm file
```

</br>
###分支与合并

分支在本地完成，速度快。要创建一个新的分支，我们使用branch命令。

```diff
git branch test
```

branch命令不会将我们带入分支，只需创建一个。所以我们使用checkout命令来更改分支。

```diff
git checkout test
```

第一个分支，或主分支，被称为“master”。

```diff
git checkout master
```

而在您的分支可以提交，将不会反映在主分支的变化。当你做，或者想将更改提交到主分支，切换回master分支和使用合并。

```diff
git checkout master
git merge test
```

如果你想删除分支，我们使用-d标识

```diff
git branch -d test
```

