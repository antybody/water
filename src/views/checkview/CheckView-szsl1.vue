/**
  数据质量考核-整体页面
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
          <li class="ac"><router-link to="sjzl1">今日情况</router-link></li>
          <li><router-link to="sjzl2">取用水数据</router-link></li>
          <li><router-link to="sjzl3">水质评价数据</router-link></li>
        </ul>
      </div>
      <!--环形图-->

      <!--updated to reflect data from provided link-->

      <group header="取用水户上报质量" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="qsh" :style="{width:'200px',height:'150px',margin:'0 0 0 -30px'}"></div>
            </cell>
            <cell cells="7">
              <ul class="pieHead">
                <li :key="item.id" v-for="item in qshList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="水功能区上报质量" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="sgnq" :style="{width:'200px',height:'150px',margin:'0 0 0 -30px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <li :key="item.id" v-for="item in sgnqList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="水源地上报质量" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="syd" :style="{width:'200px',height:'150px',margin:'0 0 0 -30px' }"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <li :key="item.id" v-for="item in sydList">{{item.txt}}：<span class='forange'>{{item.value}}</span>个</li>
              </ul>
            </cell>
        </grid>
      </group>
      <!--曲线图-->
      <div>

      </div>
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
          qshList: state => state.sjzl.qshList,
          sydList: state => state.sjzl.sydList,
          sgnqList: state => state.sjzl.sgnqList,
          nowTime: state => state.sjzl.nowDate
    })
   },
  mounted(){
    this.getTime();
    this.loadChart();
    this.jrqk_getLists({
        param:'0'
    }).then(
        () => { this.loadChart();}
    );
  },
  methods:{
    ...mapActions([
        'getTime','jrqk_getLists'
     ]),
    reback:function(e){
       this.$router.push({path:'/check'});
    },
     loadChart:function(){
       // 这里先调用下 getLists 方法

        let qsh_myChart = echarts.init(document.getElementById("qsh"));
        let syd_myChart = echarts.init(document.getElementById("syd"));
        let sgnq_myChart = echarts.init(document.getElementById("sgnq"));
        let qshO = this.initChart("取用水户",this.qshList[0].value,this.qshList[1].value,"#de4751");
        let sydO = this.initChart("水源地",this.sydList[5].value,this.sydList[0].value-this.sydList[5].value,"#62ab00");
        let sgnqO = this.initChart("水功能区",this.sgnqList[5].value,this.sgnqList[1].value-this.sgnqList[5].value,"#0a9fde");
        qsh_myChart.setOption(qshO);
        syd_myChart.setOption(sydO);
        sgnq_myChart.setOption(sgnqO);

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
                        return ((x1/(x2+x1)).toFixed(2)*100).toFixed(2) +'%'
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
                text: '异常/正常',
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
                        {name:'正常', value:x2, itemStyle : labelTop}
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
    margin:0;
    padding-left:0;
  }
</style>
