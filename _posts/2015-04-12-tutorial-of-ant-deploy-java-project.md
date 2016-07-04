---
layout: post
blog_id: "tutorial-of-ant-deploy-java-project"
title: "Ant入门教程之部署Java项目"
date: 2015-04-12 00:00:00 -0700
tags: Ant
category: Ant
summary: Ant可以代替使用javac、java和jar等命令来执行java操作，从而达到轻松的构建和部署Java工程的目的。
comments: false
---
<br>

Ant可以代替使用javac、java和jar等命令来执行java操作，从而达到轻松的构建和部署Java工程的目的。

#### 1、利用ant的javac命令来编译Java程序

Ant的javac命令用于实现编译Java程序的功能。下面来看一个简单的例子：首先我们建立名为 JavaPro的Java项目，

建立src目录为源代码目录，在src目录下建立TestAnt.java这个类文件。该类文件的内容如下：

```java
package com.home;

public class TestAnt{
	public static void main(String args[]){
		System.out.println("hello world");
	}
}
```

注意是带包名的。

同时在JavaPro项目的根目录下建立build.xml 文件，在该文件中编译src 目录下的Java文件，

并将编译后的class文件放入build/classes 目录中，整个项目的目录结构如下：

|JavaPro

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|src

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|build

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|classes

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|build.xml
   
在编译前，先清除classes目录，该文件的内容如下：

```xml
<?xml version="1.0" ?> 
<project name ="TestAnt" default="compile" basedir=".">
    <target name="clean">
        <delete dir="${basedir}/build"/>
    </target>
    <target name="compile"  depends ="clean">
        <mkdir dir ="${basedir}/build/classes"/>
        <javac srcdir ="${basedir}/src" destdir ="${basedir}/build/classes"/>
    </target>
</project>
```

在JavaPro根目录下执行ant命令后，可在该目录下看到新生成的build/classes子目录，

编译后生成的TestAnt.class文件就在该目录下。

#### 2、使用java命令执行Java程序

Ant 中可以使用 java命令实现运行Java程序的功能。可以在上面的build.xml基础上稍微做下修改：

```xml
<?xml version="1.0" ?> 
<project name ="TestAnt" default="run" basedir=".">
    <target name="clean">
        <delete dir="${basedir}/build"/>
    </target>
    <target name="compile"  depends ="clean">
        <mkdir dir ="${basedir}/build/classes"/>
        <javac srcdir ="${basedir}/src" destdir ="${basedir}/build/classes"/>
    </target>
     <target name="run"  depends ="compile">
        <java classname ="com.home.TestAnt">
            <classpath>
               <pathelement path="${basedir}/build/classes"/>
            </classpath>
        </java>
    </target>
</project>
```

执行命令之后我们就可以在控制台看到输出："[java] hello world"

#### 3、使用jar命令生成jar文件

还可以在上例的基础上更进一步，来生成jar包，再加个name为jar的target:

```xml
<?xml version="1.0" ?> 
<project name ="TestAnt" default="jar" basedir=".">
    <target name="clean">
        <delete dir="${basedir}/build"/>
    </target>
    <target name="compile"  depends ="clean">
        <mkdir dir ="${basedir}/build/classes"/>
        <javac srcdir ="${basedir}/src" destdir ="${basedir}/build/classes"/>
    </target>
    <target name="run"  depends="compile">
          <java classname ="com.home.TestAnt">
				<classpath>
               	    <pathelement path="${basedir}/build/classes/"/>
                 </classpath>
           </java>
    </target>
    <target name="jar" depends="run">
           <jar destfile="TestAnt.jar" basedir="${basedir}/build/classes/">
                <manifest>
					<attribute name="Main-class" value="com.home.TestAnt"/>
                </manifest>
            </jar>
    </target >
</project>
```

ant执行完成之后 可看到在项目根目录下生成一个TestAnt.jar的jar包。在cmd中可通过运行如下命令来执行该jar包

java -jar TestAnt.jar

#### 4、使用war命令打包web项目

建立一个web项目，其中src为Java源代码目录，WebRoot为jsp存放目录，

lib 为项目引用包的目录。在TestWebAnt项目目录下建立build.xml 文件，该文件为该工程的Ant构件文件。

使用myeclipse新建Web Project项目结构如下：

![License Badge]({{ site.baseurl}}/images/ant/2.png)

接下来编写 build.xml 文件，其内容如下:

```xml
<?xml version="1.0" ?>
<project name="TestWebAnt" default="war" basedir=".">
	<property name="classes" value="${basedir}/build/classes" />
	<property name="build" value="${basedir}/build" />
	<property name="lib" value="${basedir}/WebRoot/WEB-INF/lib" />
	<!--  删除build 路径-->
	<target name="clean">
		<delete dir="${build}" />
	</target>

	<!--  建立build/classes 路径，并编译class 文件到build/classes 路径下-->
	<target name="compile" depends="clean">
		<mkdir dir="${classes}" />
		<javac srcdir="${basedir}/src" destdir="${classes}" />
	</target>

	<!--  打war 包-->
	<target name="war" depends="compile">
		<war destfile="${build}/TestWebAnt.war" webxml="${basedir}/WebRoot/WEB-INF/web.xml">
			<!--  拷贝WebRoot 下除了WEB-INF 和META-INF 的两个文件夹-->
			<fileset dir="${basedir}/WebRoot" includes="**/*.jsp" />
			<!--  拷贝lib 目录下的jar 包-->
			<lib dir="${lib}" />
			<!--  拷贝build/classes 下的class 文件-->
			<classes dir="${classes}" />
		</war>
	</target>
</project>
```

运行ant之后，就生成了TestWebAnt.war 文件了，

然后可以将其放入Web容器(如Tomcat)的相应目录下(${Tomcata安装目录}\webapps)运行该web项目了。

<br>