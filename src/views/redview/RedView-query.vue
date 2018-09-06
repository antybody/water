<template>
    <!-- <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange"> -->
    <vue-view>
        <navbar slot="header" class="wt-linear-blue">
            取水户
            <icon name="left-nav" slot="left" titleRight="返回" back ></icon>
            <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/dbqsh"></icon>
        </navbar>
        <group noPadded class="group-clear" ref="viewbox">

            <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
            <div class="wt-top-search">
                <div class="h-search" @click="searchBar()">
                    <i class="h-search-ico"></i>
                    搜索取水户
                </div>
            </div>
            <topquery :items="queryMenu" @menuQuery="menuQuery"></topquery>

            <redlists :showMore="showMore" :lists="listInfo" :next="currentPage" @loadMore="loadMore"></redlists>
        </group>
    </vue-view>
    <!-- </pull-to> -->
</template>

<script>
    import redlists from '../../components/redlists'
    import topquery from '../../components/topquery'
    import * as API from '../../store/api/api'
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'

    export default {
        components: {
            topquery, redlists
        },
        data() {
            return {
                openSearch: false,
                topB: false,
                listInfo: [],
                currentPage: 10,
                showMore: true,
                selectVal: {
                    jkjb: '',
                    qslx: '',
                    qsyt: '',
                    xzqh: ''
                },params :{
                    type: "query",
                    wiuTp: '',
                    watuserDivname: '',
                    watuserCom: "",
                    watuserWatapp: '',
                    monitorlevel: '',
                    currentPage: 10
                }
            }
        },
        mounted() {
            // let t = document.body;
            // t.addEventListener('scroll', function () {
            //     console.log("监听了");
            // });
            // console.log(this.currentPage);
            // //取水户列表查询所需要的参数
            // let params2 = this.params;
            // // params = encodeURIComponent(JSON.stringify(params));
            // params2 = encodeURI(encodeURI(JSON.stringify(params2)));
            // this.$http.jsonp(API.QSH_LIST + "&params=" + params2).then(
            //     response => {
            //         console.log(response.data.data);
            //         this.listInfo = response.data.data;
            //         //循环设置跳转地址 href
            //         for (let value of response.data.data) {
            //             value.href = "/qshDetail/" + value.watuserId;
            //             // console.log(value);
            //         }
            //     }, response => {
            //         console.log("error");
            //     });
        },
        computed: {
            ...mapState({
                loading: state => state.qshInfo.loading,
                // listInfo: state => state.qshInfo.listInfo,
                queryMenu: state => state.qshInfo.queryMenu
            })
        },
        methods: {
            searchBar: function () {
                //    this.openSearch = true;
                this.$router.push({name: 'search', params: {text: '请搜索取水户名称', t: 'dbsqsh'}});
            },
            ...mapActions([
                'getLists', 'getQueryMenu'
            ]),
            menuQuery: function (val) {
                this.currentPage = 10;
                this.selectVal = val;
                var wiuTp = val.qslx[0],
                    monitorLevel = val.jkjb,
                    watuserDivname = val.xzqh,
                    watuserWatapp = val.qsyt;
                // 这里引用 带条件的查询
                if (val.qslx[0] === "-1" || val.qslx.length === 0) {
                    wiuTp = '';
                }
                if (val.jkjb[0] === "-1" || val.jkjb.length === 0) {
                    monitorLevel = '';
                }
                if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                    watuserDivname = '';
                }
                if (val.qsyt[0] === "-1" || val.qsyt.length === 0) {
                    watuserWatapp = '';
                }
                //取水户列表查询所需要的参数
                this.params = {
                    type: "query",
                    wiuTp: wiuTp,
                    watuserDivname: watuserDivname,
                    watuserCom: "",
                    watuserWatapp: watuserWatapp,
                    monitorlevel: monitorLevel,
                    currentPage: this.currentPage
                };
                // params = encodeURIComponent(JSON.stringify(params));
                let params2 = encodeURI(encodeURI(JSON.stringify(this.params)));
                this.$http.jsonp(API.QSH_LIST + "&params=" + params2).then(
                    response => {
                        console.log(response.data.data);
                        this.listInfo = response.data.data;
                        //循环设置跳转地址 href
                        for (let value of response.data.data) {
                            value.href = "/qshDetail/" + value.watuserId;
                            // console.log(value);
                        }
                    }, response => {
                        console.log("error");
                    });
            },
            loadMore() {
                this.currentPage += 10;
                console.log(this.currentPage);
                console.log('下一页');
                let val = this.selectVal;
                var wiuTp = val.qslx[0],
                    monitorLevel = val.jkjb,
                    watuserDivname = val.xzqh,
                    watuserWatapp = val.qsyt;
                // 这里引用 带条件的查询
                if (val.qslx[0] === "-1" || val.qslx.length === 0) {
                    wiuTp = '';
                }
                if (val.jkjb[0] === "-1" || val.jkjb.length === 0) {
                    monitorLevel = '';
                }
                if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                    watuserDivname = '';
                }
                if (val.qsyt[0] === "-1" || val.qsyt.length === 0) {
                    watuserWatapp = '';
                }
                //取水户列表查询所需要的参数
                let params = {
                    type: "query",
                    wiuTp: wiuTp,
                    watuserDivname: watuserDivname,
                    watuserCom: "",
                    watuserWatapp: watuserWatapp,
                    monitorlevel: monitorLevel,
                    currentPage: this.currentPage
                };
                // params = encodeURIComponent(JSON.stringify(params));
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.QSH_LIST + "&params=" + params).then(
                    response => {
                        console.log(response.data.data);
                        this.listInfo = response.data.data;
                        //循环设置跳转地址 href
                        for (let value of response.data.data) {
                            value.href = "/qshDetail/" + value.watuserId;
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
