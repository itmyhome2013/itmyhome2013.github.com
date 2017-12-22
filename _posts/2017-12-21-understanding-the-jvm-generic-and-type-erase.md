---
layout: post
blog_id: "understanding-the-jvm-generic-and-type-erase"
title: "深入理解Java虚拟机 - 泛型与类型擦除"
date: 2017-12-21 00:00:00 -0700
tags: Java虚拟机
category: Java虚拟机
summary: 泛型是JDK 1.5的一项新增特性，它的本质是参数化类型的应用，也就是说所操作的数据类型被指定为一个参数。
comments: false
---

泛型是JDK 1.5的一项新增特性，它的本质是参数化类型（Parametersized Type）的应用，也就是说所操作的数据类型被指定为一个参数。 这种参数类型可以用在类、 接口和方法的创建中，分别称为泛型类、 泛型接口和泛型方法。

Java语言中的泛型只在程序源码中存在，在编译后的字节码文件中，就已经替换为原来的原生类型了，并且在相应的地方插入了强制转换代码，因此，对于运行期的Java语言来说，ArrayList＜int＞与ArrayList＜String＞就是同一个类，所以泛型技术实际上是Java语言的一颗语法糖,Java语言中的泛型实现方法称为类型擦除,基于这种方法实现的泛型称为伪泛型。

看下面一段简单的Java泛型的例子

```java
public static void main(String[] args) {
	Map<String, String> map = new HashMap<String, String>();
	map.put("hello", "你好");
	map.put("how are you?", "天气不错");
	System.out.println(map.get("hello"));
	System.out.println(map.get("how are you?"));
}
```

把这段Java代码编译成Class文件，然后再用字节码反编译工具进行反编译后，将会发现泛型都不见了，程序又变回了Java泛型出现之前的写法，泛型类型都变回了原生类型，如下所示。

```java
public static void main(String[] args) {
	Map map = new HashMap();
	map.put("hello", "你好");
	map.put("how are you?", "天气不错");
	System.out.println((String)map.get("hello"));
	System.out.println((String)map.get("how are you?"));
}
```

#### 类型擦除带来的问题

正是由于类型擦除的隐蔽存在，直接导致了众多的泛型灵异问题，如当泛型遇见重载

```java
public class GenericTypes {
    public static void method(List<String> list) {
        System.out.println("List<String> list");
    }

    public static void method(List<Integer> list) {
        System.out.println("List<Integer> list");
    }
}
```

这段代码将无法进行编译，因为参数List＜Integer＞和List＜String＞编译之后都被擦除了，变成了一样的原生类型List＜E＞，擦除动作导致这两种方法的特征签名变得一模一样。初步看来，无法重载的原因已经找到了，但真的就是如此吗？只能说，泛型擦除成相同的原生类型只是无法重载的其中一部分原因，请再接着如下代码

```java
public class GenericTypes {
    public static String method(List<String> list) {
        System.out.println("invoke method List<String> list");
        return "";
    }

    public static int method(List<Integer> list) {
        System.out.println("invoke method List<Integer> list");
        return 1;
    }

    public static void main(String[] args) {
        method(new ArrayList<String>());
        method(new ArrayList<Integer>());
    }
}
```

执行结果

```java
invoke method List<String> list
invoke method List<Integer> list
```

方法重载要求方法具备不同的特征签名，返回值并不包含在方法的特征签名之中，所以返回值不参与重载选择，但是在 Class 文件格式之中，只要描述符不是完全一致的两个方法就可以共存。也就是说，两个方法如果有相同的名称和特征签名，但返回值不同，那它们也是可以合法地共存于一个 Class 文件中的。

由于 List＜String＞和 List＜Integer＞擦除后是同一个类型，我们只能添加两个并不需要实际使用到的返回值才能完成重载。

擦除法所谓的擦除，仅仅是对方法的 Code 属性中的字节码进行擦除，实际上元数据中还是保留了泛型信息，这也是我们能通过反射手段取得参数化类型的根本依据。

<hr>

参考文献：<a href="http://itmyhome.com/java-virtual-machine/" target="_blank">深入理解Java虚拟机</a> 周志明 著