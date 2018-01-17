<template>
   <vue-view>
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          地图查看
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
          <!-- <icon name="search" slot="right"></icon> -->
        </navbar>
        <nav class="wt-filter">
            <ul class="filter-nav-bar">
                <li  :key="item.id" v-for="(item,index) in mapQuery"  :class="[item.cl,{active:isActive == index}]" 
                    @click="itemClick(index,item)">
                    <span>{{item.title | calMapQ(urlParam)}}</span>
                </li>
            </ul>
            <div class="filter-panel" v-show="isActive != -1">
                <ul>
                    <li @click="itemQuery(item)" v-for="item in queryDetail" class="filter-panel-item" :key="item.index" :dt="item.key">
                        <i></i><span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </nav>
        <!--列表切换-->
        <div class="wt-map-list">
            <icon name="list" href="/qsh"></icon>
        </div>
       <redmap :points="mapPoints"></redmap>
      <div v-show="isActive != -1" class="modal-backdrop" @click="offcanvasClose" @touchmove.stop></div>  
      <loader v-show="loading" class="modal-loading" orange rounded></loader>
   </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import redmap from '../../components/redmap'
import Vue from 'vue'

export default {
    data(){
        return{
            // mapPoints:[{lng:121.372882,lat:31.176523,name:'上海宝信'},
            // {lng:121.604799,lat:31.217459,name:'上海宝信'},
            // {lng:121.403122,lat:31.317181,name:'上海宝信'}],
            isActive:-1
            // mapQuery:[
            //     {cl:'filter-nav-item',title:'类别'},
            //     {cl:'filter-nav-item',title:'状态'},
            //     {cl:'filter-nav-query',title:'图例'},
            //     {cl:'filter-nav-item',title:'搜索'}
            // ]
       }
    },    
    components: {
      redmap
    },
    watch:{
        selected:function(val,oldval){
            console.log('选项发生了变化');
            console.log(this.selected);
            console.log(val);
            this.getMapByParams(val);
        }
    },
    computed: {
      ...mapState({
            loading: state => state.redmap.loading,
            mapPoints: state => state.redmap.mapPoints,
            mapQuery:state => state.redmap.mapQuery,
            queryDetail:state => state.redmap.mapQueryDetails
      }),
      urlParam:function(){
          return this.$route.params.kt
      },
      // 这里捕捉查询条件
      selected:function(){
          var ret = {};
          this.mapQuery.forEach(function(val){
              ret[val.key] =[];
              if (val.select){
                  ret[val.key].push(val.select);
              }
          });
          return ret;
      }
    },
    created(){
        this.getMapPoints();
        console.log(this.urlParam);
    },
    mounted(){
        console.log("加载完成");
        Vue.set(this.$store.state.redmap,"loading",false);
    },
    filters:{
        calMapQ:function(val,pm){
           if(val == '类别'){
                switch(pm){
                    case 'dbqsh': return '地表水取水';break;
                    case 'ysh': return '用水户';break;
                }
            }else{
                return val;
            }
        }
    },
    methods:{
        itemClick(index,item){             
             // 获取展开信息
             if(item.key != 'clear'){
                this.isActive = index;
                this.$store.dispatch({
                    type: 'getQueryDetail',
                    id: index,
                    root:item
                })
             }else{
                 this.resetClear();
             }
         },
         itemQuery(item){
             const skey = this.$store.state.redmap.mapQueryRoot.key;
            // 单独处理的两个情况 图例 和 重置
            if(skey === "tl"){            
                
            }else if(skey === "clear"){

            }else{
             // 其他情况
             Vue.set(this.$store.state.redmap.mapQueryRoot,"title",item.name);
             Vue.set(this.$store.state.redmap.mapQueryRoot,"select",item.key);
            }
            console.log(item.key);
             this.offcanvasClose();
             console.log("关闭");
         },
         offcanvasClose() {
            this.isActive = -1
         },
         resetClear() { // 重置其他信息
            this.$store.state.redmap.mapQuery.forEach(function(val){
                if(val.key != "lb"){
                  Vue.set(val,"title",val.o);
                  Vue.set(val,"select",'');
                }
            })
         },
         ...mapActions([
            'getMapPoints'
        ]),
        getMapByParams(val){
            this.$store.dispatch({type:'getMapPointsByParams',param:val})
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
   .modal-loading{
       position: fixed;
       top:10rem;
       left: 0;
       right: 0;
       bottom:0;
       z-index:1009;
   }
   .wt-filter{
       position: absolute;
       color:#3b3b3b;
       font-size:1.4rem;
       background: #ffffff;
       width:100%;
       z-index:1010;
   }
   .filter-nav-bar{
       overflow: hidden;
       /* border-bottom:solid 1px #eaeaea; */
       text-align: center;
       margin-right:-1px;
       padding:0;
   }
   .filter-nav-bar li{
       float: left;
       width:25%;
       /* border-right:solid 1px #eaeaea; */
       box-sizing: border-box;
       display:-webkit-box;
       -webkit-box-pack:center;
       -webkit-box-align: center;
   }
   .filter-nav-item{
       position: relative;
   }
   .filter-nav-query{
       position: relative;
   }
   .filter-nav-query:after{
       display: inline-block;
       content:'';
   }
   .filter-nav-item:after{
       display: inline-block;
       content:'';
       height: 7px;
       width:7px;
       border:1px solid #555;
       border-width:0 1px 1px 0;
       transform:rotate(45deg);
       margin:auto auto 6px 5px;
   }
   .filter-nav-bar li>span{
       display: block;
       max-width: 75%;
       overflow: hidden;
       white-space:nowrap;
       text-overflow:ellipsis;
       font-size:0.875rem;
   }
   .active{
       color:#61aefc;
   }
   .active:after{
       border:1px solid #61aefc;
       border-width:1px 0 0 1px;
       margin:auto auto 2px 5px;
   }
   .filter-panel{
       margin-right:-1px;
       position: absolute;
       background: #ffffff;
       width:100%;
       z-index:1010;
       border-right:solid 1px #eaeaea;
       overflow:hidden;
   }
   .filter-panel ul{
       padding:0;
       marging:0;
       font-size:0.875rem;
       color:#3b3b3b;
       border-top:solid 1px #eaeaea;
   }
   .filter-panel-item{
       padding:0 15px;
       height: 40px;line-height: 40px;
       border-bottom:solid 1px #eaeaea;
       overflow: hidden;
       white-space:nowrap;
       text-overflow:ellipsis;
       display:-webkit-box;
       box-sizing:border-box;
       -webkit-box-align: center;
   }
   .wt-map-list{
       position: absolute;
       background: #ffffff;
       width:2.0625rem;
       height:1.725rem;
       top:5.3375rem;
       right:0.625rem;
       box-shadow: 1px 1px 10px 0 #ccc; 
       z-index:999;
       text-align: center;
   }
   .wt-map-list a{
       font-size:0.625rem;
       color:#3b3b3b;
   }
</style>
