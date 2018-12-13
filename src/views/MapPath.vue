<!--地图轨迹-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            巡检路径
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <div id="container">

        </div>
        <div class="input-card">
            <!--<h4>巡检路径查看</h4>-->
            <div class="input-item">
                <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation()"/>
                <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation()"/>
                <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation()"/>
                <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation()"/>
            </div>
        </div>

    </vue-view>

</template>

<script>
    import remoteLoad from '../../config/remoteLoad.js'
    import {MapKey, MapCityName} from '../../config/config'

    export default {
        name: "mapPath",
        props: ['points', 'type'],
        data() {
            return {
                marker: '',
                lineArr: [
                    [121.476045, 31.403814],
                    [121.476828, 31.402761],
                    [121.476259, 31.402577],
                    [121.474950, 31.402120],
                    [121.474618, 31.401991],
                    [121.474146, 31.401808],
                    [121.473523, 31.401588],
                    [121.472118, 31.401094],
                    [121.471260, 31.400783],
                    [121.470079, 31.400361],
                    [121.468363, 31.399720],
                    [121.467644, 31.399464],
                    [121.467805, 31.398969],
                    [121.468009, 31.398447],
                    [121.467301, 31.398264]
                ]
            }
        },
        // 监听
        watch: {},
        methods: {
            // 实例化地图
            initMap() {
                let map = new AMap.Map("container", {
                    center: [121.476045, 31.403814],
                    resizeEnable: true,
                    rotateEnable: true,
                    pitchEnable: true,
                    // viewMode: '3D',//开启3D视图,默认为关闭
                    // buildingAnimation: true,//楼块出现是否带动画
                    expandZoomRange: true,
                    zooms: [3, 20],
                    zoom: 17
                });

                this.marker = new AMap.Marker({
                    map: map,
                    position: [121.476045, 31.403814],
                    // icon: "https://webapi.amap.com/images/car.png",
                    icon: new AMap.Icon({
                        size: new AMap.Size(22, 22),//图标大小
                        imageSize: new AMap.Size(22, 22),
                        image: "https://webapi.amap.com/theme/v1.3/markers/b/loc.png"
                    }),
                    offset: new AMap.Pixel(-26, -13),
                    autoRotation: true,
                    angle: -90
                });
                // 绘制轨迹
                let polyline = new AMap.Polyline({
                    map: map,
                    path: this.lineArr,
                    showDir: true,
                    strokeColor: "#28F",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽
                    // strokeStyle: "solid"  //线样式
                });

                let passedPolyline = new AMap.Polyline({
                    map: map,
                    // path: lineArr,
                    strokeColor: "#AF5",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽
                    // strokeStyle: "solid"  //线样式
                });


                this.marker.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });

                map.setFitView();

            },

            startAnimation() {
                this.marker.moveAlong(this.lineArr, 500);
            },

            pauseAnimation() {
                this.marker.pauseMove();
            },

            resumeAnimation() {
                this.marker.resumeMove();
            },

            stopAnimation() {
                this.marker.stopMove();
            }

        },
        async mounted() {
            // 已载入高德地图API，则直接初始化地图
            if (window.AMap && window.AMapUI) {
                this.initMap()
                // 未载入高德地图API，则先载入API再初始化
            } else {
                await remoteLoad(`http://webapi.amap.com/maps?v=1.4.11&key=${MapKey}`)
                await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
                this.initMap()
            }
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

    .input-card .btn {
        /*margin-right: 1.2rem;*/
        /*width: 8rem;*/
    }

    .input-card .btn:last-child {
        margin-right: 0;
    }

    .input-card {
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border-radius: .25rem;
        width: 8rem;
        border-width: 0;
        border-radius: 0.4rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
        position: fixed;
        bottom: 3.6rem;
        right: 0.5rem;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 0.75rem 1.25rem;
        /*filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;*/
    }

    .input-item {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        height: 9.2rem;
    }

    .btn {
        display: inline-block;
        font-weight: 400;
        font-size: 0.8rem;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        background-color: transparent;
        background-image: none;
        color: #25A5F7;
        border-color: #25A5F7;
        padding: .1rem 1rem;
        line-height: 1.5;
        border-radius: 1rem;
        -webkit-appearance: button;
        cursor: pointer;
    }

    .amap-logo, .amap-copyright {
        display: none !important;
    }
</style>