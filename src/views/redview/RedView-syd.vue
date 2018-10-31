@@ -1,50 +0,0 @@
/**
 * 水源地列表
 */
<template>
  <vue-view>
       <navbar slot="header" class="wt-linear-blue">
          水源地
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>   
          <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/syd"></icon>       
        </navbar>
        <group class="group-clear">
          <list>
            <list-item  objectClass="wt-header" :title="item.name" v-for="item in listInfo" :href="item.href" :key="item.id">
               <div slot="title"></div>
               <div slot="subTitle" class="wt-subtitle">
                 <cell>目标水质：<span class="forange">{{item.szmb}}</span> ，达标情况： <span :class="{fred:item.dbqk ==='不达标'}">{{item.dbzk}}</span></cell>
                 <cell></cell>
                 <cell>供水规模：{{item.gsgm}}万m³，使用状态： <span :class="{fblue:item.state ==='备用'}">{{item.state}}</span></cell>
                 <cell></cell>
                  
               </div>
            </list-item>
          </list>
        </group>
  </vue-view>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import * as API from '../../store/api/api'
export default {
    data(){
      return{
          listInfo:[//{"gsgm": "777","href":'/sydDetail/63400011',"id": "63400011","name": "黄浦江上游水源地","state": "备用","dbqk": "达标","szmb": "Ⅲ类","x": "-14188.07939","y": "-24308.72585"}
                  // {title:'长江口陈行水源地',href:'/sydDetail/2',tag1:'111',tag2:'不达标',tag3:'111',tag4:'33',x:'121.122',y:'31.065'}
                  // ,{title:'金泽水源地',href:'/sydDetail/5',tag1:'111',tag2:'221',tag3:'111',tag4:'33',x:'121.32',y:'31.35'}
                  // ,{title:'黄浦江上游',href:'/sydDetail/6',tag1:'111',tag2:'221',tag3:'111',tag4:'备用',x:'121.12',y:'31.5'}
                  // ,{title:'东风西沙水源地',href:'/sydDetail/6',tag1:'111',tag2:'221',tag3:'111',tag4:'33',x:'121.42',y:'31.05'}
              ],
          listDetail:{name:'吴淞江',sz:'II',pj:'II',zdgn:'过渡区',
              addrwater:'吴淞江~苏州河',sdm:'嘉定汶',edm:'蕰藻浜',
              zb:[{name:'嘉定汶',x:121.604799,y:31.217459},
                  {name:'蕰藻浜',x:121.403122,y:31.317181}],
              jcz:[{id:'1',name:'白鹤',zb:'II',pj:'II'},{id:'2',name:'黄渡',zb:'II',pj:'II'}]},
          loading:true,
          pageNum:10,
          pageEnd:1,
          pageStart:1,
          jcInfo:{name:['采样时间','2017-03-07','水温','11.1','pH','7.7','溶解氧','7.7','高猛酸盐指数','7.7','化学需氧量','7.7','五日生化需氧量','7.7','氨氮','7.7','总磷','7.7','总氮','7.7'],
          }
      }
    },
    computed:{
       ...mapState({
            //loading: state => state.sydInfo.loading,
            //listInfo: state => state.sydInfo.listInfo
      })
   },
    mounted() {
        let paramData = {
            stlx:'',  //页面路径 用于注册接口
            mbsz:'',
            type:'1'//需要评价
        }
        paramData = encodeURIComponent(JSON.stringify(paramData));
        this.$http.jsonp(API.SYD_LIST+ "&params=" + paramData).then(
            response => {
                //循环设置跳转地址 href
                for (let value of response.data.data) {
                    value.href = "/sydDetail/" + value.id;
                    // console.log(value);
                }
                this.listInfo = response.data.data;
            }, response => {
                console.log("error");
            });
    },
    methods:{

    }
}
</script>

<style>
 .wt-subtitle{
   /* font-weight: 600; */
   color:#8b8b8b;
   font-size:0.75rem;
 }
 .fred{
   color:#e54b00
 }
 .fblue{
   color:#5d85ff
 }
 .forange{
    color: #fa5741;
    font-weight:700
 }
</style>