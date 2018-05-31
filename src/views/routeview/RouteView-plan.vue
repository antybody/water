<template>
    <vue-view>
        <navbar class="header" blue>
            巡检计划
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <div class="plan-map">
            <red-map :points="mapPoints"></red-map>

        </div>
        <div class="content">
            <!--条件筛选区域-->
            <group noPadded class="group-clear">

                <routeRedlists :lists="lists"></routeRedlists>
            </group>
        </div>

    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import searchbar from '../../components/searchbar'
    import routeRedlists from '../../components/route-redlists'
    import topquery from '../../components/topquery'
    import * as API from '../../store/api/api'
    import redMap from '../../components/redmap'
    import Vue from 'vue'

    export default {
        components: {
            redMap, searchbar, topquery, routeRedlists
        },
        data() {
            return {
                totaldesc: '共计300户，颁证水量15万立方米',
                queryItems: [
                    {title: '巡检状态'}
                ],
                lists: [],
                mapPoints: [
                    {lng: 121.372882, lat: 31.176523, name: '上海宝信'},
                    {lng: 121.604799, lat: 31.217459, name: '上海宝信'},
                    {lng: 121.403122, lat: 31.317181, name: '上海宝信'}
                ]
            }
        },
        computed: {
            ...mapState({
                loading: state => state.redmap.loading,
                // mapPoints: state => state.redmap.mapPoints,
                mapQuery: state => state.redmap.mapQuery
            })
        },
        mounted() {
            console.log("加载完成");
            let paramData = {
                type: 'query',
                PATROL_STATE: ['0']
            }
            paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                response => {
                    var xyArr = [];
                    this.lists = response.data.data;
                    console.log(this.lists);
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].PATROL_LONG != '' && response.data.data[i].PATROL_LONG != '-') {
                            xyArr.push({
                                lng: response.data.data[i].PATROL_LONG,
                                lat: response.data.data[i].PATROL_LAT,
                                name: response.data.data[i].PATROL_TITLE
                            })
                        }
                    }
                    this.mapPoints = xyArr;
                    Vue.set(this.$store.state.redmap, "loading", false);
                }, response => {
                    console.log("error");
                });
        },
    }
</script>

<style>
    * {
        /*overflow-y: hidden;*/
    }

    .plan-map {
        height: 40%;
    }

    .content {
        height: 60%;
    }
</style>
