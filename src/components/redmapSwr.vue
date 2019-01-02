<!--
  描述：拖放地图组件，默认尺寸是 500 * 300
  接收属性参数：
    lat: 纬度
    lng: 经度
  自定义事件：
    drag: 拖放完成事件
  示例：
    <redmap @drag="dragMap" lat="22.574405" lng="114.095388"></redmap>
-->
<template>

    <div class="m-map">
        <div class="dhTye">
            <a class="radio" slot="after">
                <input @click="bx()" type="radio" name="bsq_lcsdjc" id="bsq_lcsdjc_bx" value="1" hidden checked/>
                <label for="bsq_lcsdjc_bx" class="advice"></label>
                <span class="radio-name" style="background-color: white;">步行</span>
                <input @click="gj()" type="radio" name="bsq_lcsdjc" id="bsq_lcsdjc_gj" value="2" hidden/>
                <label for="bsq_lcsdjc_gj" class="advice"></label>
                <span class="radio-name" style="background-color: white;">公交</span>
                <input @click="jc()" type="radio" name="bsq_lcsdjc" id="bsq_lcsdjc_jc" value="3" hidden/>
                <label for="bsq_lcsdjc_jc" class="advice"></label>
                <span class="radio-name" style="background-color: white;">驾车</span>
            </a>
        </div>
        <div id="js-container" class="map">

        </div>

        <img @click="toRight()" id="pimgR"  src="../../statics/images/stop-right.png">
        <img @click="toLeft()"  id="pimgL"  src="../../statics/images/stop-left.png">
        <div id="panel"></div>
        <modal role="confirm" title="确定是该地址吗" :isOpen="open" @Confirm="yes()" @Close="cancel()">{{selectAddr.mapAddressSele}}</modal>
        <modal role="confirm" title="导航到该地点？" :isOpen="openT" @Confirm="yesT()" @Close="cancelT()"></modal>
    </div>

</template>

