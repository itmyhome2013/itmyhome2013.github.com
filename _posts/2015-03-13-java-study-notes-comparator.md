---
layout: post
blog_id: "java-study-notes-comparator"
title: "Java学习笔记13--比较器(Comparable、Comparator)"
date: 2015-03-13 00:00:00 -0700
tags: Java
category: Java
summary: 分析比较器的排序原理,实际上比较器的操作，就是经常听到的二叉树的排序算法。排序的基本原理：使用第一个元素作为根节点，之后如果后面的内容比根节点小，则放在左子树，如果内容比根节点的内容要大，则放在右子树。
comments: false
---
</br>
####Comparable接口的作用

之前Arrays类中存在sort()方法，此方法可以直接对对象数组进行排序。

</br>
####Comparable接口

<span style="color:red">可以直接使用java.util.Arrays类进行数组的排序操作，但对象所在的类必须实现Comparable接口，用于指定排序接口。</span>

Comparable接口的定义如下：

public  interface  Comparable<T>{

&nbsp;&nbsp;&nbsp;&nbsp;public  int compareTo(T  o);

}

此方法返回一个int类型的数据，但是此int的值只能是一下三种：

+ <span style="color:red">1：表示大于</span>

+ <span style="color:red">-1：表示小于</span>

+ <span style="color:red">0：表示相等</span>

</br>
要求：定义一个学生类，里面有姓名,年龄,成绩三个属性,要求按成绩由高到低排序,如果成绩相等,则按照年龄由低到高排序。

```java
package com.itmyhome;  
  
import java.util.Arrays;  
  
class Student implements Comparable<Student>{  
    private String name;  
    private int age;  
    private float score;  
      
    public Student(String name,int age,float score){  
        this.name = name;  
        this.age = age;  
        this.score = score;  
    }  
      
    @Override  
    public int compareTo(Student stu) {  //覆写compareTo方法实现排序规则的应用  
        if(this.score>stu.score){  
            return -1;  
        }else if(this.score<stu.score){  
            return 1;  
        }else{  
            if(this.age>stu.age){  
                return 1;  
            }else if(this.age<stu.age){  
                return -1;  
            }else{  
                return 0;  
            }  
        }  
    }  
      
    public String toString(){  
        return "姓名："+this.name+", 年龄："+this.age+", 成绩："+this.score;  
    }  
      
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getAge() {  
        return age;  
    }  
    public void setAge(int age) {  
        this.age = age;  
    }  
    public float getScore() {  
        return score;  
    }  
    public void setScore(float score) {  
        this.score = score;  
    }  
      
      
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Student stu[] = {new Student("张三",22,80f)  
                        ,new Student("李四",23,83f)  
                        ,new Student("王五",21,80f)};  
          
        Arrays.sort(stu);   //进行排序操作  
        for (int i = 0; i < stu.length; i++) {  
            Student s = stu[i];  
            System.out.println(s);  
        }  
    }  
}
```

</br>
###分析比较器的排序原理

实际上比较器的操作，就是经常听到的二叉树的排序算法。

排序的基本原理：使用第一个元素作为根节点，之后如果后面的内容比根节点小，

则放在左子树，如果内容比根节点的内容要大，则放在右子树。

```java
package com.itmyhome;  
  
class BinaryTree {  
    class Node { // 声明一个节点类  
        private Comparable data; // 保存具体的内容  
        private Node left; // 保存左子树  
        private Node right; // 保存右子树  
  
        public Node(Comparable data) {  
            this.data = data;  
        }  
  
        public void addNode(Node newNode) {  
            // 确定是放在左子树还是右子树  
            if (newNode.data.compareTo(this.data) < 0) { // 内容小，放在左子树  
                if (this.left == null) {  
                    this.left = newNode; // 直接将新的节点设置成左子树  
                } else {  
                    this.left.addNode(newNode); // 继续向下判断  
                }  
            }  
            if (newNode.data.compareTo(this.data) >= 0) { // 放在右子树  
                if (this.right == null) {  
                    this.right = newNode; // 没有右子树则将此节点设置成右子树  
                } else {  
                    this.right.addNode(newNode); // 继续向下判断  
                }  
            }  
        }  
  
        public void printNode() { // 输出的时候采用中序遍历  
            if (this.left != null) {  
                this.left.printNode(); // 输出左子树  
            }  
            System.out.print(this.data + "\t");  
            if (this.right != null) {  
                this.right.printNode();  
            }  
        }  
    };  
  
    private Node root; // 根元素  
  
    public void add(Comparable data) { // 加入元素  
        Node newNode = new Node(data); // 定义新的节点  
        if (root == null) { // 没有根节点  
            root = newNode; // 第一个元素作为根节点  
        } else {  
            root.addNode(newNode); // 确定是放在左子树还是放在右子树  
        }  
    }  
  
    public void print() {  
        this.root.printNode(); // 通过根节点输出  
    }  
};  
  
public class T2 {  
    public static void main(String args[]) {  
        BinaryTree bt = new BinaryTree();  
        bt.add(8);  
        bt.add(3);  
        bt.add(3);  
        bt.add(10);  
        bt.add(9);  
        bt.add(1);  
        bt.add(5);  
        bt.add(5);  
        System.out.println("排序之后的结果：");  
        bt.print();  
    }  
}
```

</br>
###另一种比较器：Compartor

如果一个类已经开放完成，但是在此类建立的初期并没有实现Comparable接口，此时肯定是无法进行对象排序操作的，

所以为了解决这一的问题，java又定义了另一个比较器的操作接口 Comparator 此接口定义在java.util包中，接口定义如下：

```java
public  interface  Comparator<T>{

	 public  int  compare(T o1,T o2);

	 boolean  equals(Object  obj);

}
```

MyComparator.java

```java
package com.itmyhome;  
  
import java.util.Comparator;  
  
public class MyComparator implements Comparator<Student> {  //实现比较器  
  
    @Override  
    public int compare(Student stu1, Student stu2) {  
        // TODO Auto-generated method stub  
        if(stu1.getAge()>stu2.getAge()){  
            return 1;  
        }else if(stu1.getAge()<stu2.getAge()){  
            return -1;  
        }else{  
            return 0;  
        }  
    }
}
```

```java
package com.itmyhome;  
  
import java.util.ArrayList;  
import java.util.Arrays;  
import java.util.Collections;  
import java.util.List;  
  
class Student {  
    private String name;  
    private int age;  
      
    public Student(String name,int age ){  
        this.name = name;  
        this.age = age;  
    }  
      
    public String toString(){  
        return "姓名："+this.name+", 年龄："+this.age;  
    }  
      
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getAge() {  
        return age;  
    }  
    public void setAge(int age) {  
        this.age = age;  
    }  
}  
  
public class T {  
    public static void main(String[] args) throws Exception{  
        Student stu[] = {new Student("张三",23)  
                        ,new Student("李四",26)  
                        ,new Student("王五",22)};  
        Arrays.sort(stu,new MyComparator());             //对象数组进行排序操作  
          
        List<Student> list = new ArrayList<Student>();  
        list.add(new Student("zhangsan",31));  
        list.add(new Student("lisi",30));  
        list.add(new Student("wangwu",35));  
        Collections.sort(list,new MyComparator());      //List集合进行排序操作  
          
        for (int i = 0; i < stu.length; i++) {  
            Student s = stu[i];  
            System.out.println(s);  
        }  
          
        System.out.println("*********");  
          
        for (int i=0;i<list.size();i++){  
            Student s = list.get(i);  
            System.out.println(s);  
        }  
    }  
}
```

</br>