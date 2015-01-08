---
layout: post
title: "GitHub删除文件"
date: 2015-01-08 00:00:00 -0700
tags: Git
category: Git
summary: 一般情况下，通常可直接在文件管理器中直接把文件删了
comments: false
---
</br>
###删除单个文件

一般情况下，通常可直接在文件管理器中直接把文件删了，或者用**rm**命令删了

```java
$ rm README.txt 
```

这个时候,工作区是删除了,可版本库还没有。**git status**命令会立刻告诉你哪些文件被删除了

```diff
$ git status  
On branch master  
Your branch is up-to-date with 'origin/master'.  
  
Changes not staged for commit:  
  (use "git add/rm <file>..." to update what will be committed)  
  (use "git checkout -- <file>..." to discard changes in working directory)  
  
		deleted:    README.txt  
  
no changes added to commit (use "git add" and/or "git commit -a")  
```

现在有两个选择，一是确实要从版本库中删除该文件，那就用命令**git rm**删掉，并**且commit**，并且**push**

```diff
$ git rm README.txt  
rm 'README.txt'  
$ git commit -m "remove README.txt"  
[master d17efd8] remove README.txt  
 1 file changed, 1 deletion(-)  
 delete mode 100644 README.txt  
  
$ git push -u origin master  
Counting objects: 3, done.  
Delta compression using up to 4 threads.  
Compressing objects: 100% (2/2), done.  
Writing objects: 100% (2/2), 210 bytes | 0 bytes/s, done.  
Total 2 (delta 1), reused 0 (delta 0)  
To git@github.com:itmyhome2013/mygithub.git  
   3c147ee..c01c174  master -> master  
Branch master set up to track remote branch master from origin. 
```

另一种情况是删除了，因为版本库里还有呢，所以可以把误删的文件恢复到最新版本

```java
$ git checkout -- README.txt  
```
![License Badge]({{ site.baseurl}}/images/git/github-delete-files1.png)

</br>
###删除文件夹

可先直接在文件管理器中把要删除的文件夹删掉(以WEB-INF文件夹为例)

```java
$ git add --all  
$ git commit -m "remove WEB-INF"  
$ git push -u origin master  
```
**git add -A(--all):**表示把所有tracked文件中被修改过或已删除文件和所有untracted的文件信息添加到索引库。

![License Badge]({{ site.baseurl}}/images/git/github-delete-files2.png)