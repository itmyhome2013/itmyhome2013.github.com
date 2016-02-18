---
layout: post
blog_id: "struts2-custom-tag"
title: "Struts2 自定义下拉框标签Tag"
date: 2016-02-18 00:00:00 -0700
tags: Struts2
category: Struts2
summary: 编写java类,继承TagSupport。创建tld文件,影射标签名和标签的java类
comments: false
---
<br>
自定义标签主要包括三个步骤：

+ 1、编写java类，继承TagSupport类；

+ 2、创建tld文件，影射标签名和标签的java类；

+ 3、jsp页面引入tld。

#### 例子：自定义下拉框标签

如果页面上有下拉选择框，通常最好的解决方法是使用数据字典，因为有可能多个页面

使用同一个下拉框，便于后台统一维护。

#### **自定义Tag类**

```java
import java.io.IOException;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

public class DictionaryOptionTaget extends TagSupport {
	private static final long serialVersionUID = 1L;
	private String index; // 字段索引 ,页面上通过标签属性传回来的值

	@SuppressWarnings("unchecked")
	@Override
	public int doEndTag() throws JspException {
		JspWriter jspw = this.pageContext.getOut();

		StringBuffer options = new StringBuffer();

		/**
		 * 需要查询数据库 字段索引为SEX的option内容,这里是写死
		 */
		if ("SEX".equals(index)) {
			options.append("<option value=''>-请选择-</option>");
			options.append("<option value='1'>男</option>");
			options.append("<option value='0'>女</option>");
		}

		try {
			jspw.println(options); //输出
		} catch (IOException e) {
			e.printStackTrace();
		}

		return 0;
	}

	@Override
	public int doStartTag() throws JspException {
		return 0;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

}
```

#### **定义tld**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE taglib
    PUBLIC "-//Sun Microsystems, Inc.//DTD JSP Tag Library 1.2//EN"
    "http://java.sun.com/dtd/web-jsptaglibrary_1_2.dtd">
<taglib>
	<tlib-version>1.0</tlib-version>
	<jsp-version>1.2</jsp-version>
	<short-name>tagSample</short-name>
	<uri>/hellotag</uri>

	<tag><!-- 从数据字典检出一个option列表 -->
		<name>OptionDictionary</name>
		<tag-class>
			com.itmyhome.DictionaryOptionTaget
		</tag-class>
		<body-content>empty</body-content>
		<attribute>
			<name>index</name><!-- 字段索引名 -->
			<required>true</required><!-- 是否必填 -->
			<rtexprvalue>false</rtexprvalue><!-- 是否能够以${}方式传值 -->
		</attribute>
	</tag>

</taglib>
```

需要注意的是：`<rtexprvalue>true</rtexprvalue>` 时候，可以使用JSP表达式

表示该自定义标签的属性值可以使用 **${}** 方式动态传值。

#### **使用自定义的标签**

```jsp
<%@ taglib uri="/WEB-TAG/platForm.tld" prefix="PF"%> 
<select>
     <PF:OptionDictionary index="SEX"/>
</select>
```

页面输出：

![License Badge]({{ site.baseurl}}/images/struts/tag.png)

<br>