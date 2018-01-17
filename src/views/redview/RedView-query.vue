<template>

   <vue-view>
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
          取水户
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
          <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/dbqsh"></icon>
        </navbar>
        <group noPadded class="group-clear">
            
            
                <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
                <div class="wt-top-search">
                    <div class="h-search" @click="searchBar()">
                        <i class="h-search-ico"></i>
                        搜索取水户
                    </div>
                    <span>{{listInfo.desc}}</span>
                </div>
            <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange">
                <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
            
                <redlists :lists="listInfo.lists"></redlists>

            </pull-to>
        </group>
        <searchbar :open="openSearch" inputtext="请输入取水户名称" searchtype="dbsqsh" @closeBar="closeBar"></searchbar>
   </vue-view>

</template>

<script>
import searchbar from '../../components/searchbar'
import redlists from '../../components/redlists'
import topquery from '../../components/topquery'
import PullTo from 'vue-pull-to'

import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {
   components: {
      searchbar,topquery,redlists,PullTo
    },
   data(){
       return{
           openSearch:false,
           topB:false
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
       searchBar:function(){
           this.openSearch = true;
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
        closeBar(){
            this.openSearch = false;
        },
        refresh(loaded) {
            console.log('刷新');
            loaded('done');
        },
        stateChange(state) {
            if (state === 'pull' || state === 'trigger') {
            this.iconLink = '#icon-arrow-bottom';
            } else if (state === 'loading') {
            this.iconLink = '#icon-loading';
            } else if (state === 'loaded-done') {
            this.iconLink = '#icon-finish';
            }
      }
   }
}
</script>

<style>
  .wt-top-search{
      margin-left:0.625rem;
      padding-top:0.625rem;
  }
  .querygroup{
      background-color: #e5e5e5;
  }
  .h-search{
      -webkit-box-flex:1;
      background-color:#f2f2f7;
      height: 30px;
      line-height: 30px;
      border-radius:4px;
      color:#999;
      text-align: center;
      margin-right:10px;
      font-size:0.75rem;
  }
  .h-search-ico{
      display:inline-block;
      height: 10px;
      width:4%;
      border-radius:100%;
      border:1px solid #999;
      position: relative;
      margin-right:6px;
  }
  .h-search-ico::after{
      content:'';
      position: absolute;
      left: 11px;
      top:10px;
      height: 4px;
      width:1px;
      background:#999;
      -webkit-transform:rotate(-35deg);
      transform:rotate(-35deg);
  }

  .bottom-load-wrapper {
    line-height: 50px;
    text-align: center;
  }
  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }
  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes loading
  {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
</style>
