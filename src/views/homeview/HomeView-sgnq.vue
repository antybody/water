/**
水功能区情况
*/
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            水功能区评价情况
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <group noPadded class="group-clear">
            <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0 ">
                    <div class="wt-title-center"><span>最新评价</span></div>
                </h5>
                <grid avg="3">
                    <cell class="wt-padding">
                        <div class="wt-grid-border">
                            <span>{{year}}年<br/></span>
                            <span class="wt-bold-14">{{month}}月</span>
                        </div>
                    </cell>
                    <cell class="wt-padding">
                        <div class="wt-grid-border">
                            <span> 117水功能区</span>
                            <span>97断面</span>
                        </div>
                    </cell>
                    <cell class="wt-padding">
                        <div class="wt-grid-border">
                            <span>双因子：{{syzS}}%</span>
                            <span>双因子：{{qyzS}}%</span>
                        </div>
                    </cell>
                </grid>
            </div>
        </group>
        <group noPadded class="group-clear group-top-10">
            <list>
                <list-item :title="item.LDFT" v-for="item in listInfo" v-bind:key="item.LDFT">
              <span slot="subTitle">
                  <cell>
                  <small>Ⅰ类：{{item.one}}</small>
                  <span class="progress wt-b-dblue" :style="{width:item.one/3+'rem'}"></span>
                  </cell>
                  <cell>
                  <small>Ⅱ类：{{item.two}}</small>
                  <span class="progress wt-b-yellow" :style="{width:item.two/3+'rem'}"></span>
                  </cell>
                  <cell>
                  <small>Ⅲ类：{{item.three}}</small>
                  <span class="progress wt-b-yellow" :style="{width:item.three/3+'rem'}"></span>
                  </cell>
                  <cell>
                  <small>Ⅳ类：{{item.four}}</small>
                  <span class="progress wt-b-yellow" :style="{width:item.four/3+'rem'}"></span>
                  </cell>
                  <cell>
                  <small>Ⅴ类：{{item.five}}</small>
                  <span class="progress wt-b-yellow" :style="{width:item.five/3+'rem'}"></span>
                  </cell>
                  <cell>
                  <small>劣Ⅴ类：{{item.lfive}}</small>
                  <span class="progress wt-b-yellow" :style="{width:item.lfive/3+'rem'}"></span>
                  </cell>
              </span>
                </list-item>
            </list>
        </group>
        <group noPadded class="group-clear group-top-10">
            <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0 ">
                    <div class="wt-title-center"><span>水功能区月度达标情况</span></div>
                </h5>
            </div>
            <div id="myCharts3" :style="{padding:'5px 20px 0 20px',width:'100%',height:'180px'}"></div>
        </group>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import * as API from '../../store/api/api'

    export default {
        data() {
            return {
                listInfo:[],
                qyz:[],
                syz:[],
                xArr:[],
                year:0,
                month:0,
                syzS:0,
                qyzS:0
            }
        },
        computed: {
            ...mapState({
                //sgnqNewlists: state => state.homeview.sgnqNewlists
            })
        },
        mounted() {
            var dd = new Date();
            dd.setDate(dd.getDate());//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth();//获取当前月份的日期

            if(m<10){
                m='0'+m;
            }
            this.year=y;
            this.month=m;
            let paramData = {
                pjMonth:y+'-01,'+y+'-'+m
            }
            paramData = encodeURIComponent(JSON.stringify(paramData));
            this.$http.jsonp(API.SGNQ_PJ+ "&params=" + paramData).then(
                response => {
                    console.log(response.data);
                    this.listInfo = response.data[y+'-04'];
                    for (let value of response.data.pj) {
                        this.xArr.push(value.NY);
                        this.qyz.push(value.QYZ);
                        this.syz.push(value.SYZ);
                        this.syzS=value.SYZ;
                        this.qyzS=value.QYZ;

                        // console.log(value);
                    }
                    let myChart2 = echarts.init(document.getElementById('myCharts3'));
                    var options2 = {
                        color: ['#3398DB'],
                        title: {
                            show: false
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {
                            show: false
                        },
                        grid: {
                            x: 1,
                            y: '5%',
                            x2: 0,
                            y2: 20,
                            borderWidth: 1,
                            containLabel: true
                        },
                        yAxis: {
                            type: 'value'
                        },
                        xAxis: {
                            type: 'category',
                            data:this.xArr// ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        series: [
                            {
                                type: 'bar',
                                name:'全因子',
                                itemStyle: {
                                    normal: {
                                        color: '#ffab3d'
                                    }
                                },
                                data:this.qyz// [5, 6, 6, 10, 9, 8, 5, 6, 6, 12, 9, 8]
                            },
                            {
                                type: 'bar',
                                name:'双因子',
                                itemStyle: {
                                    normal: {
                                        color: '#5ccfff'
                                    }
                                },
                                data: this.syz//[15, 26, 36, 10, 9, 58, 5, 6, 6, 12, 9, 8]
                            }
                        ]
                    };
                    myChart2.setOption(options2);
                }, response => {
                    console.log("error");
                });


        }
    }
</script>

<style>
    .wt-padding {
        padding: 0.325rem !important;
    }

    .wt-center {
        text-align: center;
    }

    .wt-grid-border {
        /* border-right:2px solid #5ccfff; */
        display: block;
        height: 100%;
        width: 100%;
        background-color: #fafafa;
    }

    .wt-grid-last {
        display: block;
        height: 100%;
        width: 100%;
    }

    .wt-grid-last span, .wt-grid-border span {
        display: block;
        font-size: 0.75rem;
        text-align: center;
        color: #3F4146;
    }

    .wt-bold-14 {
        font-size: 0.815rem !important;
        font-weight: 700;
        color: #3F4146 !important;
    }

    .wt-line {
        display: block;
        width: 100%;
        border: 1px dotted #5ccfff;
    }

    .progress {
        height: 0.2rem;
        margin-left: 0.2rem;
        display: inline-block;
        line-height: 0.2rem;
        margin-top: 0.625rem;
    }
</style>
