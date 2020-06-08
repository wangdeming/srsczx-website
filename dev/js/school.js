function initMap(id, position) {
  var mymap = new AMap.Map(id, {
    resizeEnable: true,
    zoom: 20,
    center: position
  });
  mymap.clearMap();
  var marker = new AMap.Marker({
    map: mymap,
    position: position,
    icon: new AMap.Icon({
      size: new AMap.Size(160, 100), //图标大小
      image: "images/ocation.svg"
    })
  });
}
//初始化创建地图
initMap("address01", [117.977487, 28.421929]);
initMap("address02", [117.972561, 28.440642]);
