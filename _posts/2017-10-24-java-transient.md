---
layout: post
blog_id: "java-transient"
title: "Java之transient关键字详解"
date: 2017-10-24 00:00:00 -0700
tags: Java
category: Java
summary: 被transient关键字修饰的变量不再能被序列化
comments: false
---

### 1、transient的作用及使用方法

Java对象序列化是 JDK 1.1 中引入的一组开创性特性之一，用于作为一种将Java对象的状态转换为字节数组，以便存储或传输的机制，以后，仍可以将字节数组转换回 Java 对象原有的状态。

实际上，序列化的思想是 “冻结” 对象状态，传输对象状态（写到磁盘、通过网络传输等等），然后 “解冻” 状态，重新获得可用的 Java 对象。

我们都知道一个对象只要实现了Serilizable接口,这个对象就可以被序列化,java的这种序列化模式为开发者提供了很多便利，我们可以不必关系具体序列化的过程，只要这个类实现了Serilizable接口,这个类的所有属性和方法都会自动序列化。

然而在实际开发过程中，我们可能会遇到这样的问题，这个类的某些属性需要序列化，而其他属性不需要被序列化，比如一些敏感信息(如密码)，为了安全起见，不希望在网络操作中被传输，这些信息对应的变量就可以加上transient关键字。

**代码清单**

```java
class Person implements Serializable {
    private String username;
    private transient String password; // transient修饰的变量不再被序列化
    private static transient String address; // 一个静态变量不管是否被transient修饰，均不能被序列化

    public Person(String username, String password, String address) {
        this.username = username;
        this.password = password;
        this.address = address;
    }

    public String toString() {
        return "username: " + username + ", password: " + password +
        ", address: " + address;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public static String getAddress() {
        return address;
    }
    public static void setAddress(String address) {
        Person.address = address;
    }
}


public class Test {
    public static void main(String[] args) {
        Person person = new Person("itmyhome", "27", "beijing");

        try {
            // 将对象写入文件
            ObjectOutputStream os = new ObjectOutputStream(new FileOutputStream("f:/test.txt"));
            os.writeObject(person);
            os.flush();
            os.close();

            // 读取对象文件
            ObjectInputStream ins = new ObjectInputStream(new FileInputStream("f:/test.txt"));
            Person per = (Person) ins.readObject();
            System.out.println(per);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

```

输出结果：

```java
username: itmyhome, password: null, address: beijing
```

可以看出虽然password和address都被transient修饰，但只有password没有被序列化。

### 2、transient使用小结

+ 1、transient关键字只能修饰变量，而不能修饰方法和类。
+ 2、被transient关键字修饰的变量不再能被序列化，一个静态变量不管是否被transient修饰，均不能被序列化。
+ 3、一旦变量被transient修饰，变量将不再是对象持久化的一部分，该变量内容在序列化后无法获得访问。






