/**
  数据上报考核-取用水
 */
<template>
  <vue-view class="container">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         数据上报考核
         <icon name="left-nav" slot="left" titleRight="返回" @iconClick="reback"></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li><router-link to="sjsb1">今日情况</router-link></li>
          <li class="ac"><router-link to="sjsb2">取用水上报</router-link></li>
          <li><router-link to="sjsb3">水质监测上报</router-link></li>
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
          <h3>上报情况</h3>
          <ul>
            <li :class="isClick1 == 1 ? 'cur':''" @click="changeEvent('qk',1)">本日</li>
            <li :class="isClick1 == 2 ? 'cur':''" @click="changeEvent('qk',2)">本月</li>
            <li :class="isClick1 == 3 ? 'cur':''" @click="changeEvent('qk',3)">本年</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
        <div style="display:flex">
         <div style="width:50%;height:100px" id="myChart1"></div>
         <div class="chartDesc">
             <ul>
                <li><h3>监测站点</h3></li>
                <li>
                    应报站点：{{jczd_yb}}
                </li>
                 <li>
                     实报站点：{{jczd_sb}}
                 </li>
                 <li>
                     上报率：{{jczd_sbl}}
                 </li>
             </ul>
         </div>
        </div>
        <div style="display:flex">
         <div style="width:50%;height:100px" id="myChart2"></div>
         <div class="chartDesc">
             <ul>
                <li><h3>小时水量</h3></li>
                 <li>
                     应报条数：{{xssl_yb}}
                 </li>
                 <li>
                     实报条数：{{xssl_sb}}
                 </li>
                 <li>
                     上报率：{{xssl_sbl}}
                 </li>
             </ul>
         </div>
        </div>
        <div style="display:flex">
         <div style="width:50%;height:100px" id="myChart3"></div>
         <div class="chartDesc">
             <ul>
                <li><h3>日水量</h3></li>
                 <li>
                     应报条数：{{rsl_yb}}
                 </li>
                 <li>
                     实报条数：{{rsl_sb}}
                 </li>
                 <li>
                     上报率：{{rsl_sbl}}
                 </li>
             </ul>
         </div>
        </div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3;padding-top:10px"></div>
      <!--数据走势 折线图-->
      <div>
        <div class="mod-head">
          <h3>上报率走势</h3>
          <ul>
            <li :class="isClick2 == 1 ? 'cur':''" @click="changeEvent('zs',1)">近一年</li>
            <li :class="isClick2 == 2 ? 'cur':''" @click="changeEvent('zs',2)">近三年</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
        <div style="height:300px;width:100%;" id="lineChart"></div>
      </div>
      <div style="border-bottom:2px dotted #e3e3e3;padding-top:10px"></div>
      
  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import echarUtil from '../../utils/echarUtil'
import * as API from '../../store/api/api'
export default {
  data(){
     return {
       time:new Date(),
       legend:['监测站点','日水量','小时水量'],
       ds:[[111,23,43,21,23],[211,323,143,121,423],[211,323,143,121,423]],
       isClick1:1, // 监测情况
       isClick2:1, // 数据质量走势
       isClick4:1,  // 二级查询条件

         jczd_yb:0,
         jczd_sb:0,
         jczd_sbl:0,

         xssl_yb:0,
         xssl_sb:0,
         xssl_sbl:0,

         rsl_yb:0,
         rsl_sb:0,
         rsl_sbl:0
     }
  },
  computed:{
      ...mapState({
          // jczdList: state => state.sjzl.jczdList,
          // hourList: state => state.sjzl.hourList,
          // dayList: state =>  state.sjzl.dayList
    })
   },
  mounted(){
      //上报情况
      let paramData = {jllx:'',date:'day'}//yue/year
      paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
      this.$http.jsonp(API.GLKH_SJSB_QYS + "&params=" + paramData).then(
          response => {
              this.jczd_yb=response.data.jczd.jczdYbzd;
              this.jczd_sb=response.data.jczd.jczdSbzd;
              this.jczd_sbl=response.data.jczd.jczdSbl;
              this.xssl_yb=response.data.jczd.xsslYbts;
              this.xssl_sb=response.data.jczd.xsslSbts;
              this.xssl_sbl=response.data.jczd.xsslSbl;
              this.rsl_yb=response.data.jczd.rslYbts;
              this.rsl_sb=response.data.jczd.rslSbts;
              this.rsl_sbl=response.data.jczd.rslSbl;
              this.loadChartPi("");
          }, response => {
              console.log("error");
          });
      //走势
      let paramData2 = {date:'year'}//year/year3
      let jczdA=[];
      let rslA=[];
      let xsslA=[];
      let xA=[];
      paramData2 = encodeURI(encodeURI(JSON.stringify(paramData2)));
      this.$http.jsonp(API.GLKH_SJSB_QYSZS + "&params=" + paramData2).then(
          response => {
              for (let value1 of response.data.jczd) {
                  xA.push(value1.time);
                  jczdA.push(parseInt(value1.num.replace('%','')));
              }
              for (let value2 of response.data.rsl) {
                  rslA.push(parseInt(value2.num.replace('%','')));
              }
              for (let value3 of response.data.xssl) {
                  xsslA.push(parseInt(value3.num.replace('%','')));
              }
              this.ds=[];
              this.ds.push(xA);
              this.ds.push(jczdA);
              this.ds.push(rslA);
              this.ds.push(xsslA);

              this.loadChartLi("");
          }, response => {
              console.log("error");
          });
  },
  methods:{
    ...mapActions([
        'getdbLists'
     ]),
    reback:function(e){
       this.$router.push({path:'/check'});
    },
    changeEvent:function(tag,index){
      if(tag == 'qk') // 情况
       this.isClick1 = index;
      if(tag == 'zs') // 走势
       this.isClick2 = index;
      if(tag == 'ml') // 目录
       this.isClick4 = index;
    },
    getYear: function(val) {
        console.log(val);
    },
    loadChartPi:function(){
      // 这里要修改的 -- 即加载真实的数据
        var arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[];
        arr1.push(this.jczd_yb);
        arr2.push(this.jczd_sb);
        arr3.push(this.xssl_yb);
        arr4.push(this.xssl_sb);
        arr5.push(this.rsl_yb);
        arr6.push(this.rsl_sb);
      let myChart = echarts.init(document.getElementById("myChart1"));
      let options = echarUtil.initHBar("",arr1,arr2);
      myChart.setOption(options);
      let myChart1 = echarts.init(document.getElementById("myChart2"));
      let options1 = echarUtil.initHBar("",arr3,arr4);
      myChart1.setOption(options1);
      let myChart2 = echarts.init(document.getElementById("myChart3"));
      let options2 = echarUtil.initHBar("",arr5,arr6);
      myChart2.setOption(options2);
    },
    loadChartLi:function(){
        let lineChart = echarts.init(document.getElementById("lineChart"));
        let lineoptions = echarUtil.initLine3(this.legend,this.ds);
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
  .wtac{
    color:#fff;
    background:#11b9e8 !important;
  }
  .chartDesc h3{
    font-size:0.8125rem;
    padding:0;
    margin:0;
  }
  .chartDesc li{
    font-size:0.8125rem;
  }
</style>
