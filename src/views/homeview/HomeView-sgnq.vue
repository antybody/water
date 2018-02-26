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
                <span> 2017年<br/></span>
                <span class="wt-bold-14">12月</span>
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
                <span>双因子：10%</span>
                <span>双因子：10%</span>
            </div>
            </cell>            
        </grid>
    </div>
  </group>
  <group noPadded class="group-clear group-top-10">
      <list>
          <list-item :title="item.name" v-for="item in sgnqNewlists.type" v-bind:key="item.index">
              <span slot="subTitle">
                  <cell>
                  <small>双 {{item.db}}%</small>
                  <span class="progress wt-b-dblue" :style="{width:item.db+'%'}"></span>
                  </cell>
                  <cell>
                  <small>单 {{item.sg}}%</small>
                  <span class="progress wt-b-yellow" :style="{width:(item.sg-5)+'%'}"></span>
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
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
export default {
   data(){
       return{

       }
   },
   computed:{
        ...mapState({
            sgnqNewlists:state => state.homeview.sgnqNewlists
        })        
    },
    mounted(){
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
                        data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月", "12月"]
                    },
                    series: [
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: '#ffab3d'
                                }
                            },
                        data: [5, 6, 6, 10, 9, 8, 5, 6, 6, 12, 9, 8]
                       },
                       {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: '#5ccfff'
                                }
                            },
                        data: [15, 26, 36, 10, 9, 58, 5, 6, 6, 12, 9, 8]
                       }
                ]
            };
        myChart2.setOption(options2);
    }
}
</script>

<style>
 .wt-padding{
     padding:0.325rem !important;
 }
 .wt-center{
     text-align: center;
 }
 .wt-grid-border{
     /* border-right:2px solid #5ccfff; */
     display: block;
     height:100%;width:100%;
     background-color:#fafafa;
 }
 .wt-grid-last{
     display: block;
     height:100%;width:100%;
 }
 .wt-grid-last span, .wt-grid-border span{
     display: block;
     font-size:0.75rem;
     text-align: center;
     color:#3F4146;
 }
 .wt-bold-14{
     font-size:0.815rem !important;
     font-weight: 700;
     color:#3F4146 !important;
 }
 .wt-line{
     display: block;
     width:100%;
     border:1px dotted #5ccfff;
 }
 .progress{
       height: 0.2rem;
       margin-left: 0.2rem;
       display: inline-block;
       line-height: 0.2rem;
       margin-top: 0.625rem;
   }
</style>
