---
layout: post
blog_id: "list-remove-operation-problems"
title: "List remove操作注意问题"
date: 2015-09-05 00:00:00 -0700
tags: Java
category: Java
summary: List每remove掉一个元素以后，后面的元素都会向前移动
comments: false
---
</br>

```java
public static void main(String[] args) {  
	// TODO Auto-generated method stub  
	List<String> list = new ArrayList<String>();  
	list.add("A");  
	list.add("B");  
	list.add("C");  
	list.add("D");  
	list.add("E");  
	for(int i = 0;i<list.size();i++){  
		if(!"A".equals(list.get(i))){  
			list.remove(i);  
		}  
	}  
	System.out.println("--查看结果--");  
	for(int i = 0;i<list.size();i++){  
		System.out.println(list.get(i));  
	}  
}
```

上面代码是要删除List集合中内容不为A的值

输出结果应该为A

可竟然是A C E

<span style="color:red">原因：List每remove掉一个元素以后，后面的元素都会向前移动，此时如果执行i=i+1，则刚刚移过来的元素没有被读取。</span>

</br>
####解决方法：

####一、每移除一个元素以后再把 i 移回来

```
for(int i = 0;i<list.size();i++){  
	if(!"C".equals(list.get(i))){  
		list.remove(i);  
		i=i-1;  
	}  
}
```

</br>
####二、使用iterator.remove()方法删除

```java
for(Iterator ite = list.iterator();ite.hasNext();){  
	if(!"C".equals(ite.next())){  
		ite.remove();  
	}  
}
```

</br>
####三、倒过来遍历list

```java
for(int i = list.size()-1;i>=0;i--){  
	if(!"C".equals(list.get(i))){  
		list.remove(i);  
	}  
}
```

</br>
注意：

如果 for-each 遍历时删除元素将报

Exception in thread "main" java.util.ConcurrentModificationException 异常

```java
for(String s:list){  
	if(!"C".equals(s)){  
		list.remove(s);  
	}  
}
```
</br>