<script>
    import remoteLoad from '../../config/remoteLoad.js'
    import * as API from '../store/api/api'
    import {MapKey, MapCityName} from '../../config/config'

    export default {
        props: ['points', 'type'],
        data() {
            return {
                searchKey: '',
                placeSearch: null,
                dragStatus: false,
                AMapUI: null,
                AMap: null,
                marker : [],
                index:null,
                lat:this.points[0].patrol_lat,
                lng:this.points[0].patrol_lng,
                map: '',
                open:false,
                openT:false,
                infoWindow: null,
                mapAddress: {
                    address: '获取地址中...',
                    lng: '',
                    lat: '',
                    type: 'success'
                },
                selectAddr:{
                    mapAddressSele:'',
                    lng: '',
                    lat: '',
                }

            }
        },
        watch: {
            points() {
                console.log(this.points);
            },
            mapAddress(val, oldVal) {
                this.$emit('mapAddress', this.mapAddress);
            }
        },
        methods: {
            // 实例化地图
            initMap() {
                this.$emit('mapAddress', {
                    address: '获取地址中...',
                    lng: '',
                    lat: '',
                    type: 'success'
                });
                // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
                let AMapUI = this.AMapUI = window.AMapUI
                let AMap = this.AMap = window.AMap
                AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
                    let mapConfig = {
                        zoom: 9,
                        cityName: MapCityName
                    }
                    console.log('参数查看');
                    console.log(this.points);
                    console.log(this.points[0].patrol_address);
                    var _this=this;
                    if (this.lat && this.lng) {
                        mapConfig.center = [this.lng, this.lat]
                    }
                    this.infoWindow = new AMap.InfoWindow({
                        offset: new AMap.Pixel(0, -30)
                    });
                    let map = new AMap.Map('js-container', mapConfig)
                    this.map = map;
                    console.log(map);
                    AMap.service(["AMap.PlaceSearch"], function() {
                        //关键字查询
                        var placeSearch = new AMap.PlaceSearch({
                            city: MapCityName, // 兴趣点城市
                            citylimit: true,  //是否强制限制在设置的城市内搜索
                            pageSize: 10, // 单页显示结果条数
                            children: 0, //不展示子节点数据
                            pageIndex: 1, //页码
                            extensions: 'base' //返回基本地址信息
                        });
                        //详情查询
                        if(_this.points[0].lng=='' && _this.points[0].lat==''){
                            placeSearch.search(_this.points[0].patrol_address, function(status, result) {
                                if (status === 'complete' && result.info === 'OK') {
                                    placeSearch_CallBack(result);
                                }
                            });
                        }else{
                            var markerf = new AMap.Marker({
                                position: [_this.points[0].lng,_this.points[0].lat],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                title: _this.points[0].patrol_address
                            });
                            // 将创建的点标记添加到已有的地图实例：
                            map.add(markerf);
                            markerf.on('click', function(e){
                                _this.openT=true;
                                //alert(e.lnglat.getLat()+":"+e.lnglat.getLng());
                                _this.selectAddr.mapAddressSele=e.target.G.title;//position
                                _this.selectAddr.lat=e.target.G.position.lat;
                                _this.selectAddr.lng=e.target.G.position.lng;
                                _this.lat=e.target.G.position.lat;
                                _this.lng=e.target.G.position.lng;
                            });
                        }

                        var infoWindow = new AMap.InfoWindow({
                            autoMove: true,
                            offset: {x: 0, y: -30}
                        });
                        //回调函数
                        function placeSearch_CallBack(data) {
                            var poiArr = data.poiList.pois;
                            //添加marker
                            for(var i = 0; i < poiArr.length; i++){
                                var poi = poiArr[i];

                                _this.marker[i] = new AMap.Marker({
                                    position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                    title: poi.name+'('+poi.address+')'
                                });
                                // 将创建的点标记添加到已有的地图实例：
                                map.add(_this.marker[i]);
                                _this.marker[i].on('click', function(e){
                                    // _this.index=_this.marker[i];
                                    // _this.open=true;
                                    // _this.selectAddr.mapAddressSele=poi.name+'('+poi.address+')';
                                    // _this.selectAddr.lat=poi.location.lat;
                                    // _this.selectAddr.lng=poi.location.lng;
                                    // _this.lat=poi.location.lat;
                                    // _this.lng=poi.location.lng;
                                    _this.index=e.target;
                                    _this.open=true;
                                    _this.selectAddr.mapAddressSele=e.target.G.title;
                                    _this.selectAddr.lat=e.target.G.position.lat;
                                    _this.selectAddr.lng=e.target.G.position.lng;
                                    _this.lat=e.target.G.position.lat;
                                    _this.lng=e.target.G.position.lng;
                                });
                            }
                        }
                        function createContent(poi) {  //信息窗体内容
                            var s = [];
                            s.push("<b>名称：" + poi.name+"</b>");
                            s.push("地址：" + poi.address);
                            s.push("电话：" + poi.tel);
                            s.push("类型：" + poi.type);
                            return s.join("<br>");
                        }
                        function showInfoM(poiO){
                            alert(poiO.name+'('+poiO.address+')');
                            //infoWindow.setContent(createContent(poiO));
                            //infoWindow.open(map, marker.getPosition());
                        }
                    });

                    //定位
                    this.mapLocation();
                    // 启用工具条
                    AMap.plugin(['AMap.ToolBar'], function () {
                        map.addControl(new AMap.ToolBar({
                            position: 'LB'
                        }))
                    })
                })
            },
            yesT(){
                $('#panel').empty();
                let AMap = this.AMap = window.AMap
                var _this=this;
                _this.openT=false;
                AMap.service(["AMap.Walking"], function() {
                    //步行导航
                    var walking = new AMap.Walking({
                        map: _this.map,
                        panel: "panel"
                    });
                    //根据起终点坐标规划步行路线
                    walking.search( [_this.mapAddress.lng, _this.mapAddress.lat],[_this.selectAddr.lng, _this.selectAddr.lat], function(status, result) {
                        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
                        if (status === 'complete') {
                            console.log('绘制步行路线完成');
                            $('#pimgR').show();
                            $('#panel').show();
                            $('#pimgL').hide();
                            $('.dhTye').show();
                        } else {
                            this.$layer.msg('导航失败')
                        }
                    });
                });

            },
            bx(){
                $('#panel').empty();
                let AMap = this.AMap = window.AMap
                var _this=this;
                _this.openT=false;
                AMap.service(["AMap.Walking"], function() {
                    //步行导航
                    var walking = new AMap.Walking({
                        map: _this.map,
                        panel: "panel"
                    });
                    //根据起终点坐标规划步行路线
                    walking.search( [_this.mapAddress.lng, _this.mapAddress.lat],[_this.selectAddr.lng, _this.selectAddr.lat], function(status, result) {
                        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
                        if (status === 'complete') {
                            console.log('绘制步行路线完成');
                            $('#pimgR').show();
                            $('#panel').show();
                            $('#pimgL').hide();
                            $('.dhTye').show();
                        } else {
                            this.$layer.msg('导航失败')
                        }
                    });
                });
            },
            gj(){
                $('#panel').empty();
                let AMap = this.AMap = window.AMap
                var _this=this;
                _this.openT=false;
                AMap.service(["AMap.Transfer"], function() {
                    var transOptions = {
                        map: _this.map,
                        city: '上海市',
                        panel: 'panel',
                        //cityd:'乌鲁木齐',
                        policy: AMap.TransferPolicy.LEAST_TIME
                    };
                    //构造公交换乘类
                    var transfer = new AMap.Transfer(transOptions);
                    //根据起、终点坐标查询公交换乘路线
                    transfer.search(new AMap.LngLat(_this.mapAddress.lng, _this.mapAddress.lat), new AMap.LngLat(_this.selectAddr.lng, _this.selectAddr.lat), function(status, result) {
                        // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                        if (status === 'complete') {
                            console.log('绘制步行路线完成');
                            $('#pimgR').show();
                            $('#panel').show();
                            $('#pimgL').hide();
                            $('.dhTye').show();
                        } else {
                            this.$layer.msg('导航失败')
                        }
                    });
                });
            },
            jc(){
                $('#panel').empty();
                let AMap = this.AMap = window.AMap
                var _this=this;
                _this.openT=false;
                AMap.service(["AMap.Driving"], function() {
                    var driving = new AMap.Driving({
                        map: _this.map,
                        panel: "panel"
                    });
                    // 根据起终点经纬度规划驾车导航路线
                    driving.search(new AMap.LngLat(_this.mapAddress.lng, _this.mapAddress.lat), new AMap.LngLat(_this.selectAddr.lng, _this.selectAddr.lat), function(status, result) {
                        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                        if (status === 'complete') {
                            console.log('绘制步行路线完成');
                            $('#pimgR').show();
                            $('#panel').show();
                            $('#pimgL').hide();
                            $('.dhTye').show();
                        } else {
                            this.$layer.msg('导航失败')
                        }
                    });
                });
            },
            yes(){
                //alert('确认');
                this.open = false
                let paramDataAdd = {
                    type: 'update',
                    id: this.points[0].id,
                    lat: this.lat,
                    lng: this.lng
                }
                var _this=this;
                paramDataAdd = encodeURI(encodeURI(JSON.stringify(paramDataAdd)));
                this.$http.jsonp(API.SAVE_XJJL_SWR + '&params=' + paramDataAdd).then(
                    response => {
                        console.log(response.data.code);
                        if (response.data.code === 0) {
                            this.$layer.msg("确认成功！");
                            _this.map.remove(this.marker);
                            // this.map.add(this.index);
                            var makerN= new AMap.Marker({
                                position:[_this.selectAddr.lng, _this.selectAddr.lat ],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                                title: _this.selectAddr.mapAddressSele
                            });
                            _this.map.add(makerN);
                            makerN.on('click', function(e){
                                _this.openT=true;
                                _this.selectAddr.mapAddressSele=e.target.G.title;
                                _this.selectAddr.lat=e.target.G.position.lat;
                                _this.selectAddr.lng=e.target.G.position.lng;
                                _this.lat=e.target.G.position.lat;
                                _this.lng=e.target.G.position.lng;
                            });
                        }else{
                            this.$layer.msg("页面出错，请返回重试！");
                        }
                        // this.lists = response.data.data;
                    }, response => {
                        this.$layer.msg("页面出错，请返回重试！");
                        console.log("error");
                    });
            },
            cancel(){
                //alert('取消');
                this.open = false
            },
            cancelT(){
                //alert('取消');
                this.openT = false
            },
            toRight(){
                $('#panel').hide();
                $('#pimgR').hide();
                $('#pimgL').show();
                $('.dhTye').hide();
            },
            toLeft(){
                $('#panel').show();
                $('#pimgR').show();
                $('#pimgL').hide();
                $('.dhTye').show();
            },
            //地图定位
            mapLocation: function () {
                //定位
                var _this = this;
                this.map.plugin('AMap.Geolocation', () => {
                    let geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 2000,
                        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                        buttonOffset: new AMap.Pixel(10, 10),
                        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        zoomToAccuracy: false,
                        //  定位按钮的排放位置,  RB表示右下
                        buttonPosition: 'RB'
                    })
                    this.map.addControl(geolocation);
                    geolocation.getCurrentPosition((status, result) => {
                        if (status === 'complete') {
                            onComplete(result)
                        } else {
                            onError(result)
                            this.$layer.msg('获取位置失败' + this.count)
                        }
                    });
                    //AMap.event.addListener(geolocation, 'complete', onComplete);
                    //AMap.event.addListener(geolocation, 'error', onError);

                    function onComplete(data) {
                        // data是具体的定位信息
                        console.log('地点：' + data.formattedAddress);
                        console.log('经度：' + data.position.getLng());
                        console.log('纬度：' + data.position.getLat());
                        _this.mapAddress = {
                            address: data.formattedAddress,
                            lng: data.position.getLng(),
                            lat: data.position.getLat(),
                            type: 'success'
                        };
                    }

                    function onError(data) {
                        // 定位出错
                        console.log('定位失败' + data);
                        _this.mapAddress = {
                            address: "获取位置失败",
                            lng: "获取位置失败",
                            lat: "获取位置失败",
                            type: 'error'
                        };
                    }
                });
            },
            refreshMap() {

            }

        },
        async mounted() {
            // 已载入高德地图API，则直接初始化地图
            if (window.AMap && window.AMapUI) {
                this.initMap();

                // 未载入高德地图API，则先载入API再初始化
            } else {
                await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
                await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
                this.initMap();
            }
        }
    }
