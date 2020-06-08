// 页面飞入动画效果
var items = document.querySelectorAll(".moveView1");
window.addEventListener("load", callbackFunc(items, 'fadeIn', 0));
window.onscroll = function() {
    callbackFunc(items, 'fadeIn', 0)
}

// 入孵政策滑动动画
function initSlide() {
    var size = $(".accordion ul li").length;
    var width = $(window).width();
    var slideWidth = width - 220 * (size - 1);
    $(".accordion ul li.curr").css('width', slideWidth);
}

$( window ).resize(function() {
    initSlide();
});

$( document ).ready(function() {
    initSlide();
});

$(".accordion ul li").mouseover(function(){
    var _index=0;
    _index=$(this).index();
    var size = $(".accordion ul li").length;
    var width = $(window).width();
    var slideWidth = width - 220 * (size - 1);
    $(this).stop().animate({width:slideWidth},500).siblings("li").stop().animate({width:220},500);
    $(".accordion ul li").eq(_index).addClass("curr").siblings(".accordion ul li").removeClass("curr");
});