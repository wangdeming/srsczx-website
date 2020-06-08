function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

function getDate(str) {
  var date;
  if (str) {
    date = str.substr(0, 16);
  } else {
    date = "";
  }
  return date;
}
var recruitId = getUrlParam("id");

$(function () {
  $.axse(
    {
      url: "/recruit/detail",
      data: { recruitId: recruitId },
      method: "post",
    },
    function (data) {
      var titleHtml = '<div class="title">' + data.data.title + "</div>";
      var timeHtml =
        '<div class="date">发布时间：' +
        getDate(data.data.publishDatetime) +
        "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 招聘企业：" +
        data.data.company +
        "</div>";
      var imgHtml =
        '<div class="text"><div>' + data.data.content + "</div></div>";
      var fileHtml = "";
      if (data.data.attachmentName && data.data.attachment) {
        fileHtml =
          '<div class="text" style="border: none;"><span id="getFile" style="color: #128cee;font-size: 14px; cursor: pointer">附件下载：' +
          data.data.attachmentName +
          "</span></div>";
      }
      $("#new-content")
        .append(titleHtml)
        .append(timeHtml)
        .append(imgHtml)
        .append(fileHtml);
      $("#getFile").click(function () {
        var url = host + "/recruit/download?recruitId=" + recruitId;
        window.location.href = url;
      });
    }
  );
});
