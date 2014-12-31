jQuery.noConflict();
jQuery(document).ready(function(){
    var backToTopTxt = "▲", backToTopEle = jQuery('<div class="toTop"></div>').appendTo(jQuery("body")).text(backToTopTxt).attr("title","Back top top").click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 120);
    }), backToTopFun = function() {
        var st = jQuery(document).scrollTop(), winh = jQuery(window).height();
        (st > 200)? backToTopEle.show(): backToTopEle.hide();    
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            backToTopEle.css("top", st + winh - 166); 
        }
    };

    backToTopEle.hide(); 
        jQuery(window).bind("scroll", backToTopFun);
    jQuery('div.main a,div.pic a').attr('target', '_blank');
});