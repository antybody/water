<template>
    <!-- <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange"> -->
    <vue-view>
        <navbar slot="header" class="wt-linear-blue">
            大用水户
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
            <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/dbqsh"></icon>
        </navbar>
        <group noPadded class="group-clear" ref="viewbox">

            <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
            <div class="wt-top-search">
                <div class="h-search" @click="searchBar()">
                    <i class="h-search-ico"></i>
                    搜索大用水户
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
                currentPage: 1,
                showMore: true
            }
        },
        mounted() {
            // let t = document.body;
            // t.addEventListener('scroll', function () {
            //     console.log("监听了");
            // });
            // //取水户列表查询所需要的参数
            // let params = {
            //     xzqh: ''
            // };
            // // params = encodeURIComponent(JSON.stringify(params));
            // params = encodeURI(encodeURI(JSON.stringify(params)));
            // this.$http.jsonp(API.DYSH_LIST + "&params=" + params).then(
            //     response => {
            //         console.log(response.data.data);
            //         this.listInfo = response.data.data;
            //         //循环设置跳转地址 href
            //         for (let value of response.data.data) {
            //             value.href = "/dyshDetai/" + value.id;
            //             // console.log(value);
            //         }
            //     }, response => {
            //         console.log("error");
            //     });

        },
        computed: {
            ...mapState({
                loading: state => state.dyshInfo.loading,
                // listInfo: state => state.qshInfo.listInfo,
                queryMenu: state => state.dyshInfo.queryMenu
            })
        },
        methods: {
            searchBar: function () {
                //    this.openSearch = true;
                this.$router.push({name: 'search', params: {text: '请搜索大用水户名称', t: 'dysh'}});
            },
            menuQuery: function (val) {
                var yslx = val.yslx[0],
                    xzqh = val.xzqh,
                    jclx = val.jclx,
                    szysjqmc = val.szysjqmc;
                // 这里引用 带条件的查询
                if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                    xzqh = '';
                }
                if (val.jclx[0] === "-1" || val.jclx.length === 0) {
                    jclx = '';
                }
                if (val.szysjqmc[0] === "-1" || val.szysjqmc.length === 0) {
                    szysjqmc = '';
                }
                //取水户列表查询所需要的参数
                let params = {
                    type: "query",
                    yslx: yslx,
                    xzqh: xzqh,
                    jclx: jclx,
                    szysjqmc: szysjqmc
                };
                // params = encodeURIComponent(JSON.stringify(params));
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.DYSH_LIST + "&params=" + params).then(
                    response => {
                        console.log(response.data.data);
                        this.listInfo = response.data.data;
                        //循环设置跳转地址 href
                        for (let value of response.data.data) {
                            value.href = "/dyshView/" + value.id;
                            // console.log(value);
                        }
                    }, response => {
                        console.log("error");
                    });
            },
            loadMore() {
                this.currentPage += 1;
                console.log('下一页');
            }
        }
    }
</script>

<style>

</style>
