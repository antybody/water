<template>
  <vue-view>
      <navbar slot="header" blue style="z-index:1010;">
          取水户基本信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
       <group header="取水户基本信息">
           <field label="取水户" style="padding-left:10px;">：上海市城投供水有限公司</field>
           <grid avg="2">
               <cell>机构代码：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
           </grid>
       </group>
       <group header="上海城投原水有限公司" noPadded>
           <ul class="layui-timeline">
               <li class="layui-timeline-item">
                   <div class="layui-circle"></div>
                   <div class="layui-timeline-content">黄浦江取水口： 取水许可证A 10立方米</div>
                </li>
               <li class="layui-timeline-item">
                   <div class="layui-circle"></div>
                   <div class="layui-timeline-content">黄浦江取水口： 取水许可证A 10立方米</div>
               </li>
               <li class="layui-timeline-item">
                   <div class="layui-circle"></div>
                   <div class="layui-timeline-content">黄浦江取水口： 取水许可证A 10立方米</div>
               </li>
               <li class="layui-timeline-item">
                   <div class="layui-circle"></div>
                   <div class="layui-timeline-content">黄浦江取水口： 取水许可证A 10立方米</div>
               </li>
           </ul>
       </group>
       <div class="subgrid">
       <group header="取用水监测" noPadded>
           <grid>
               <cell>月度水量</cell>
               <cell>年度水量</cell>
           </grid>
           <div id="myCharts" :style="{width:'410px',height:'300px'}"></div>
       </group>
       </div>
  </vue-view>
</template>

<script>
import echarts from 'echarts'
export default {
    mounted(){
        let myChart = echarts.init(document.getElementById('myCharts'));
        var options = {
            color: ['#3398DB'],
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
  .subgrid .col{
      display: block;
      background:#e5d5;
      text-align: center;
      border:1px solid #e5d5;
      height:2.1875rem;
  }
  .subgrid .g{
      height:2.1875rem;
  }
</style>
