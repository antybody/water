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
        <group noPadded class="group-clear">
          <list>
            <list-item :title="item.title" v-for="item in listInfo.lists" :href="item.href">
               <div slot="subTitle">
                 <cell>目标水质:{{item.tag1}}</cell>
                 <cell>达标情况: <span :class="{fred:item.tag2 ==='不达标'}">{{item.tag2}}</span></cell>
                 <cell>供水规模: {{item.tag3}}万m³</cell>
                 <cell>使用状态: <span :class="{fblue:item.tag4 ==='备用'}">{{item.tag4}}</span></cell>
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
   }
}
</script>

<style>
 .fred{
   color:#e54b00
 }
 .fblue{
   color:#5d85ff
 }
</style>
