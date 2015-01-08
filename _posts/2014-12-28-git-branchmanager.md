---
layout: post
title: "Git分支管理"
date: 2015-01-08 00:00:00 -0700
tags: Git
category: Git
summary: 1、注册Git账号 2、创建SSH keys
comments: false
---
</br>
首先,我们创建dev分支,然后切换到dev分支

```diff
$ git checkout -b dev 
```

**git checkout**命令加上-b参数表示创建并切换,相当于以下两条命令：

```diff
$ git branch dev  
$ git checkout dev  
```

然后,用**git branch**命令查看当前分支：

```diff
$ git branch  
* dev  
  master  
```

git branch命令会列出所有分支,当前分支前面会标一个*号

然后 我们就可以在dev分支上正常提交,比如新建一个hello.txt文件

进行提交

```diff
$ git add hello.txt  
$ git commit -m "add hello"  
$ git push -u origin dev  
```

现在dev分支工作完成,我们进入GitHub


dev分支

![License Badge]({{ site.baseurl}}/images/git/Git Branch Manager/1.png)

master分支

![License Badge]({{ site.baseurl}}/images/git/Git Branch Manager/2.png)

测试环境为：我们在本地仓库先用master分支提交内容到远程仓库,然后切换分支dev提交修改的内容再
到远程仓库

我们发现dev分支上hello.txt内容为hello git dev  而切换到master分支上,hello.txt内容依然为

hello git

现在我们把dev分支的工作成果合并到master分支上

```diff
$ git merge dev  
Updating 50bca6c..ee88faa  
Fast-forward  
 WebRoot/hello.txt | 2 +-  
 1 file changed, 1 insertion(+), 1 deletion(-)  
```

**git merge**命令用于合并指定分支到当前分支。合并后,再在master分支上查看 hello.txt内容 就和dev分支上的完全一样了

合并完成后,就可以删除dev分支了

```diff
$ git branch -d dev  
Deleted branch dev (was ee88faa).  
```

删除后,查看branch,就只剩下master分支了：

```diff
$ git branch  
* master    
```

注意：此时只是删除了本地分支,删除远程分支如下：

```diff
$ git push origin :dev   
```

提示输入用户名密码即可。

</br>
###总结：

查看分支：git branch

创建分支：git branch name

切换分支：git checkout name

创建+切换分支：git checkout -b name

合并指定分支到当前分支：git merge name

删除分支：git branch -d name

注：name为分支名
