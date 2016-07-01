---
layout: post
blog_id: "java-study-notes-internationalization"
title: "Java学习笔记12--国际化"
date: 2015-03-12 00:00:00 -0700
tags: Java
category: Java
summary: 国际化的操作就是指一个程序可以同时适应多门语言，即：如果现在程序者是中国人，则会以中文为显示文字，如果现在程序的使用者是英国人，则会以英语为显示的文字，也就是说可以通过国际化操作，让一个程序适应各个国家的语言要求。
comments: false
---
<br>

国际化的操作就是指一个程序可以同时适应多门语言，即：如果现在程序者是中国人，则会以中文为显示文字，如果现在

程序的使用者是英国人，则会以英语为显示的文字，也就是说可以通过国际化操作，让一个程序适应各个国家的语言要求。

![License Badge]({{ site.baseurl}}/images/java/12/1.png)

程序根据不同的语言环境找到不同的资源文件，之后从资源文件中取出内容，资源文件中的内容都是以key->value的形式保存的，

所以在读取的时候通过其key找到对应的value

#### 国际化实现的支持类

如果要想实现java程序的国际化操作必须通过以下的三个类完成：

<span style="color:red">java.util.Locale ：用于表示一个国家语言类。</span>

<span style="color:red">java.util.ResourceBundle：用于访问资源文件.</span>

<span style="color:red">java.text.MessageFormat：格式化资源文件的占位字符串。</span>

#### Local类

Local表示的是本地，实际上使用的是一个ISO编码的封装类。对于各个国家来说都存在一个唯一的编码，

那么这种编码就称为ISO编码，使用Local可以指定好一个具体的国家编码。例如： 

+ 中国的编码：zh_CH  

+ 英语-美国的编码：en-US

+ 法语的编码：fr-FR

#### ResourceBundle

此类是专门完成属性文件读取操作的，读取的时候直接指定文件名即可(此文件名称一般不需要指定后缀，

后缀统一为*.properties)，可以根据Locale所指定的区域码来自动选择所需要的资源文件。

<table class="table table-bordered table-striped table-condensed">
    <tr>
        <td>public static final ResourceBundle getBundle(String  baseName)</td>
		<td>此方法就是指定要操作的资源文件，此方法找到的是默认的操作系统的语言Locale对象</td>
    </tr>
	<tr>
        <td>public static final ResourceBundle getBundle(String baseName,Locale locale)</td>
		<td>此方法也是指定操作的资源文件，并传入Locale对象</td>
    </tr>
	<tr>
        <td>public final String getString(String key)</td>
		<td>根据key取得对应的value</td>
    </tr>
</table>

下面通过一道程序来观察资源文件的使用，以及如何使用ResourceBundle读取资源文件。

#### message.properties

```diff
info=HELLO  
```

```java
package com.itmyhome;  
  
import java.util.ResourceBundle;  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        ResourceBundle rb = ResourceBundle.getBundle("message");  
        System.out.println(rb.getString("info"));  
    }  
}
```

PS：<span style="color:red">message.properties默认查找路径为classpath下，如果不在此路径下并且为指定完整包路径名的话将报如下异常</span>

```diff
Can't find bundle for base name message, locale zh_CH
```

#### Java国际化程序实现

可以根据不同的国家输出不同国家的你好：

中文：你好！

英文：Hello

法语：Bonjour!

分别定义不同的资源文件，此时需要定义出三个资源文件，同时在定义资源文件的时候需要指定好此资源文件对应的语言编码：

中文：Message_zh_CH.properties

英文：Message_en_US.properties

法文：Message_fr_FR.properties

##### **Message_zh_CN.properties**

```diff
info=\u4f60\u597d
```

##### **Message_en_US.properties**

```diff
info=Hello
```

##### **Message_fr_FR.properties**

```diff
info=Bonjour
```

