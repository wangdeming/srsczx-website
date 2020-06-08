var mymap = new AMap.Map('container', {
    resizeEnable: true,
    zoom:15,
    center: [117.943324,28.457473]
});

addMarker();

//添加marker标记
function addMarker() {
    mymap.clearMap();
     var marker = new AMap.Marker({
         map: mymap,
         position: [117.943324,28.457473],
         
         icon: new AMap.Icon({            
          size: new AMap.Size(160, 100),  //图标大小
          image: "images/index/ocation.svg", 
          
      })   
     });
}