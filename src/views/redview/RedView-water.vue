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
       <card title="2017 年度取水总量(亿m³)">
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
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>
               <cell class="cell-box">1月</cell><cell class="cell-box wt-dblue">4.89</cell>

           </grid>
       </card>
   </vue-view>
</template>

<script>
    import echarts from 'echarts'
    import VueDatepickerLocal from 'vue-datepicker-local'
    // import datePicker from 'vue-birthday-picker'
    export default {
        name:'chart',
        components: {
            VueDatepickerLocal
        },
        data(){
            return{
                time:new Date()
            }
        },
        mounted(){
            let myChart = echarts.init(document.getElementById('myCharts'));
            var options = {
                color: ['#3398DB'],
                title: {
                    show: false
                },
                grid:{
                    x: -1,
                    y: 0,
                    x2: 0,
                    y2: 20,
                    borderWidth: 1
                },
                tooltip: {},
                legend: {
                    show: false
                },
                xAxis: {
                    data: ["一月","二月","三月","四月","五月","六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                },
                yAxis: {},
                series: [{
                    name: '取水量',
                    type: 'bar',
                    itemStyle: {
                                normal: {
                                    color: '#2894ff'
                                }
                    },
                    data: [5, 6, 6, 10, 9, 8, 5, 6, 6, 12, 9, 8]
                }]
            };
            myChart.setOption(options);

            let myChart2 = echarts.init(document.getElementById('myCharts2'));
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
                    left: '1%',
                    right: '2%',
                    bottom: '3%',
                    top: '0.5%',
                    containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ["十二月","十一月","十月","九月","八月","七月", "六月", "五月", "四月", "三月", "二月", "一月"]
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: '#46a3ff'
                                }
                            },
                        data: [5, 6, 6, 10, 9, 8, 5, 6, 6, 12, 9, 8]
                    }
                ]
            };
            myChart2.setOption(options2);
        }

    }
</script>

<style>
.cell-box{
    border-bottom:1px solid #e3e3e3;
    text-align: center;
}
.wt-font-700{
    font-weight: 700;
}
</style>
