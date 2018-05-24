<template>
   <!-- <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange"> -->
   <vue-view>
       <navbar slot="header" class="wt-linear-blue">
          咸潮
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
        </navbar>
        <group noPadded class="group-clear" ref="viewbox">
                        
                <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
                <div class="wt-top-search">
                    <div class="h-search" @click="searchBar()">
                        <i class="h-search-ico"></i>
                        搜索咸潮
                    </div>

                </div>
                <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
            
                <redlists :showMore="showMore"  :lists="xcList" :next="currentPage" :total="dataType" @loadMore="loadMore"></redlists>
        </group>
   </vue-view>
   <!-- </pull-to> -->
</template>

<script>
import redlists from '../../components/redlists'
import topquery from '../../components/topquery'

import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import * as API from '../../store/api/api'

export default {
   components: {
      topquery,redlists
    },
   data(){
       return{
           openSearch:false,
           topB:false,
           currentPage:1,
           showMore:true,
           xcList: [],
           dataType: []
       }
   },
   mounted(){
       let t = document.body;
       t.addEventListener('scroll', function(){
           console.log("监听了");
       });
       var paramsData = {'name':''};
       paramsData = encodeURIComponent(JSON.stringify(paramsData));
       this.$http.jsonp(API.XC_LIST + "&params=" + paramsData).then(
           response => {
               this.xcList = response.data.data;
               console.log(response.data.data);
           }, response => {
               console.log("error");
           });
   },
   computed:{
      //  ...mapState({
      //       loading: state => state.sgnqInfo.loading,
      //       // listInfo: state => state.sgnqInfo.listInfo,
      //       queryMenu: state => state.sgnqInfo.queryMenu
      // })
   },
   methods:{
       searchBar:function(){
        //    this.openSearch = true;
            this.$router.push({name:'search',params:{text:'请搜索咸潮',t:'sgnq'}});
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
