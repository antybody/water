<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue">
            取水总量
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>

        </navbar>
        <card title="按年份查询">
            <vue-datepicker-local v-model="time" format="YYYY" @click="getYear()"></vue-datepicker-local>
        </card>
        <!--上方年度-->
        <card :title="this.titleY">
            <div id="myCharts" :style="{width:'100%',height:'180px'}"></div>
        </card>
        <!--下方月度-->
        <card :title="this.titleM">
            <div id="myCharts2" :style="{width:'100%',height:'300px'}"></div>
        </card>
        <!--列表-->
        <card :title="this.titleL">
            <grid avg="2">
                <cell class="cell-box wt-font-700">月度</cell>
                <cell class="cell-box wt-font-700">取水量</cell>
            </grid>
            <grid avg="2" v-for="month in monthSl">
                <cell class="cell-box wt-font-700">{{month.dt}}</cell>
                <cell class="cell-box wt-font-700">{{month.day_w}}</cell>

            </grid>
        </card>
    </vue-view>
</template>

<script>
    // import echarts from 'echarts'
    import VueDatepickerLocal from 'vue-datepicker-local'
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import * as API from '../../store/api/api'
    // import datePicker from 'vue-birthday-picker'
    export default {
        name: 'chart',
        components: {
            VueDatepickerLocal
        },
        data() {
            return {
                time: new Date(),
                monthSl: [],
                yearSl: [],
                titleY: '',
                titleM: '',
                titleL: ''

            }
        },
        watch: {
            time() {
                console.log(this.time.getFullYear());
                this.makeTable(this.time.getFullYear());
                this.titleM = this.time.getFullYear() + '年 月度取水总量(亿m³)';
                this.titleL = this.time.getFullYear() + '年 月度取水总量列表(万m³)';
            }
        },
        mounted() {
            console.log(this.time);
            this.titleY = '至 '+ (new Date()).getFullYear() +' 年度取水总量(亿m³)';
            this.titleM = this.time.getFullYear() + '年 月度取水总量(亿m³)';
            this.titleL = this.time.getFullYear() + '年 月度取水总量列表(万m³)';
            this.makeTable(this.time.getFullYear());
        },
        methods: {
            getYear: function (val) {
                console.log(val);
            },
            //生成页面的图表
            makeTable: function (yearV) {
                let myChart = echarts.init(document.getElementById('myCharts'));
                let myChart2 = echarts.init(document.getElementById('myCharts2'));
                let paramData = {
                    year: yearV
                }
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                //图表数据
                this.$http.jsonp(API.QSH_QSL + "&params=" + paramData).then(
                    response => {
                        console.log(response.data);
                        this.monthSl = response.data.monthSl;
                        this.yearSl = response.data.yearSl;
                        let xmData = [], ymData = [],
                            xyData = [], yyData = [];
                        for (let value of this.monthSl) {
                            xmData.push(value.dt);
                            ymData.push(parseFloat(value.day_w / 10000).toFixed(2));
                        }
                        for (let value of this.yearSl) {
                            xyData.push(value.dt);
                            yyData.push(parseFloat(value.day_w / 10000).toFixed(2));
                        }
                        var options2 = {
                            color: ['#3398DB'],
                            title: {
                                show: false
                            },
                            tooltip: {
                                trigger: 'axis',
                                dataIndex: 1
                            },
                            legend: {
                                show: false
                            },
                            grid: {
                                x: -1,
                                y: 0,
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
                                data: xmData
                            },
                            series: [
                                {
                                    type: 'bar',
                                    itemStyle: {
                                        normal: {
                                            color: '#ffab3d'
                                        }
                                    },
                                    data: ymData
                                }
                            ]
                        };
                        myChart2.setOption(options2);
                        var options = {
                            color: ['#3398DB'],
                            title: {
                                show: false
                            },
                            grid: {
                                x: -1,
                                y: 0,
                                x2: 0,
                                y2: 20,
                                borderWidth: 1
                            },
                            tooltip: {
                                trigger: 'axis',
                                position: function (pt) {
                                    return [pt[0], '10%'];
                                }
                            },
                            xAxis: {
                                data: xyData
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                name: '取水量',
                                type: 'line',
                                smooth: true,
                                itemStyle: {
                                    normal: {
                                        color: '#4bafed'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#d2f0fa'
                                        }, {
                                            offset: 1,
                                            color: '#f7fcff'
                                        }])
                                    }
                                },
                                data: yyData
                            }]
                        };
                        myChart.setOption(options);
                    }, response => {
                        console.log("error");
                    });
            }
        }

    }
</script>

<style>

    .wt-font-700 {
        font-weight: 700;
    }
</style>
