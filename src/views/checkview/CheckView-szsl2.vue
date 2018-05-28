/**
  数据质量考核-取用水
 */
<template>
  <vue-view class="container">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         数据质量考核
         <icon name="left-nav" slot="left" titleRight="返回" back></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li><router-link to="sjzl1">今日情况</router-link></li>
          <li class="ac"><router-link to="sjzl2">取用水数据</router-link></li>
          <li><router-link to="sjzl3">水质评价数据</router-link></li>
        </ul>
      </div>
      <!--二级目录-->
      <div class="wttabs-second">
         <ul>
            <li><span>地表水户</span></li>
            <li><span>地下水户</span></li>
            <li><span>大用水户</span></li>
            <li><span>灌区用水</span></li>
         </ul>
      </div>
      <!--柱状图-->
      <div style="height:350px;">
        <div style="text-align:center;padding-top:55px">
          <vue-datepicker-local v-model="time" format="YYYY-MM-DD" ></vue-datepicker-local>
        </div>
         <div style="top:-20px;left:-20px;width:410px;height:300px" id="myChart"></div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3">
      </div>
      <!--下方详情数据切换-->
      <div>
        <div style="height:300px"></div>
      </div>
      <!--曲线图-->
      <div>
      </div>
  </vue-view>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'
export default {
  components: {
            VueDatepickerLocal
  },
  data(){
     return {
       titleItems:[
                {icon:'home',txt:'整体',href:'sjzl1'},
                {icon:'bars',txt:'取用水',href:'sjzl1'},
                {icon:'home',txt:'水质与评价',href:'sjzl3'}
            ]
     }
  },
  mounted(){
    this.loadChart();
  },
  methods:{
    loadChart:function(){
      // 这里要修改的 -- 即加载真实的数据
      let myChart = echarts.init(document.getElementById("myChart"));
      let options = this.initChart("");
      myChart.setOption(options);
    },
    initChart:function(dt){

      var option = {
          left:'-10%',
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          xAxis: [
              {
                  type: 'category',
                  axisTick: {show: false},
                  data: ['上报中断','上报延迟','数据跳大','数据跳小','数据为负']
              }
          ],
          yAxis: [
              {
                  show:false,
                  type: 'value'
              }
          ],
          series: [
                {
                    name: '上报延迟',
                    type: 'bar',
                    barGap: 1,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle:{
                      normal:{
                        color:function(params){
                           var colors = ['#36a2da', '#32c5e9', '#67e0e3', '#9ee7b7','#e5323e'];

                           return colors[params.dataIndex];
                        }
                      }
                    },
                    data: [320, 332, 301, 334, 390]
                }
            ]
          };
      return option;
    }
  }
}
</script>

<style>
  .wtabs li {
    -webkit-box-flex:1;
    flex:1;
    text-align: center;
    font-size:16px;
    padding-top:5px;
  }
  .container{
    background:#fff;
  }
  .wtabs{
    width:100%;
    height:40px;
    display: flex;
    border-bottom:1px dotted #eaeaea;
    flex-direction:row;
    margin:0;padding:0;
  }
  .ac{
    border-bottom:2px solid #19a0f0;
  }
  .ac a {
    color:#19a0f0;
  }
  .wttabs-second{
    color:#666;
    clear:both;
  }
  .wttabs-second ul{
    margin:0;padding:0;
  }
  .wttabs-second li{
    float:left;
    width:25%;
    margin-top:10px;
  }
  .wttabs-second li span{
    display:block;
    background:#f6f6f6;
    line-height:30px;
    padding:0 5px;
    margin:0 8px;
    text-align:center;
    overflow:hidden;
    border-radius:5px;
    text-overflow:ellipsis;
    font-size:0.8125rem;
  }
</style>
