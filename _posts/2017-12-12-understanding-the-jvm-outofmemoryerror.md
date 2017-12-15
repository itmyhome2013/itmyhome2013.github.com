---
layout: post
blog_id: "understanding-the-jvm-outofmemoryerror"
title: "深入理解Java虚拟机 - OutOfMemoryError异常"
date: 2017-12-12 00:00:00 -0700
tags: Java虚拟机
category: Java虚拟机
summary: 在Java虚拟机规范的描述中，除了程序计数器外，虚拟机内存的其他几个运行时区域都有发生OutOfMemoryError异常的可能
comments: false
---

在Java虚拟机规范的描述中，除了程序计数器外，虚拟机内存的其他几个运行时区域都有发生OutOfMemoryError（下文称OOM）异常的可能

下文代码的开头都注释了执行时所需要设置的虚拟机启动参数(注释中“VM Args”后面跟着的参数)，这些参数对实验的结果有直接影响，可在Eclipse IDE中设置如下：

```java
-verbose:gc -Xms20M -Xmx20M -Xmn10M -XX:+PrintGCDetails -XX:SurvivorRatio=8
```

### Java堆溢出

Java堆用于存储对象实例，只要不断地创建对象，并且保证GC Roots到对象之间有可达路径来避免垃圾回收机制清除这些对象，那么在对象数量到达最大堆的容量限制后就会产生内存溢出异常。

下面代码限制Java堆的大小为20MB，不可扩展（将堆的最小值-Xms参数与最大值-Xmx参数设置为一样即可避免堆自动扩展）

```java
/**
 * VM Args?-Xms20m-Xmx20m-XX
 * @author itmyhome
 */
public class HeapOOM {
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        List<OOMObject> list = new ArrayList<OOMObject>();

        while (true) {
            list.add(new OOMObject());
        }
    }

    static class OOMObject {
    }
}

```

运行结果

```java
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
```

Java堆内存的OOM异常是实际应用中常见的内存溢出异常情况。 当出现Java堆内存溢出时，异常堆栈信息“java.lang.OutOfMemoryError”会跟着进一步提示“Java heap space”。

### 虚拟机栈和本地方法栈溢出

由于在HotSpot虚拟机中并不区分虚拟机栈和本地方法栈，因此，对于HotSpot来说，虽然-Xoss参数（设置本地方法栈大小）存在，但实际上是无效的，栈容量只由-Xss参数设定。关于虚拟机栈和本地方法栈，在Java虚拟机规范中描述了两种异常：

+ 如果线程请求的栈深度大于虚拟机所允许的最大深度，将抛出StackOverflowError异常。
+ 如果虚拟机在扩展栈时无法申请到足够的内存空间，则抛出OutOfMemoryError异常。

这里把异常分成两种情况，看似更加严谨，但却存在着一些互相重叠的地方：当栈空间无法继续分配时，到底是内存太小，还是已使用的栈空间太大，其本质上只是对同一件事情的两种描述而已。

如果是建立过多线程导致内存溢出，在不能减少线程数或者更换64位虚拟机的情况下，就只能通过减少最大堆和减少栈容量来换取更多的线程。

### 方法区和运行时常量池溢出

由于运行时常量池是方法区的一部分，因此这两个区域的溢出测试就放在一起进行。 前面提到JDK 1.7开始逐步“去永久代”的事情，在此就以测试代码观察一下这件事对程序的实际影响。

String.intern（）是一个Native方法，它的作用是：如果字符串常量池中已经包含一个等于此String对象的字符串，则返回代表池中这个字符串的String对象；否则，将此String对象包含的字符串添加到常量池中，并且返回此String对象的引用。 在JDK 1.6及之前的版本中，由于常量池分配在永久代内，我们可以通过-XX：PermSize和-XX：MaxPermSize限制方法区大小，从而间接限制其中常量池的容量，如下面代码所示。

```java
/**
 * -XX:PermSize=10M -XX:MaxPermSize=10M
 * @author itmyhome
 */
public class RuntimeConstantPoolOOM {
    public static void main(String[] args) {
        // 使用List保持着常量池引用，避免Full GC回收常量池行为
        List<String> list = new ArrayList<String>();

        // 10MB的PermSize在integer范围内足够产生OOM了
        int i = 0;

        while (true) {
            list.add(String.valueOf(i++).intern());
        }
    }
}

```

运行结果

```java
Exception in thread"main"java.lang.OutOfMemoryError：PermGen space
at java.lang.String.intern（Native Method）
at org.fenixsoft.oom.RuntimeConstantPoolOOM.main（RuntimeConstantPoolOOM.java：17）
```

