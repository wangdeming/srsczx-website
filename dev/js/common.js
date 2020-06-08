function hasClass(el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    var newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
function removeClass(el, className) {
    if (hasClass(el, className)) {
        el.className = el.className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ')
    }
}
//获取路径参数
function getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null //返回参数值
}

// 页面飞入动画效果
function isElementInViewport(el, offset) {
    var rect = el.getBoundingClientRect()
    return (
        // rect.top >= 0 &&
        // rect.left >= 0 &&
        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        rect.bottom <=
        (window.innerHeight + offset || document.documentElement.clientHeight + offset)
    )
}

function callbackFunc(elem, className, offset) {
    for (var i = 0; i < elem.length; i++) {
        if (isElementInViewport(elem[i], offset)) {
            if (!elem[i].classList.contains(className)) {
                elem[i].classList.add(className)
            }
        }
        // 只动一次，不需要下面的逻辑
        // else if(items[i].classList.contains("fadeIn")) {
        //     items[i].classList.remove("fadeIn");
        // }
    }
}

// var host = location.host
// 开发环境
// var host = 'http://127.0.0.1/'
// 正式环境
var host = 'http://srsczx.ibdsr.cn/srsczxadmin'
// 封装ajax方法
jQuery.axse = function(obj, success) {
    var url = host + obj.url
    var type = obj.method || 'GET' //默认get请求
    var data = obj.data
    var header = obj.header
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'json',
        headers: header,
        xhrFields: {withCredentials: true},//关键
        crossDomain: true, //关键
        success: function(data) {
            success
                ? success(data)
                : function() {
                      console.log('sss')
                  }
        },
        error: function(err) {
            console.log('服务器挂了！')
        }
    })
}

// 获取指定字符长度的字符串
function getString(str, count) {
    if (str.length < count) {
        return str
    } else {
        return str.substring(0, count - 1)
    }
}

$(document).ready(function() {
    // 如果使用低版本IE（<10）浏览器提示弹框
    var ua = window.navigator.userAgent
    var html =
        '<div class="notice-tip">感谢您访问，但您的浏览器版本太低了，为了更好的访问效果，建议您使用浏览器极速模式或其他高级浏览器！</div>'
    if (ua.indexOf('MSIE') > 0) {
        $('body').append(html)
    }

    var tabItem = $('#tabBar .tab') //切换按钮
    var tabBlock = $('#tabBar .bar') //切换内容
    var length = tabItem.length
    var currentTab = 0

    tabItem.on('click', function(speed) {
        currentTab = $(this).attr('tab-index')
        for (var i = 0; i < length; i++) {
            tabBlock.eq(i).css('opacity', '0')
        }
        tabBlock.eq(currentTab).css('opacity', '1')
    })
    /* 公用tabbar切换方法封装end */
    //返回顶部
    $('#goTop').on('click', function() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    })
})
