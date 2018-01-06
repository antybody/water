<template>
   <vue-view>
       <navbar slot="header" blue>
          取水总量
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>

        </navbar>
        <div>
           
        </div>

       </navbar>
       <!--下方显示区域-->
       <div id="myCharts" :style="{width:'410px',height:'300px'}"></div>

   </vue-view>
</template>

<script>
    import echarts from 'echarts'
export default {
    name:'chart',
    data(){
        return{
        }
    },
    mounted(){
        let myChart = echarts.init(document.getElementById('myCharts'));
        var options = {
            color: ['#3398DB'],
            title: {
                text: '2017年度取水总量(亿m³)',
                left: 'center',
                top: '10px'
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
                data: [5, 6, 6, 10, 9, 8, 5, 6, 6, 12, 9, 8]
            }]
        };
        myChart.setOption(options);
    }

}
</script>

<style>

</style>
