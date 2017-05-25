---
layout: post
blog_id: "java-study-notes-date"
title: "Java学习笔记07--日期操作类"
date: 2015-03-07 00:00:00 -0700
tags: Java
category: Java
summary: 在java.util包中定义了Date类，Date类本身使用非常简单，直接输出其实例化对象即可。
comments: false
---
<br>

#### 一、Date类

在java.util包中定义了Date类，Date类本身使用非常简单，直接输出其实例化对象即可。

```java
public class T {  
    public static void main(String[] args) {  
        Date date  = new Date();  
        System.out.println("当前日期："+date); //当前日期：Thu May 16 23:00:57 CST 2013  
    }  
}
```

#### 二、Calendar类

使用此类可以将日期精确到毫秒
public abstract class Calendar extends Object
Calendar类是一个抽象类，既然是一个抽象类则肯定无法直接使用，
此时就要利用对象多态性的概念，通过向上的转型关系实例化本类对象。
通过Calendar类取得一个完整的日期，使用其子类。

```java
public class T {  
    public static void main(String[] args) {  
        Calendar calendar = new GregorianCalendar();  
        //Calendar c = Calendar.getInstance();  
        System.out.println("年："+calendar.get(Calendar.YEAR));  
        System.out.println("月："+(calendar.get(Calendar.MONTH)+1));  
        System.out.println("日："+calendar.get(Calendar.DAY_OF_MONTH));  
        System.out.println("时："+calendar.get(Calendar.HOUR_OF_DAY));  
        System.out.println("分："+calendar.get(Calendar.MINUTE));  
        System.out.println("秒："+calendar.get(Calendar.SECOND));  
        System.out.println("毫秒："+calendar.get(Calendar.MILLISECOND));  
    }  
}
```

#### 三、DateFormat类

此类是一个日期的格式化类，专门格式化日期的操作，因为java.util.Date类本身就已经包含了完整的日期，
所以只需要将此日期安装一些好的格式格式化一下显示就好了。
<span style="color:red">public abstract class DateFormat</span>
此类也是一个抽象类，DateFormat类本身内部提供了可以直接为其实例化的操作。
<span style="color:red">得到日期的DateFormat对象  public  static  final  DateFormat  getDateInstance()</span>
<span style="color:red">得到日期和时间的DateFormat对象  public static  final  DateFormat  getDateTimeInstance()</span>
直接使用DateFormat类完成Date的的转换功能。

public  final  String  format(Date  date)

```java
public class T {  
    public static void main(String[] args) {  
        DateFormat df1 = DateFormat.getDateInstance();  //得到日期的DateFormat对象  
        DateFormat df2 = DateFormat.getDateTimeInstance(); //得到日期和时间的DateFormat对象  
        System.out.println(df1.format(new Date()));  
        System.out.println(df2.format(new Date()));  
    }  
}
```

#### 四、SimpleDateFormat类

```java
public class T2 {  
    public static void main(String[] args) throws ParseException {  
        String str = "1990-04-13";  
        String parten = "yyyy-MM-dd";  
        SimpleDateFormat sdf1 = new SimpleDateFormat(parten);  
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日");  
        Date date = sdf1.parse(str);  //解析字符串，将字符串转换为日期类型  
        System.out.println(sdf2.format(date));  
        System.out.println("级联形式： "+new SimpleDateFormat("yyyy年MM月dd日").format(new SimpleDateFormat("yyyy-MM-dd").parse(str)));  
          
        System.out.println("----忧愁的分割线------");  
          
        String s = "2008-08-08";  
        Date d = new SimpleDateFormat("yyyy-MM-dd").parse(s);  
        System.out.println(new SimpleDateFormat("yyyy年MM月dd日").format(d));  
    }  
}
```

<br>