```java
package com.itmyhome;  
  
import java.util.Locale;  
import java.util.ResourceBundle;  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Locale zhLocale = new Locale("zh","CN");   //表示中国地区  
        Locale enLocale = new Locale("en","US");   //表示美国地区  
        Locale frLocale = new Locale("fr","FR");   //表示法国地区  
        ResourceBundle zhRb = ResourceBundle.getBundle("Message",zhLocale);  
        ResourceBundle enRb = ResourceBundle.getBundle("Message",enLocale);  
        ResourceBundle frRb = ResourceBundle.getBundle("Message",frLocale);  
        System.out.println(zhRb.getString("info"));  
        System.out.println(enRb.getString("info"));  
        System.out.println(frRb.getString("info"));  
    }  
}
```

PS:<span style="color:red">以上中文属性如果是中文的话应该将其进行Unicode编码，这样可以避免一些系统所带来的乱码问题</span>

#### 处理动态文本

之前的资源文件中的所有内容实际上都是固定的，而如果现在有些内容，你好，XXX。那么此时就必须在资源文件中进行一些

动态文本的配置，设置占位符，这些符号中的内容暂时不固定，而是在程序执行的时候由程序进行设置的，

而要想实现这样的功能，则必须使用MessageFormat类。此类在java.text包中定义的。

<span style="color:red">占位符使用（数字）的形式表示，如果现在表示第一个内容“{0}”、第二个内容“{1}”依次类推。</span>

在MessageFormat类中主要使用format()方法，此方法定义如下：

public  static  String  format(String  pattern,Object...arguments)

```diff
info=\u4f60\u597d{0}  
info=Hello,{0}  
info=Bonjour,{0}
```

```java
package com.itmyhome;  
  
import java.text.MessageFormat;  
import java.util.Locale;  
import java.util.ResourceBundle;  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Locale zhLocale = new Locale("zh","CN");   //表示中国地区  
        Locale enLocale = new Locale("en","US");   //表示美国地区  
        Locale frLocale = new Locale("fr","FR");   //表示法国地区  
        ResourceBundle zhRb = ResourceBundle.getBundle("Message",zhLocale);  
        ResourceBundle enRb = ResourceBundle.getBundle("Message",enLocale);  
        ResourceBundle frRb = ResourceBundle.getBundle("Message",frLocale);  
        System.out.println(MessageFormat.format(zhRb.getString("info"), "itmyhome"));  
        System.out.println(MessageFormat.format(enRb.getString("info"), "itmyhome"));  
        System.out.println(MessageFormat.format(frRb.getString("info"), "itmyhome"));  
    }  
}
```

#### Java新特性，可变参数

在JDK1.5之后java增加了新特性的操作，可以向方法中传递可变的参数，以前的定义的方法，实际上里面的参数都是固定个数的

```java
package com.itmyhome;  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        fun("java","c++",".net");  
        fun("itmyhome");  
    }  
    public static void fun(Object...args){  
        for (int i = 0; i < args.length; i++) {  
            System.err.println(args[i]+"、");  
        }  
    }  
}
```

#### 使用一个类代替资源文件

也可以直接使用一个类来存放所有的资源文件内容,但是,此类在操作的时候就必须有一个明显的注意点,<span style="color:red">必须继承ListResourceBundle</span>

Message_zh_CN

```java
package com.itmyhome;  
  
import java.util.ListResourceBundle;  
  
public class Message_zh_CN extends ListResourceBundle {  
  
    private final Object date[][] = {  
            {"info","你好"}  
    };  
    @Override  
    protected Object[][] getContents() {  
        // TODO Auto-generated method stub  
        return date;  
    }  
}
```

读取资源类

```java
package com.itmyhome;  
  
import java.util.Locale;  
import java.util.ResourceBundle;  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Locale zhLocale = new Locale("zh","CN");   //表示中国地区  
        ResourceBundle zhRb = ResourceBundle.getBundle("com.itmyhome.Message",zhLocale); //写入完整的路径名  
        System.out.println(zhRb.getString("info"));  
    }  
}
```

不管是资源类还是资源文件，找的时候都是Message，那么如果现在多种资源文件一起出来，那么最终找的是哪一个呢？

实际上此时就需要区分优先级：

<span style="color:red">Message_zh_CN.class</span>

<span style="color:red">Message_zh_CN.properties</span>

<span style="color:red">Message.properties</span>

<span style="color:red">**总结：国际化程序实现的思路：程序与显示相分离，根据不同的Locale指定的区域找到不同的资源文件并根据其key取得对应的value**</span>

<br>