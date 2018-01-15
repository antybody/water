<template>
   <vue-view>
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
          取水户
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
          <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/dbqsh"></icon>
        </navbar>
        <group noPadded class="group-clear">
            <div>
                <searchbar :totaldesc="listInfo.desc"></searchbar>
                <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
            </div>
            <redlists :lists="listInfo.lists"></redlists>
        </group>
   </vue-view>
</template>

<script>
import searchbar from '../../components/searchbar'
import redlists from '../../components/redlists'
import topquery from '../../components/topquery'

import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {
   components: {
      searchbar,topquery,redlists
    },
   data(){
       return{
           
       }
   },
   computed:{
       ...mapState({
            loading: state => state.qshInfo.loading,
            listInfo: state => state.qshInfo.listInfo,
            queryMenu:state => state.qshInfo.queryMenu
      })
   },
   methods:{
        ...mapActions([
            'getLists','getQueryMenu'
        ]),
        menuQuery:function(val){
            // 这里引用 带条件的查询
            console.log("----- 查询了我-----");
            console.log(val);
            this.$store.dispatch({type:'getListsByParams',param:val})
              .then(res =>{
                  if(res.status === 200){
                      console.log('获取数据');
                  }
              });
        }
   }
}
</script>

<style>
  
  .querygroup{
      background-color: #e5e5e5;
  }
</style>
