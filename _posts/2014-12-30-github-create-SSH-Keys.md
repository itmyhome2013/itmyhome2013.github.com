---
layout: post
title: "GitHub创建SSH Keys"
date: 2014-12-30 00:00:00 -0700
tags: Git
summary: 第一步：在用户主目录下,看有没有.ssh目录,如果有,再看看这个目录下。</br>第二步：登录GitHub 打开Settings,添加Key
comments: false
---
</br>
**第一步：**在用户主目录下,看有没有.ssh目录,如果有,再看看这个目录下

有没有id_rsa和id_rsa.pub这两个文件,如果已经有了,可直接跳到下一步,如果没有

打开Git Bash,创建SSH Key

```javascript
$ ssh-keygen -t rsa -C "youremail@xxx.com"  
```

你需要把邮件地址换成你自己的邮件地址,然后一路回车,默认即可。

如果一切顺利,可以在用户目录里找到.ssh目录 里面有id_rsa和id_rsa.pub两个文件

这两个就是SSH Key的秘钥,id_rsa是私钥,id_rsa.pub是公钥。

</br>
**第二步：**登录GitHub 打开Settings,添加Key 如图
![License Badge]({{ site.baseurl}}/images/git/github9.png)

点"Add SSH Key",填上任意Title,在Key文本框里粘贴id_rsa.pub文件的内容：

成功之后,你就能看到添加的Key

![License Badge]({{ site.baseurl}}/images/git/github11.png)

