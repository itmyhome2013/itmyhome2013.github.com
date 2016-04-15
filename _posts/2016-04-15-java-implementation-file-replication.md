---
layout: post
blog_id: "java-implementation-file-replication"
title: "Java实现文件复制"
date: 2016-04-15 00:00:00 -0700
tags: Java
category: Java
summary: Java复制文件一种是使用缓冲输入输出流,另外一种使用文件通道来实现
comments: false
---
<br>
Java复制文件 下面介绍两种方法

一种是使用传统的缓冲输入输出流(InputStream、OutputStream)来实现

另外一种使用文件通道(FileChannel)来实现，效率上FileChannel会比InputStream快

而且文件越大对比越明显


##### **一、缓冲输入输出流(InputStream、OutputStream)**

```java
/**
 * 缓冲输入输出流方式复制文件
 * @param srcFileName 待复制的文件名
 * @param descFileName  目标文件名
 * @param overlay  如果目标文件存在，是否覆盖
 * @return 如果复制成功返回true，否则返回false
 */
public static boolean copyFile(String srcFileName, String destFileName,boolean overlay) {
	File srcFile = new File(srcFileName);

	// 判断源文件是否存在
	if (!srcFile.exists()) {
		try {
			throw new Exception("源文件：" + srcFileName + "不存在！");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	} else if (!srcFile.isFile()) {
		try {
			throw new Exception("复制文件失败，源文件：" + srcFileName + "不是一个文件！");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	// 判断目标文件是否存在
	File destFile = new File(destFileName);
	if (destFile.exists()) {
		// 如果目标文件存在并允许覆盖
		if (overlay) {
			// 删除已经存在的目标文件
			new File(destFileName).delete();
		}
	} else {
		// 如果目标文件所在目录不存在，则创建目录
		if (!destFile.getParentFile().exists()) {
			// 目标文件所在目录不存在
			if (!destFile.getParentFile().mkdirs()) {
				// 复制文件失败：创建目标文件所在目录失败
				return false;
			}
		}
	}

	// 复制文件
	int byteread = 0; // 读取的字节数
	InputStream in = null;
	OutputStream out = null;

	try {
		in = new FileInputStream(srcFile);
		out = new FileOutputStream(destFile);
		byte[] buffer = new byte[1024];

		while ((byteread = in.read(buffer)) != -1) {
			out.write(buffer, 0, byteread);
		}
		return true;
	} catch (FileNotFoundException e) {
		return false;
	} catch (IOException e) {
		return false;
	} finally {
		try {
			if (out != null)
				out.close();
			if (in != null)
				in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

##### **二、文件通道(FileChannel)**

```java
/**
 * 使用文件通道的方式复制文件
 * @param srcDirName 待复制的文件名
 * @param destDirName 目标文件名
 */
public static void fileChannelCopy(String srcDirName, String destDirName) {
	FileInputStream fi = null;
	FileOutputStream fo = null;
	FileChannel in = null;
	FileChannel out = null;

	try {
		fi = new FileInputStream(new File(srcDirName));
		fo = new FileOutputStream(new File(destDirName));
		in = fi.getChannel(); // 得到对应的文件通道
		out = fo.getChannel(); // 得到对应的文件通道
		in.transferTo(0, in.size(), out); // 连接两个通道，并且从in通道读取，然后写入out通道
	} catch (IOException e) {
		e.printStackTrace();
	} finally {
		try {
			fi.close();
			in.close();
			fo.close();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

**测试代码**

```java
public static void main(String[] args) {
	String srcDirName = "D:/jdk-6u2-windows-i586-p.exe";
	String destDirName = "D:/jdk-6u2-windows-i586-p-bak.exe";
	long start;
	long end;

	start = System.currentTimeMillis();
	CopyFile.copyFile(srcDirName, destDirName, true);
	end = System.currentTimeMillis();
	System.out.println("缓冲输入输出流方式复制文件 用时：" + (end - start) + " ms");

	start = System.currentTimeMillis();
	CopyFile.fileChannelCopy(srcDirName, destDirName);
	end = System.currentTimeMillis();
	System.out.println("使用文件通道的方式复制文件 用时：" + (end - start) + " ms");
}
```

**输出结果**

![License Badge]({{ site.baseurl}}/images/java/filecopy.png)

所测试文件大小为65M，由此可见FileChannel复制文件的速度比FileInputStream快很多。

而且FileChannel是多并发线程安全的。

<br>