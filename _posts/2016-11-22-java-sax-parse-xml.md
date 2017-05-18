---
layout: post
blog_id: "java-sax-parse-xml"
title: "Java SAX 解析 XML"
date: 2016-11-22 00:00:00 -0700
tags: SAX
category: SAX
summary: 与DOM建立树形结构的方式不同，SAX采用事件模型来解析XML文档，是解析XML文档的一种更快速、更轻量的方法。
comments: false
---
<br>

与 DOM 建立树形结构的方式不同，SAX 采用事件模型来解析 XML 文档，是解析 XML 文档的一种更快速、更轻量的方法。利用 SAX 可以对 XML 文档进行有选择的解析和访问，而不必像 DOM 那样加载整个文档，因此它对内存的要求较低。但 SAX 对 XML 文档的解析为一次性读取，不创建任何文档对象，很难同时访问文档中的多处数据。在解析xml文件之前，我们要先了解xml文件的节点的种类，一种是**ElementNode**，一种是**TextNode**。

如下面代码片段

```xml
<root>
   <person>
      <username>张三</username>
      <age>22</age>
      <idcard>320105197903082216</idcard>
   </person>
</root>
```

其中`<root>、<person>`属于ElementNode，张三、22属于TextNode,然后还要知道SAX解析XML的执行顺序，看下面这张图

![License Badge]({{ site.baseurl}}/images/sax/sax.png)

xml文件被Sax解析器载入，由于Sax解析是按照xml文件的顺序来解析，首先会调用startDocument()方法，当读入<root>的时候，由于它是ElementNode,所以会调用startElement(String uri, String localName, String qName,Attributes attributes)方法，其中第三个参数是节点的名称，图中3的位置会调用characters(char[] ch, int start, int length)方法虽然是空白，Sax解析器也会把它认为是一个TextNode,由于空白不是我们想要的数据，我们需要的是<username>节点下的文本信息，所以这就要定义一个标识来记录上一节点的名称在characters()方法中，判断当前节点是不是username，如果是，就取出里面的文本信息

简单概括一下执行顺序

+ 1、startDocument
+ 2、startElement `<root>`
+ 3、characters `空白`
+ 4、startElement `<person>`
+ 5、characters `空白`
+ 6、startElement `<username>`
+ 7、characters `张三`
+ 8、endElement `</username>`

##### **首先定义Person类，封装Person对象**

```java
public class Person {
	private String username;
	private String age;
	private String idcard;

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

	public String toString() {
		StringBuffer buf = new StringBuffer();
		buf.append("username: " + username);
		buf.append(", age: " + age);
		buf.append(", idcard: " + idcard);
		return buf.toString();
	}
}
```

##### **SAX解析代码如下：**

```java
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import com.home.bean.Person;

public class SaxParseService extends DefaultHandler {
	private List<Person> persons = null; // 保存Person
	private Person person = null;
	private String preTag = null;// 作用是记录解析时的上一个节点名称

	public List<Person> getPersons(File file) throws Exception {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		SAXParser parser = factory.newSAXParser();
		SaxParseService handler = new SaxParseService();
		parser.parse(file, handler);
		return handler.getPersons();
	}

	public List<Person> getPersons() {
		return persons;
	}

	@Override
	public void startDocument() throws SAXException {
		persons = new ArrayList<Person>();
	}

	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		if ("person".equals(qName)) {
			person = new Person(); // 如果节点为<person> 就实例化一个对象
		}
		preTag = qName;// 将正在解析的节点名称赋给preTag
	}

	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		if ("person".equals(qName)) {
			persons.add(person);
			person = null;
		}
		preTag = null; // 当解析结束时设置为空，以便执行characters()方法时进行匹配
	}

	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		if (preTag != null) {
			String content = new String(ch, start, length);
			if ("username".equals(preTag)) {
				person.setUsername(content);
			} else if ("age".equals(preTag)) {
				person.setAge(content);
			} else if ("idcard".equals(preTag)) {
				person.setIdcard(content);
			}
		}
	}

	public static void main(String[] args) {
		SaxParseService sax = new SaxParseService();
		File file = new File("person.xml");
		try {
			List<Person> persons = sax.getPersons(file);
			for (Person person : persons) {
				System.out.println(person.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
```




