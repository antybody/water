<template>
   <vue-view>
      <!--页面头部区域-->
      <navbar class="header" blue>
         预警列表
         <icon name="left-nav" slot="left" titleRight="返回" back></icon>
      </navbar>
      <!--巡检首页面头部方块切换页面-->
      <group noPadded class="group-clear">
         <div>
            <topquery :items="queryItems">  </topquery>
         </div>
         <routeRedlists :lists="warnLists"></routeRedlists>
      </group>

      <modal role="alert" title="提示信息" :isOpen="open2" @Close="modalOutFun('open2')">{{alertText}}</modal>

   </vue-view>
</template>

<script>
    import searchbar from '../../components/searchbar'
    import routeRedlists from '../../components/route-redlists'
    import topquery from '../../components/topquery'
    import * as util from '../../libs/utils'
    import * as API from '../../store/api/api'
    import TabsDesc from "vue-amazeui/src/components/tabs/tabsDesc";
export default {
    components: {
        TabsDesc,
        searchbar,topquery,routeRedlists
    },
    data(){
        return {
            queryItems:[
                {title:'监控级别'},{title:'发证单位'},{title:'颁证水量'},{title:'取水用途'}
            ],
            warnLists:[
                {title:'上海宝信软件',errorType: '数据中断',  xjType: '未加入巡检计划'}
                ,{title:'上海嘛哩屋',errorType: '日水量跳大', xjType: '未加入巡检计划'}
                ,{title:'上海报亭',errorType: '负值', xjType: '未加入巡检计划'}
                ,{title:'上海报亭',errorType: '数据异常', xjType: '巡检中', href: '#'}
                ,{title:'上海报亭',errorType: '数据中断', xjType: '未加入巡检计划'}
                ,{title:'上海报亭',errorType: '数据中断', xjType: '未加入巡检计划'}
                ,{title:'上海报亭',errorType: '数据中断', xjType: '未加入巡检计划'}
            ],
            open2: false,
            alertText:'',
            isShow: true
        }
    },
    mounted() {
        let paramData = {
            type: 'query'
        }
        paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
        this.$http.jsonp(API.WARN_LIST + '&params=' + paramData).then(
            response => {
                this.warnLists = response.data.data;
            }, response => {
                console.log("error");
            });
    },
    methods: {
        addPlan(){
            console.log(this);
        },
        // 隐藏提示框
        modalOutFun(value) {
            this[value] = false
        },
        // 显示提示框
        modalOpFun(value) {
            this[value] = true
        }
    }

}
</script>

<style>
   .tabs{
      margin: 0 0;
   }
   .tab-panel{
      padding: 0em !important;
   }
</style>



