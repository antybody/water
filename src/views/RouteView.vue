<template>
   <vue-view>
      <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         巡检运维
      </navbar>
      <!--巡检首页面头部方块切换页面-->
      <grid avg="4" bordered  class="textcenter">
         <cell v-for="item in titleItems" :key="titleItems.id">
            <router-link :to='item.href'>
               <div>
                  <icon :name='item.icon' :href='item.href'>
                  </icon>
               </div>
               {{item.txt}}
            </router-link>
         </cell>
      </grid>
      <!--下方列表显示区域-->
      <!--条件筛选区域-->
      <group noPadded class="group-clear">
         <div>
            <topquery :items="queryItems">  </topquery>
         </div>
         <routeRedlists :lists="lists"></routeRedlists>
      </group>


   </vue-view>
</template>

<script>
    import searchbar from '../components/searchbar'
    import routeRedlists from '../components/route-redlists'
    import topquery from '../components/topquery'
export default {
    components: {
        searchbar,topquery,routeRedlists
    },
    data(){
        return {
            titleItems:[
                {icon:'home',txt:'报警站点',href:'routeStation'},
                {icon:'bars',txt:'巡检计划',href:'#'},
                {icon:'home',txt:'巡检记录',href:'#'},
                {icon:'bars',txt:'即时反馈',href:'reback'}
            ],
            totaldesc:'共计300户，颁证水量15万立方米',
            queryItems:[
                {title:'监控级别'},{title:'发证单位'},{title:'颁证水量'},{title:'取水用途'}
            ],
            lists:[
                {title:'上海宝信软件',href:'/redwater'},{title:'上海嘛哩屋',href:'/redwater'}
                ,{title:'上海报亭',href:'/redwater'},{title:'上海报亭',href:'/redwater'}
                ,{title:'上海报亭',href:'/redwater'}
                ,{title:'上海报亭',href:'/redwater'}
                ,{title:'上海报亭',href:'/redwater'}
            ]
        }
    }

}
</script>

<style>

</style>



