---
layout: post
blog_id: "java-study-notes-regex"
title: "Java学习笔记06--正则表达式"
date: 2015-03-06 00:00:00 -0700
tags: Java
category: Java
summary: 正则表达式可以方便的对数据进行匹配，可以执行更加复杂的字符串验证、拆分、替换等操作。
comments: false
---
<br>

正则表达式可以方便的对数据进行匹配，可以执行更加复杂的字符串验证、拆分、替换等操作。

例如：现在要去判断一个字符串是否由数字组成，则可以有以下的两种做法

#### 不使用正则表达式

```java
public class T {  
    public static void main(String[] args) {  
        String str = "0123456789";  
        boolean flag = true;   //定义一个标记变量  
        char c[] = str.toCharArray();  
        for (int i = 0; i < c.length; i++) {  
            if(c[i]<'0'||c[i]>'9'){  
                flag = false;  
                break;  
            }  
        }  
        if(flag){  
            System.out.println("是全部由数字组成");  
        }else{  
            System.out.println("不是全部由数字组成");  
        }  
          
    }  
}
```

#### 使用正则表达式

```java
public class T {  
    public static void main(String[] args) {  
        String str = "0123456789";  
        if(Pattern.compile("[0-9]+").matcher(str).matches()){  
            System.out.println("是全部由数字组成");  
        }else{  
            System.out.println("不是全部由数字组成");  
        }  
    }  
}
```

#### Pattern、Matcher类

这两个类为正则的核心操作类。这两个类都定义在java.util.regex包中.

<span style="color:red">Pattern类的主要作用是进行正则规范（如之前的“【0-9】”就属于正则规范）的编写，而Matcher类主要是执行规范.</span>

验证一个字符串是否符合其规范。

![License Badge]({{ site.baseurl}}/images/java/06/1.png)

+ <span style="color:red">\d：表示数字，【0-9】</span>

+ <span style="color:red">\D：表示非数字，【^0-9】</span>

+ <span style="color:red">\w：表示字母、数字、下划线，【a-zA-Z0-9】</span>

+ <span style="color:red">\W：【^a-zA-Z0-9】</span>

![License Badge]({{ site.baseurl}}/images/java/06/2.png)

以上的正则，如果要想驱动起来，则必须依靠Pattern类和Matcher类

<span style="color:red">**Pattern主要是表示一个规则的意思，即：正则表达式的规则需要在Pattern类中使用。**</span>

<span style="color:red">**Matcher类主要表示使用Pattern指定好的验证规则。**</span>

![License Badge]({{ site.baseurl}}/images/java/06/3.png)

在Pattern类中如果要想取得Pattern类实例，则必须调用compile()方法。

![License Badge]({{ site.baseurl}}/images/java/06/4.png)

例：验证一个字符串是否是合法的日期格式。

```java
public class T {  
    public static void main(String[] args) {  
        String str = "1990-04-13";  
        String pattern = "\\d{4}-\\d{2}-\\d{2}";  
        Pattern p = Pattern.compile(pattern);   //实例化Pattern类  
        Matcher m = p.matcher(str);             //实例化Matcher类  
        if(m.matches()){  
            System.out.println("是合法日期格式");  
        }else{  
            System.out.println("不是合法日期格式");  
        }  
    }  
}
```

在Pattern类中也可以使用正则进行字符串的拆分功能。

```java
public class T {  
    public static void main(String[] args) {  
        String str = "AAA000BBB111CCC";  
        String pattern = "\\d+";  
        Pattern p = Pattern.compile(pattern);  
        String s[] = p.split(str);  
        for (int i = 0; i < s.length; i++) {  
            System.out.println(s[i]);  
        }  
          
    }  
}
```

还可以使用Matcher类中的字符串替换功能。

```java
public class T {  
    public static void main(String[] args) {  
        String str = "AAA000BBB111CCC";  
        String pattern = "\\d+";  
        Pattern p = Pattern.compile(pattern);  
        Matcher m = p.matcher(str);  
        String s = m.replaceAll("---");  
        System.out.println(s);   //AAA---BBB---CCC  
    }  
}
```

#### String类对正则的支持

从之前的操作中，可以返现，很多的代码除了要求的字符串不同，使用的正则规则不同，基本上就没有什么特别的了。

所以在JDK1.4之后，java对正则进行了一些扩充，在String中开始直接支持正则的操作。

![License Badge]({{ site.baseurl}}/images/java/06/5.png)

```java
public class T {  
    public static void main(String[] args) {  
        String str1 = "AAA000BBB";  
        String str2 ="1990-04-13";  
        String str3 = "i_love_you";  
        System.out.println("字符串替换："+str1.replaceAll("\\d+", "---"));  
        System.out.println("字符串验证："+str2.matches("\\d{4}-\\d{2}-\\d{2}"));  
        String s[] = str3.split("_");  
        System.out.println("字符串拆分：");  
        for(int i=0;i<s.length;i++){  
            System.out.println(s[i]);  
        }  
          
    }  
}
```

#### 总结：

<span style="color:red">1、使用正则可以方便的完成字符串的验证、拆分、替换等复杂功能。</span>

<span style="color:red">2、在开发中一般都会直接使用String类中提供好的正则支持，而往往很少直接使用Pattern类或Matcher类。</span>

<span style="color:red">3、在一些正则应用的时候，对于一些敏感的字符要进行转义操作。</span>

<br>