<template>
   <!-- <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange"> -->
   <vue-view>
       <navbar slot="header" class="wt-linear-blue">
          取水许可证
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
        </navbar>
        <group noPadded class="group-clear" ref="viewbox">
                        
                <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
                <div class="wt-top-search">
                    <div class="h-search" @click="searchBar()">
                        <i class="h-search-ico"></i>
                        搜索取水许可证
                    </div>

                </div>
                <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
            
                <redlists :showMore="showMore"  :lists="sgnqList" :next="currentPage"  @loadMore="loadMore"></redlists>
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
           currentPage:10,
           showMore:true,
           sgnqList: [],
           dataType: [],
           selectVal: {
               qslx: '',
               watuserDivname: '',
               qsyt:''
           }
       }
   },
   mounted(){
       // let t = document.body;
       // t.addEventListener('scroll', function(){
       //     console.log("监听了");
       // });
       // var paramsData = {
       //     currentPage: this.currentPage
       // };
       // paramsData = encodeURIComponent(JSON.stringify(paramsData));
       // this.$http.jsonp(API.QSH_XKZ + "&params=" + paramsData).then(
       //     response => {
       //         for (let value of response.data.data) {
       //             value.href = "/qsxkzDetail/" + value.id;
       //             // console.log(value);
       //         }
       //         this.sgnqList = response.data.data;
       //         console.log(response.data.data);
       //     }, response => {
       //         console.log("error");
       //     });
   },
   computed:{
        ...mapState({
             loading: state => state.sgnqInfo.loading,
             queryMenu:state => state.xkzInfo.queryMenu
       })
   },
   methods:{
       searchBar:function(){
        //    this.openSearch = true;
            this.$router.push({name:'search',params:{text:'请搜索取水许可证',t:'qsxkz'}});
            //alert('搜索框点击');
       },
        ...mapActions([
            'getLists','getQueryMenu'
        ]),
        menuQuery:function(val){
            this.currentPage = 10;
            this.selectVal = val;
            var qslx= val.qslx[0],
                watuserDivname= val.xzqh,
                qsyt= val.qsyt;
            // 这里引用 带条件的查询
            if (val.qslx[0] === "-1" || val.qslx.length === 0) {
                qslx = '';
            }
            if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                watuserDivname = '';
            }
            if (val.qsyt[0] === "-1" || val.qsyt.length === 0) {
                qsyt = '';
            }
            //取水户列表查询所需要的参数
            let params = {
                qslx: qslx,
                watuserDivname: watuserDivname,
                qsyt:qsyt,
                currentPage: this.currentPage
            };
            // params = encodeURIComponent(JSON.stringify(params));
            params = encodeURI(encodeURI(JSON.stringify(params)));
            this.$http.jsonp(API.QSH_XKZ + "&params=" + params).then(
                response => {
                    console.log(response.data.data);
                    this.sgnqList = response.data.data;
                    //循环设置跳转地址 href
                    for (let value of response.data.data) {
                        value.href = "/qsxkzDetail/" + value.id;
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
          this.currentPage +=10;
          console.log('下一页');

          let val = this.selectVal;
          var qslx= val.qslx[0],
              watuserDivname= val.xzqh,
              qsyt= val.qsyt;
          // 这里引用 带条件的查询
          if (val.qslx[0] === "-1" || val.qslx.length === 0) {
              qslx = '';
          }
          if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
              watuserDivname = '';
          }
          if (val.qsyt[0] === "-1" || val.qsyt.length === 0) {
              qsyt = '';
          }
          //取水户列表查询所需要的参数
          let params = {
              qslx: qslx,
              watuserDivname: watuserDivname,
              qsyt:qsyt,
              currentPage: this.currentPage
          };
          // params = encodeURIComponent(JSON.stringify(params));
          params = encodeURI(encodeURI(JSON.stringify(params)));
          this.$http.jsonp(API.QSH_XKZ + "&params=" + params).then(
              response => {
                  console.log(response.data.data);
                  this.sgnqList = response.data.data;
                  //循环设置跳转地址 href
                  for (let value of response.data.data) {
                      value.href = "/qsxkzDetail/" + value.wfzNb;
                      // console.log(value);
                  }
              }, response => {
                  console.log("error");
              });
      }
   }
}
</script>

<style>
  
</style>
