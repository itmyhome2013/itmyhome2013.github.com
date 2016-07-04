---
layout: post
blog_id: "baidu-map-custom-labels-icon"
title: "百度地图API 自定义标注图标"
date: 2015-11-25 00:00:00 -0700
tags: 百度地图
category: 百度地图
summary: 通过Icon类可实现自定义标注的图标，下面示例通过参数MarkerOptions的icon属性进行设置,也可以使用marker.setIcon()方法。
comments: false
---
<br>

通过Icon类可实现自定义标注的图标，下面示例通过参数MarkerOptions的icon属性进行设置，

也可以使用marker.setIcon()方法。

```js
<script type="text/javascript">
    // 百度地图API功能
    var map = new BMap.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.323066,39.989956), 16);  // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    var points = [
        [116.316967,39.990748],
        [116.323938,39.989919],
        [116.328896,39.988039],
        [116.321135,39.987072],
        [116.332453,39.989007],
        [116.324045,39.987984],
        [116.322285,39.988316],
        [116.322608,39.986381]
    ];
    // 向地图添加标注
    for( var i = 0;i < points.length; i++){
        var myIcon = new BMap.Icon("http://7xic1p.com1.z0.glb.clouddn.com/markers.png", new BMap.Size(23, 25), {
            // 指定定位位置
            offset: new BMap.Size(10, 25),
            // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置   
            imageOffset: new BMap.Size(0, 0 - i * 25) // 设置图片偏移  
        });
        var point = new BMap.Point(points[i][0],points[i][1]);
        // 创建标注对象并添加到地图 
        var marker = new BMap.Marker(point,{icon: myIcon});
        map.addOverlay(marker);
    };

</script>
```

所使用图片：

![License Badge]({{ site.baseurl}}/images/baidumap/markers.png)

演示地址：<a href="http://itmyhome.com/baidu_map_icon/">http://itmyhome.com/baidu_map_icon/</a>

<br>