<template>
    <vue-view>
        <navbar class="header" blue>
            巡检记录
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
            searchbar, topquery, routeRedlists
        },
        data() {
            return {
                totaldesc: '共计300户，颁证水量15万立方米',
                queryItems: [
                    {title: '巡检状态'}
                ],
                lists: []
            }
        },
        mounted() {
            let paramData = {
                type: 'query',
                PATROL_STATE: ['1', '2']
            }
            paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                response => {
                    this.lists = response.data.data;
                    for (var i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i]['PATROL_STATE'] === '1')
                            response.data.data[i].href = '/routeReback/' + response.data.data[i]['ID'];
                        else if (response.data.data[i]['PATROL_STATE'] === '2')
                            response.data.data[i].href = '/routeDone/' + response.data.data[i]['ID'];

                    }
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
