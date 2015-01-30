---
layout: post
blog_id: "git-push-command-no-longer-password-every-time"
title: "让git push命令不再每次都输入密码"
date: 2015-01-29 00:00:00 -0700
tags: Git
category: git
summary: 在每次使用git push的时候都需要输入用户和密码，是不是觉得很麻烦，为了提高效率,我们可以不需要输入密码就直接提交，
comments: false
---
</br>
在每次使用git push的时候都需要输入用户和密码，是不是觉得很麻烦，为了提高效率

我们可以不需要输入密码就直接提交，我们知道Github获取远程库时，有**ssh方式和https方式**

![License Badge]({{ site.baseurl}}/images/git/ssh.png)

</br>
两个方式的url地址不同，认证方式也不同。使用ssh时保存密钥对以后可以不再输入帐号密码，

而https却不能。所以如果想要不再输入帐号密码，

</br>
一种方式就是在git clone的时候使用ssh方式

另一种方式就是改变remote远程url，如下：

```diff
$ git remote rm origin  
$ git remote add origin git@github.com:itmyhome2013/blog.git 
```