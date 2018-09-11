/**
  业务监管考核-水质评价
 */
<template>
  <vue-view class="container">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         业务监管考核
         <icon name="left-nav" slot="left" titleRight="返回" @iconClick="reback"></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li><router-link to="jgkh1">取用水监管</router-link></li>
          <li class="ac"><router-link to="jgkh2">水质评价监管</router-link></li>
        </ul>
      </div>
      <!--日期选择-->
      <!--<div class="wttabs-second">-->
         <!--<ul>-->
            <!--<li><span :class="isClick4 == 1 ? 'wtac':''" @click="changeEvent('ml',1)">本日</span></li>-->
            <!--<li><span :class="isClick4 == 2 ? 'wtac':''" @click="changeEvent('ml',2)">本月</span></li>-->
            <!--<li><span :class="isClick4 == 3 ? 'wtac':''" @click="changeEvent('ml',3)">本年</span></li>-->
         <!--</ul>-->
         <!--<div class="clearfixed"></div>-->
      <!--</div>-->
      <!--环形图-->
      <group header="饮用水源地" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="syd" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell cells="7">
              <ul class="pieHead">
                  <li >水源地：<span class='forange'>{{sydSl}}</span>个</li>
                  <li >监测数量：<span class='forange'>{{sydJcsl}}</span></li>
                  <li >超标数量：<span class='forange'>{{sydCbsl}}</span></li>
                  <li >超标比率：<span class='forange'>{{sydCbl}}</span></li>
                  <li >超标项数：<span class='forange'>{{sydCbxs}}</span></li>
                  <li >超标测站：<span class='forange'>{{sydCbcz}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="水功能区" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="sgnq" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                  <li >水功能区：<span class='forange'>{{sgnqSl}}</span></li>
                  <li >监测数量：<span class='forange'>{{sgnqJcsl}}</span></li>
                  <li >超标数量：<span class='forange'>{{sgnqCbsl}}</span></li>
                  <li >超标比率：<span class='forange'>{{sgnqCbl}}</span></li>
                  <li >超标项数：<span class='forange'>{{sgnqCbxs}}</span></li>
                  <li >超标测站：<span class='forange'>{{sgnqCbcz}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
       <!--柱状图-->
       <div>
         <div class="mod-head">
          <h3>水功能区(参评117个)</h3>
          <ul>
            <li :class="isClick2 == 1 ? 'cur':''" @click="changeEvent('zs',1)">单因子</li>
            <li :class="isClick2 == 2 ? 'cur':''" @click="changeEvent('zs',2)">双因子</li>
          </ul>
          <div class="clearfixed"></div>
        </div>
         <div style="width:410px;height:280px" id="myChart"></div>
       </div>
  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as API from '../../store/api/api'
import echarUtil from '../../utils/echarUtil'
export default {
  data(){
     return {
        isClick4:1,
        isClick2:1,

         sgnqSl:0,
         sgnqJcsl:0,
         sgnqCbsl:0,
         sgnqCbl:0,
         sgnqCbxs:0,
         sgnqCbcz:0,

         sydSl:0,
         sydJcsl:0,
         sydCbsl:0,
         sydCbl:0,
         sydCbxs:0,
         sydCbcz:0,

         legend:['I类','II类','III类','IV类','V类','劣V类'],
        ds:[[111,23,43,21,23],[211,323,143,121,423],[211,323,143,121,423]
           ,[211,323,143,121,423],[211,323,143,121,423]]
     }
  },
  computed:{
      ...mapState({
          // sydList: state => state.sjzl.sydList,
          // sgnqList: state => state.sjzl.sgnqList,
          // pjdList: state => state.sjzl.pjdList,
          // pjsList: state => state.sjzl.pjsList,
          // nowTime: state => state.sjzl.nowDate
    })
   },
  mounted(){
    this.getTime();
    this.loadChart("");
    this.loadBar('');
  },
  methods:{
    ...mapActions([
        'getTime','getLists'
     ]),
    changeEvent:function(tag,index){
        if(tag == 'ml'){
            this.isClick4 = index;
            this.loadBar('');
        } // 目录
        if(tag == 'zs'){
            this.isClick2 = index;
            this.loadChart('');
        } // 评价


    },
    reback:function(e){
       this.$router.push({path:'/check'});
    },
     loadChart:function(val){
       // 这里先调用下 getLists 方法
         let type=this.isClick2==1?'all':'two';
         let params2 = {
             date: "yue",
             type: type,
         };
         let dsA=[];
         let dsB=[];
         params2 = encodeURI(encodeURI(JSON.stringify(params2)));
         this.$http.jsonp(API.YWJG_SGNQ + "&params=" + params2).then(//运维
             response => {
                 for (let value of response.data.data) {
                     dsA.push(value.NUM);
                     dsB.push(value.DBPJ);
                 }
                 // 下面是柱状图
                 let myChart = echarts.init(document.getElementById("myChart"));
                 let options = echarUtil.initChart(dsB,dsA);
                 myChart.setOption(options);

             }, response => {
                 console.log("error");
             });


     },
      loadBar:function(val){
          let params2 = {
              date: "",
              type: 'all',
          };
          let dsA=[];
          let dsB=[];
          params2 = encodeURI(encodeURI(JSON.stringify(params2)));
          this.$http.jsonp(API.YWJG_SZ + "&params=" + params2).then(//运维
              response => {
                  this.sgnqSl=response.data.sgnq.sgnqSl;
                  this.sgnqJcsl=response.data.sgnq.sgnqJcsl;
                  this.sgnqCbsl=response.data.sgnq.sgnqCbsl;
                  this.sgnqCbl=response.data.sgnq.sgnqCbl;
                  this.sgnqCbxs=response.data.sgnq.sgnqCbxs;
                  this.sgnqCbcz=response.data.sgnq.sgnqCbcz;

                  this.sydSl=response.data.syd.sydSl;
                  this.sydJcsl=response.data.syd.sydJcsl;
                  this.sydCbsl=response.data.syd.sydCbsl;
                  this.sydCbl=response.data.syd.sydCbl;
                  this.sydCbxs=response.data.syd.sydCbxs;
                  this.sydCbcz=response.data.syd.sydCbcz;

                  let qs_myChart = echarts.init(document.getElementById("syd"));
                  let cl_myChart = echarts.init(document.getElementById("sgnq"));
                  let qs = this.initChart("水源地",parseInt(this.sgnqCbl.replace('%','')),100-parseInt(this.sgnqCbl.replace('%','')),"#de4751");
                  let cl = this.initChart("水功能区",parseInt(this.sydCbl.replace('%','')),100-parseInt(this.sydCbl.replace('%','')),"#62ab00");
                  qs_myChart.setOption(qs);
                  cl_myChart.setOption(cl);
              }, response => {
                  console.log("error");
              });
      },
     initChart:function(t,x1,x2,c){

        //文字
        var labelTop = {
            normal : {
                label : {
                    show : false,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                        baseline : 'bottom',  //垂直对齐方式
                        fontSize:12,
                        color:'#666',
                        align : 'center'  //水平对齐方式
                    }
                },
                color:c,
                labelLine : {  //标示线
                    show : false
                }
            }
        };
        //百分比设置
        var labelFromatter = {
            normal : {
                label : {
                    formatter : function (params){
                        if(params.name == '异常')
                        return (x1/(x2+x1)).toFixed(2)*100 +'%'
                        else
                          return ''
                    },
                    padding:[25,0,0,0],
                    position: 'center',
                    textStyle: {
                        fontSize:25,
                        color:'#666',
                        align : 'center'   //水平对齐方式
                    }
                }
            }
        };
        //数据位置
        var labelBottom = {
            normal : {
                color: '#ccc'
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
       var  options = {
            title: {
                text: t,
                subtext: '',
                // sublink: 'http://e.weibo.com/1341556070/AhQXtjbqh',
                x: 'center',
                y: '60',
                top:'30',
                itemGap: 45,
                textStyle : {
                    color : c,
                    fontSize : 16,
                    fontWeight : 'bold'
                },
                subtextStyle : {
                    color : '#666',
                    fontSize : 16,
                    fontWeight : 'bold'
                }
            },
            series : [
                {
                    type : 'pie',
                    center : ['50%', '50%'],
                    radius: ['78%', '85%'],
                    itemStyle : labelFromatter,
                    data : [
                        {name:'异常', value:x1, itemStyle : labelBottom},
                        {name:'正常', value:x2,itemStyle : labelTop}
                    ]
                }
            ]
     };
     return options;

  }
  }
}
</script>

<style>
 .forange{
    color: #fa5741;
    font-weight:700
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
  .pieHead{
    color:#6d6d72;
    padding-top:20px;
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
  .clearfixed{
      clear:both;
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
</style>
