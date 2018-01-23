<!--许可水量超标-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            许可水量超标情况
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <div class="wt-top-search">
            <div class="h-search" @click="searchBar()">
                <i class="h-search-ico"></i>
                搜索取水户
            </div>
            <icon class="icons-ea25"><span>{{listInfo.desc}}</span></icon>
        </div>
        <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
        <routeRedlists :lists="lists"></routeRedlists>
    </vue-view>
</template>

<script>
    import routeRedlists from '../../components/route-redlists'
    import topquery from '../../components/topquery'
    import { mapState, mapActions } from 'vuex'

    export default {
        components: {
            routeRedlists, topquery
        },
        data(){
            return{
                lists:[
                    {title:'上海宝信软件',errorType: '数据中断',  xjType: '未加入巡检计划', progress: 'cxksl', color:'#fecf63', width1: '10%', width2: '40%'}
                    ,{title:'上海嘛哩屋',errorType: '日水量跳大', xjType: '未加入巡检计划', progress: 'cxksl', color:'#1df2ff', width1: '70%', width2: '40%'}
                    ,{title:'上海报亭',errorType: '负值', xjType: '未加入巡检计划', progress: 'cxksl', color:'red', width1: '20%', width2: '60%'}
                    ,{title:'上海报亭',errorType: '数据异常', xjType: '巡检中', progress: 'cxksl', color:'red', width1: '70%', width2: '40%'}
                    ,{title:'上海报亭',errorType: '数据中断', xjType: '未加入巡检计划', progress: 'cxksl', color:'#fecf63', width1: '40%', width2: '60%'}
                    ,{title:'上海报亭',errorType: '数据中断', xjType: '未加入巡检计划', progress: 'cxksl', color:'red', width1: '70%', width2: '40%'}
                    ,{title:'上海报亭',errorType: '数据中断', xjType: '未加入巡检计划', progress: 'cxksl', color:'#fecf63', width1: '80%', width2: '50%'}
                ]
            }
        },
        mounted(){
            let t = document.body;
            t.addEventListener('scroll', function(){
                console.log("监听了");
            });
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
            stateChange(state) {
                if (state === 'pull' || state === 'trigger') {
                    this.iconLink = '#icon-arrow-bottom';
                } else if (state === 'loading') {
                    this.iconLink = '#icon-loading';
                } else if (state === 'loaded-done') {
                    this.iconLink = '#icon-finish';
                }
            },
            loadMore(){
                this.currentPage +=1;
                console.log('下一页');
            }
        }
    }
</script>

<style>

</style>
