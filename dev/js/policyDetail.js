function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

var newsId = getUrlParam("id");

var level = getUrlParam("level");

$(function(){
    $.axse(
        {
            url: '/policy/detail',
            data:{policyId:newsId},
            method: "post"
        },
        function(data){
            var source = '';
            if(typeof(data.data.policy.source) != undefined){
                source = data.data.policy.source;
            }

            $("#details-title").attr('href', './policy.html?nav='+level);
            var titleHtml = '<div class="title">'+ data.data.policy.title +'</div>';
            var timeHtml = '<div class="date">发布时间：'+ getDate(data.data.policy.publishDate) +'<span style="margin-left: 50px;">来源：'+ source +'</span></div>';
            var imgHtml = '<div class="text"><div>'+data.data.policyContent.content+'</div></div>';
            var fileHtml = ''
            if(data.data.policy.attachmentName && data.data.policy.attachment) {
                fileHtml = '<div class="text" style="border: none;"><span id="getFile" style="color: #128cee;font-size: 14px; cursor: pointer">附件下载：'+data.data.policy.attachmentName+'</span></div>'
            }
            $("#new-content").append(titleHtml).append(timeHtml).append(imgHtml).append(fileHtml);

            $("#getFile").click(function(){
                var url = host + '/policy/download?policyId='+newsId
                window.location.href = url
            })
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
