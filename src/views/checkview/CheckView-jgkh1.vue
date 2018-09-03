/**
  业务监管考核-取用水
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
          <li class="ac"><router-link to="jgkh1">取用水监管</router-link></li>
          <li><router-link to="jgkh2">水质评价监管</router-link></li>
        </ul>
      </div>
      <!--日期选择-->
      <div class="wttabs-second">
         <ul>
            <li><span :class="isClick4 == 1 ? 'wtac':''" @click="changeEvent('ml',1)">本日</span></li>
            <li><span :class="isClick4 == 2 ? 'wtac':''" @click="changeEvent('ml',2)">本月</span></li>
            <li><span :class="isClick4 == 3 ? 'wtac':''" @click="changeEvent('ml',3)">本年</span></li>
         </ul>
         <div class="clearfixed"></div>
      </div>
      <!--环形图-->
      <group header="取水量/许可量" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="qs" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell cells="7">
              <ul class="pieHead">
                <!--<li :key="item.id" v-for="item in qsList">{{item.txt}}：<span class='forange'>{{item.value}}</span></li>-->
                  <li >取水户数：<span class='forange'>{{qshs}}</span>个</li>
                  <li >许可总量：<span class='forange'>{{xkzl}}</span></li>
                  <li >取水总量：<span class='forange'>{{qszl}}</span></li>
                  <li >取水许可比：<span class='forange'>{{qsxkb}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="超量取水" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="cl" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <!--<li :key="item.id" v-for="item in clList">{{item.txt}}：<span class='forange'>{{item.value}}</span></li>-->
                  <li >超量户数：<span class='forange'>{{clhs}}</span>个</li>
                  <li >超标水量：<span class='forange'>{{cbsl}}</span></li>
                  <li >超标比率：<span class='forange'>{{cbbl}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="许可证逾期" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="xkz" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <!--<li :key="item.id" v-for="item in xkzList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>-->

                  <li >证总数：<span class='forange'>{{xkzSum}}</span>个</li>
                  <li >失效证数：<span class='forange'>{{sxzs}}</span>个</li>
                  <li >失效比率：<span class='forange'>{{sxbl}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
     <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
     <group header="大用水户用水" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="dys" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <!--<li :key="item.id" v-for="item in dysList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>-->
                  <li >用水户数：<span class='forange'>{{yshs}}</span>个</li>
                  <li >用水计划：<span class='forange'>{{ysjh}}</span>个</li>
                  <li >用水总量：<span class='forange'>{{yszl}}</span>个</li>
                  <li >计划比率：<span class='forange'>{{jhbl}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as API from '../../store/api/api'
export default {
  data(){
     return {
         yshs:0,
         ysjh:0,
         yszl:0,
         jhbl:0,

         qshs:0,
         qsxkb:0,
         qszl:0,
         xkzl:0,

         QSZL:0,
         XKZL:0,

         sxbl:0,
         sxzs:0,
         xkzSum:0,

         isClick4:1,

         clhs:0,
         cbsl:0,
         cbbl:0
     }
  },
  computed:{
      ...mapState({
          // qsList: state => state.sjzl.qsList,
          // clList: state => state.sjzl.clList,
          // xkzList: state => state.sjzl.xkzList,
          // dysList: state => state.sjzl.dysList,
          nowTime: state => state.sjzl.nowDate

    })
   },
  mounted(){
    this.getTime();

      var paramsData = {
          date: 'day'
      };
      paramsData = encodeURIComponent(JSON.stringify(paramsData));
      this.$http.jsonp(API.YWJG_QYS + "&params=" + paramsData).then(
          response => {
              this.qshs = response.data.data[0].qshs;
              this.qsxkb = response.data.data[0].qsxkb;
              this.qszl = response.data.data[0].qszl;
              this.xkzl = response.data.data[0].xkzl;

              // this.QSZL = response.data.data[1].QSZL;
              // this.XKZL = response.data.data[1].XKZL;

              this.sxbl = response.data.data[2].sxbl;
              this.sxzs = response.data.data[2].sxzs;
              this.xkzSum = response.data.data[2].xkzSum;

              this.yshs = response.data.data[3].yshs;
              this.ysjh = response.data.data[3].ysjh;
              this.yszl = response.data.data[3].yszl;
              this.jhbl = response.data.data[3].jhbl;
              this.loadChart("");
          }, response => {
              console.log("error");
          });
  },
  methods:{
    ...mapActions([
        'getTime','getLists'
     ]),
    changeEvent:function(tag,index){
        if(tag == 'ml') // 目录
          this.isClick4 = index;
    },
    reback:function(e){
       this.$router.push({path:'/check'});
    },
     loadChart:function(val){
       // 这里先调用下 getLists 方法

        let qs_myChart = echarts.init(document.getElementById("qs"));
        let cl_myChart = echarts.init(document.getElementById("cl"));
        let xkz_myChart = echarts.init(document.getElementById("xkz"));
        let dys_myChart = echarts.init(document.getElementById("dys"));
        let qs = this.initChart("取水/许可",this.xkzl,this.qszl,"#de4751");
        let cl = this.initChart("超量取水","0","50","#62ab00");
        let xkz = this.initChart("许可逾期",this.sxzs,this.xkzSum,"#0a9fde");
        let dys = this.initChart("大用水",this.ysjh,this.yszl,"#FFBB00");
        qs_myChart.setOption(qs);
        cl_myChart.setOption(cl);
        xkz_myChart.setOption(xkz);
        dys_myChart.setOption(dys);
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
                        return (x1/x2).toFixed(2)*100 +'%'
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
</style>
