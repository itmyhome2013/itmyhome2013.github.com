---
layout: post
blog_id: "java-study-notes-judge-and-loop"
title: "Java学习笔记03--判断与循环语句"
date: 2015-03-03 00:00:00 -0700
tags: Java
category: Java
summary: 程序的结构一般来说程序的结构包含有下面三种：顺序结构、选择结构、循环结构
comments: false
---
<br>

#### 程序的结构

一般来说程序的结构包含有下面三种：

+ 顺序结构
+ 选择结构
+ 循环结构

![License Badge]({{ site.baseurl}}/images/java/03/1.png)

![License Badge]({{ site.baseurl}}/images/java/03/2.png)

![License Badge]({{ site.baseurl}}/images/java/03/3.png)

![License Badge]({{ site.baseurl}}/images/java/03/4.png)

在使用switch进行表达式判断的时候，在表达式中只能使用数字或字符。

```java
public class T {  
    // 完成一个四则运算的功能  
    public static void main(String args[]){  
        int x = 3 ;  
        int y = 6 ;  
        char oper = '+' ;  
        switch(oper){  
            case '+':{  // 执行加法操作  
                System.out.println("x + y = " + (x + y )) ;  
                break ;  
            }  
            case '-':{  // 执行减法操作  
                System.out.println("x - y = " + (x - y )) ;  
                break ;  
            }  
            case '*':{  // 执行乘法操作  
                System.out.println("x * y = " + (x * y )) ;  
                break ;  
            }  
            case '/':{  // 执行除法操作  
                System.out.println("x / y = " + (x / y )) ;  
                break ;  
            }  
            default:{  
                System.out.println("未知的操作！") ;  
                break ;  
            }  
        }  
    }  
}
```

在以上的操作中，每个语句后面都会存在一个break，此语句表示退出整个switch()语句，
如果不写上此语句，则所有的操作将在第一个满足条件之后全部输出直到遇到break为止

![License Badge]({{ site.baseurl}}/images/java/03/5.png)

```java
public class T {  
    // 完成一个四则运算的功能  
    public static void main(String args[]){  
        int x = 1;   
        int sum = 0 ;   // 保存累加的结果  
        while(x<=10){  
            sum += x ;  // 进行累加操作  
            x++ ;       // 修改循环条件  
        }  
        System.out.println("1 --> 10 累加的结果为：" + sum) ;  
    }  
}
```

![License Badge]({{ site.baseurl}}/images/java/03/6.png)

```java
public class T {  
    public static void main(String args[]){  
        int x = 1;   
        int sum = 0 ;   // 保存累加的结果  
        do{  
            sum += x ;  // 执行累加操作  
            x++ ;  
        }while(x<=10) ;  
        System.out.println("1 --> 10 累加的结果为：" + sum) ;  
    }  
}
```

![License Badge]({{ site.baseurl}}/images/java/03/7.png)

```java
public class T {  
    public static void main(String args[]){  
        int sum = 0 ;   // 保存累加的结果  
        for(int x=1;x<=10;x++){  
            sum += x ;  
        }  
        System.out.println("1 --> 10 累加的结果为：" + sum) ;  
    }  
}
```

#### 中断语句

![License Badge]({{ site.baseurl}}/images/java/03/8.png)

![License Badge]({{ site.baseurl}}/images/java/03/9.png)

```java
public class T {  
    public static void main(String args[]){  
        for(int i=0;i<10;i++){  
            if(i==3){  
                break;  
            }  
            System.out.println("i = " + i) ;  
        }  
    }  
}
```

输出结果

```diff
i = 0  
i = 1  
i = 2 
```

![License Badge]({{ site.baseurl}}/images/java/03/10.png)

![License Badge]({{ site.baseurl}}/images/java/03/11.png)

使用continue就是中断一次循环的执行

```java
public class T {  
    public static void main(String args[]){  
        for(int i=0;i<10;i++){  
            if(i==3){  
                continue;  
            }  
            System.out.println("i = " + i) ;  
        }  
    }  
}
```

输出结果

```diff
i = 0  
i = 1  
i = 2  
i = 4  
i = 5  
i = 6  
i = 7  
i = 8  
i = 9
```

<br>
