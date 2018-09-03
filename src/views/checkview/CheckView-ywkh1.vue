/**
  运维维护考核-整体页面
 */
<template>
  <vue-view class="container">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         运维维护考核
         <icon name="left-nav" slot="left" titleRight="返回" @iconClick="reback"></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li class="ac"><router-link to="ywkh1">今日情况</router-link></li>
          <li><router-link to="ywkh2">取用水运维</router-link></li>
          <li><router-link to="ywkh3">水质监测运维</router-link></li>
        </ul>
      </div>
      <!--今日情况说明-->
      <div style="text-align:center">
          <h3 style="padding-top:10px;font-size:0.9125rem;color:#666">本日无巡检任务</h3>
      </div>
      <grid>
           <cell cells="6" style="border-bottom:1px dotted #4444"></cell>
      </grid>
      <!--环形图-->
      <group header="站点巡检" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="zdxj" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell cells="7">
              <ul class="pieHead">
                <li :key="item.id" v-for="item in zdList">{{item.txt}}：<span class='forange'>{{item.value}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
      <group header="运维任务" :footer="nowTime">
        <grid>
            <cell cells="3"><div class="pies" id="ywrw" :style="{width:'200px',height:'150px'}"></div>
            </cell>
            <cell>
              <ul class="pieHead">
                <li :key="item.id" v-for="item in ywList">{{item.txt}}：<span class='forange'>{{item.value}}</span></li>
              </ul>
            </cell>
        </grid>
      </group>
      <grid>
           <cell cells="6" style="border-bottom:1px solid #4444"></cell>
      </grid>
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
          zdList: state => state.sjzl.zdList,
          ywList: state => state.sjzl.ywList,
          nowTime: state => state.sjzl.nowDate
    })
   },
  mounted(){
    this.getTime();
    this.loadChart("");
  },
  methods:{
    ...mapActions([
        'getTime','getLists'
     ]),
    reback:function(e){
       this.$router.push({path:'/check'});
    },
     loadChart:function(val){
       // 这里先调用下 getLists 方法

        let zdyx_myChart = echarts.init(document.getElementById("zdxj"));
        let ywrw_myChart = echarts.init(document.getElementById("ywrw"));
        let zdyx = this.initChart("站点巡检","20","50","#de4751");
        let ywrw = this.initChart("运维任务","20","50","#62ab00");
        zdyx_myChart.setOption(zdyx);
        ywrw_myChart.setOption(ywrw);

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
</style>
