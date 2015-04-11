---
layout: post
blog_id: "ant-tutorial-introduces-attribute"
title: "Ant入门教程之属性介绍"
date: 2015-04-10 00:00:00 -0700
tags: Ant
category: Ant
summary: Ant的构建文件都写在XML中。每个构建文件包含一个project和至少一个(默认值)target。target包含了一些task元素。每一个task元素可以有一个id属性(attribute)可以被引用。
comments: false
---
</br>
###一、编写一个简单的构建文件

Ant的构建文件都写在XML中。每个构建文件包含一个project和至少一个(默认值)target。

target包含了一些task元素。每一个task元素可以有一个id属性(attribute)可以被引用。

</br>
###二、Project

一个project有如下三个属性(attribute)：

+ **name属性**          用于指定project元素的名称。

+ **default属性**   用于没有提供目标时所默认执行的target的名称

+ **basedir属性**   用于指定基路径的位置。该属性没有指定时,使用Ant的构件文件的父目录作为基准目录。

每个project定义了一个或多个target。一个target是一组要执行的任务。

当开始运行ant,你可以选择哪一个任务组被执行。当没有目标下达后,则project的默认值被执行。

</br>
###三、Target

target可能依赖于其它的target而存在。你可能用一个target用来编译,用另一个target且用来布署。

只有编译完成后,布署才可执行,这样布署就依赖于编译。 要说明的是 ant的depends attribute只是规定了

target之间的前后执行关系，并不表示真正的依赖性。依赖的次序是按照排列次序从左到右。

但如果这些依赖本身之间还有依赖关系,也可能在后面的先执行.

**1、name属性**

指定target元素的名称,这个属性在一个project元素中是唯一的。我们可以通过指定target元素的名称来指定某个target。

**2、depends属性**

用于描述target之间的依赖关系,若与多个target存在依赖关系时,需要以","间隔。Ant会依照depends属性中target

出现的顺序依次执行每个target。被依赖的target会先执行。

**3、if属性**

用于验证指定的属性是否存在,若不存在,所在target将不会被执行。

**4、unless属性**

该属性的功能与if属性的功能正好相反,它也用于验证指定的属性是否存在,若不存在,所在target将会被执行。

**5、description属性**

该属性是关于target功能的简短描述和说明。

如下列子：

```diff
<target name="A"/>
<target name="B" depends="A"/>
<target name="C" depends="B"/>
<target name="D" depends="C,B,A"/>
```

执行顺序依次为：A --> B --> C --> D

</br>
###四、property

property类似于变量,可以提供给build.xml中的其他元素使用,project的属性可以通过property元素来设定

Ant提供了一些内置的属性

<table class="table table-bordered table-striped table-condensed">
    <tr>
        <td>basedir</td>
		<td>项目的绝对路径</td>
    </tr>
	<tr>
        <td>ant.file</td>
		<td>构建文件的绝对路径</td>
    </tr>
	<tr>
        <td>ant.version</td>
		<td>Ant版本</td>
    </tr>
	<tr>
        <td>ant.project.name</td>
		<td>当前正在执行的项目名称</td>
    </tr>
	<tr>
        <td>ant.project.default-target</td>
		<td>当前正在执行项目默认target名称</td>
    </tr>
	<tr>
        <td>ant.core.lib</td>
		<td>文件ant.jar的绝对路径</td>
    </tr>
	<tr>
        <td>ant.home </td>
		<td>Ant的根目录</td>
    </tr>
</table>

</br>