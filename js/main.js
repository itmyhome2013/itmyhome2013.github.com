$(document).ready(function(){
    var backToTopTxt = "▲", backToTopEle = $('<div class="toTop"></div>').appendTo($("body")).text(backToTopTxt).attr("title","Back top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 120);
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