---
layout: post
blog_id: "springmvc-12-commons-multipartresolver"
title: "springMVC3学习(十二)--文件上传优化CommonsMultipartResolver"
date: 2015-05-12 00:00:00 -0700
tags: springMVC
category: springMVC
summary: springMVC会使用一个支持文件处理的MultipartHttpServletRequest来包裹当前的HttpServletRequest,然后使用MultipartHttpServletRequest就可以对文件进行处理了
comments: false
---

基于上一篇文件上传发现效率很慢，我们应该对它进行优化  使用springMVC对文件上传的解析器来处理文件上传的时候需要在spring的applicationContext里面加上springMVC提供的MultipartResolver的申明，这样客户端请求的时候springMVC会检查request里面是否包含多媒体信息如果包含了就会使用MultipartResolver进行解析，
springMVC会使用一个支持文件处理的MultipartHttpServletRequest来包裹当前的HttpServletRequest然后使用MultipartHttpServletRequest就可以对文件进行处理了

此处只改动FileController类 其他配置参考上一篇 [文件上传CommonsMultipartFile](http://blog.itmyhome.com/2015/05/springmvc-11-commons-multipartfile/)

```java
@Controller  
public class FileController{  
      
    @RequestMapping("/fileUpload.do")  
    public String fileUpload(HttpServletRequest request,HttpServletResponse response){  
        long startTime=System.currentTimeMillis();   //获取开始时间  
          
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
		request.getSession().getServletContext());  
        if(multipartResolver.isMultipart(request)){ //判断request是否有文件上传  
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;  
            Iterator<String> ite = multiRequest.getFileNames();  
            while(ite.hasNext()){  
                MultipartFile file = multiRequest.getFile(ite.next());  
                if(file!=null){  
                    File localFile = new File("D:/"+file.getOriginalFilename());  
                    try {  
                        file.transferTo(localFile); //将上传文件写到服务器上指定的文件  
                    } catch (IllegalStateException e) {  
                        e.printStackTrace();  
                    } catch (IOException e) {  
                        e.printStackTrace();  
                    }  
                }  
            }  
        }  
        long endTime=System.currentTimeMillis(); //获取结束时间  
        System.out.println("上传文件共使用时间："+(endTime-startTime));  
          
        return "success";  
    }  
}
```

同样上传一个3.54M的PDF文件 只使用了**16毫秒**(已自己计算机实际为准)
可见差别之悬殊。

<br>