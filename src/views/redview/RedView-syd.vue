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
            <list-item  objectClass="wt-header" :title="item.title" v-for="item in listInfo.lists" :href="item.href" :key="item.index">
               <div slot="title"></div>
               <div slot="subTitle" class="wt-subtitle">
                 <cell>目标水质：<span class="forange">{{item.tag1}}</span> ，达标情况： <span :class="{fred:item.tag2 ==='不达标'}">{{item.tag2}}</span></cell>
                 <cell></cell>
                 <cell>供水规模：{{item.tag3}}万m³，使用状态： <span :class="{fblue:item.tag4 ==='备用'}">{{item.tag4}}</span></cell>
                 <cell></cell>
                  
               </div>
            </list-item>
          </list>
        </group>
  </vue-view>
</template>

<script>

import { mapState, mapActions } from 'vuex'
export default {
    data(){
      return{

      }
    },
    computed:{
       ...mapState({
            loading: state => state.sydInfo.loading,
            listInfo: state => state.sydInfo.listInfo
      })
   },
   filters:{
     filtertitle(val){
       return "<span class='wt-header'>"+val+"</span>"
     }
   },
   methods:{
    onSlideChangeStart (currentPage, el) {
      console.log('onSlideChangeStart', currentPage, el);
    },
    onSlideChangeEnd (currentPage, el) {
      console.log('onSlideChangeEnd', currentPage, el);
    }
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