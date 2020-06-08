function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

$(function(){
    var employeeId = getUrlParam("id");

    $.axse(
    {
        url: 'api/employee/detail',
        data:{employeeId:employeeId},
        method: "post"
    },
    function(data){
        var titleHtml = '<div class="title">'+ data.data.title +'</div>';
        var timeHtml = '<div class="date">发布时间：'+ data.data.showTime +'</div>';
        var imgHtml = '<div class="text"><div>'+data.data.mainContent+'</div></div>';
        $("#new-content").append(titleHtml).append(timeHtml).append(imgHtml);	
    })
})