$(document).ready(function(){
    $.axse(
        {
            url: '/api/news/list',
            data:{limit:5,offset:0,newsType:'',imageNews:1},
        },
        function(data){
            var newsList = data.rows;
            var imgList = [];
            for(var i=0;i<newsList.length;i++){
                var tempObj = {
                    img: newsList[i].coverImage,
                    a: './newDetail.html?id=' + newsList[i].id,
                    title: newsList[i].title
                }
                imgList.push(tempObj);
            }

            if (imgList.length == 1){
                $('#news_swiper').append('<img style="width: 100%;height: 100%;" src="'+ imgList[0].img +'"><div class="overDiv">'+ imgList[0].title +'</div>');
            } else {
                $('#news_swiper').slider({
                    imgList: imgList, //图片的列表
                    width: 580, //图片的宽
                    height: 340, //图片的高
                    isAuto: true, //是否自动轮播
                    moveTime: 3000, //运动时间
                    direction: 'right', //轮播的方向
                    btnWidth: 30, //按钮的宽
                    btnHeight: 30, //按钮的高
                    spanWidth: 8, //span按钮的宽
                    spanHeight: 8, //span按钮的高
                    spanColor: 'rgb(99,99,99,1.0)', //span按钮的颜色
                    activeSpanColor: 'rgb(12,91,229,1.0)', //选中的span颜色
                    btnBackgroundColor: 'rgba(0, 0, 0, 0.3)', //两侧按钮的颜色
                    spanRadius: '50%', //span按钮的圆角程度
                    spanMargin: 5, //span之间的距离
                    footerBackground: 'rgba(0,0,0,0.40)',
                })
            }
        })

    $.axse(
        {
            url: '/api/banner/list'
        },
        function(data){
            var banners = data.data;
            var imageList = [];
            for (var i = 0; i < banners.length;i++) {
                var tempObj = {
                    img: banners[i].path,
                    a: '',
                    title: ''
                }
                imageList.push(tempObj);
            }
            if (imageList.length == 0) {
                $("#bigImage").hide();
            } else {
                if (imageList.length == 1){
                    $('#bigImage').append('<img style="width: 100%;height: 100%;" src="'+ imageList[0].img +'">');
                } else {
                    $('#bigImage').slider({
                        imgList: imageList, //图片的列表
                        width: 1200, //图片的宽
                        height: 200, //图片的高
                        isAuto: true, //是否自动轮播
                        moveTime: 3000, //运动时间
                        direction: 'right', //轮播的方向
                        btnWidth: 30, //按钮的宽
                        btnHeight: 30, //按钮的高
                        spanWidth: 8, //span按钮的宽
                        spanHeight: 8, //span按钮的高
                        spanColor: 'rgb(99,99,99,0)', //span按钮的颜色
                        activeSpanColor: 'rgb(12,91,229,0)', //选中的span颜色
                        btnBackgroundColor: 'rgba(0, 0, 0, 0.3)', //两侧按钮的颜色
                        spanRadius: '50%', //span按钮的圆角程度
                        spanMargin: 5, //span之间的距离
                        footerBackground: 'rgba(0,0,0,0)',
                    })
                }
            }
        })



    createNews(1);
    createPolicy(1);
    $(".list_nav_item").each(function (index) {
        $(this).click(function () {
            $(".list_nav_item").removeClass("active");
            $(this).addClass("active");
            var newsType = index + 1;
            createNews(newsType);
        })
    });

    $(".policy_nav_item").each(function (index) {
        $(this).click(function () {
            $(".policy_nav_item").removeClass("active");
            $(this).addClass("active");
            var level = index + 1;
            createPolicy(level);
        })
    });

    //滚动到600px时显示返回顶部按钮
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

function getDate(str) {
    var date;
    if(str){
        date = str.substr(0,10);
    }else {
        date = ''
    }
    return date
}

function createNews(newsType) {
    $.axse(
        {
            url: '/api/news/list',
            data:{limit:5,offset:0,newsType:newsType,imageNews:0},
        },
        function(data){
            var newsList = data.rows;
            var html = '';
            $("#newsList").empty();
            if (newsList.length != 0) {
                for(var i=0;i<newsList.length;i++){
                    html += '<div class="list_news_item" onclick="jumpToNewsDetails('+ newsList[i].id +')">' +
                        '  <div class="news_item_title">'+ newsList[i].title +'</div>' +
                        '  <div class="news_item_time">'+ getDate(newsList[i].publishTime) +'</div>' +
                        '</div>'
                }
                $("#newsList").append(html);
            } else {
                $("#newsList").append('<div style="text-align: center;height: 60px;line-height: 60px;font-size: 18px;margin-top: 40px;">暂无数据</div>');
            }
        })
}

function createPolicy(level) {
    $.axse(
        {
            url: '/policy/list',
            data:{limit:8,offset:0,level:level,status:1},
        },
        function(data){
            var policyList = data.rows;
            var html = '';
            $("#policyList").empty();
            if (policyList.length != 0) {
                for(var i=0;i<policyList.length;i++){
                    html += '<div class="policy_item" onclick="jumpToPolicyDetails('+ policyList[i].id +','+ level +')">'+
                        '   <div class="item_title">'+ policyList[i].title +'</div>'+
                        '   <div class="item_time">'+ getDate(policyList[i].publishDate) +'</div>'+
                        '</div>'
                }
                $("#policyList").append(html);
            } else {
                $("#policyList").append('<div style="text-align: center;height: 60px;line-height: 60px;font-size: 18px;margin-top: 40px;">暂无数据</div>');
            }
        })
}

function jumpToNewsDetails(id) {
    window.open('./newDetail.html?id='+id);
}
function jumpToPolicyDetails(id, level) {
    window.open('./policyDetail.html?id='+id+'&level='+level);
}
