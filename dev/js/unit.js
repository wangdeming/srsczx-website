              
var goTop = $("#goTop")
var showGoTopPos = 600 //滚动到600px时显示返回顶部按钮
var scrollTop = 0
var allHeight = $(document).height()
var clentHeight = $(window).height()
var footerHeight = $('#footer').height()
$(document).scroll(function(){
    // 显示返回顶部按钮
    setTimeout(function(){
        scrollTop = $(document).scrollTop()
        if(scrollTop > showGoTopPos) {
            goTop.css('opacity', 1)
            if(allHeight - clentHeight - scrollTop > 100) {
                goTop.css('position', 'fixed').css('bottom', '50px')
            } else {
                goTop.css('positon', 'absolute').css('bottom', footerHeight+50+'px')
            }
        } else {
            goTop.css('opacity', 0)
        }
    }, 30)

})