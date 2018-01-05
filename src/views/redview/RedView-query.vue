<template>
   <vue-view>
       <navbar slot="header" blue>
          取水户
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <group>
            <field>
                <searchbar></searchbar>
            </field>
            <field>
                <span>{{totaldesc}}</span>
            </field>
            <topquery :items="items">  </topquery>
        </group>
   </vue-view>
</template>

<script>
import searchbar from '../../components/searchbar'

import topquery from '../../components/topquery'
export default {
   components: {
      searchbar,topquery
    },
   data(){
       return{
           totaldesc:'共计300户，颁证水量15万立方米',
           items:[
               {title:'监控级别'},{title:'发证单位'},{title:'颁证水量'},{title:'取水用途'}
           ]
       }
   }
}
</script>

<style>
  .group{
      margin:0rem !important;
      margin-bottom: 1.25rem !important;
  }
  .querygroup{
      background-color: #e5e5e5;
  }
</style>
