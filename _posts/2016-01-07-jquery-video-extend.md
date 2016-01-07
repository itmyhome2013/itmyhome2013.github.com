---
layout: post
blog_id: "jquery-video-extend"
title: "jQuery Video Extend"
date: 2016-01-07 00:00:00 -0700
tags: jQuery
category: jQuery
summary: HTML5视频扩展插件,可以添加Logo,添加标记
comments: false
---
<br>

#### HTML5视频扩展插件

+ 可以添加Logo

+ 添加标记

![License Badge]({{ site.baseurl}}/images/pushu/pushu.png)

#### 使用方法：

下载：http://andchir.github.io/jquery-video-extend/

```js
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/jquery.video-extend.js"></script>
```

```js
<script>
$(document).bind('ready',function() {
        $("#video1").videoExtend({
                logo: 'logo.png',
                logoLink: 'http://itmyhome.com',
                logoSize: [45, 20],
                markers: [{
                        time: 13.04,  // seconds
                        text: 'Chapter 1'
                }]
        })
});
</script>
```

```html
<video id="video3" width="450" height="260" controls loop autoplay>
	<source src="video/simple.mp4" type="video/mp4">
</video>
```

#### 另一种方式：

```html
<video width="450" height="260" data-logo="img/logo.png" 
		data-markers='[{"time":13,"text":"Chapter 1"},{"time":150,"text":"Chapter 2"}]'>
    <source src="video/Sintel.mp4" type="video/mp4">
</video>
```

演示：http://video.pushu.me

PS: MP4其他之外格式能否播放没有验证。

如果MP4视频不能被播放，可能视频的编码格式不是 <span color="red">**h264**</span>。 

利用格式工厂对mp4视频，用h264视频编码格式重新编码，得到的视频就可以使用了。

<br>