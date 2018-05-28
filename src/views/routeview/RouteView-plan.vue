<template>
    <vue-view>
        <navbar class="header" blue>
            巡检计划
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>

        <!--条件筛选区域-->
        <group noPadded class="group-clear">
            <!--<div>-->
                <!--<topquery :items="queryItems">  </topquery>-->
            <!--</div>-->
            <routeRedlists :lists="lists"></routeRedlists>
        </group>
    </vue-view>
</template>

<script>
    import searchbar from '../../components/searchbar'
    import routeRedlists from '../../components/route-redlists'
    import topquery from '../../components/topquery'
    import * as API from '../../store/api/api'

    export default {
        components: {
            searchbar,topquery,routeRedlists
        },
        data() {
            return {
                totaldesc:'共计300户，颁证水量15万立方米',
                queryItems:[
                    {title:'巡检状态'}
                ],
                lists:[]
            }
        },
        mounted() {
            let paramData = {
                type: 'query'
            }
            paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                response => {
                    this.lists = response.data.data;
                    console.log(this.lists);
                    // this.lists.type = 'warn';
                }, response => {
                    console.log("error");
                });
        },
    }
</script>

<style>

</style>