</script>

<style lang="css">
    .m-map {
        position: relative;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
    }

    .m-map .map {
        width: 100%;
        height: 100%;
    }

    .m-map .search {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 285px;
        z-index: 1;
    }

    .m-map .search input {
        width: 180px;
        border: 1px solid #ccc;
        line-height: 20px;
        padding: 5px;
        outline: none;
    }

    .m-map .search button {
        line-height: 26px;
        background: #fff;
        border: 1px solid #ccc;
        width: 50px;
        text-align: center;
    }

    .m-map .result {
        max-height: 300px;
        overflow: auto;
        margin-top: 10px;
    }

    #panel {
        position: absolute;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 18px;
        right: 10px;
        width: 280px;
    }
    #pimgR {
        position: absolute;
        top: 0px;
        display: none;
        background-color: #bbb;
        right: 270px;
        z-index: 10;
    }
    #pimgL {
        position: absolute;
        display: none;
        top: 0px;
        background-color: #bbb;
        right: 0px;
        z-index: 10;
    }
    .amap-call{
        display: none;
    }
    .dhTye{
        position: absolute;
        display: none;
        top: -5px;
        right: 10px;
        z-index: 10;
    }
    .icon-arrow {
        transition: .2s;
        display: none;
        transform:none!important;
    }
</style>