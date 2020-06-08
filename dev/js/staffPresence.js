$(function(){
    $.axse(
        {
            url: '/api/employee/list'
        },
        function(data){
            var staffList = data.data
            var htmlo = '' , htmlt = ''
            if(staffList.length < 3){
                for(var i=0;i<staffList.length;i++){
                    htmlo  = htmlo + "<div class='item'>" +
                        "<a href='./employeeDetails.html?id="+ staffList[i].id +"' data-id='"+ staffList[i].id +"' target='_blank'>" +
                        "<div class='img-size'><img src="+staffList[i].coverImage+" class='scalePic'></div>" +
                        "<span class='title'>"+staffList[i].title+"</span>" +
                        "<span class='date'>"+staffList[i].showTime+"</span>" +
                        "</a>" +
                        "</div>"
                }
            } else {
                for(var i=0;i<2;i++){
                     htmlo = htmlo + "<div class='item'>" +
                        "<a href='./employeeDetails.html?id="+ staffList[i].id +"' data-id='"+ staffList[i].id +"' target='_blank'>" +
                        "<div class='img-size'><img src="+staffList[i].coverImage+" class='scalePic'></div>" +
                        "<span class='title'>"+staffList[i].title+"</span>" +
                        "<span class='date'>"+staffList[i].showTime+"</span>" +
                        "</a>" +
                        "</div>"
                }
                for(var i=2;i<staffList.length;i++){
                    htmlt  = htmlt + "<div class='item'>" +
                            "<a href='./employeeDetails.html?id="+ staffList[i].id +"' data-id='"+ staffList[i].id +"' target='_blank'>" +
                            "<div class='img-size'><img src="+staffList[i].coverImage+" class='scalePic'></div>" +
                            "<span class='title'>"+staffList[i].title+"</span>" +
                            "<span class='date'>"+staffList[i].showTime+"</span>" +
                             "</a>" +
                            "</div>"
                }
            }
            var htmls =  "<div class='item item-three'>" +
                "<img src='images/us_slogan.svg' class='slogan' style='object-fit: none;'>" +
                "</div>"
            $("#staff").append(htmlo+htmls+htmlt)
    })
});