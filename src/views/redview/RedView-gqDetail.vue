<!--2018.12.03 huaibaoqi-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            灌区基本信息
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <group noPadded class="group-clear">
            <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>{{jcInfo.irrname}}</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">

                    <div class="wt-list-line">
                        <label>日&nbsp;&nbsp;水&nbsp;&nbsp;量：</label>
                        <p class="g-overflow">{{daySl}}（本年监测累计 {{rsl}}m³）</p>
                    </div>
                    <div class="wt-list-line">
                        <label>灌区规模：</label>
                        <p class="g-overflow">{{jcInfo.irrscale}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>设计灌溉面积：</label>
                        <p class="g-overflow">{{jcInfo.desirrarea}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>有效灌溉面积：</label>
                        <p class="g-overflow">{{jcInfo.effirrarea}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>计量方式：</label>
                        <p class="g-overflow">{{jcInfo.calculatetype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>取水方式：</label>
                        <p class="g-overflow">{{jcInfo.irrwatertype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>灌区位置：</label>
                        <p class="g-overflow">{{jcInfo.irrcity + jcInfo.irrtown + jcInfo.irrvillage  }}
                        </p>
                        <i class="icons-ea25 wt-dblue" @click="toMap"></i>
                    </div>
                    <div class="wt-list-more" @click="isShowEvent">{{isShow?'收起信息':'更多信息'}}</div>
                </div>
                <div class="wt-title-line"></div>
                <div class="wt-list-info lpextend" v-show="isShow">
                    <div class="wt-list-line">
                        <label>是否样点灌区：</label>
                        <p class="g-overflow">{{jcInfo.irrsample}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>农田类型：</label>
                        <p class="g-overflow">{{jcInfo.irrtype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>土壤类型：</label>
                        <p class="g-overflow">{{jcInfo.irrsoiltype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>管理单位：</label>
                        <p class="g-overflow">{{jcInfo.managementunit}}</p>
                    </div>
                </div>
            </div>
        </group>

        <group class="group-top-10" noPadded>
            <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>监测水量（m³）</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="classify-tags">
                    <div class="tags-wrap">
                        <a :class="{select:isSelect == 'm'}" @click="tagChange('m')">月水量</a>
                        <a :class="{select:isSelect == 'y'}" @click="tagChange('y')">年水量</a>
                        <a :class="{select:isSelect == 'd'}" @click="tagChange('d')">日水量</a>
                        <a :class="{select:isSelect == 'h'}" @click="tagChange('h')">小时水量</a>
                    </div>
                </div>
                <div id="myCharts" :style="{width:'410px',height:'300px'}"></div>
            </div>
        </group>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import * as API from '../../store/api/api'
    import Vue from 'vue'
    // import echarts from 'echarts'xl
    export default {
        data() {
            return {
                isSelect: 'm',
                isShow: false,
                listmore: '更多信息',
               // qskInfo: [],
               // qshContent: [],
                jcInfo: [],
                monthSl: [],
                yearSl: [],
                daySl:[],
                rsl:''
            }
        },
        mounted() {
            let id = this.$route.params.id;
            let paramData = {
                id: id,
                year: '2018'
            }
            paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            this.$http.jsonp(API.GQ_CONTENT + "&params=" + paramData).then(
                response => {
                    console.log(response.data);
                    this.jcInfo = response.data.jcxx;
                    this.yearSl = response.data.year;
                    this.monthSl = response.data.month;
                    this.daySl = response.data.day.sum;
                    this.rsl= this.yearSl[ this.yearSl.length-1].sum;
                    if(this.daySl= [null]){
                        this.daySl=0;
                    }
                    //this.tagChange('m');
                    this.tagChange('m');

                }, response => {
                    console.log("error");
                });
        },
        computed: {
            ...mapState({
                listInfo: state => state.gqInfo.listDetail
            })
        },
        methods: {
            ...mapActions([
                'getListsDetail'
            ]),
            toMap: function () {
                this.$router.push({name: 'smap', params: {list: this.listInfo, t: 'qsh'}});
            },
            isShowEvent: function () {
                this.isShow = !this.isShow;
            },
            tagChange: function (val) {
                this.isSelect = val;
                let xmData = [], ymData = [],
                    xyData = [], yyData = [];
                for (let value of this.monthSl) {
                    xmData.push(value.dt);
                    ymData.push(parseFloat(value.sum));
                }
                for (let value of this.yearSl) {
                    xyData.push(value.dt);
                    yyData.push(parseFloat(value.sum));
                }

                // 切换图表
                switch (val) {
                    case 'm':
                        this.loadChart({x: xmData, y: ymData, t: 'line'});
                        break;
                    case 'y':
                        this.loadChart({x: xyData, y: yyData, t: 'bar'});
                        break;
                    case 'd':
                        this.loadChart({x: dyData, y: dyData, t: 'bar'});
                        break;
                    case 'h':
                        this.loadChart({x: hyData, y: hyData, t: 'bar'});
                        break;
                }

            },
            loadChart: function (val) {
                let myChart = echarts.init(document.getElementById('myCharts'));
                var options = {
                    color: ['#3398DB'],
                    tooltip: {},
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '10%',
                        right: '14%',
                        bottom: '13%',
                        top: '5%'
                    },
                    xAxis: {
                        data: val.x
                    },
                    yAxis: {},
                    series: [{
                        name: '用水量',
                        type: val.t,
                        data: val.y,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    }]
                };
                myChart.setOption(options);
            }
        }
    }
</script>

<style>

    .wt-title-line {
        position: relative;
    }

    .wt-title-line:after {
        border-width: 0 0 1px 0;
        width: 200%;
        height: 200%;
        display: block;
        content: "";
        border: 1px solid #e6e6e6;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        pointer-events: none;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        transform-origin: left top;
        -webkit-transform-origin: left top;
    }

    .wt-list-more {
        display: block;
        font-size: 1rem;
        color: #62ab00;
        height: 34px;
        line-height: 34px;
        text-align: center;
        padding: 5px 15px 10px;
        /* margin:-5px -10px; */
    }

    .wt-list-info {
        padding: 5px 0;
    }

    .wt-list-line {
        display: -webkit-box;
        line-height: 24px;
        color: #333;
        font-size: 0.75rem;
    }

    .wt-list-line label {
        display: block;
        color: #666;
        font-size: 0.875rem;
    }

    .wt-list-line p {
        width: 100%;
        -webkit-box-flex: 1;
        box-flex: 1;
        margin: 0;
        padding: 0;
        font-size: 0.875rem;
        color: #333;
    }

    .g-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .classify-tags {
        box-flex: 1;
        -webkit-box-flex: 1;
        display: inline-block;
        padding: 0.3125rem 0 0;
    }

    .classify-tags a {
        display: inline-block;
        font-size: 0.875rem;
        color: #666;
        height: 26px;
        line-heigt: 26px;
        box-sizing: border-box;
        -webkit-border-radius: 3px;
        margin-right: 10px;
        padding: 0 6px;
        border: 1px solid #ccc;
    }

    .classify-tags .select {
        color: #3cb950;
        border: 1px solid #3cb950;
    }

    .wt-list-red {
        font-size: 1.125rem;
        color: #e54b00;
        font-weight: 600;
    }

    .wt-list-reds {
        font-size: 0.875rem;
        color: #e54b00;
        font-weight: 600;
    }
</style>