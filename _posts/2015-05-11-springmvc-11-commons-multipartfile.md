---
layout: post
blog_id: "springmvc-11-commons-multipartfile"
title: "springMVC3学习(十一)--文件上传CommonsMultipartFile"
date: 2015-05-11 00:00:00 -0700
tags: springMVC
category: springMVC
summary: 使用springMVC提供的CommonsMultipartFile类进行读取文件,需要用到上传文件的两个jar包 commons-logging.jar、commons-io-xxx.jar
comments: false
---
<br>

使用springMVC提供的CommonsMultipartFile类进行读取文件

需要用到上传文件的两个jar包 **commons-logging.jar、commons-io-xxx.jar**

#### 1、在spring配置文件中配置文件上传解析器

```xml
<!-- 文件上传解析器 -->  
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">  
    <property name="defaultEncoding" value="utf-8"></property>  
    <property name="maxUploadSize" value="10485760000"></property><!-- 最大上传文件大小 -->  
    <property name="maxInMemorySize" value="10960"></property>  
</bean> 
```

#### 2、文件上传页面(index.jsp)

```xml
<!-- method必须为post 及enctype属性-->  
<form action="fileUpload.do" method="post" enctype="multipart/form-data">  
    <input type="file" name="file">  
    <input type="submit" value="上传">  
</form>
```

#### 3、FileController类

```java
@Controller  
public class FileController{  
      
    @RequestMapping("/fileUpload.do")  
    public String fileUpload(@RequestParam("file") CommonsMultipartFile file,HttpServletRequest request,
		HttpServletResponse response){  
        long startTime=System.currentTimeMillis();   //获取开始时间  
        if(!file.isEmpty()){  
            try {  
                //定义输出流 将文件保存在D盘    file.getOriginalFilename()为获得文件的名字   
                FileOutputStream os = new FileOutputStream("D:/"+file.getOriginalFilename());  
                InputStream in = file.getInputStream();  
                int b = 0;  
                while((b=in.read())!=-1){ //读取文件   
                    os.write(b);  
                }  
                os.flush(); //关闭流   
                in.close();  
                os.close();  
                  
            } catch (FileNotFoundException e) {  
                e.printStackTrace();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
        long endTime=System.currentTimeMillis(); //获取结束时间  
        System.out.println("上传文件共使用时间："+(endTime-startTime));  
        return "success";  
    }  
}
```

上传了一个3.54M的PDF文件 共使用**29132毫秒**(以自己计算机实际为准)

上面计算了上传文件所使用时间，目的为了和下篇另一种上传方法进行比较 看哪个效率更高

测试URL:  `http://localhost:8080/spring/`

<br>