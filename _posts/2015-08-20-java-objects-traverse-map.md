---
layout: post
blog_id: "java-objects-traverse-map"
title: "Java中遍历Map对象"
date: 2015-08-20 00:00:00 -0700
tags: Java
category: Java
summary: 介绍一些最常用的Java遍历Map对象的方法
comments: false
---
<br>

下面列出一些最常用的Java遍历Map对象的方法.

#### **1、在for-each中使用entrySet遍历**

这是最常用的遍历方式。在键值都需要时使用。

```java
Map<String,String> map = new HashMap<String,String>();

for(Map.Entry<String, String> entry : map.entrySet()){
    System.out.println(entry.getKey()+" : "+entry.getValue());
}
```

#### **2、在for-each循环中遍历keys或values**

如果只需要map中的键或者值，可以通过keySet或values来实现遍历，而不是用entrySet。

```java
Map<String,String> map = new HashMap<String,String>();

for(String key : map.keySet()){
    System.out.println("key: " + key);
}
for(String value : map.values()){
    System.out.println("value: " + value);
}
```

#### **3、使用Iterator遍历**

```java
Map<String,String> map = new HashMap<String,String>();

Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();
while(iterator.hasNext()){
    Map.Entry<String, String> m = iterator.next();
    System.out.println(m.getKey()+ " : "+m.getValue());
}
```

使用此方法在遍历时调用iterator.remove()可以删除entries，其他方法则不能，可能会产生意想不到的结果。

#### **4、通过key遍历value**

```java
Map<String,String> map = new HashMap<String,String>();

for(String key : map.keySet()){
    String value = map.get(key);
    System.out.println(key + " : " +value);
}
```

举个栗子

```java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class T {

    public static void main(String[] args) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("beijing", "kaoya");
        map.put("henan", "hulatang");
        map.put("tianjin", "mahua");

        System.out.println("1、在for-each中使用entrySet遍历");
        for (Map.Entry<String, String> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }

        System.out.println("2、在for-each循环中遍历keys或values");
        for (String key : map.keySet()) {
            System.out.println("key: " + key);
        }
        for (String value : map.values()) {
            System.out.println("value: " + value);
        }

        System.out.println("3、使用Iterator遍历");
        Iterator<Map.Entry<String, String>> ite = map.entrySet().iterator();
        while (ite.hasNext()) {
            Map.Entry<String, String> m = ite.next();
            System.out.println(m.getKey() + " : " + m.getValue());
        }

        System.out.println("4、通过key遍历value");
        for (String key : map.keySet()) {
            String value = map.get(key);
            System.out.println(key + " : " + value);
        }
    }

}
```

<br>