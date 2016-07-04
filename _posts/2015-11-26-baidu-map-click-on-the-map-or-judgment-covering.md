---
layout: post
blog_id: "baidu-map-click-on-the-map-or-judgment-covering"
title: "百度地图API 判断点击的是地图还是覆盖物"
date: 2015-11-26 00:00:00 -0700
tags: 百度地图
category: 百度地图
summary: 在百度地图上圆形区域检索，返回圆形覆盖范围内的"公司"检索结果，并展示在地图上
comments: false
---
<br>

在百度地图上圆形区域检索，返回圆形覆盖范围内的"公司"检索结果，并展示在地图上

当点击检索结果(标注)进行查看的时候会再次以此为原点进行检索

![License Badge]({{ site.baseurl}}/images/baidumap/1.png)

原因是该覆盖物在地图之上，点击覆盖物也就是点击了地图

所以要判断点击的是地图还是覆盖物。

#### 查看地图事件

![License Badge]({{ site.baseurl}}/images/baidumap/2.png)

我们看到click事件有以上参数，通过这些参数就能判断所点击为何物。

#### 举个栗子：

先创建一个Marker

```js
//覆盖物Marker
var point = new BMap.Point(116.323524,39.989145);
var mark = new BMap.Marker(point);
map.addOverlay(mark);
```

然后对地图添加点击事件，如果是覆盖物就弹出相应信息

```js
map.addEventListener("click", function(e){ 
	if(e.overlay){
	    alert('您点击的是覆盖物：'+e.overlay.toString());   
	}else{
	    alert('您点击的是地图');
	}						    
})
```

![License Badge]({{ site.baseurl}}/images/baidumap/3.png)

到此时我们只是判断了是覆盖物还是地图，而覆盖物又分为好多种

有**Marker、Polygon、Circle**等等

而如开题所说Marker在Circle之内，如果不想点击Marker触发click事件就需要

再次判断是何种覆盖物

如下代码即可点击Marker不触发click事件

```js
if(e.overlay && e.overlay.toString() != '[object Circle]'){

}else{
     map.clearOverlays();  //移除标注
     var point_d = new BMap.Point(e.point.lng,e.point.lat)
     var circle = new BMap.Circle(point_d,400,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
     circle.setRadius(400);
     map.addOverlay(circle);
     var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});  
     local.searchNearby("公司",point_d,400);
}
```

效果演示：<a href="http://itmyhome.com/baidu_map/">http://itmyhome.com/baidu_map/</a>

<br>