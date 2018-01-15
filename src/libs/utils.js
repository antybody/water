/**
 *  工具类 
 * create by ym 2018/1/11
 */

/**
 * 字符串截取
 * '201604059' | subStr 4 => 2016
 * '201604059' | subStr -4 => 4059
 */
exports.subStr = (str, number) => {
    if (!str) return ''
  
    if (number < 0) {
      return str.substr(str.length + number)
    } else {
      return str.substr(0, number)
    }
  }

/**
 * 重新构建地图所需的JSON对象
 * 
 */
exports.buildJson = (str) =>{
    let mapArr = [];
    let mapPoint = {};
    if (!str) return [];

    // 获取取水户的坐标及信息
    mapPoint.id = 0;
    mapPoint.lng = str.lng;
    mapPoint.lat = str.lat;
    mapPoint.name = str.name;
    mapPoint.desc = '<div>'+str.addr+'</div>';
    mapArr.push(mapPoint);
    // 拼接取水口的坐标及信息
    for(var i=0;i<str.qsk.length;i++){
        let kPoint = {};
        kPoint.id = i+1;
        kPoint.lng = str.qsk[i].x;
        kPoint.lat = str.qsk[i].y;
        kPoint.name = str.qsk[i].qskname;
        kPoint.desc = '<div>'+str.qsk[i].xksl+'</div>';
        mapArr.push(kPoint);
    }

    return mapArr;

}