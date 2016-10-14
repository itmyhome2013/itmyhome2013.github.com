---
layout: post
blog_id: "js-national-city-three-linkage"
title: "JS全国城市三级联动"
date: 2016-10-13 00:00:00 -0700
tags: JS
category: JS
summary: 
comments: false
---
<br>

```html
<select id="s_province" name="s_province"></select>
<select id="s_city" name="s_city" ></select>
<select id="s_county" name="s_county"></select>

<script class="resources library" src="js/area.js" type="text/javascript"></script>
<script type="text/javascript">_init_area();</script>
```

```js
/*
*   全国三级城市联动 js版
*/
function Dsy(){
    this.Items = {};
}
Dsy.prototype.add = function(id,iArray){
    this.Items[id] = iArray;
}
Dsy.prototype.Exists = function(id){
    if(typeof(this.Items[id]) == "undefined") return false;
    return true;
}

function change(v){
    var str="0";
    for(i=0;i<v;i++){
        str+=("_"+(document.getElementById(s[i]).selectedIndex-1));
    };
    var ss=document.getElementById(s[v]);
    with(ss){
        length = 0;
        options[0]=new Option(opt0[v],opt0[v]);
        if(v && document.getElementById(s[v-1]).selectedIndex>0 || !v){
            if(dsy.Exists(str)){
                ar = dsy.Items[str];
                for(i=0;i<ar.length;i++){
                    options[length]=new Option(ar[i],ar[i]);
                }//end for
                if(v){ options[0].selected = true; }
            }
        }//end if v
        if(++v<s.length){change(v);}
    }//End with
}

var dsy = new Dsy();

dsy.add("0",["北京市","天津市","上海市","重庆市","河北省","山西省","内蒙古","辽宁省","吉林省"]);
dsy.add("0_0_0",["东城区","西城区","崇文区","宣武区","朝阳区","丰台区","石景山区","海淀区"]);
dsy.add("0_0",["北京市"]);
dsy.add("0_1_0",["和平区","河东区","河西区","南开区","河北区","红桥区","塘沽区","汉沽区"]);
dsy.add("0_1",["天津市"]);
dsy.add("0_2_0",["黄浦区","卢湾区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区"]);
dsy.add("0_2",["上海市"]);
dsy.add("0_3_0",["渝中区","大渡口区","江北区","沙坪坝区","开县","彭水苗族土家族自治县"]);
dsy.add("0_3",["重庆市"]);
dsy.add("0_4_0",["长安区","桥东区","桥西区","新华区","裕华区","赞皇镇","无极县","无极镇"]);
dsy.add("0_33",["台北","高雄","台中","花莲","基隆","嘉义","金门","连江"]);
dsy.add("0",["北京市","天津市","上海市","重庆市","河北省","云南省","西藏"]);

//此处省略... 完整内容请参见Github的代码：https://github.com/itmyhome2013/national-cities-three-linkage

var s=["s_province","s_city","s_county"];//三个select的name
var opt0 = ["省份","地级市","区县"];//初始值
function _init_area(){  //初始化函数
    for(i=0;i<s.length-1;i++){
      document.getElementById(s[i]).onchange=new Function("change("+(i+1)+")");
    }
    change(0);
}
```

在线演示：<a href="http://blog.itmyhome.com/national-cities-three-linkage/">national-cities-three-linkage</a>

完整源码：<a href="https://github.com/itmyhome2013/national-cities-three-linkage">click</a>
