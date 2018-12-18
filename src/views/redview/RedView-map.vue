<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            地图查看
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
            <!-- <icon name="search" slot="right"></icon> -->
        </navbar>
        <nav class="wt-filter">
            <ul class="filter-nav-bar">
                <li :key="item.id" v-for="(item,index) in mapQuery" :class="[item.cl,{active:isActive == index}]"
                    @click="itemClick(index,item)">
                    <span>{{item.title | calMapQ(urlParam)}}</span>
                </li>
            </ul>
            <div class="filter-panel" v-show="isActive != -1">
                <ul>
                    <li @click="itemQuery(item)" v-for="item in queryDetail" class="filter-panel-item" :key="item.index"
                        :dt="item.key">
                        <i></i><span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </nav>
        <!--列表切换-->
        <div class="wt-map-list">
            <icon name="list" href="/qsh"></icon>
        </div>
        <redmap :points="mapPoints" :type="urlParam"></redmap>
        <!--<div v-show="isActive != -1" class="modal-backdrop" @click="offcanvasClose" @touchmove.stop></div>-->
        <loader v-show="loading" class="modal-loading" orange rounded></loader>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import redmap from '../../components/redmap'
    import Vue from 'vue'
    import * as API from '../../store/api/api'

    export default {
        data() {
            return {
                mapPoints: [],
                isActive: -1,
                kt: 0
                // ,mapQuery: []
            }
        },
        components: {
            redmap
        },
        watch: {
            selected: function (val, oldval) {
                console.log('选项发生了变化');
                console.log(this.selected);
                console.log(val);
                this.getMapByParams(val);
            }
        },
        computed: {
            ...mapState({
                loading: state => state.redmap.loading,
                // mapPoints: state => state.redmap.mapPoints,
                mapQuery: state => state.redmap.mapQuery,
                queryDetail: state => state.redmap.mapQueryDetails
            }),
            urlParam: function () {
                console.log(this.$route.params.kt);
                return this.$route.params.kt
            },
            // 这里捕捉查询条件
            selected: function () {
                var ret = {};
                this.mapQuery.forEach(function (val) {
                    ret[val.key] = [];
                    if (val.select) {
                        ret[val.key].push(val.select);
                    }
                });
                return ret;
            }
        },
        created() {
            // this.getMapPoints();

        },
        mounted() {
            console.log("加载完成");
            Vue.set(this.$store.state.redmap, "loading", false);
            this.$nextTick(function () {
                this.kt = this.$route.params.kt;
                console.log(this.kt);
                switch (this.kt) {
                    case 'dbqsh':
                        let paramDataQsh = {
                            type: "query",
                            wiuTp: '',
                            monitorlevel: ['00430001'],
                            currentPage: '200'
                        };
                        paramDataQsh = encodeURIComponent(JSON.stringify(paramDataQsh));
                        this.$http.jsonp(API.QSH_LIST + "&params=" + paramDataQsh).then(
                            response => {
                                var qshArr = [];
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if(response.data.data[i].watuserLon != '') {
                                        qshArr.push(
                                            {
                                                lng: response.data.data[i].watuserLon,
                                                lat: response.data.data[i].watuserLat,
                                                name: response.data.data[i].watuserName,
                                                desc: response.data.data[i].watuserAddr,
                                            }
                                        )
                                    }
                                }
                                this.mapPoints = qshArr;
                            }, response => {
                                console.log("error");
                            });

                        return '地表水取水';
                        break;
                    case 'ysh':
                        let paramDataYsh = {
                            stlx: '',
                            mbsz: '',
                            type: '1'//需要评价
                        }
                        paramDataYsh = encodeURIComponent(JSON.stringify(paramDataYsh));
                        this.$http.jsonp(API.DYSH_LIST + "&params=" + paramDataYsh).then(
                            response => {
                                var sydArr = [];
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if(response.data.data[i].companyname != '') {
                                        sydArr.push(
                                            {
                                                lng: response.data.data[i].x,
                                                lat: response.data.data[i].y,
                                                name: response.data.data[i].companyname,
                                                desc:""// "水质达标状况:"+response.data.data[i].dbzk,
                                            }
                                        )
                                    }
                                }
                                this.mapPoints = sydArr;
                                //this.mapPoints=[{lng:121.372882,lat:31.176523,name:'水源地1',desc:'地址：11111,监测水量：34343'}];
                            }, response => {
                                console.log("error");
                            });
                        return '用水户';
                        break;
                    case 'syd':
                        let paramDataSyd = {
                            stlx: '',
                            mbsz: '',
                            type: '1'//需要评价
                        }
                        paramDataSyd = encodeURIComponent(JSON.stringify(paramDataSyd));
                        this.$http.jsonp(API.SYD_LIST + "&params=" + paramDataSyd).then(
                            response => {
                                var sydArr = [];
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if(response.data.data[i].czname != '') {
                                        sydArr.push(
                                            {
                                                lng: response.data.data[i].lng,
                                                lat: response.data.data[i].lat,
                                                name: response.data.data[i].czname,
                                                desc: "水质达标状况:"+response.data.data[i].dbzk,
                                            }
                                        )
                                    }
                                }
                                this.mapPoints = sydArr;
                                //this.mapPoints=[{lng:121.372882,lat:31.176523,name:'水源地1',desc:'地址：11111,监测水量：34343'}];
                            }, response => {
                                console.log("error");
                            });

                        //this.mapPoints=[{lng:121.372882,lat:31.176523,name:'水源地1',desc:'地址：11111,监测水量：34343'}];
                        return '水源地';
                        break;
                    case 'swcz':
                        let paramDataSwcz = {
                            stlx: '',  //页面路径 用于注册接口
                            mbsz: '',
                            type: '1'
                        }
                        paramDataSwcz = encodeURIComponent(JSON.stringify(paramDataSwcz));
                        this.$http.jsonp(API.SGNQJC_LIST + "&params=" + paramDataSwcz).then(
                            response => {
                                var swczArr = [];
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if(response.data.data[i].hdst_nm != ''&&response.data.data[i].lng != '') {
                                        swczArr.push(
                                            {
                                                lng: response.data.data[i].lng,
                                                lat: response.data.data[i].lat,
                                                name: response.data.data[i].hdst_nm,
                                                desc: "水质达标状况:"+response.data.data[i].dbzk,
                                            }
                                        )
                                    }
                                }
                                this.mapPoints = swczArr;
                            }, response => {
                                console.log("error");
                            });
                        return '水文测站';
                        break;
                    case 'xc':
                        let paramsXc = {
                            kzsyd: '',
                            state: '',
                            name:'',
                            currentPage: '10'
                        };
                        paramsXc = encodeURI(encodeURI(JSON.stringify(paramsXc)));
                        this.$http.jsonp(API.XC_LIST + "&params=" + paramsXc).then(
                            response => {
                                var swczArr = [];
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if(response.data.data[i].name != ''&&response.data.data[i].lng != null) {
                                        swczArr.push(
                                            {
                                                lng: response.data.data[i].lng,
                                                lat: response.data.data[i].lat,
                                                name: response.data.data[i].name,
                                                desc: '状态：'+response.data.data[i].state,
                                            }
                                        )
                                    }
                                }
                                this.mapPoints = swczArr;
                        }, response => {
                            console.log("error");
                        });
                        return '咸潮';
                        break;
                    case 'gq':
                        let paramsGq = {
                            type: "query",
                            gqgm: '' ,
                            jllx: '' ,
                            ntlx: '' ,
                            xzqh: '' ,
                        };
                        paramsGq = encodeURI(encodeURI(JSON.stringify(paramsGq)));
                        this.$http.jsonp(API.GQ_LIST + "&params=" + paramsGq).then(
                            response => {
                                var gqArr = [];
                                for (var i = 0; i < response.data.data.length; i++) {
                                    if(response.data.data[i].irrid != ''&&response.data.data[i].irrlongtitude != null) {
                                        gqArr.push(
                                            {
                                                lng: response.data.data[i].irrlongtitude,
                                                lat: response.data.data[i].irrlatitude,
                                                name: response.data.data[i].irrname,
                                                jlfs:response.data.data[i].calculatetype,
                                                gqgm:response.data.data[i].irrscale,
                                                qsfs:response.data.data[i].irrwatertype,
                                                sjgg:response.data.data[i].desirrarea,
                                                yxgg:response.data.data[i].effirrarea,
                                                gldw:response.data.data[i].managementunit,
                                                desc: response.data.data[i].irrcity + response.data.data[i].irrtown + response.data.data[i].irrvillage,
                                            }
                                        )
                                    }
                                }
                                this.mapPoints = gqArr;
                            }, response => {
                                console.log("error");
                            });
                       return '灌区';
                    case 'sgnq':

                        return '水功能区';
                        break;
                }
            })
        },
        filters: {
            calMapQ: function (val, pm) {
                if (val == '类别') {
                    switch (pm) {
                        case 'dbqsh':

                            return '地表水取水';
                            break;
                        case 'ysh':

                            return '用水户';
                            break;
                        case 'syd':

                            return '水源地';
                            break;
                        case 'sgnq':

                            return '水功能区';
                            break;
                        case 'swcz':

                            return '水文测站';
                            break;
                        case 'xc':

                            return '咸潮';
                            break;
                        case 'gq':

                            return '灌区';
                            break;
                    }
                } else {
                    return val;
                }
            }
        },
        methods: {
            itemClick(index, item) {
                // 获取展开信息
                //alert('重置！')
                this.mapPoints = [{lng: 121.372882, lat: 31.176523, name: '水源地2', desc: '地址：11111,监测水量：34343'}];
                if (item.key != 'clear') {
                    this.isActive = index;
                    this.$store.dispatch({
                        type: 'getQueryDetail',
                        id: index,
                        root: item
                    })
                } else {
                    this.resetClear();
                }
            },
            itemQuery(item) {
                const skey = this.$store.state.redmap.mapQueryRoot.key;
                // 单独处理的两个情况 图例 和 重置
                if (skey === "tl") {

                } else if (skey === "clear") {

                }
            }
        }
    }
