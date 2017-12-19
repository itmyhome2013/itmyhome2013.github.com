---
layout: post
blog_id: "understanding-the-jvm-class-file-structure"
title: "深入理解Java虚拟机 - 类文件结构"
date: 2017-12-18 00:00:00 -0700
tags: Java虚拟机
category: Java虚拟机
summary: Java虚拟机不和包括Java在内的任何语言绑定，它只与“Class文件”这种特定的二进制文件格式所关联
comments: false
---

### 无关性的基石

各种不同平台的虚拟机与所有平台都统一使用的程序存储格式——字节码（ByteCode）是构成平台无关性的基石。实现语言无关性的基础仍然是虚拟机和字节码存储格式。 Java虚拟机不和包括Java在内的任何语言绑定，它只与“Class文件”这种特定的二进制文件格式所关联，Class文件中包含了Java虚拟机指令集和符号表以及若干其他辅助信息。

### Class类文件的结构

任何一个Class文件都对应着唯一一个类或接口的定义信息，但反过来说，类或接口并不一定都得定义在文件里（譬如类或接口也可以通过类加载器直接生成）。Class文件是一组以8位字节为基础单位的二进制流。

根据Java虚拟机规范的规定，Class文件格式采用一种类似于C语言结构体的伪结构来存储数据，这种伪结构中只有两种数据类型：无符号数和表

无符号数属于基本的数据类型，`以u1、 u2、 u4、 u8来分别代表1个字节、 2个字节、 4个字节和8个字节的无符号数`，无符号数可以用来描述数字、 索引引用、 数量值或者按照UTF-8编码构成字符串值。

表是由多个无符号数或者其他表作为数据项构成的复合数据类型，`所有表都习惯性地以“_info”结尾`。 表用于描述有层次关系的复合结构的数据，整个Class文件本质上就是一张表，它由如下表所示的数据项构成。

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
       <td>类型</td> 
       <td>名称</td>
	   <td>说明</td>
	   <td>数量</td> 
    </tr> 
	<tr> 
       <td>u4</td> 
       <td>magic</td>
	   <td>识别Class文件格式，具体值为0xCAFEBABE</td> 
       <td>1</td>
    </tr> 
	 <tr> 
	   <td>u2</td> 
       <td>minor_version</td>
	   <td>Class文件格式副版本号</td> 
       <td>1</td>
	</tr>
	<tr> 
	   <td>u2</td> 
       <td>major_version</td>
	   <td>Class文件格式主版本号</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>constant_pool_count</td>
	   <td>常数表项个数</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>cp_info</td> 
       <td>constant_pool</td>
	   <td>常数表，又称变长符号表</td> 
       <td>constant_pool_count-1</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>access_flags</td>
	   <td>Class的声明中使用的修改符掩码</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>this_class</td>
	   <td>常数表索引，索引内保存类名或接口名</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>super_class</td>
	   <td>常数表索引，索引内保存父类名</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>interfaces_count</td>
	   <td>超接口个数</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>interfaces</td>
	   <td>常数表索引，各超接口名称</td> 
       <td>interfaces_count</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>fields_count</td>
	   <td>类的域个数</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>field_info</td> 
       <td>fields</td>
	   <td>域数据，包括属性名称索引</td> 
       <td>fields_count</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>methods_count</td>
	   <td>方法个数</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>method_info</td> 
       <td>methods</td>
	   <td>方法数据，包括方法名称索引</td> 
       <td>methods_count</td>
    </tr>
	<tr> 
	   <td>u2</td> 
       <td>attributes_count</td>
	   <td>类附加属性个数</td> 
       <td>1</td>
    </tr>
	<tr> 
	   <td>attribute_info</td> 
       <td>attributes</td>
	   <td>类附加属性数据，包括源文件名称等</td> 
       <td>attributs_count</td>
    </tr>
</table>

#### 1、魔数

每个Class文件的头4个字节称为魔数（Magic Number），它的唯一作用是确定这个文件是否为一个能被虚拟机接受的Class文件。

#### 2、Class文件的版本

紧接着魔数的4个字节存储的是Class文件的版本号：第5和第6个字节是次版本号（MinorVersion），第7和第8个字节是主版本号（Major Version）。 Java的版本号是从45开始的，JDK 1.1之后的每个JDK大版本发布主版本号向上加1（JDK 1.0～1.1使用了45.0～45.3的版本号），高版本的JDK能向下兼容以前版本的Class文件，但不能运行以后版本的Class文件，即使文件格式并未发生任何变化，虚拟机也必须拒绝执行超过其版本号的Class文件。

#### 3、常量池

常量池可以理解为Class文件之中的资源仓库，它是Class文件结构中与其他项目关联最多的数据类型，也是占用Class文件空间最大的数据项目之一，同时它还是在Class文件中第一个出现的表类型数据项目。

常量池中主要存放两大类常量：`字面量（Literal）和符号引用（Symbolic References）`。字面量比较接近于Java语言层面的常量概念，如文本字符串、 声明为final的常量值等。 而符号引用则属于编译原理方面的概念，包括了下面三类常量：

+ 类和接口的全限定名（Fully Qualified Name）
+ 字段的名称和描述符（Descriptor）
+ 方法的名称和描述符

