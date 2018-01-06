<template>
   <vue-view>
       <navbar slot="header" blue style="z-index:1010;">
          取水户
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <group noPadded class="group-clear">
            <div>
                <searchbar :totaldesc="totaldesc"></searchbar>
             
            <topquery :items="items">  </topquery>
            </div>
            <redlists :lists="lists"></redlists>
        </group>    
        
        
   </vue-view>
</template>

<script>
import searchbar from '../../components/searchbar'
import redlists from '../../components/redlists'
import topquery from '../../components/topquery'
export default {
   components: {
      searchbar,topquery,redlists
    },
   data(){
       return{
           totaldesc:'共计300户，颁证水量15万立方米',
           items:[
               {title:'监控级别'},{title:'发证单位'},{title:'颁证水量'},{title:'取水用途'}
           ],
           lists:[
               {title:'上海宝信软件',href:'/redmap'},{title:'上海嘛哩屋',href:'/qshDetail'}
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
  
  .querygroup{
      background-color: #e5e5e5;
  }
</style>
