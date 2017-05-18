---
layout: post
blog_id: "java-read-xml-file"
title: "Java 读取XML文件(DOM实现)"
date: 2016-11-12 00:00:00 -0700
tags: Java
category: Java
summary: 获取DocumentBuilderFactory,通过DocumentBuilder工厂产生一个DocumentBuilder
comments: false
---
<br>

步骤概括如下：

+ 1、获取DocumentBuilderFactory
+ 2、通过DocumentBuilder工厂产生一个DocumentBuilder
+ 3、利用DocumentBuilder产生Document

下面通过简单的代码来实现上面描述的过程：

```java
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;


public class ParseXML {
    public void parseXML() {
        try {
            File f = new File("user.xml");
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); // 步骤1
            DocumentBuilder builder = factory.newDocumentBuilder(); // 步骤2
            Document doc = builder.parse(f); // 步骤3
            NodeList nl = doc.getElementsByTagName("obj"); // 读取obj节点下的内容

            for (int i = 0; i < nl.getLength(); i++) {
                String name = doc.getElementsByTagName("NAME").item(i).getFirstChild().getNodeValue();
                String phone = doc.getElementsByTagName("PHONE").item(i).getFirstChild().getNodeValue();
                String age = doc.getElementsByTagName("AGE").item(i).getFirstChild().getNodeValue();

                System.out.println("NAME: " + name + ", PHONE: " + phone +  ", AGE: " + age);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        ParseXML px = new ParseXML();
        px.parseXML();
    }
}

```

运行结果如下：

```bath
NAME: 张三, PHONE: 18612345678, AGE: 22
NAME: 李四, PHONE: 13012345678, AGE: 25
```

#### user.xml

```xml
<returnData> 
  <page> 
    <currentPage>1</currentPage>  
    <countPage>10</countPage> 
  </page>  
  <data> 
    <obj> 
      <NAME>张三</NAME>  
      <PHONE>18612345678</PHONE>  
      <AGE>22</AGE> 
    </obj>  
    <obj> 
      <NAME>李四</NAME>  
      <PHONE>13012345678</PHONE>  
      <AGE>25</AGE> 
    </obj> 
  </data> 
</returnData>
```





