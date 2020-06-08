(function () {

    function Slider(option) {
        this.wrap = option.wrap; //调用slider的元素
        this.imgList = option.imgList; //图片列表
        this.imgNum = this.imgList.length; //图片的长度
        this.width = option.width || $(this.wrap).width(); //图片的宽
        this.height = option.height || $(this.wrap).height(); //图片的高
        this.isAuto = option.isAuto || true; //是否自动轮播
        this.moveTime = option.moveTime; //轮播的时间
        this.direction = option.direction || 'right'; //轮播的方向
        this.btnWidth = option.btnWidth; //按钮的宽
        this.btnHeight = option.btnHeight; //按钮的高
        this.spanWidth = option.spanWidth; //span的宽
        this.spanHeight = option.spanHeight; //span的高
        this.spanColor = option.spanColor; //span按钮的背景颜色
        this.activeSpanColor = option.activeSpanColor; //选中span的颜色
        this.btnBackgroundColor = option.btnBackgroundColor; //按钮的背景颜色
        this.spanRadius = option.spanRadius; //按钮的圆角程度
        this.spanMargin = option.spanMargin; //span之间的距离
        this.flag = false;
        this.footerBackground = option.footerBackground;
        this.nowIndex = 0;
        this.createDom();
        this.initStyle();
        this.bindEvent();
        if(this.isAuto){
            this.autoMove()
        }
    }

    Slider.prototype.createDom = function() {
        var oUl = $('<ul class="imgList"></ul>');
        var Spot = $('<div class="spot"></div>')
        this.imgList.forEach(function(item) {
            var oLi = '';
            if (item.a == '') {
                oLi = ('<li><a style="cursor: default;"><img src=" ' + item.img + ' "></a><div><span>'+ item.title +'</span></div></li>');
            } else {
                var oLi = ('<li><a href=" ' + item.a +' "><img src=" ' + item.img + ' "></a><div><span>'+ item.title +'</span></div></li>');
            }
            oUl.append(oLi);
            var span = ('<span></span>');
            Spot.append(span);
        });
        var leftBtn = $('<div class="left-btn">&lt</div>');
        var rightBtn = $('<div class="right-btn">&gt</div>');
        this.wrap.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
    }

    Slider.prototype.initStyle = function() {
        $('*', this.wrap).css({
            margin: 0,
            padding: 0,
            listStyle: 'none',
        });
        $(this.wrap).css({
            overflow: 'hidden',
            position: 'relative',
        })
        $('.imgList', this.wrap).css({
            width: this.width,
            height: this.height,
            position: 'relative',
        });
        $('.imgList li', this.wrap).css({
            width: this.width,
            height: this.height,
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'none',
        }).eq(this.nowIndex).css({
            display: 'block',
        })
        $('.imgList li a, .imgList li a img', this.wrap).css({
            display: 'inline-block',
            width: this.width,
            height: this.height,
        });
        $('.imgList li div', this.wrap).css({
            width: this.width,
            height: '40px',
            position: 'absolute',
            backgroundColor: this.footerBackground,
            left: 0,
            bottom: 0,
        });
        $('.imgList li div span', this.wrap).css({
            display: 'inline-block',
            width: '440px',
            height: '40px',
            backgroundColor: 'rgba(255,255,255,0.0)',
            fontFamily: 'MicrosoftYaHeiUI',
            fontSize: '14px',
            color: '#fff',
            lineHeight: '40px',
            textIndent: '15px',
            overflow: 'hidden',
        });
        $('.left-btn, .right-btn', this.wrap).css({
            display: 'none',
            width: this.btnWidth,
            height: this.btnHeight,
            backgroundColor: this.btnBackgroundColor,
            color: '#fff',
            textAlign: 'center',
            lineHeight: this.btnHeight + 'px',
            position: 'absolute',
            top: '50%',
            marginTop: - this.btnHeight / 2,
            cursor: 'pointer',
        });
        $('.right-btn', this.wrap).css({
            right: 0,
        });
        $('.spot', this.wrap).css({
            height: this.spanHeight + (this.spanMargin * 2),
            position: 'absolute',
            right: '20px',
            marginLeft: - this.imgNum * (this.spanWidth + (this.spanMargin) * 2) / 2,
            bottom: 10,
        })
        $('.spot span', this.wrap).css({
            display: 'inline-block',
            width: this.spanWidth,
            height: this.spanHeight,
            margin: this.spanMargin,
            backgroundColor: this.spanColor,
            borderRadius: this.spanRadius,
            cursor: 'pointer',
        }).eq(this.nowIndex).css({
            backgroundColor: this.activeSpanColor,
        })
    }

    Slider.prototype.bindEvent = function() {
        var self = this;
        $('.left-btn', this.wrap).click(function() {
            self.move('prev');
        });
        $('.right-btn', this.wrap).click(function() {
            self.move('next');
        });
        $('.spot span').click(function(e) {
            self.move($(this).index())
        });
        $(this.wrap).mouseenter(function () {
            clearInterval(self.time);
        }).mouseleave(function() {
            self.autoMove()
        })
    }

    Slider.prototype.move = function(dir) {
        if(this.flag) {
            return false;
        }
        this.flag = true;
        switch(dir) {
            case 'prev':
                if(this.nowIndex === 0) {
                    this.nowIndex = this.imgNum -1;
                }else{
                    this.nowIndex --;
                }
                break;
            case 'next':
                if(this.nowIndex === this.imgNum - 1) {
                    this.nowIndex = 0;
                }else{
                    this.nowIndex ++;
                }
                break;
            default:
                this.nowIndex = dir;
                break;
        }
        var self = this;
        $('.imgList li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function() {
            self.flag = false;
        });
        $('.spot  span', this.wrap).css({
            backgroundColor: this.spanColor,
        }).eq(this.nowIndex % this.imgNum).css({
            backgroundColor: this.activeSpanColor,
        })
    }

    Slider.prototype.autoMove = function() {
        var self = this;
        this.time = setInterval(function() {
            if(this.direction == 'left') {
                $('.left-btn', this.wrap).trigger('click');
            }else{
                $('.right-btn', this.wrap).trigger('click');
            }
        }, self.moveTime)
    }

    $.fn.extend({
        slider: function(option) {
            option.wrap = this;
            new Slider(option);
        }
    })
} ())
