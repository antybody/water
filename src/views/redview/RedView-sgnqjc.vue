@@ -1,50 +0,0 @@
/**
 * 水文测站
 */
<template>
  <vue-view>
       <navbar slot="header" class="wt-linear-blue">
           水文测站
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>   
          <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/swcz"></icon>
        </navbar>
        <group class="group-clear">
          <list>
            <list-item  objectClass="wt-header" :title="item.hdst_nm" v-for="item in listInfo" :href="item.href" :key="item.hdst_num">
               <div slot="title"></div>
               <div slot="subTitle" class="wt-subtitle">
                 <cell>目标水质：<span class="forange">{{item.szmb}}</span> ，控制水功能区： <span :class="">{{item.displayname}}</span></cell>
                 <cell></cell>
                 <cell>控制断面：{{item.seg_nm}}，监测状态： <span :class="{fred:item.dbzk ==='超标'}">{{item.dbzk}}</span></cell>
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
          listInfo:[
              // {
              //     "displayname": "长江崇明东滩保护区",
              //     "hdst_nm": "东团",
              //     "hdst_num": "63400012",
              //     "seg_nm": "东滩",
              //     "seg_numb": "184",
              //     "state": "",
              //     "szmb": "Ⅱ类",
              //     "wfz_nb": "F1103000321000",
              //     "x": "",
              //     "y": ""
              // }
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
            mbsz:''
        }
        paramData = encodeURIComponent(JSON.stringify(paramData));
        this.$http.jsonp(API.SGNQJC_LIST+ "&params=" + paramData).then(
            response => {
                //循环设置跳转地址 href
                for (let value of response.data.data) {
                    value.href = "/swczDetail/" + value.hdst_num;
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