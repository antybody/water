/**
 * 水源地详细信息
 */
<template>
  <vue-view>
      <navbar slot="header" class="wt-linear-blue">
          水源地基础信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>   
      </navbar>
      <group noPadded class="group-clear">      
          <ul class="wt-tabs" :style="{
              'transition-timing-function':'cubic-bezier(0.1, 0.57, 0.1, 1)',
              'transition-duration':tranDuration+'ms',
              'transform':'translate3d('+tranX+'px,'+tranY+'px) translateZ(0px)'
             }">             
              <li :class="{cur:sydId === '1'}" @click="selectStation('1')"><span>青草沙上游水源地</span></li>
              <li :class="{cur:sydId === '2'}" @click="selectStation('2')"><span>陈行新头部</span></li>
              <li :class="{cur:sydId === '3'}" @click="selectStation('3')"><span>三角渡</span></li>
              <li :class="{cur:sydId === '4'}" @click="selectStation('4')"><span>赵屯</span></li>
              <li :class="{cur:sydId === '5'}" @click="selectStation('5')"><span>黄渡</span></li>               
          </ul>
          <div class="showCharts">
               <!-- <loader amStyle="orange" style="display:block"></loader> -->
               <div id="myCharts4" :style="{width:'100%',height:'300px'}"></div>
          </div>
      </group>
      <group class="group-top-10" noPadded>
           <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>最新监测值({{lastdate}})&nbsp;</span></div>
                </h5>
                <div class="wt-title-line"></div>  
                <grid avg="3">
                    <table class="wt-tb" border="1" bordercolor='#a0c6e5'>
                        <thead>
                            <td>分类</td><td>指标项</td><td>监测值</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="5">常规五项</td><td>水温</td><td>11</td>
                            </tr>
                            <tr>
                                <td>电导率</td><td>11</td>
                            </tr>
                            <tr>
                                <td>浊度</td><td>11</td>
                            </tr>
                            <tr>
                                <td>溶解氧</td><td>11</td>
                            </tr>
                            <tr>
                                <td>pH</td><td>11</td>
                            </tr>
                            <tr>
                                <td rowspan="2">必要指标</td><td>高猛酸盐指数</td><td>11</td>
                            </tr>
                            <tr>
                                <td>氨氮</td><td>11</td>
                            </tr>
                            <tr>
                                <td rowspan="2">富营养化指标</td><td>总磷</td><td>11</td>
                            </tr>
                            <tr>
                                <td>总氮</td><td>11</td>
                            </tr>
                        </tbody>
                    </table>
                </grid>
           </div>
       </group>
  </vue-view>
</template>

<script>
import Slider from 'vue-plain-slider'
export default {
    data(){
        return{
            tranDuration:600,
            tranX:0,
            tranY:0,
            sydId:0,
            lastdate:'2017-10-12 12:15'
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.sydId = this.$route.params.id
        })
        let myChart = echarts.init(document.getElementById('myCharts4'));
        let options = {
            grid: {
                top:'10%',
                left: '',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:['pH','氨氮','水温','溶解氧','总磷'],
                x: 'left',
                selectedMode: 'single'
            },
            xAxis: {
                type: 'category',
                data: ['2017/1/1 10:00', '2017/1/1 12:00', '2017/1/1 14:00', '2017/1/1 16:00', '2017/1/1 18:00', '2017/1/1 20:00', '2017/1/1 22:00'].map(function (str) {
                return str.replace(' ', '\n')
                })
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'pH',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true 
                },
                {
                    name:'氨氮',
                    data: [220, 32, 91, 34, 190, 30, 20],
                    type: 'line',
                    smooth: true 
                },
                {
                    name:'水温',
                    data: [22, 32, 1, 34, 90, 30, 20],
                    type: 'line',
                    smooth: true 
                }
            ]
        };
        myChart.setOption(options);

    },
    methods:{
        selectStation:function(v){
            this.sydId = v;
            console.log('-----选中了',v);
            
            this.$nextTick(function(){
                // 这里调用接口处理显示其他测站数据
            })
        }
   }

}
</script>

<style>
.wt-tabs{
    margin:0;
    padding:0;
    white-space:nowrap;
    overflow-x:auto;
    background-color:#ffffff;
}
.wt-tabs li:first-child{
    margin-left:0;
}
.wt-tabs li{
    display:inline-block;
    position: relative;
    height:100%;
    font-size:0.875rem;
    line-height:35px;
    text-align: center;
    padding:0 15px;
}
.wt-tabs .cur span{
    color:#deb260;
    border-color:#deb260;
}
.wt-tabs .cur:after{
   content:'';
   position: absolute;
   display:block;
   top:0;
   left:0;
   width:100%;
   height:100%;
   border-bottom: 2px solid #deb260;
   z-index: 1;
}
.showCharts{
    padding-top:1rem;
}
.wt-tb{
    width:100%;
    height:auto;
    text-align: center;
    font-size:0.875rem;
    cellspacing:0;
    cellpadding:0;
    margin-bottom:10px;
    border-collapse:collapse;
}
.wt-tb td{
    padding:5px;
}
.wt-tb thead td{
    font-weight: 700;
}
</style>
