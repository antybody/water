<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue">
            取水总量
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>

        </navbar>
        <card title="按年份查询">
            <vue-datepicker-local v-model="time" format="YYYY"></vue-datepicker-local>
        </card>
        <!--上方年度-->
        <card title="至 2017 年度取水总量(亿m³)">
            <div id="myCharts" :style="{width:'100%',height:'180px'}"></div>
        </card>
        <!--下方月度-->
        <card title="2017 月度取水总量(亿m³)">
            <div id="myCharts2" :style="{width:'100%',height:'300px'}"></div>
        </card>
        <!--列表-->
        <card title="2017 月度取水总量列表">
            <grid avg="2">
                <cell class="cell-box wt-font-700">月度</cell><cell class="cell-box wt-font-700">取水量</cell>
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
                monthSl: []
            }
        },
        mounted() {
            let myChart = echarts.init(document.getElementById('myCharts'));
            let myChart2 = echarts.init(document.getElementById('myCharts2'));
            let paramData = {
                year: '2018'
            }
            paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            this.$http.jsonp(API.QSH_QSL + "&params=" + paramData).then(
                response => {
                    console.log(response.data.data);
                    this.monthSl = response.data.data;
                    var monthData = [];
                    for(var i = 0;i < response.data.data.length;i ++){
                        monthData[i] = (parseFloat(response.data.data[i]['day_w'])/100000000).toFixed(2);
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
                            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        series: [
                            {
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: '#ffab3d'
                                    }
                                },
                                data: monthData
                            }
                        ]
                    };
                    myChart2.setOption(options2);
                }, response => {
                    console.log("error");
                });
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
                    data: ["2015", "2016", "2017", "2018"]
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
                    data: [5, 6, 6, 10, 9, 8, 5, 6, 6, 12, 9, 8]
                }]
            };
            myChart.setOption(options);
        }

    }
</script>

<style>

    .wt-font-700 {
        font-weight: 700;
    }
</style>