常量池中的每一项又对应着一个表

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
       <td>类型</td> 
       <td>标志</td>
	   <td>描述</td>
    </tr> 
	<tr> 
       <td>CONSTANT_Utf8_info</td> 
       <td>1</td>
       <td>UTF8编码的Unicode字符串</td>
    </tr>
	<tr> 
       <td>CONSTANT_Integer_info</td> 
       <td>3</td>
       <td>整型字面量</td>
    </tr>
	<tr> 
       <td>CONSTANT_Float_info</td> 
       <td>4</td>
       <td>浮点型字面量</td>
    </tr> 
	<tr> 
       <td>CONSTANT_Long_info</td> 
       <td>5</td>
       <td>长整型字面量</td>
    </tr> 
	<tr> 
       <td>CONSTANT_Double_info</td> 
       <td>6</td>
       <td>双精度浮点型字面量</td>
    </tr> 
	<tr> 
       <td>CONSTANT_Class_info</td> 
       <td>7</td>
       <td>类或接口的符号引用</td>
    </tr> 
	<tr> 
       <td>CONSTANT_String_info</td> 
       <td>8</td>
       <td>字符串类型字面量</td>
    </tr> 
	<tr> 
       <td>CONSTANT_Fieldref_info</td> 
       <td>9</td>
       <td>字段的符号引用</td>
    </tr> 
	<tr> 
       <td>CONSTANT_Methodref_info</td> 
       <td>10</td>
       <td>类中方法的符号引用</td>
    </tr> 
	<tr> 
       <td>CONSTANT_InterfaceMethodref_info</td> 
       <td>11</td>
       <td>接口中方法的符号引用</td>
    </tr> 
	<tr> 
       <td>CONSTANT_NameAndType_info</td> 
       <td>12</td>
       <td>字段或方法的部分符号引用</td>
    </tr>  	

	
</table>

#### 4、访问标志

在常量池结束之后，紧接着的两个字节代表访问标志(access_flags),这个标志用于识别一些类或者接口层次的访问信息，包括：这个Class是类还是接口；是否定义为public类型；是否定义为abstract类型；如果是类的话，是否被声明为final等


#### 5、类索引、 父类索引与接口索引集合

类索引（this_class）和父类索引（super_class）都是一个u2类型的数据，而接口索引集合（interfaces）是一组u2类型的数据的集合，Class文件中由这三项数据来确定这个类的继承关系。 类索引用于确定这个类的全限定名，父类索引用于确定这个类的父类的全限定名。 由于Java语言不允许多重继承，所以父类索引只有一个，除了java.lang.Object之外，所有的Java类都有父类，因此除了java.lang.Object外，所有Java类的父类索引都不为0。 接口索引集合就用来描述这个类实现了哪些接口，这些被实现的接口将按implements语句（如果这个类本身是一个接口，则应当是extends语句）后的接口顺序从左到右排列在接口索引集合中。

类索引、 父类索引和接口索引集合都按顺序排列在访问标志之后，类索引和父类索引用两个u2类型的索引值表示，它们各自指向一个类型为CONSTANT_Class_info的类描述符常量，通过CONSTANT_Class_info类型的常量中的索引值可以找到定义在CONSTANT_Utf8_info类型的常量中的全限定名字符串。 

对于接口索引集合，入口的第一项——u2类型的数据为接口计数器（interfaces_count），表示索引表的容量。 如果该类没有实现任何接口，则该计数器值为0，后面接口的索引表不再占用任何字节。

#### 6、字段表集合

字段表（field_info）用于描述接口或者类中声明的变量。 字段（field）包括类级变量以及实例级变量，但不包括在方法内部声明的局部变量。 我们可以想一想在Java中描述一个字段可以包含什么信息？可以包括的信息有：字段的作用域（public、 private、 protected修饰符）、 是实例变量还是类变量（static修饰符）、 可变性（final）、 并发可见性（volatile修饰符，是否强制从主内存读写）、 可否被序列化（transient修饰符）、 字段数据类型（基本类型、 对象、 数组）、 字段名称。 上述这些信息中，各个修饰符都是布尔值，要么有某个修饰符，要么没有，很适合使用标志位来表示。 而字段叫什么名字、 字段被定义为什么数据类型，这些都是无法固定的，只能引用常量池中的常量来描述。

#### 7、方法表集合（methods_count 、methods）

和字段表集合非常的类似，区别在methods这张表中的字段一些不太一样。

#### 8、属性表集合

属性表集合中包含了大量的数据信息，上面的所有类型都有十分严格顺序，长度，大小。而属性表中就没有那么严格了，我们编写的最多的Code就存放在属性表集合中的CODE表中，一共有21项比如还包含：Exception表等等。具体的每一个项都是有意义的，有点多简单的介绍一下主要的：

1、Code 属性

Java方法体里面的代码经过Javac编译之后，最终变为字节码指令存储在Code属性内，Code属性出现在方法表的属性集合中，但在接口或抽象类中就不存在Code属性

2、Exception属性

列举出方法中可能抛出的受查异常

3、LineNumberTable属性

描述Java源码行号与字节码行号（字节码的偏移量）之间的对应关系。主要是如果抛出异常时，编译器会显示行号，就是这个属性的作用

4、LocalVariableTable属性

描述栈帧中局部变量表中的变量与Java源码中定义的变量之间的关系。用处在于当别人使用这个方法是能够显示出方法定义的参数名

5、SourseFile属性

记录生成这个Class文件的源码文件名称，抛出异常时能够显示错误代码所属的文件名

6、ConstantValue属性

通知虚拟机自动为静态变量赋值，只有被static字符修饰的变量（类变量）才可以有这项属性

7、InnerClass属性

用于记录内部类与宿主类之间的关联

8、Deprecated和Synthetic属性

这两个都是标志类型的布尔属性

Deprecated表示不再推荐使用，注解表示为@deprecated<br>
Synthetic表示此字段或方法是由编译器自行添加的

<hr>

参考文献：<a href="http://itmyhome.com/java-virtual-machine/" target="_blank">深入理解Java虚拟机</a> 周志明 著