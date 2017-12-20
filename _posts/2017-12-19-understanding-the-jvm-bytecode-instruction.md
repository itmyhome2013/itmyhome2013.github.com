---
layout: post
blog_id: "understanding-the-jvm-bytecode-instruction"
title: "深入理解Java虚拟机 - 字节码指令集"
date: 2017-12-19 00:00:00 -0700
tags: Java虚拟机
category: Java虚拟机
summary: Java虚拟机的指令由一个字节长度的、 代表着某种特定操作含义的数字以及跟随其后的零至多个代表此操作所需参数而构成。
comments: false
---

Java虚拟机的指令由一个字节长度的、 代表着某种特定操作含义的数字（称为操作码，Opcode）以及跟随其后的零至多个代表此操作所需参数（称为操作数，Operands）而构成。

#### 字节码与数据类型

在Java虚拟机的指令集中，大多数的指令都包含了其操作所对应的数据类型信息。 例如，iload指令用于从局部变量表中加载int型的数据到操作数栈中，而fload指令加载的则是float类型的数据。 这两条指令的操作在虚拟机内部可能会是由同一段代码来实现的，但在Class文件中它们必须拥有各自独立的操作码。

对于大部分与数据类型相关的字节码指令，它们的操作码助记符中都有特殊的字符来表明专门为哪种数据类型服务：i代表对int类型的数据操作，l代表long,s代表short,b代表byte,c代表char,f代表float,d代表double,a代表reference。 也有一些指令的助记符中没有明确地指明操作类型的字母，如arraylength指令，它没有代表数据类型的特殊字符，但操作数永远只能是一个数组类型的对象。 还有另外一些指令，如无条件跳转指令goto则是与数据类型无关的。

#### 加载和存储指令

加载和存储指令用于将数据在栈帧中的局部变量表和操作数栈之间来回传输，这类指令包括如下内容。

+ 将一个局部变量加载到操作栈：iload、 iload_＜n＞、 lload、 lload_＜n＞、 fload、 fload_＜n＞、 dload、 dload_＜n＞、 aload、 aload_＜n＞。
+ 将一个数值从操作数栈存储到局部变量表：istore、 istore_＜n＞、 lstore、 lstore_＜n＞、fstore、 fstore_＜n＞、 dstore、 dstore_＜n＞、 astore、 astore_＜n＞。
+ 将一个常量加载到操作数栈：bipush、 sipush、 ldc、 ldc_w、 ldc2_w、 aconst_null、iconst_m1、 iconst_＜i＞、 lconst_＜l＞、 fconst_＜f＞、 dconst_＜d＞。
+ 扩充局部变量表的访问索引的指令：wide。

#### 运算指令

运算或算术指令用于对两个操作数栈上的值进行某种特定运算，并把结果重新存入到操作栈顶。 大体上算术指令可以分为两种：对整型数据进行运算的指令与对浮点型数据进行运算的指令，无论是哪种算术指令，都使用Java虚拟机的数据类型，由于没有直接支持byte、short、 char和boolean类型的算术指令，对于这类数据的运算，应使用操作int类型的指令代替。 整数与浮点数的算术指令在溢出和被零除的时候也有各自不同的行为表现，所有的算术指令如下。

+ 加法指令：iadd、 ladd、 fadd、 dadd。
+ 减法指令：isub、 lsub、 fsub、 dsub。
+ 乘法指令：imul、 lmul、 fmul、 dmul。
+ 除法指令：idiv、 ldiv、 fdiv、 ddiv。
+ 求余指令：irem、 lrem、 frem、 drem。
+ 取反指令：ineg、 lneg、 fneg、 dneg。
+ 位移指令：ishl、 ishr、 iushr、 lshl、 lshr、 lushr。
+ 按位或指令：ior、 lor。
+ 按位与指令：iand、 land。
+ 按位异或指令：ixor、 lxor。
+ 局部变量自增指令：iinc。
+ 比较指令：dcmpg、 dcmpl、 fcmpg、 fcmpl、 lcmp。

#### 类型转换指令

类型转换指令可以将两种不同的数值类型进行相互转换，这些转换操作一般用于实现用户代码中的显式类型转换操作

+ int类型到long、 float或者double类型。
+ long类型到float、 double类型。
+ float类型到double类型。

#### 对象创建与访问指令

虽然类实例和数组都是对象，但Java虚拟机对类实例和数组的创建与操作使用了不同的字节码指令。 对象创建后，就可以通过对象访问指令获取对象实例或者数组实例中的字段或者数组元素，这些指令如下。

