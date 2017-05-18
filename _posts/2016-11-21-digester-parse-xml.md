---
layout: post
blog_id: "digester-parse-xml"
title: "Digester 解析 XML"
date: 2016-11-21 00:00:00 -0700
tags: Digester
category: Digester
summary: 为了满足将XML转换为JavaBean的特殊需求，Digester为我们提供了这么一个选择。
comments: false
---
<br>

为了满足将XML转换为JavaBean的特殊需求，Apache旗下的一个名为Digester的工具为我们提供了这么一个选择。将XML转化为JavaBean存储在内存当中， 解析的关键在于用以匹配XML的模式以及规则等，以解析下面XML为例介绍Digester

```xml
<root>
   <person>
       <username>张三</username>
       <age>22</age>
       <idcard>320105197903082216</idcard>
       <address>北京海淀</address>
       <note></note>
   </person>
   <person>
       <username>李四</username>
       <age>20</age>
       <idcard>610114197601064931</idcard>
       <address>上海徐汇</address>
       <note></note>
   </person>
   <person>
       <username>王五</username>
       <age>26</age>
       <idcard>130105198710113660</idcard>
       <address>广州天河</address>
       <note></note>
   </person>
</root>
```

此XML文件分两层结构，分别为：

+ `<root>`节点，下面包含多个`<person>`节点
+ `<person>`节点，下面包含各信息节点，如`<username>、<age>`等

我们的目的是把`<person>`节点里面的信息提取出来，所以可以把person看做一个对象里面的信息节点就是对象的属性

##### **Person类如下：**

```java
public class Person {
	private String username;
	private String age;
	private String idcard;
	private String address;
	private String note;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getIdcard() {
		return idcard;
	}

	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	
	public String toString() {
		StringBuffer buf = new StringBuffer();
		buf.append("username: " + username);
		buf.append(", age: " + age);
		buf.append(", idcard: " + idcard);
		buf.append(", address: " + address);
		buf.append(", note: " + note);

		return buf.toString();
	}
}
```

##### **创建Root类，用来保存Person对象**

```java
public class Root {
    private List persons;

    public Root() {
        persons = new ArrayList();
    }

    /**
     * 把Root下面的Person添加到一个集合中
     *
     * @param per
     */
    public void addPerson(Person per) {
        persons.add(per);
    }

    /**
     * 获取Person对象集合
     *
     * @return
     */
    public List getPersons() {
        return persons;
    }
}
```

##### **创建DigesterDriver类，对XML进行解析**

```java
import com.home.bean.Person;
import com.home.bean.Root;
import org.apache.commons.digester3.Digester;
import org.xml.sax.SAXException;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class DigesterDriver {
    public static void main(String[] args) {
    	// 定义要解析的 XML 的路径,并初始化工具类
        File input = new File("person.xml");
        Digester digester = new Digester();
        digester.setValidating(false);
        // 添加Root对象, 对应 XML中的<root>节点
        digester.addObjectCreate("root", Root.class);
        // 添加Person对象, 对应 XML中的<person>节点
        digester.addObjectCreate("root/person", Person.class);

        //添加Person对象下的各个属性，对象<person>节点下的各个信息节点
        digester.addBeanPropertySetter("root/person/username", "username");
        digester.addBeanPropertySetter("root/person/age", "age");
        digester.addBeanPropertySetter("root/person/idcard", "idcard");
        digester.addBeanPropertySetter("root/person/address", "address");
        digester.addBeanPropertySetter("root/person/note", "note");

        // 通过调用 JavaBean 的 addPerson() 方法来把多个 person 加到一个集合中
        digester.addSetNext("root/person", "addPerson");

        try {
            // 进行解析
            Root root = (Root) digester.parse(input);
            List persons = root.getPersons();

            for (int i = 0; i < persons.size(); i++) {
                Person p = (Person) persons.get(i);
                System.out.println(p);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
    }
}
```

上述代码展示了Digester处理XML 的一些基本要点，主要是说明了一些模式以及规则的匹配。 简言之，Digester就是一种用来把一个XML转化为一个与该XML结构类似的 JavaBean。你可以把XML根元素想象成一个JavaBean， 该根元素的attribute就是这个JavaBean的各种 Field，当该根元素有其他子tag时，又要把这个子tag想象成一个个新的XML，将其视为一个新的JavaBean，并作为一个Field加入到父Bean当中，然后以此类推，通过循环的方式将整个XML进行解析。

**所需JAR包：**

+ commons-digester3-3.2.jar
+ commons-logging-1.0.4.jar
+ commons-beanutils-1.7.0.jar