从运行结果中可以看到，运行时常量池溢出，在OutOfMemoryError后面跟随的提示信息是“PermGen space”，说明运行时常量池属于方法区（HotSpot虚拟机中的永久代）的一部分。

**而使用JDK 1.7运行这段程序就不会得到相同的结果，while循环将一直进行下去。**

方法区用于存放Class的相关信息，如类名、 访问修饰符、 常量池、 字段描述、 方法描述等。 对于这些区域的测试，基本的思路是运行时产生大量的类去填满方法区，直到溢出。 虽然直接使用Java SE API也可以动态产生类（如反射时的GeneratedConstructorAccessor和动态代理等），但在本次实验中操作起来比较麻烦。 下面借助CGLib直接操作字节码运行时生成了大量的动态类。

值得特别注意的是，我们在这个例子中模拟的场景并非纯粹是一个实验，这样的应用经常会出现在实际应用中：当前的很多主流框架，如Spring、 Hibernate，在对类进行增强时，都会使用到CGLib这类字节码技术，增强的类越多，就需要越大的方法区来保证动态生成的Class可以加载入内存。 另外，JVM上的动态语言（例如Groovy等）通常都会持续创建类来实现语言的动态性，随着这类语言的流行，也越来越容易遇到相似的溢出场景。

```java
import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;
import java.lang.reflect.Method;

/**
 * -XX:PermSize=10M -XX:MaxPermSize=10M
 * @author itmyhome
 */
public class JavaMethodAreaOOM {
    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        while (true) {
            Enhancer enhancer = new Enhancer();
            enhancer.setSuperclass(OOMObject.class);
            enhancer.setUseCache(false);
            enhancer.setCallback(new MethodInterceptor() {
                    public Object intercept(Object obj, Method method,
                        Object[] args, MethodProxy proxy)
                        throws Throwable {
                        return proxy.invokeSuper(obj, args);
                    }
                });
            enhancer.create();
        }
    }

    static class OOMObject {
    }
}

```

运行结果：

```java
Exception in thread "main" java.lang.OutOfMemoryError: PermGen space
	at java.lang.Class.getDeclaredMethods0(Native Method)
	at java.lang.Class.privateGetDeclaredMethods(Class.java:2427)
```

方法区溢出也是一种常见的内存溢出异常，一个类要被垃圾收集器回收掉，判定条件是比较苛刻的。 在经常动态生成大量Class的应用中，需要特别注意类的回收状况。 这类场景除了上面提到的程序使用了CGLib字节码增强和动态语言之外，常见的还有：大量JSP或动态产生JSP文件的应用（JSP第一次运行时需要编译为Java类）、 基于OSGi的应用（即使是同一个类文件，被不同的加载器加载也会视为不同的类）等。

### 本机直接内存溢出

DirectMemory容量可通过-XX：MaxDirectMemorySize指定，如果不指定，则默认与Java堆最大值（-Xmx指定）一样，如下代码越过了DirectByteBuffer类，直接通过反射获取Unsafe实例进行内存分配（Unsafe类的getUnsafe( )方法限制了只有引导类加载器才会返回实例，也就是设计者希望只有rt.jar中的类才能使用Unsafe的功能）。 因为，虽然使用DirectByteBuffer分配内存也会抛出内存溢出异常，但它抛出异常时并没有真正向操作系统申请分配内存，而是通过计算得知内存无法分配，于是手动抛出异常，真正申请分配内存的方法是unsafe.allocateMemory( )。

```java
import java.lang.reflect.Field;
import sun.misc.Unsafe;

/**
 * VM Args?-Xmx20M-XX?MaxDirectMemorySize=10M
 * @author itmyhome
 */
public class DirectMemoryOOM {
    private static final int _1MB = 1024 * 1024;

    public static void main(String[] args) throws Exception {
        // TODO Auto-generated method stub
        Field unsafeField = Unsafe.class.getDeclaredFields()[0];
        unsafeField.setAccessible(true);

        Unsafe unsafe = (Unsafe) unsafeField.get(null);

        while (true) {
            unsafe.allocateMemory(_1MB);
        }
    }
}

```

运行结果

```java
Exception in thread "main" java.lang.OutOfMemoryError
	at sun.misc.Unsafe.allocateMemory(Native Method)
	at com.becoda.bkms.bus.energyStatis.web.DirectMemoryOOM.main(DirectMemoryOOM.java:17)
```

由DirectMemory导致的内存溢出，一个明显的特征是在Heap Dump文件中不会看见明显的异常，如果读者发现OOM之后Dump文件很小，而程序中又直接或间接使用了NIO，那就可以考虑检查一下是不是这方面的原因。

<hr>

参考文献：<a href="http://itmyhome.com/java-virtual-machine/" target="_blank">深入理解Java虚拟机</a> 周志明 著