+ 创建类实例的指令：new。
+ 创建数组的指令：newarray、 anewarray、 multianewarray。
+ 访问类字段（static字段，或者称为类变量）和实例字段（非static字段，或者称为实例变量）的指令：getfield、 putfield、 getstatic、 putstatic。
+ 把一个数组元素加载到操作数栈的指令：baload、 caload、 saload、 iaload、 laload、faload、 daload、 aaload。
+ 将一个操作数栈的值存储到数组元素中的指令：bastore、 castore、 sastore、 iastore、fastore、 dastore、 aastore。
+ 取数组长度的指令：arraylength。
+ 检查类实例类型的指令：instanceof、 checkcast。

#### 操作数栈管理指令

如同操作一个普通数据结构中的堆栈那样，Java虚拟机提供了一些用于直接操作操作数栈的指令，包括：

+ 将操作数栈的栈顶一个或两个元素出栈：pop、 pop2。
+ 复制栈顶一个或两个数值并将复制值或双份的复制值重新压入栈顶：dup、 dup2、dup_x1、 dup2_x1、 dup_x2、 dup2_x2。
+ 将栈最顶端的两个数值互换：swap。

#### 控制转移指令

控制转移指令可以让Java虚拟机有条件或无条件地从指定的位置指令而不是控制转移指令的下一条指令继续执行程序，从概念模型上理解，可以认为控制转移指令就是在有条件或无条件地修改PC寄存器的值。 控制转移指令如下。

+ 条件分支：ifeq、 iflt、 ifle、 ifne、 ifgt、 ifge、 ifnull、 ifnonnull、 if_icmpeq、 if_icmpne、if_icmplt、 if_icmpgt、 if_icmple、 if_icmpge、 if_acmpeq和if_acmpne。
+ 复合条件分支：tableswitch、 lookupswitch。
+ 无条件分支：goto、 goto_w、 jsr、 jsr_w、 ret。

在Java虚拟机中有专门的指令集用来处理int和reference类型的条件分支比较操作，为了可以无须明显标识一个实体值是否null，也有专门的指令用来检测null值。

#### 方法调用和返回指令

+ invokevirtual指令用于调用对象的实例方法，根据对象的实际类型进行分派（虚方法分派），这也是Java语言中最常见的方法分派方式。
+ invokeinterface指令用于调用接口方法，它会在运行时搜索一个实现了这个接口方法的对象，找出适合的方法进行调用。
+ invokespecial指令用于调用一些需要特殊处理的实例方法，包括实例初始化方法、 私有方法和父类方法。
+ invokestatic指令用于调用类方法（static方法）。
+ invokedynamic指令用于在运行时动态解析出调用点限定符所引用的方法，并执行该方法，前面4条调用指令的分派逻辑都固化在Java虚拟机内部，而invokedynamic指令的分派逻辑是由用户所设定的引导方法决定的。

方法调用指令与数据类型无关，而方法返回指令是根据返回值的类型区分的，包括ireturn（当返回值是boolean、 byte、 char、 short和int类型时使用）、 lreturn、 freturn、 dreturn和areturn，另外还有一条return指令供声明为void的方法、 实例初始化方法以及类和接口的类初始化方法使用。

#### 异常处理指令

在Java程序中显式抛出异常的操作（throw语句）都由athrow指令来实现，除了用throw语句显式抛出异常情况之外，Java虚拟机规范还规定了许多运行时异常会在其他Java虚拟机指令检测到异常状况时自动抛出。 例如，在前面介绍的整数运算中，当除数为零时，虚拟机会在idiv或ldiv指令中抛出ArithmeticException异常。

而在Java虚拟机中，处理异常（catch语句）不是由字节码指令来实现的（很久之前曾经使用jsr和ret指令来实现，现在已经不用了），而是采用异常表来完成的。

#### 同步指令

Java虚拟机可以支持方法级的同步和方法内部一段指令序列的同步，这两种同步结构都是使用管程（Monitor）来支持的。

方法级的同步是隐式的，即无须通过字节码指令来控制，它实现在方法调用和返回操作之中。 虚拟机可以从方法常量池的方法表结构中的ACC_SYNCHRONIZED访问标志得知一个方法是否声明为同步方法。 当方法调用时，调用指令将会检查方法的ACC_SYNCHRONIZED访问标志是否被设置，如果设置了，执行线程就要求先成功持有管程，然后才能执行方法，最后当方法完成（无论是正常完成还是非正常完成）时释放管程。 在方法执行期间，执行线程持有了管程，其他任何线程都无法再获取到同一个管程。 如果一个同步方法执行期间抛出了异常，并且在方法内部无法处理此异常，那么这个同步方法所持有的管程将在异常抛到同步方法之外时自动释放。

同步一段指令集序列通常是由Java语言中的synchronized语句块来表示的，Java虚拟机的指令集中有monitorenter和monitorexit两条指令来支持synchronized关键字的语义，正确实现synchronized关键字需要Javac编译器与Java虚拟机两者共同协作支持

<hr>

参考文献：<a href="http://itmyhome.com/java-virtual-machine/" target="_blank">深入理解Java虚拟机</a> 周志明 著