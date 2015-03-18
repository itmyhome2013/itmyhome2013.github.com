$(document).ready(function(){
    var backToTopEle = $('<div id="fixedTools" class="hidden-xs hidden-sm"><a id="backtop" class="border-bottom" href="#">回顶部</a></div>')
		.appendTo($("body")).click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
    }), backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 200)? backToTopEle.show(): backToTopEle.hide();    
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            backToTopEle.css("top", st + winh - 166); 
        }
    };

    backToTopEle.hide(); 
        $(window).bind("scroll", backToTopFun);
    $('div.main a,div.pic a').attr('target', '_blank');
});