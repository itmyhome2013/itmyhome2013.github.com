---
layout: post
blog_id: "ant-tutorial-of-commonly-used-commands"
title: "Ant入门教程之常用命令"
date: 2015-04-11 00:00:00 -0700
tags: Ant
category: Ant
summary: copy主要用来对文件和目录的复制功能，delete命令对文件或目录进行删除，mkdir命令创建目录，move命令移动文件或目录
comments: false
---
</br>
###一、copy命令

copy主要用来对文件和目录的复制功能。例子如下：

例1. 复制单个文件：

```diff
<copy file="A.txt" tofile="B.txt"/>
```

例2. 对文件目录进行复制：

```diff
<copy todir="dest_dir">
	<fileset dir="src_dir"/>
</copy>
```

例3. 将文件复制到另外的目录

```diff
<copy file="source.txt" todir="dest_dir"/>
```

</br>
###二、delete命令

对文件或目录进行删除。例子如下：

例1. 删除某个文件：

```diff
<delete file="A.txt"/>
```

例2. 删除某个目录：

```diff
<delete dir="home/src"/>
```

例3. 删除所有的备份目录或空目录：

```diff
<delete includeEmptyDirs="true">
       <fileset dir="." includes="**/*.bak"/>
</delete>
```

</br>
###三、mkdir命令

创建目录：

```diff
<mkdir dir="home/src/bin"/>
```

</br>
###四、move命令

移动文件或目录。例子如下：

例1. 移动单个文件：

```diff
<move file="source_file" tofile=”dest_file”/>
```

例2. 移动单个文件到另一个目录：

```diff
<move file="source_file" todir=”move_dir”/>
```

例3. 移动某个目录到另一个目录：

```diff
<move todir="new_dir"> 
	<fileset dir="old_dir"/>
</move>
```

</br>
###五、echo命令

该任务的作用是根据日志或监控器的级别输出信息。

它包括message、file、append和level四个属性，例子如下

```diff
<echo message="hello ant" file="home/msg.log" append="true" />
```

</br>