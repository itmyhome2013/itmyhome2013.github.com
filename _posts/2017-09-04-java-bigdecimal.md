---
layout: post
blog_id: "java-bigdecimal"
title: "Java使用BigDecimal进行高精度计算"
date: 2017-09-04 00:00:00 -0700
tags: Java
category: Java
summary: 在 Java 程序中使用浮点数和小数充满着陷阱
comments: false
---

首先看如下代码示例：

```java
System.out.println(0.05 + 0.01);
System.out.println(0.05 - 0.03);
System.out.println(1.025 * 100);
System.out.println(305.1 / 1000);
```

输出结果为：

```java
0.060000000000000005
0.020000000000000004
102.49999999999999
0.30510000000000004
```

Java语言支持两种基本的浮点类型：float和double，以及与它们对应的包装类Float和Double。它们都依据IEEE 754 标准，该标准为 32 位浮点和 64 位双精度浮点二进制小数定义了二进制标准。

IEEE 754 用科学记数法以底数为 2 的小数来表示浮点数。IEEE 浮点数用 1 位表示数字的符号，用 8 位来表示指数，用 23 位来表示尾数，即小数部分，作为有符号整数的指数可以有正负之分，小数部分用二进制（底数 2）小数来表示

#### 不要用浮点值表示精确值

一些非整数值（如几美元和几美分这样的小数）需要很精确。浮点数不是精确值，所以使用它们会导致舍入误差。因此，使用浮点数来试图表示象货币量这样的精确数量不是一个好的想法。使用浮点数来进行美元和美分计算会得到灾难性的后果。浮点数最好用来表示象测量值这类数值，这类值从一开始就不怎么精确。

#### 使用BigDecimal

从 JDK 1.3 起，Java 开发人员就有了另一种数值表示法来表示非整数： BigDecimal 。 BigDecimal 是标准的类，在编译器中不需要特殊支持，它可以表示任意精度的小数，并对它们进行计算。

用于加、减、乘和除的方法给 BigDecimal 值提供了算术运算。由于 BigDecimal 对象是不可变的，这些方法中的每一个都会产生新的 BigDecimal 对象。因此，因为创建对象的开销， BigDecimal 不适合于大量的数学计算，但设计它的目的是用来精确地表示小数。如果您正在寻找一种能精确表示如货币量这样的数值，则 BigDecimal 可以很好地胜任该任务。


#### 构造 BigDecimal 数

对于 BigDecimal ，有几个可用的构造函数。其中一个构造函数以双精度浮点数作为输入，另一个以整数和换算因子作为输入，还有一个以小数的 String 表示作为输入。<span style="text-decoration: underline;">要小心使用 BigDecimal(double) 构造函数，因为如果不了解它，会在计算过程中产生舍入误差。`请使用基于整数或 String 的构造函数`。</span>

```java
public class Test {
    public static void main(String[] args) {
        // 以双精度浮点数进行构造
        BigDecimal bd1 = new BigDecimal(0.5);
        BigDecimal bd2 = new BigDecimal(0.1);
        System.out.println(bd1.add(bd2));

        // 以String类型进行构造
        BigDecimal bd3 = new BigDecimal("0.5");
        BigDecimal bd4 = new BigDecimal("0.1");
        System.out.println(bd3.add(bd4));
    }
}
```

输出结果为：

```bath
0.6000000000000000055511151231257827021181583404541015625
0.6
```

上面代码分别以

```java
BigDecimal(double val)
BigDecimal(String val)
```

不同的方式进行构造 BigDecimal 数，输出的结果是不一样的。

回到最开始的示例，提供工具类进行精确的浮点数运算，包括加减乘除和四舍五入。

```java
import java.math.BigDecimal;

public class ArithUtil {
    private static final int DEF_DIV_SCALE = 6; // 默认除法运算精度

    /**
     * 提供精确的加法运算。
     *
     * @param v1 被加数
     * @param v2 加数
     * @return 两个参数的和
     */
    public static double add(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.add(b2).doubleValue();
    }

    /**
     * 提供精确的减法运算。
     *
     * @param v1 被减数
     * @param v2 减数
     * @return 两个参数的差
     */
    public static double sub(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.subtract(b2).doubleValue();
    }

    /**
     * 提供精确的乘法运算。
     *
     * @param v1 被乘数
     * @param v2 乘数
     * @return 两个参数的积
     */
    public static double mul(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.multiply(b2).doubleValue();
    }

    /**
     * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到 小数点以后10位，以后的数字四舍五入。
     *
     * @param v1 被除数
     * @param v2 除数
     * @return 两个参数的商
     */
    public static double div(double v1, double v2) {
        return div(v1, v2, DEF_DIV_SCALE);
    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指 定精度，以后的数字四舍五入。
     *
     * @param v1 被除数
     * @param v2 除数
     * @param scale  表示表示需要精确到小数点以后几位。
     * @return 两个参数的商
     */
    public static double div(double v1, double v2, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException(
                "The scale must be a positive integer or zero");
        }

        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.divide(b2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    /**
     * 提供精确的小数位四舍五入处理。
     *
     * @param v 需要四舍五入的数字
     * @param scale 小数点后保留几位
     * @return 四舍五入后的结果
     */
    public static double round(double v, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException(
                "The scale must be a positive integer or zero");
        }

        BigDecimal b = new BigDecimal(Double.toString(v));
        BigDecimal one = new BigDecimal("1");

        return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
    }
}
```

#### 结束语：

在 Java 程序中使用浮点数和小数充满着陷阱。浮点数和小数不象整数一样“循规蹈矩”，不能假定浮点计算一定产生整型或精确的结果，虽然它们的确“应该”那样做。最好将浮点运算保留用作计算本来就不精确的数值，譬如测量。如果需要表示定点数（譬如，几美元和几美分），则使用 BigDecimal 。



