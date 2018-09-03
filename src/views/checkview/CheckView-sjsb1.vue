/**
  数据上报考核-今日情况
 */
<template>
  <vue-view class="container-check">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         数据上报考核
         <icon name="left-nav" slot="left" titleRight="返回" @iconClick="reback"></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li class="ac"><router-link to="sjsb1">今日情况</router-link></li>
          <li><router-link to="sjsb2">取用水上报</router-link></li>
          <li><router-link to="sjsb3">水质监测上报</router-link></li>
        </ul>
      </div>
      <!--环形图-->
      <group header="取水户上报" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="qs" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell cells="7">
              <ul class="pieHead">
                <li :key="item.id" v-for="item in qssbList">{{item.txt}}：<span class='forange'>{{item.value}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="用水户上报" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="ys" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <li :key="item.id" v-for="item in yssbList">{{item.txt}}：<span class='forange'>{{item.value}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="水源地上报" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="syd" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <li :key="item.id" v-for="item in sydsbList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>
              </ul>
            </cell>
        </grid>
      </group>
     <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
     <group header="水功能区上报" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="sgnq" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <li :key="item.id" v-for="item in sgnqsbList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>
              </ul>
            </cell>
        </grid>
      </group>
  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
     return {
     }
  },
  computed:{
      ...mapState({
          qssbList: state => state.sjzl.qssbList,
          yssbList: state => state.sjzl.yssbList,
          sydsbList: state => state.sjzl.sydsbList,
          sgnqsbList: state => state.sjzl.sgnqsbList,
          nowTime: state => state.sjzl.nowDate
    })
   },
  mounted(){
    this.getTime();
    this.loadChart("");
  },
  methods:{
    ...mapActions([
        'getTime','getSbLists'
     ]),
    reback:function(e){
       this.$router.push({path:'/check'});
    },
     loadChart:function(val){
       // 这里先调用下 getLists 方法

        let qs_myChart = echarts.init(document.getElementById("qs"));
        let ys_myChart = echarts.init(document.getElementById("ys"));
        let syd_myChart = echarts.init(document.getElementById("syd"));
        let sgnq_myChart = echarts.init(document.getElementById("sgnq"));
        let qs = this.initChart("取水户","20","50","#de4751");
        let ys = this.initChart("用水户","20","50","#62ab00");
        let syd = this.initChart("水源地","20","50","#0a9fde");
        let sgnq = this.initChart("水功能区","20","50","#FFBB00");
        qs_myChart.setOption(qs);
        ys_myChart.setOption(ys);
        syd_myChart.setOption(syd);
        sgnq_myChart.setOption(sgnq);
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
                text: '到报率',
                subtext: t,
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
