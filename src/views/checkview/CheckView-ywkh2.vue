/**
  运维维护考核-取用水
 */
<template>
  <vue-view class="container-check">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         运维巡检考核
         <icon name="left-nav" slot="left" titleRight="返回" @iconClick="reback"></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li><router-link to="ywkh1">今日情况</router-link></li>
          <li class="ac"><router-link to="ywkh2">取用水运维</router-link></li>
          <li><router-link to="ywkh3">水质监测运维</router-link></li>
        </ul>
      </div>
      <!--二级目录-->
      <div class="wttabs-second">
         <ul>
            <li><span :class="isClick4 == 1 ? 'wtac':''" @click="changeEvent('ml',1)">地表水户</span></li>
            <li><span :class="isClick4 == 2 ? 'wtac':''" @click="changeEvent('ml',2)">地下水户</span></li>
            <li><span :class="isClick4 == 3 ? 'wtac':''" @click="changeEvent('ml',3)">大用水户</span></li>
            <li><span :class="isClick4 == 4 ? 'wtac':''" @click="changeEvent('ml',4)">灌区用水</span></li>
         </ul>
         <div class="clearfixed"></div>
      </div>
      <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
      <!--柱状图-->
      <div>
        <div class="mod-head">
          <h3>例行巡检情况</h3>
          <ul>
            <li :class="isClick1 == 1 ? 'cur':''" @click="changeEvent('qk',1)">本年</li>
            <li :class="isClick1 == 2 ? 'cur':''" @click="changeEvent('qk',2)">近三年</li>
            <li :class="isClick1 == 3 ? 'cur':''" @click="changeEvent('qk',3)">近五年</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
         <div style="width:100%;height:280px" id="myChart"></div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3;padding-top:10px"></div>
      <!--数据走势 折线图-->
      <div>
        <div class="mod-head">
          <h3>运维巡检情况</h3>
          <ul>
            <li :class="isClick2 == 1 ? 'cur':''" @click="changeEvent('zs',1)">本年</li>
            <li :class="isClick2 == 2 ? 'cur':''" @click="changeEvent('zs',2)">近三年</li>
            <li :class="isClick2 == 3 ? 'cur':''" @click="changeEvent('zs',3)">近五年</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
        <div style="height:300px;width:100%;" id="lineChart"></div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3;padding-top:10px"></div>
      <!--排行榜 5个  最好、最坏-->
      <div>
         <div class="mod-head">
           <h3>运维问题排行榜</h3>
           <!-- <ul>
             <li :class="isClick3 == 1 ? 'cur':''" @click="changeEvent('ph',1)">高</li>
             <li :class="isClick3 == 2 ? 'cur':''" @click="changeEvent('ph',2)">低</li>
           </ul> -->
           <div class="clearfixed"></div>
         </div>
         <ul class="sort-wrap" :style="isClick3 == 1 ?'display:block':'display:none'">
            <li v-for="(item,index) in sjListUp" :key="index">
               <span><em>{{index+1}}.</em> {{item.name}}，故障次数 {{item.num}} </span>
            </li>
         </ul>
      </div>
  </vue-view>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'
import { mapState, mapActions } from 'vuex'
import echarUtil from '../../utils/echarUtil'
export default {
  components: {
    VueDatepickerLocal
  },
  data(){
     return {
       time:new Date(),
       legend:['实际','计划'],
       ds:[[111,23,43,21,23],[211,323,143,121,423],[211,323,143,121,423]
           ,[211,323,143,121,423],[211,323,143,121,423]],
       isClick1:1, // 监测情况
       isClick2:1, // 数据质量走势
       isClick3:1,  // 数据排行榜
       isClick4:1,  // 二级查询条件
       sjListUp:[{name:'上报中断-网络异常',num:'0'},{name:'上报中断-断电',num:'0'}]
     }
  },
  computed:{
      ...mapState({
          // sjListUp: state => state.sjzl.sjListUp,
          // sjListDown: state => state.sjzl.sjListDown
    })
   },
  mounted(){
    this.loadChart();
  },
  methods:{
    ...mapActions([
        'getSjLists'
     ]),
    reback:function(e){
       this.$router.push({path:'/check'});
    },
    changeEvent:function(tag,index){
      if(tag == 'qk') // 情况
       this.isClick1 = index;
      if(tag == 'zs') // 走势
       this.isClick2 = index;
      if(tag == 'ph'){ // 排行
       this.isClick3 = index;
       
      }if(tag == 'ml') // 目录
       this.isClick4 = index;
    },
    getYear: function(val) {
        console.log(val);
    },
    loadChart:function(){
      // 这里要修改的 -- 即加载真实的数据
      let myChart = echarts.init(document.getElementById("myChart"));
      let options = echarUtil.initYwLine1(this.legend,this.ds);
      myChart.setOption(options);
      let lineChart = echarts.init(document.getElementById("lineChart"));
      let lineoptions = echarUtil.initYwLine2(this.ds[0]);
      lineChart.setOption(lineoptions);
    }
    
  }
}
</script>

<style>
  * { touch-action: none; }
  .up{
    display: block;
  }
  .down{
    display: none;
  }
  .mod-head{
    padding:13px 0 ;
  }
  .mod-head h3{
    height:19px;
    line-height:19px;
    padding-left:12px;
    border-left:3px solid #19a0f0;
    font-size:0.9375rem;
    color:#333;
    font-weight:700;
    float:left;
  }
  .mod-head ul{
    float:right;
    font-size:0.8125rem;
    color:#666;
    padding-right:5px;
  }
  .mod-head li{
    float:left;
    padding-left:20px;
  }
  .cur{
    color:#19a0f0;
    font-weight: 700;
  }
  .sort-wrap li{
    display: flex;
    height:16px;
    line-height:16px;
    margin-bottom: 18px;
    color:#555;
  }
  .sort-wrap span{
     display:inline-block;
  }
  .clearfixed{
    clear:both;
  }
  .wtabs li {
    -webkit-box-flex:1;
    flex:1;
    text-align: center;
    font-size:16px;
    padding-top:5px;
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
  .wtac{
    color:#fff;
    background:#11b9e8 !important;
  }
</style>
