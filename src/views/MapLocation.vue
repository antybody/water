<!--地图定位-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            实时定位
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <div id="container">

        </div>
        <div id="panel"></div>
    </vue-view>

</template>

<script>
    import remoteLoad from '../../config/remoteLoad.js'
    import {MapKey, MapCityName} from '../../config/config'

    export default {
        name: 'mapPath',
        data() {
            return {
                timer: null,
                map: '',
                marker: '',
                count: 0,
                points: {
                    lng: '',
                    lat: ''
                }
            }
        },
        // 监听
        watch: {

        },
        methods: {
            // 实例化地图
            initMap: function () {
                this.map = new AMap.Map('container', {
                    resizeEnable: true
                });
                this.mapLocation()
            },
            //地图定位
            mapLocation: function () {
                this.map.plugin('AMap.Geolocation', () => {
                    let geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 2000,
                        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                        buttonOffset: new AMap.Pixel(10, 10),
                        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        zoomToAccuracy: true,
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
                });
                let onComplete = (data) => {
                    this.points.lng = data.position.lng;
                    this.points.lat = data.position.lat;
                    this.$layer.msg('获取位置成功')
                    console.log(this.points);
                    // this.walk();
                }
                //解析定位错误信息
                let onError = (data) => {
                    console.log('失败原因排查信息:' + data.message);
                }
            },
            //步行导航
            walk: function () {
                this.map.plugin('AMap.Walking', () => {
                    let walking = new AMap.Walking({});
                    walking.search(new AMap.LngLat(this.points.lng, this.points.lat),
                        new AMap.LngLat(121.611218,31.077733), (status, result) => {
                            if (status === 'complete') {
                                (new Lib.AMap.WalkingRender()).autoRender({
                                    data: result,
                                    map: this.map,
                                    panel: null
                                });
                                // log.success('绘制步行路线完成')
                                console.log('绘制步行路线完成')
                            } else {
                                console.log(result)
                            }
                        });
                });
            }

        },
        async mounted() {
            // 已载入高德地图API，则直接初始化地图
            if (window.AMap && window.AMapUI) {
                this.initMap()
                // 未载入高德地图API，则先载入API再初始化
            } else {
                await remoteLoad(`http://webapi.amap.com/maps?v=1.4.11&key=${MapKey}&plugin=AMap.Walking`)
                await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
                await remoteLoad('https://cache.amap.com/lbs/static/WalkingRender1230.js')
                this.initMap()
            }
            let timer = setInterval(() => {
                this.count++;
                this.mapLocation();
                if (this.count > 4) {
                    clearInterval(timer);
                }
            }, 30000);
        }
    }
</script>

<style lang="css">
    #container {
        height: 100%;
        width: 100%;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    #panel {
        position: fixed;
        background-color: white;
        max-height: 90%;
        overflow-y: auto;
        top: 10px;
        right: 10px;
        width: 280px;
    }

    #panel .amap-lib-driving {
        border-radius: 4px;
        overflow: hidden;
    }

    .amap-logo, .amap-copyright {
        display: none !important;
    }
</style>