</script>

<style>
    .modal-loading {
        position: fixed;
        top: 10rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1009;
    }

    .wt-filter {
        position: absolute;
        color: #3b3b3b;
        font-size: 1.4rem;
        background: #ffffff;
        width: 100%;
        z-index: 1010;
    }

    .filter-nav-bar {
        overflow: hidden;
        /* border-bottom:solid 1px #eaeaea; */
        text-align: center;
        margin-right: -1px;
        padding: 0;
    }

    .filter-nav-bar li {
        float: left;
        width: 25%;
        /* border-right:solid 1px #eaeaea; */
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
    }

    .filter-nav-item {
        position: relative;
    }

    .filter-nav-query {
        position: relative;
    }

    .filter-nav-query:after {
        display: inline-block;
        content: '';
    }

    .filter-nav-item:after {
        display: inline-block;
        content: '';
        height: 7px;
        width: 7px;
        border: 1px solid #555;
        border-width: 0 1px 1px 0;
        transform: rotate(45deg);
        margin: auto auto 6px 5px;
    }

    .filter-nav-bar li > span {
        display: block;
        max-width: 75%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.875rem;
    }

    .active {
        color: #61aefc;
    }

    .active:after {
        border: 1px solid #61aefc;
        border-width: 1px 0 0 1px;
        margin: auto auto 2px 5px;
    }

    .filter-panel {
        margin-right: -1px;
        position: absolute;
        background: #ffffff;
        width: 100%;
        z-index: 1010;
        border-right: solid 1px #eaeaea;
        overflow: hidden;
    }

    .filter-panel ul {
        padding: 0;
        marging: 0;
        font-size: 0.875rem;
        color: #3b3b3b;
        border-top: solid 1px #eaeaea;
    }

    .filter-panel-item {
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        border-bottom: solid 1px #eaeaea;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: -webkit-box;
        box-sizing: border-box;
        -webkit-box-align: center;
    }

    .wt-map-list {
        position: absolute;
        background: #ffffff;
        width: 2.0625rem;
        height: 1.725rem;
        top: 5.3375rem;
        right: 0.625rem;
        box-shadow: 1px 1px 10px 0 #ccc;
        z-index: 999;
        text-align: center;
    }

    .wt-map-list a {
        font-size: 0.625rem;
        color: #3b3b3b;
    }
</style>
