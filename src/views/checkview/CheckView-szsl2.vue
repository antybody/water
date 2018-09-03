/**
  数据质量考核-取用水
 */
<template>
  <vue-view class="container-check">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         数据质量考核
         <icon name="left-nav" slot="left" titleRight="返回" @iconClick="reback"></icon>
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
            <li><span :class="isClick4 == '地表水取水' ? 'wtac':''" @click="changeEvent('ml','地表水取水')">地表水户</span></li>
            <li><span :class="isClick4 == '地下水开采' ? 'wtac':''" @click="changeEvent('ml','地下水开采')">地下水户</span></li>
            <li><span :class="isClick4 == '用水户取水' ? 'wtac':''" @click="changeEvent('ml','用水户取水')">大用水户</span></li>
            <li><span :class="isClick4 == '农业用水' ? 'wtac':''" @click="changeEvent('ml','农业用水')">灌区用水</span></li>
         </ul>
         <div class="clearfixed"></div>
      </div>
      <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
      <!--柱状图-->
      <div>
        <div class="mod-head">
          <h3>监测情况</h3>
          <ul>
            <li :class="isClick1 == 'day' ? 'cur':''" @click="changeEvent('qk','day')">本日</li>
            <li :class="isClick1 == 'yue' ? 'cur':''" @click="changeEvent('qk','yue')">本月</li>
            <li :class="isClick1 == 'year' ? 'cur':''" @click="changeEvent('qk','year')">本年</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
         <div style="width:410px;height:280px" id="myChart"></div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3;padding-top:10px"></div>
      <!--数据走势 折线图-->
      <div>
        <div class="mod-head">
          <h3>数据质量走势</h3>
          <ul>
            <li :class="isClick2 == 'year1' ? 'cur':''" @click="changeEvent('zs','year1')">近一年</li>
            <li :class="isClick2 == 'year3' ? 'cur':''" @click="changeEvent('zs','year3')">近三年</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
        <div style="height:300px;width:100%;" id="lineChart"></div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3;padding-top:10px"></div>
      <!--排行榜 5个  最好、最坏-->
      <div>
         <div class="mod-head">
           <h3>数据质量排行榜</h3>
           <ul>
             <li :class="isClick3 == 'gao' ? 'cur':''" @click="changeEvent('ph','gao')">高</li>
             <li :class="isClick3 == 'di' ? 'cur':''" @click="changeEvent('ph','di')">低</li>
           </ul>
           <div class="clearfixed"></div>
         </div>
         <ul class="sort-wrap" :style="isClick3 == 'gao' ?'display:block':'display:none'">
           <p v-if='!qsListUp.length'>暂无数据</p>
            <li v-for="(item,index) in qsListUp" :key="index">
               <span><em>{{index+1}}.</em> {{item.MP_NM}}，故障次数 {{item.NUM}} </span>
            </li>
         </ul>
         <ul class="sort-wrap" :style="isClick3 == 'di' ?'display:block':'display:none'">
           <p v-if='!qsListDown.length'>暂无数据</p>
            <li v-for="(item,index) in qsListDown" :key="index">
               <span><em>{{index+1}}.</em> {{item.MP_NM}}，故障次数 {{item.NUM}} </span>
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
       legend:['上报中断','上报延迟','数据跳大','数据跳小','数据为负'],
       ds:[[111,23,43,21,23],[211,323,143,121,423],[211,323,143,121,423]
           ,[211,323,143,121,423],[211,323,143,121,423]],
       isClick1:'day', // 监测情况
       isClick2:'year1', // 数据质量走势
       isClick3:'gao',  // 数据排行榜
       isClick4:'地表水取水',  // 二级查询条件
       isClick5:'10201'
      //  sjListUp:[{name:'国泰君安',num:'0'},{name:'国泰君安',num:'0'}],
      //  sjListDown:[{name:'国泰君安',num:'10',type:'数据中断'},{name:'国泰君安',num:'20',type:'数据跳大'}]
     }
  },
  computed:{
      ...mapState({
          qsListUp: state => state.sjzl.qsListUp,
          qsListDown: state => state.sjzl.qsListDown,
          jcqsList: state => state.sjzl.jcqsList,
          zsqsList: state => state.sjzl.zsqsList,
          jcqsLegend: state => state.sjzl.jcqsLegend,
          zsqsLegend: state => state.sjzl.zsqsLegend
    })
   },
  mounted(){
    // this.loadChart();
    // 加载监测数据
    this.getJcqsLists({type:'day',jllx:'地表水取水'}).then(
       () => {this.loadChart();}
    )
    // 加载质量走势
    this.getZsqsLists({date:'year1',jllx:'地表水取水',ycqk:'10201'}).then(
       () => {this.loadLineChart();}
    )
     // 加载排行版
    this.getSjList_QS({date:'year1',jllx:'地表水取水',type:'gao'});
  },
  methods:{
    ...mapActions([
        'getSjList_QS','getJcqsLists','getZsqsLists'
     ]),
    reback:function(e){
       this.$router.push({path:'/check'});
    },
    changeEvent:function(tag,index){
      if(tag == 'qk') // 情况
       this.isClick1 = index;
      if(tag == 'zs'){ // 走势
       this.isClick2 = index;
       this.getZsqsLists({date:this.isClick2,jllx:this.isClick4,ycqk:this.isClick5}).then(
          () => {this.loadLineChart();}
        )
      }if(tag == 'ph'){ // 排行
       this.isClick3 = index;
       this.getSjList_QS({date:this.isClick2,jllx:this.isClick4,type:this.isClick3});

      }if(tag == 'ml'){ // 目录
       this.isClick4 = index;
       // 监测情况
       this.getJcqsLists({type:this.isClick1,jllx:this.isClick4}).then(
          () => {this.loadChart();}
       );
       this.getZsqsLists({date:this.isClick2,jllx:this.isClick4,ycqk:this.isClick5}).then(
          () => {this.loadLineChart();}
        );
        this.getSjList_QS({date:this.isClick2,jllx:this.isClick4,type:this.isClick3});
      }
    },
    getYear: function(val) {
        console.log(val);
    },
    loadChart:function(){
      // 这里要修改的 -- 即加载真实的数据
      let myChart = echarts.init(document.getElementById("myChart"));
      let options = echarUtil.initChart(this.jcqsLegend,this.jcqsList);
      myChart.setOption(options);
      myChart.on('click',this.barChartClick);
    },
    barChartClick:function(param){
        switch(param.name){
           case '数据延时' :this.isClick5 = '10201';break;
           case '数据跳大' : this.isClick5 = '10101';break;
           case '数据负值' : this.isClick5 = '10102';break;
           case '数据量异常' : this.isClick5 = '10501';  break; 
        }
        this.getZsqsLists({date:this.isClick2,jllx:this.isClick4,ycqk:this.isClick5}).then(
          () => {this.loadLineChart();}
        );
    },
    loadLineChart:function(){
      let lineChart = echarts.init(document.getElementById("lineChart"));
      let lineoptions = echarUtil.initLine(this.zsqsLegend,this.zsqsList);
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
