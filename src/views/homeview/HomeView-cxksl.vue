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
                搜索取水许可证
            </div>
        </div>
        <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>
        <!--<routeRedlists :lists="lists"></routeRedlists>-->
        <redlists :showMore="showMore"  :lists="lists" :next="currentPage"  @loadMore="loadMore"></redlists>

    </vue-view>
</template>

<script>
    import routeRedlists from '../../components/route-redlists'
    import redlists from '../../components/redlists'
    import topquery from '../../components/topquery'
    import { mapState, mapActions } from 'vuex'
    import * as API from '../../store/api/api'

    export default {
        components: {
            routeRedlists, topquery,redlists
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
                ],
                showMore:true,
                dataType: [],
                currentPage:10,
                selectVal: {
                    qslx: '',
                    //xzqh: '',
                    qsyt:''
                }
            }
        },
        mounted(){
            let t = document.body;
            t.addEventListener('scroll', function(){
                console.log("监听了");
            });
            var paramsData = {
                currentPage: this.currentPage
            };
            paramsData = encodeURIComponent(JSON.stringify(paramsData));
            this.$http.jsonp(API.QSH_CXKZ + "&params=" + paramsData).then(
                response => {
                    this.lists = response.data.data;
                    console.log(response.data.data);
                }, response => {
                    console.log("error");
                });
        },
        computed:{
            ...mapState({
                loading: state => state.qshInfo.loading,
                queryMenu:state => state.xkzInfo.queryMenu
            })
        },
        methods:{
            searchBar:function(){
                //    this.openSearch = true;
                this.$router.push({name:'search',params:{text:'请搜索取水户名称',t:'cxksl'}});
            },
            ...mapActions([
                'getLists','getQueryMenu'
            ]),
            menuQuery:function(val){
                this.currentPage = 10;
                this.selectVal = val;
                var qslx= val.qslx[0],
                    //xzqh= val.xzqh,
                    qsyt= val.qsyt[0];
                // 这里引用 带条件的查询
                if (val.qslx[0] === "-1" || val.qslx.length === 0) {
                    qslx = '';
                }
                // if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                //     xzqh = '';
                // }
                if (val.qsyt[0] === "-1" || val.qsyt.length === 0) {
                    qsyt = '';
                }
                //取水户列表查询所需要的参数
                let params = {
                    qslx: qslx,
                    //watuserDivname: xzqh,
                    qsyt:qsyt,
                    currentPage: this.currentPage
                };
                // params = encodeURIComponent(JSON.stringify(params));
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.QSH_CXKZ + "&params=" + params).then(
                    response => {
                        console.log(response.data.data);
                        this.lists = response.data.data;
                        //循环设置跳转地址 href
                        for (let value of response.data.data) {
                            value.href = "/qsxkzDetail/" + value.wfzNb;
                            // console.log(value);
                        }
                    }, response => {
                        console.log("error");
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
                this.currentPage +=10;
                console.log('下一页');

                let val = this.selectVal;
                var qslx= val.qslx[0],
                    //xzqh= val.xzqh,
                    qsyt= val.qsyt;
                // 这里引用 带条件的查询
                if (val.qslx[0] === "-1" || val.qslx.length === 0) {
                    qslx = '';
                }
                // if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                //     xzqh = '';
                // }
                if (val.qsyt[0] === "-1" || val.qsyt.length === 0) {
                    qsyt = '';
                }
                //取水户列表查询所需要的参数
                let params = {
                    qslx: qslx,
                    //watuserDivname: xzqh,
                    qsyt:qsyt,
                    currentPage: this.currentPage
                };
                // params = encodeURIComponent(JSON.stringify(params));
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.QSH_CXKZ + "&params=" + params).then(
                    response => {
                        console.log(response.data.data);
                        this.lists = response.data.data;
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
