var limit = 10;
    var offset;
    var total;
    var typeNum;

    // 导航
    $(document).ready(function(){
        var query = getUrlParam('nav')
        var nav = $('#nav li')
        switch (query) {
            case "1" : {
                document.title = '新闻资讯'
                nav.eq(0).addClass('active')
                createNewLists(1,1);
            }
                break;
            case "2" : {
                document.title = '中心动态'
                nav.eq(1).addClass('active')
                createNewLists(2,1);
            }
                break;
            case "3" : {
                document.title = '重要通知'
                nav.eq(2).addClass('active')
                createNewLists(3,1);
            }
                break;
            default: {
                document.title = '新闻资讯'
                nav.eq(0).addClass('active')
                createNewLists(1,1);
            }
        }
    });
    $(function() {
        $("#nav li").each(function(index) {
          $(this).click(function() {
            $("#nav .active").removeClass("active");
            $(this).addClass("active");
          });
        });
      });

      function clickType(type){
        createNewLists(type,1)
        switch (type) {
            case 1: {
                document.title = '新闻资讯'
            }
                break;
            case 2: {
                document.title = '中心动态'
            }
                break;
            case 3: {
                document.title = '重要通知'
            }
            break;
        }
      }

      function getWord(str) { //截取标签内的文本信息(新闻资讯内容返回的是hxml文本)
        var reg = /<[^>]+>/g;
        var newStr = str.replace(reg,'')
        return newStr
     }

    //新闻列表
    function createNewLists(type,pageNumber){
        $("#news").empty();
        $("#content .list").css("display","block");
        $("#leader").css("display","none");
        var html = ''
        typeNum = type
        $.axse(
        {
            url: '/api/news/list',
            data:{limit:10,offset:pageNumber*10-10,newsType:type},
        },
        function(data){
            var newsList = data.rows;
            total = data.total;
            if (newsList.length == 0) {
                html = '<div style="text-align: center;height: 60px;line-height: 60px;font-size: 18px;margin-top: 40px;">暂无数据</div>';
            } else {
                for(var i=0;i<newsList.length;i++){
                    html = html + "<li>" +
                        "<a href='./newDetail.html?id="+ newsList[i].id +"' data-id='"+ newsList[i].id +"' target='_blank'>" +
                        "<div><img src="+newsList[i].coverImage+"></div>" +
                        "<div class='info'>" +
                        "<h5>"+newsList[i].title+"</h5>" +
                        "<div class='main'>"+getWord(newsList[i].mainContent)+"</div>" +
                        "<p class='date'>发布时间："+newsList[i].publishTime+"</p>" +
                        "</div>" +
                        "</a>" +
                        "</li>"
                }
            }
            if(total > 10) {
                var pageHtml = "<div class='zxf_pagediv'></div>"
            } else {
                var pageHtml = "<div></div>"
            }
            $("#news").append(html+pageHtml).append()

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
