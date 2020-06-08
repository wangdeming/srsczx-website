var zp = {
	init:function(obj,pageinit){
		return (function(){
			zp.addhtml(obj,pageinit);
			zp.bindEvent(obj,pageinit);
		}());
	},
	addhtml:function(obj,pageinit){
		return (function(){
			obj.empty();
			/*上一页*/
			if (pageinit.current > 1) {
				obj.append('<a href="javascript:;" class="prebtn"><img src="images/index/news_rigth.svg"></a>');
			} else{
				obj.remove('.prevPage');
				obj.append('<span class="disabled"><img src="images/index/news_rigth.svg"></span>');
			}
			/*中间页*/
			if (pageinit.current >4 && pageinit.pageNum > 4) {
				obj.append('<a href="javascript:;" class="zxfPagenum">'+1+'</a>');
				obj.append('<a href="javascript:;" class="zxfPagenum">'+2+'</a>');
				obj.append('<span>...</span>');
			}
			if (pageinit.current >4 && pageinit.current <= pageinit.pageNum-5) {
				var start  = pageinit.current - 1,end = pageinit.current + 3;
			}else if(pageinit.current >4 && pageinit.current > pageinit.pageNum-5){
				var start  = pageinit.pageNum - 4,end = pageinit.pageNum;
			}else{
				var start = 1,end = 4;
			}
			for (;start <= end;start++) {
				if (start <= pageinit.pageNum && start >=1) {
					if (start == pageinit.current) {
						obj.append('<span class="current">'+ start +'</span>');
					} else if(start == pageinit.current+1){
						obj.append('<a href="javascript:;" class="zxfPagenum nextpage">'+ start +'</a>');
					}else{
						obj.append('<a href="javascript:;" class="zxfPagenum">'+ start +'</a>');
					}
				}
			}
			if (end < pageinit.pageNum) {
				obj.append('<span>...</span>');
				obj.append('<a href="javascript:;" class="zxfPagenum nextpage">'+ pageinit.pageNum +'</a>');
			}
			/*下一页*/
			if (pageinit.current >= pageinit.pageNum) {
				obj.remove('.nextbtn');
				obj.append('<span class="disabled"><img src="images/index/news_left.svg"></span>');
			} else{
				obj.append('<a href="javascript:;" class="nextbtn"><img src="images/index/news_left.svg"></a>');
			}
		}());
	},
	bindEvent:function(obj,pageinit){
		return (function(){
			obj.on("click","a.prebtn",function(){
				var cur = parseInt(obj.children("span.current").text());
				var current = $.extend(pageinit, {"current":cur-1});
				zp.addhtml(obj,current);
				if (typeof(pageinit.backfun)=="function") {
					pageinit.backfun(current);
				}
			});
			obj.on("click","a.zxfPagenum",function(){
				var cur = parseInt($(this).text());
				var current = $.extend(pageinit, {"current":cur});
				zp.addhtml(obj,current);
				if (typeof(pageinit.backfun)=="function") {
					pageinit.backfun(current);
				}
			});
			obj.on("click","a.nextbtn",function(){
				var cur = parseInt(obj.children("span.current").text());
				var current = $.extend(pageinit, {"current":cur+1});
				zp.addhtml(obj,current);
				if (typeof(pageinit.backfun)=="function") {
					pageinit.backfun(current);
				}
			});
		}());
	}
}
$.fn.createPage = function(options){
		var pageinit = $.extend({
		// pageNum : 10,
		// current : 1,
		backfun : function(){}
	},options);
	zp.init(this,pageinit);
}