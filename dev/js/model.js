var timeMax = 3
function clickPop(){
    $('.bomb-firm').show()
    $('.success-firm').hide()
    $('.mask-firm').show()
}

var nameRex =/^[\u4e00-\u9fa5]{2,4}$/ //姓名验证
var companyNameRex =/^[\u4e00-\u9fa5]{2,20}$/ //企业名称验证
var telRex =/^1[3456789]\d{9}$/ //手机
var emailRex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/  //邮箱验证
var numRex = /^[0-9]*$/   //纯数字
var fileObj = undefined

// 验证信息填写是否正确
function check() {
    if(!$("#name").val()) {
        alert('请填写企业名称！')
    }
    else if(!companyNameRex.test($("#name").val())) {
        alert('企业名称必须是2-20个汉字！')
    }
    else if(!$("#setTime").val()) {
        alert('请选择成立时间！')
    }
    else if(!$("#empNum").val()) {
        alert('请填写企业人数！')
    }
    else if(!numRex.test($("#empNum").val())) {
        alert('请输入正确企业人数！')
    }
    else if(!$("#coreBusiness").val()) {
        alert('请填写主营业务！')
    }
    else if($("#coreBusiness").val().length > 300) {
        alert('主营业务不能超过300个字数！')
    }
    else if(!$("#contactName").val()) {
        alert('请填写联系人姓名！')
    }
    else if(!nameRex.test($("#contactName").val())) {
        alert('姓名必须是2-4个汉字！')
    }
    else if(!telRex.test($("#contactPhone").val())) {
        alert('请填写正确的联系电话！')
    }
    else if(!emailRex.test($("#email").val())) {
        alert('请填写正确的电子邮箱！')
    }
    else if($("#remark").val().length > 300) {
        alert('备注不能超过300个字数！')
    }
    else {
        return true
    }
}
// 提交入驻
$('#sendResume').click(function(){

    if(event.preventDefault) event.preventDefault();
    else event.returnValue = false; 

    timeMax = 3
    $('#timeOut').text(timeMax+'s')

    if(check()) {

        var hero = {
            'name':$("#name").val(),
            "setTime": $("#setTime").val(),
            "empNum": $("#empNum").val(),
            "coreBusiness": $("#coreBusiness").val(),
            "contactName":$("#contactName").val(),
            "contactPhone": $("#contactPhone").val(),
            "email": $("#email").val(),
            "remark": $("#remark").val()
        }
        
        $.ajax({
            url: host + '/api/business/company/commit',
            type: 'post',
            headers:{'Content-Type':'application/json;charset=utf8'},
            data: JSON.stringify(hero),
            success: function(res) {
                if(res.code == 200) {
                    $('.bomb').hide()
                    $('.success-firm').show()
                    $("#resume input").val('')
                    $("#resume textarea").val('')
                    timer = setInterval(function(){
                        if(timeMax > 0) {
                            timeMax -- 
                            $('#timeOut').text(timeMax+'s')
                        } else {
                            $('.success-firm').hide()
                            $('.mask').hide()
                            clearInterval(timer)
                        }
                    },1000)
                } else {
                    alert((res.message || '提交入驻失败！')+'！')
                }
            },
            error: function() {
                alert('提交入驻失败！')
            }
        })
    }
})