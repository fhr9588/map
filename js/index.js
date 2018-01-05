//时间转换格式
function getToday(){
    var curDate = new Date();
    var year=curDate.getFullYear();
    var mon=curDate.getMonth()+1;
    var day=curDate.getDate();
    year=year+"-";
    if(mon<10)
        mon="0"+mon+"-";
    else
        mon=mon+"-";
    if(day<10)
        day="0"+day;
    var str=year+mon+day;
    return str;
}


//转换时间戳
function timestamp(times){
    //var timestamp2 = Date.parse(new Date(times));
    //ios设备Date.parse()不支持"-"的格式,所以要转换成"/"格式
    var timestamp2 = times.replace(/-/g, "/");
    timestamp2 = Date.parse(new Date(timestamp2)) / 1000;
    return timestamp2;
}


//提交
function btn(){
    var uid=$('#uname').val();
    var start=timestamp($('#start').val());
    var end=timestamp($('#end').val());
    var aaa=[];
    if(uid!=''&&!isNaN(start)&&!isNaN(end)){
        $.ajax({
            url:'data/gps.json',
            type:'GET',
            success: function (data) {
                for(var i=0;i<data.length;i++){
//                console.log((data[i].gps.jing+','+data[i].gps.wei));
                    aaa[i]=new BMap.Point(data[i].gps.jing,data[i].gps.wei)
                }
                var polyline =new BMap.Polyline(aaa, {
                    enableEditing: false,//是否启用线编辑，默认为false
                    enableClicking: true,//是否响应点击事件，默认为true
                    icons:[icons],
                    strokeWeight:'8',//折线的宽度，以像素为单位
                    strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
                    strokeColor:"#18a45b" //折线颜色
                });

                map.addOverlay(polyline);          //增加折线
            }
        });

    }else{
        alert('请填写完整后提交');
    }
}





//百度地图API
var map=new BMap.Map('allmap'); // 创建Map实例
map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);// 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
    scale: 0.6,//图标缩放大小
    strokeColor:'#fff',//设置矢量
    // 图标的线填充颜色
    strokeWeight: '2'//设置线宽
});
var icons = new BMap.IconSequence(sy, '20', '30');
// 创建polyline对象

//var pois = [
//    new BMap.Point("116.350658","39.938285"),
//    new BMap.Point("116.386446","39.939281"),
//    new BMap.Point("116.389034","39.913828"),
//    new BMap.Point("116.442501","39.914603")
//];

//以下是模拟实际情况,ajax.








//根据坐标找定位
var geoc = new BMap.Geocoder();

geoc.getLocation(new BMap.Point(116.359554,39.936509), function(result){
    if (result.address!=''){
//            console.log(result.address)
//            alert(result.address);
    }else{
//            alert('地址不正确')
    }
});

