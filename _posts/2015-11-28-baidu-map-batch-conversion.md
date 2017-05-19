---
layout: post
blog_id: "baidu-map-batch-conversion"
title: "百度地图API 批量坐标转换"
date: 2015-11-28 00:00:00 -0700
tags: 百度地图
category: 百度地图
summary: 在将原始坐标批量转换的时候，回调的时候发现 data.status = 25
comments: false
---

在将原始坐标批量转换的时候，回调的时候发现 data.status = 25

```js
translateCallback = function (data){
      //回调时 data.status = 25
}
```

原因是 个数非法，超过限制 **百度API一次最多只支持10个点坐标转换**

### 状态码说明

<table class="table table-bordered table-striped table-condensed"> 
    <tr> 
     <td>状态码</td> 
     <td>含义</td> 
    </tr> 
    <tr> 
     <td>0</td> 
     <td>正常</td> 
    </tr>
    <tr> 
     <td>1</td> 
     <td>内部错误</td> 
    </tr>
    <tr> 
     <td>21</td> 
     <td>from非法</td> 
    </tr>
    <tr> 
     <td>22</td> 
     <td>to非法</td> 
    </tr>
    <tr> 
     <td>24</td> 
     <td>coords格式非法</td> 
    </tr>
    <tr> 
     <td>25</td> 
     <td>coords个数非法，超过限制</td> 
    </tr>
</table>

解决方法可以每十个点为一组，然后一次转换
以下代码可全部复制到HTML中直接运行查看

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=rmtT1e2a4k770D9jK1ouGODt"></script>
    <title>GPS转百度批量转换</title>
</head>
<body>
    <div id="allmap"></div>
</body>
</html>
<script type="text/javascript">

	//所有批量转换的坐标
    var points = [new BMap.Point(116.3986889372559,39.91762965106183),
                  new BMap.Point(116.38632786853032,39.90795884517671),
                  new BMap.Point(116.39534009082035,39.917432133833574),
                  new BMap.Point(116.41624058825688,39.91789300648029),
                  new BMap.Point(116.41413701159672,39.90795884517671),
				  
				  new BMap.Point(116.3886889372559,39.90962965106183),
                  new BMap.Point(116.39632786853032,39.91795884517671),
                  new BMap.Point(116.37534009082035,39.907432133833574),
                  new BMap.Point(116.41624058825688,39.92489300648029),
                  new BMap.Point(116.42413701159672,39.91795884517671),
				  
				  new BMap.Point(116.41413701159672,39.92795884517671),
				  new BMap.Point(116.40624058825688,39.93489300648029),
                  new BMap.Point(116.42213701159672,39.90795884517671),
				  new BMap.Point(116.40413701159672,39.91795884517671)
    ];

    //地图初始化
    var bm = new BMap.Map("allmap");
    bm.centerAndZoom(new BMap.Point(116.378688937,39.9076296510), 15);
	
	var total = 0; //总记录数
	var groupCount = 0; //每次转十条
    if (points.length % 10 > 0) {
        groupCount = (points.length / 10) + 1;
    }
    else {
        groupCount = (points.length / 10);
    }

	for(var i=0;i<groupCount;i++){ //外层循环，有多少组十条
		var pos = new Array();
		for(var j=0;j<10;j++){ //内层循环，每组十条
			if(total<points.length){ //不超过总记录数结束
				var point = new BMap.Point(points[(i * 10) + j].lng,points[(i * 10) + j].lat);
				pos.push(point);
			}
			total++;
		}
		
		var convertor = new BMap.Convertor();
	    convertor.translate(pos, 1, 5, function(data){
	    	if(data.status === 0) {
		        for (var i = 0; i < data.points.length; i++) {
		            bm.addOverlay(new BMap.Marker(data.points[i]));
		            bm.setCenter(data.points[i]);
		        }
		      }
	    });
		
	}
</script>
```

演示：<a href="http://itmyhome.com/baidu_map_batch_conversion/" target="_blank">baidu_map_batch_conversion/</a>

<br>