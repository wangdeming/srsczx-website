var limit = 10;
var offset;
var total;
var typeNum;

// 导航
$(document).ready(function(){
    var query = getUrlParam('nav')
    var nav = $('.nav_item')
    switch (query) {
        case "" : {
            document.title = '全部招商政策'
            nav.eq(0).addClass('active')
            createNewLists('',1);
        }
            break;
        case "1" : {
            document.title = '国家级招商政策'
            nav.eq(1).addClass('active')
            createNewLists(1,1);
        }
            break;
        case "2" : {
            document.title = '省级招商政策'
            nav.eq(2).addClass('active')
            createNewLists(2,1);
        }
            break;
        case "3" : {
            document.title = '市级招商政策'
            nav.eq(3).addClass('active')
            createNewLists(3,1);
        }
            break;
        case "4" : {
            document.title = '区县级招商政策'
            nav.eq(4).addClass('active')
            createNewLists(4,1);
        }
            break;
        default: {
            document.title = '全部招商政策'
            nav.eq(0).addClass('active')
            createNewLists('',1);
        }
    }
});

$(function() {
    $(".nav_item").each(function(index) {
        $(this).click(function() {
            $(".nav_item").removeClass("active");
            $(this).addClass("active");
        });
    });
});

function clickType(type){
    createNewLists(type,1);
    switch (type) {
        case '': {
            document.title = '全部招商政策'
        }
            break;
        case 1: {
            document.title = '国家级招商政策'
        }
            break;
        case 2: {
            document.title = '省级招商政策'
        }
            break;
        case 3: {
            document.title = '市级招商政策'
        }
            break;
        case 4: {
            document.title = '区县级招商政策'
        }
            break;
    }
}

function getWord(str) { //截取标签内的文本信息(新闻资讯内容返回的是hxml文本)
    var reg = /<[^>]+>/g;
    var newStr = str.replace(reg,'')
    return newStr
}

function getYear(str) {
    var year;
    if(str){
        year = str.substr(0,4);
    }else {
        year = ''
    }
    return year
}

function getMonth(str) {
    var month;
    if (str){
        if(str.substr(5,1) == '0'){
            month = str.substr(6,1);
        }else {
            month = str.substr(5,2);
        }
    }else {
        month = '';
    }
    return month;
}
function getDate(str) {
    var date;
    if(str){
        date = str.substr(0,10);
    }else {
        date = ''
    }
    return date
}
function searchPolicy() {
    createNewLists(typeNum,1);
}
//新闻列表
function createNewLists(type,pageNumber){
    var condition = $("#searchInput").val();
    $("#policy").empty();
    $("#content .list").css("display","block");
    var html = ''
    typeNum = type
    $.axse(
        {
            url: '/policy/list',
            data:{limit:10,offset:pageNumber*10-10,level:type,condition:condition,status:1,order:'desc',sort:'publishDate'},
        },
        function(data){
            var newsList = data.rows;
            total = data.total;
            if (newsList == 0) {
                html = '<div style="text-align: center;height: 60px;line-height: 60px;font-size: 18px;margin-top: 40px;">暂无数据</div>';
            } else {
                for(var i=0;i<newsList.length;i++){
                    var source = '';
                    if(typeof(newsList[i].source) != "undefined"){
                        source = newsList[i].source;
                    }
                    html = html + "<li class='list_item'>"+
                        "<div class='item_time'>"+
                        "<span>"+ getYear(newsList[i].publishDate) +"年</span>"+
                        "<span><strong>"+ getMonth(newsList[i].publishDate) +"</strong>月</span>"+
                        "</div>"+
                        "<a href='./policyDetail.html?id="+ newsList[i].id +"&level="+ type +"' data-id='"+ newsList[i].id +"' target='_blank' class='item_title'>"+ newsList[i].title +"</a>"+
                        "<div class='item_content'>" + getWord(newsList[i].content) + "</div>"+
                        "<div class='item_info'>"+
                        "<span>发布时间："+ getDate(newsList[i].publishDate) +"</span>"+
                        "<span>来源："+ source +"</span>"+
                        "</div>"+
                        "<a href='./policyDetail.html?id="+ newsList[i].id +"&level="+ type +"' data-id='"+ newsList[i].id +"' target='_blank' class='detail'>详情<img src='images/index/more.svg'></a>"+
                        "</li>"
                }
            }
            if(total > 10) {
                var pageHtml = "<div class='zxf_pagediv'></div>"
            } else {
                var pageHtml = "<div></div>"
            }
            $("#policy").append(html+pageHtml).append()

            //翻页
            $(".zxf_pagediv").createPage({
                pageNum: Math.floor(total/10)+1,
                current: pageNumber,
                backfun: function(e) {
                    createNewLists(typeNum,e.current);
                }
            });

            var goTop = $("#goTop")
            var showGoTopPos = 600 //滚动到600px时显示返回顶部按钮
            var scrollTop = 0
            var allHeight = $(document).height()
            var clentHeight = $(window).height()
            var footerHeight = $('#footer').height()
            // 由于列表是动态加载的所以在加载完成时添加效果
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
        })
}
