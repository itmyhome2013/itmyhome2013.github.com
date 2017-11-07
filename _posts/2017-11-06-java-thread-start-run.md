---
layout: post
blog_id: "java-thread-start-run"
title: "了解Java线程的start方法如何回调run方法"
date: 2017-11-06 00:00:00 -0700
tags: 线程
category: 线程
summary: 实际上,创建线程最重要的是提供线程函数(回调函数),该函数作为新创建线程的入口函数
comments: false
---

#### Java 创建线程的方法

实际上，创建线程最重要的是提供线程函数（回调函数），该函数作为新创建线程的入口函数，实现自己想要的功能。Java 提供了两种方法来创建一个线程：

**继承 Thread 类**

```java
class MyThread extends Thread{ 
    public void run() {    
        System.out.println("My thread is started."); 
    } 
}
```

实现该继承类的 run 方法，然后就可以创建这个子类的对象，调用 start 方法即可创建一个新的线程：

```java
MyThread myThread = new MyThread(); 
myThread.start();
```

**实现 Runnable 接口**

```java
class MyRunnable implements Runnable{ 
    public void run() { 
        System.out.println("My runnable is invoked."); 
    } 
}
```

实现 Runnable 接口的类的对象可以作为一个参数传递到创建的 Thread 对象中，同样调用 Thread#start 方法就可以在一个新的线程中运行 run 方法中的代码了。

```java
Thread myThread = new Thread( new MyRunnable()); 
myThread.start();
```

可以看到，不管是用哪种方法，实际上都是要实现一个 run 方法的。 该方法本质是上一个回调方法。由 start 方法新创建的线程会调用这个方法从而执行需要的代码。 从后面可以看到，run 方法并不是真正的线程函数，只是被线程函数调用的一个 Java 方法而已，和其他的 Java 方法没有什么本质的不同。

#### Java 线程的实现

从概念上来说，一个 Java 线程的创建根本上就对应了一个本地线程（native thread）的创建，两者是一一对应的。 问题是，本地线程执行的应该是本地代码，而 Java 线程提供的线程函数是 Java 方法，编译出的是 Java 字节码，所以可以想象的是， Java 线程其实提供了一个统一的线程函数，该线程函数通过 Java 虚拟机调用 Java 线程方法 , 这是通过 Java 本地方法调用来实现的。

**以下是 Thread#start 方法的示例：**

```java
public synchronized void start() { 
    …
    start0(); 
    …
}
```

可以看到它实际上调用了本地方法 start0, 该方法的声明如下：

```java
private native void start0();
```

Thread 类有个 registerNatives 本地方法，该方法主要的作用就是注册一些本地方法供 Thread 类使用，如 start0()，stop0() 等等，可以说，所有操作本地线程的本地方法都是由它注册的 . 这个方法放在一个 static 语句块中，这就表明，当该类被加载到 JVM 中的时候，它就会被调用，进而注册相应的本地方法。

```java
private static native void registerNatives(); 
static{ 
  registerNatives(); 
}
```

本地方法 registerNatives 是定义在 Thread.c 文件中的。Thread.c 是个很小的文件，定义了各个操作系统平台都要用到的关于线程的公用数据和操作，如代码清单 1 所示。

**清单1**

```java
JNIEXPORT void JNICALL 
Java_Java_lang_Thread_registerNatives (JNIEnv *env, jclass cls){ 
  (*env)->RegisterNatives(env, cls, methods, ARRAY_LENGTH(methods)); 
} 
static JNINativeMethod methods[] = { 
   {"start0", "()V",(void *)&JVM_StartThread}, 
   {"stop0", "(" OBJ ")V", (void *)&JVM_StopThread}, 
    {"isAlive","()Z",(void *)&JVM_IsThreadAlive}, 
    {"suspend0","()V",(void *)&JVM_SuspendThread}, 
    {"resume0","()V",(void *)&JVM_ResumeThread}, 
    {"setPriority0","(I)V",(void *)&JVM_SetThreadPriority}, 
    {"yield", "()V",(void *)&JVM_Yield}, 
    {"sleep","(J)V",(void *)&JVM_Sleep}, 
    {"currentThread","()" THD,(void *)&JVM_CurrentThread}, 
    {"countStackFrames","()I",(void *)&JVM_CountStackFrames}, 
    {"interrupt0","()V",(void *)&JVM_Interrupt}, 
    {"isInterrupted","(Z)Z",(void *)&JVM_IsInterrupted}, 
    {"holdsLock","(" OBJ ")Z",(void *)&JVM_HoldsLock}, 
    {"getThreads","()[" THD,(void *)&JVM_GetAllThreads}, 
    {"dumpThreads","([" THD ")[[" STE, (void *)&JVM_DumpThreads}, 
};
```

到此，可以容易的看出 Java 线程调用 start 的方法，实际上会调用到 JVM_StartThread 方法，那这个方法又是怎样的逻辑呢。实际上，我们需要的是（或者说 Java 表现行为）该方法最终要调用 Java 线程的 run 方法，事实的确如此。 在 jvm.cpp 中，有如下代码段：

```java
JVM_ENTRY(void, JVM_StartThread(JNIEnv* env, jobject jthread)) 
   …
    native_thread = new JavaThread(&thread_entry, sz); 
   …
```

**这里JVM_ENTRY是一个宏，用来定义**JVM_StartThread 函数，可以看到函数内创建了真正的平台相关的本地线程，其线程函数是 thread_entry，如清单 2 所示。

**清单2**

```java
static void thread_entry(JavaThread* thread, TRAPS) { 
   HandleMark hm(THREAD); 
    Handle obj(THREAD, thread->threadObj()); 
    JavaValue result(T_VOID); 
    JavaCalls::call_virtual(&result,obj, 
    KlassHandle(THREAD,SystemDictionary::Thread_klass()), 
    vmSymbolHandles::run_method_name(), 
vmSymbolHandles::void_method_signature(),THREAD); 
}
```

可以看到调用了 vmSymbolHandles::run_method_name 方法，这是在 vmSymbols.hpp 用宏定义的：

```java
class vmSymbolHandles: AllStatic { 
   …
    template(run_method_name,"run") 
   …
}
```

至于 run_method_name 是如何声明定义的，因为涉及到很繁琐的代码细节，本文不做赘述。感兴趣的读者可以自行查看 JVM 的源代码。

图. Java 线程创建调用关系图

![License Badge]({{ site.baseurl}}/images/thread/2.png)

<hr>
链接: <a href="https://www.ibm.com/developerworks/cn/java/j-lo-processthread/" target="_blank">Java 中的进程与线程</a>
