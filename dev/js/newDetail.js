function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

var newsId = getUrlParam("id");

$(function(){
    $.axse(
        {
            url: '/api/news/detail',
            data:{newsId:newsId},
            method: "post"
        },
        function(data){

            var date = new Date(data.data.showTime);
            var year = date.getFullYear();
            var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            var day = date.getDate() > 9 ? date.getDate(): '0' + date.getDate();
            var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
            var minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
            // var second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
            var publishTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;

            $("#details-title").text(data.data.newsType);
            var newsType;
            if (data.data.newsType == '新闻资讯') {
                newsType = 1;
            } else if (data.data.newsType == '中心动态') {
                newsType = 2;
            }else if (data.data.newsType == '重要通知') {
                newsType = 3;
            }else {
                newsType = 1;
            }
            $("#details-title").attr('href', './newsInfo.html?nav='+newsType);
            var titleHtml = '<div class="title">'+ data.data.title +'</div>';
            var timeHtml = '<div class="date">发布时间：'+ publishTime +'</div>';
            var imgHtml = '<div class="text"><div>'+data.data.mainContent+'</div></div>';
            var fileHtml = ''
            if(data.data.fileName && data.data.extraFile) {
                fileHtml = '<div class="text" style="border: none;"><span id="getFile" style="color: #128cee;font-size: 14px; cursor: pointer">附件下载：'+data.data.fileName+'</span></div>'
            }
            $("#new-content").append(titleHtml).append(timeHtml).append(imgHtml).append(fileHtml);

            $("#getFile").click(function(){
                var url = host + '/api/news/extraFile/download?newsId='+newsId
                window.location.href = url
            })
    })
})
