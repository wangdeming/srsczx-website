var limit = 10;
var offset;
var total;

$(function () {
  getJobList(1);
});
function getWord(str) {
  //截取标签内的文本信息(新闻资讯内容返回的是hxml文本)
  var reg = /<[^>]+>/g;
  var newStr = str.replace(reg, "");
  return newStr;
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
// 招聘列表
function getJobList(pageNumber) {
  $("#jobs").empty();

  var jobList = [];
  var jobHtml = "";
  var html = "";
  $.axse(
    {
      url: "/recruit/list",
      method: "POST",
      data: {
        limit: 10,
        offset: pageNumber * 10 - 10,
        status: 1,
        order: "desc",
        sort: "showDatetime",
      },
    },
    function (data) {
      jobList = data.rows;
      total = data.total;
      if (jobList.length > 0) {
        for (var i = 0; i < jobList.length; i++) {
          html =
            html +
            '<li> <a href="./recruitmentDetail.html?id=' +
            jobList[i].id +
            '" data-id="' +
            jobList[i].id +
            '" target="_blank"> ' +
            '<div class="info"> <h5>' +
            jobList[i].title +
            "</h5>" +
            '<div class="main">' +
            getWord(jobList[i].content) +
            "</div> " +
            '<p class="date">发布时间：' +
            getDate(jobList[i].showDatetime) +
            "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 招聘企业：" +
            jobList[i].company +
            ' <span class="fr">详情 →</span></p>' +
            " </div> " +
            "</a>" +
            " </li>";
        }
      } else {
        html = '<div style="text-align: center;height: 60px;line-height: 60px;font-size: 18px;margin-top: 40px;">暂无数据</div>';
      }

      $("#jobs").append(jobHtml);
      if (total > 10) {
        var pageHtml = "<div class='zxf_pagediv'></div>";
      } else {
        var pageHtml = "<div></div>";
      }
      $("#jobs")
        .append(html + pageHtml)
        .append();

      //翻页
      $(".zxf_pagediv").createPage({
        pageNum: Math.floor(total / 10) + 1,
        current: pageNumber,
        backfun: function (e) {
          getJobList(e.current);
        },
      });

      var goTop = $("#goTop");
      var showGoTopPos = 600; //滚动到600px时显示返回顶部按钮
      var scrollTop = 0;
      var allHeight = $(document).height();
      var clentHeight = $(window).height();
      var footerHeight = $("#footer").height();
      // 由于列表是动态加载的所以在加载完成时添加效果
      $(document).scroll(function () {
        // 显示返回顶部按钮
        setTimeout(function () {
          scrollTop = $(document).scrollTop();
          if (scrollTop > showGoTopPos) {
            goTop.css("opacity", 1);
            if (allHeight - clentHeight - scrollTop > 100) {
              goTop.css("position", "fixed").css("bottom", "50px");
            } else {
              goTop
                .css("positon", "absolute")
                .css("bottom", footerHeight + 50 + "px");
            }
          } else {
            goTop.css("opacity", 0);
          }
        }, 30);
      });
    }
  );
}
