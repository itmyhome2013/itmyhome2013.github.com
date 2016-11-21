---
layout: post
blog_id: "jquery-plugin-development"
title: "jQuery插件开发"
date: 2016-11-20 00:00:00 -0700
tags: jQuery
category: jQuery
summary: jQuery插件开发可以通过$.extend()来扩展jQuery，通过$.fn向jQuery添加新的方法
comments: false
---
<br>

jQuery插件开发方式主要有三种：

+ 1、通过$.extend()来扩展jQuery

+ 2、通过$.fn 向jQuery添加新的方法

+ 3、通过$.widget()应用jQuery UI的部件工厂方式创建

通常我们使用第二种方法来进行简单插件开发，说简单是相对于第三种方式。第三种方式是用来开发更高级jQuery部件的，

而第一种方式又太简单，仅仅是在jQuery命名空间或者理解成jQuery身上添加了一个静态方法而以。

所以我们调用通过$.extend()添加的函数时直接通过$符号调用($.myfunction())

而不需要选中DOM元素($("#example").myfunction())。

请看下面的例子。

```js
$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name: 'world') + '!');
    }
})
$.sayHello(); //调用
$.sayHello('itmyhome'); //带参调用
```

运行结果

![License Badge]({{ site.baseurl}}/images/jquery-plugin/1.png)

上面代码中，通过$.extend()向jQuery添加了一个sayHello函数，然后通过$直接调用。到此你可以认为我们

已经完成了一个简单的jQuery插件了。但如你所见，这种方式用来定义一些辅助方法是比较方便的。

比如一个自定义的console，输出特定格式的信息，定义一次后可以通过jQuery在程序中任何需要的地方调用它。

```js
$.extend({
    log: function(message) {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //！JavaScript中月分是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        console.log(time + ' My App: ' + message);
    }
})
$.log('initializing...'); //调用
```

运行结果

![License Badge]({{ site.baseurl}}/images/jquery-plugin/2.png)

但这种方式无法利用jQuery强大的选择器带来的便利，要处理DOM元素以及将插件更好地运用于所选择的元素身上，

还是需要使用第二种开发方式。你所见到或使用的插件也大多是通过此种方式开发。

#### 插件开发

下面我们就来看第二种方式的jQuery插件开发。

#### **基本方法**

先看一下它的基本格式：

```js
$.fn.pluginName = function() {
    //your code goes here
}
```

基本上就是往$.fn上面添加一个方法，名字是我们的插件名称。然后我们的插件代码在这个方法里面展开。

比如我们将页面上所有P标签颜色转成红色，则可以这样写这个插件：

```html
<ul> 
   <li> 
      <p title="one">我是第一行</p> 
   </li> 
   <li> 
      <p title="two">我是第二行</p>
   </li> 
   <li>
      <p title="three">我是第三行</p>
   </li> 
   <li>
      <span> 我是span标签不是p标签哦 </span>
   </li> 
</ul>
```
```js
$.fn.myPlugin = function() {
   //在这里面,this指的是用jQuery选中的元素
   //example :$('p'),则this=$('p')
   this.css('color', 'red');
}

$(function() {
   $('p').myPlugin();
})
```

运行结果

![License Badge]({{ site.baseurl}}/images/jquery-plugin/3.png)

下面进一步，在插件代码里处理每个具体的元素，而不是对一个集合进行处理，这样我们就可以针对每个元素进行相应操作。

我们已经知道this指代jQuery选择器返回的集合，那么通过调用jQuery的.each()方法就可以处理合集中的每个元素了，但此刻

要注意的是，在each方法内部，this指带的是普通的DOM元素了，如果需要调用jQuery的方法那就需要用$来重新包装一下。

比如现在我们要在每个P标签后面显示title属性的值，首先通过each遍历所有P标签，然后获取title属性的值再加到文本后面。

更改后我们的插件代码为：

```js
$.fn.myPlugin = function() {
   //在这里面,this指的是用jQuery选中的元素
   //example :$('p'),则this=$('p')
   this.css('color', 'red');

   this.each(function() {
   //对每个元素进行操作
      $(this).append(' ' + $(this).attr('title'));
   })
}
```

运行结果

![License Badge]({{ site.baseurl}}/images/jquery-plugin/4.png)

下面开始jQuery插件编写中一个重要的部分，参数的接收。

#### **支持链式调用**

我们都知道jQuery一个非常优雅的特性是支持链式调用，选择好DOM元素后可以不断地调用其他方法。

要让插件不打破这种链式调用，只需return一下即可。

```js
$.fn.myPlugin = function() {
   //在这里面,this指的是用jQuery选中的元素
   //example :$('p'),则this=$('p')
   this.css('color', 'red');

   return this.each(function() {
   //对每个元素进行操作
      $(this).append(' ' + $(this).attr('title'));
   })
}
```

#### **让插件接收参数**

我们不想让其只变成红色，让插件接收参数可以自定义颜色和其他属性

```js
$.fn.myPlugin = function(options) {
   var defaults = {
      'color' : 'red',
      'fontSize' : '15px'
   };

   var settings = $.extend(defaults, options);
   return this.css( {
      'color' : settings.color,
      'fontSize' : settings.fontSize
   });
}
```

现在，我们调用的时候指定颜色，字体大小未指定，会运用插件里的默认值15px。

```js
$('p').myPlugin( {
   'color' : '#668B8B'
});
```

运行结果

![License Badge]({{ site.baseurl}}/images/jquery-plugin/5.png)

同时指定颜色与字体大小：

```js
$('p').myPlugin( {
   'color' : '#668B8B',
   'fontSize': '20px'
});
```

![License Badge]({{ site.baseurl}}/images/jquery-plugin/6.png)

#### **保护好默认参数**

注意到上面代码调用extend时会将defaults的值改变，这样不好，因为它作为插件因有的一些东西应该维持原样，

另外就是如果你在后续代码中还要使用这些默认值的话，当你再次访问它时它已经被用户传进来的参数更改了。

一个好的做法是将一个新的空对象做为$.extend的第一个参数，defaults和用户传递的参数对象紧随其后，

这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。

```js
$.fn.myPlugin = function(options) {
   var defaults = {
      'color' : 'red',
      'fontSize' : '15px'
   };

   var settings = $.extend({},defaults, options);
   return this.css( {
      'color' : settings.color,
      'fontSize' : settings.fontSize
   });

}
```




