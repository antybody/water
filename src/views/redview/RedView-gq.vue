<!--2018.12.03 huaibaoqi-->
<template>
    <!-- <pull-to :bottom-load-method="refresh" :is-top-bounce="topB" @bottom-state-change="stateChange"> -->
    <vue-view>
        <navbar slot="header" class="wt-linear-blue">
            灌区
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
            <icon name="right-nav" titleLeft="地图" slot="right" href="/redmap/ysh"></icon>
        </navbar>
        <group noPadded class="group-clear" ref="viewbox">

            <!-- <searchbar :totaldesc="listInfo.desc"></searchbar> -->
            <div class="wt-top-search">
                <div class="h-search" @click="searchBar()">
                    <i class="h-search-ico"></i>
                    搜索灌区
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
                loading: state => state.gqInfo.loading,
                // listInfo: state => state.qshInfo.listInfo,
                queryMenu: state => state.gqInfo.queryMenu
            })
        },
        methods: {
            searchBar: function () {
                //    this.openSearch = true;
                this.$router.push({name: 'search', params: {text: '请搜索灌区名称', t: 'gq'}});
            },
            menuQuery: function (val) {
                var gqgm = val.gqgm,
                    jllx = val.jllx,
                    ntlx = val.ntlx,
                    xzqh = val.xzqh
                // 这里引用 带条件的查询
                if (val.gqgm[0] === "-1" || val.gqgm.length === 0) {
                    gqgm = '';
                }
                if (val.jllx[0] === "-1" || val.jllx.length === 0) {
                    jllx = '';
                }
                if (val.ntlx[0] === "-1" || val.ntlx.length === 0) {
                    ntlx = '';
                }
                if (val.xzqh[0] === "-1" || val.xzqh.length === 0) {
                    xzqh = '';
                }
                //取水户列表查询所需要的参数
                let params = {
                    type: "query",
                    gqgm ,
                    jllx ,
                    ntlx ,
                    xzqh ,
                };
                // params = encodeURIComponent(JSON.stringify(params));
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.GQ_LIST + "&params=" + params).then(
                    response => {
                        console.log(response.data.data);
                        this.listInfo = response.data.data;
                        //循环设置跳转地址 href
                        for (let value of response.data.data) {
                            value.href = "/gqView/" + value.irrid;
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