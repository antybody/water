<template>
   <!-- <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange"> -->
   <vue-view>
       <navbar slot="header" class="wt-linear-blue">
          取水户
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
          <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/dbqsh"></icon>
        </navbar>
        <group noPadded class="group-clear" ref="viewbox">
                        
                <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
                <div class="wt-top-search">
                    <div class="h-search" @click="searchBar()">
                        <i class="h-search-ico"></i>
                        搜索取水户
                    </div>
                    <span>{{listInfo.desc}}</span>
                </div>
                <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
            
                <redlists :showMore="showMore" :lists="listInfo.lists" :next="currentPage" :total="listInfo.total" @loadMore="loadMore"></redlists>
        </group>
   </vue-view>
   <!-- </pull-to> -->
</template>

<script>
import redlists from '../../components/redlists'
import topquery from '../../components/topquery'

import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {
   components: {
      topquery,redlists
    },
   data(){
       return{
           openSearch:false,
           topB:false,
           currentPage:1,
           showMore:true
       }
   },
   mounted(){
       let t = document.body;
       t.addEventListener('scroll', function(){
           console.log("监听了");
       })
   },
   computed:{
       ...mapState({
            loading: state => state.qshInfo.loading,
            listInfo: state => state.qshInfo.listInfo,
            queryMenu:state => state.qshInfo.queryMenu
      })
   },
   methods:{
       searchBar:function(){
        //    this.openSearch = true;
            this.$router.push({name:'search',params:{text:'请搜索取水户名称',t:'dbsqsh'}});
       },
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
        },
    //     stateChange(state) {
    //         if (state === 'pull' || state === 'trigger') {
    //         this.iconLink = '#icon-arrow-bottom';
    //         } else if (state === 'loading') {
    //         this.iconLink = '#icon-loading';
    //         } else if (state === 'loaded-done') {
    //         this.iconLink = '#icon-finish';
    //         }
    //   },
      loadMore(){
          this.currentPage +=1;
          console.log('下一页');
      }
   }
}
</script>

<style>
  
</style>
