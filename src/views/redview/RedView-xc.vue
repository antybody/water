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
       ...mapState({
            loading: state => state.sgnqInfo.loading,
            // listInfo: state => state.sgnqInfo.listInfo,
            queryMenu: state => state.xcInfo.queryMenu
      })
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
            var kzsyd = val.kzsyd,
                state = val.state[0];
            // 这里引用 带条件的查询
            if (val.kzsyd[0] === "-1" || val.kzsyd.length === 0) {
                kzsyd = '';
            }
            if (val.state[0] === "-1" || val.state.length === 0) {
                state = '';
            }
            //取水户列表查询所需要的参数
            let params = {
                kzsyd: kzsyd,
                state: state,
                name:''
            };
            // params = encodeURIComponent(JSON.stringify(params));
            params = encodeURI(encodeURI(JSON.stringify(params)));
            this.$http.jsonp(API.XC_LIST + "&params=" + params).then(
                response => {
                    console.log(response.data.data);
                    this.xcList = response.data.data;
                    //循环设置跳转地址 href
                    for (let value of response.data.data) {
                        //value.href = "/sgnqDetail/" + value.wfzNb;
                        // console.log(value);
                    }
                }, response => {
                    console.log("error");
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
