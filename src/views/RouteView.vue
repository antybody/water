<template>
    <vue-view>
        <!--页面头部区域-->
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            巡检运维
        </navbar>
        <!--巡检首页面头部方块切换页面-->
        <card v-for="title in titleItems" :title="title.txt">
            <p>Card 内容</p>
            <a slot="footer" href="javascript: void(0)"></a>
            <a slot="footer" href="javascript: void(0)"></a>
            <a slot="footer" href="javascript: void(0)" @click="routeLink(title.href)">详情>></a>
        </card>

    </vue-view>
</template>

<script>
    import searchbar from '../components/searchbar'
    import routeRedlists from '../components/route-redlists'
    import topquery from '../components/topquery'
    import * as util from '../libs/utils'
    import * as API from '../store/api/api'
    import TabsDesc from "vue-amazeui/src/components/tabs/tabsDesc";

    export default {
        components: {
            TabsDesc,
            searchbar, topquery, routeRedlists
        },
        data() {
            return {
                titleItems: [
                    {icon: 'home', txt: '报警站点', href: '/routeWarn'},
                    {icon: 'bars', txt: '巡检计划', href: '/routePlan'},
                    {icon: 'home', txt: '巡检记录', href: '/'},
                    {icon: 'bars', txt: '即时反馈', href: '/reback'}
                ],
                open2: false,
                alertText: '',
                isShow: true
            }
        },
        mounted() {

        },
        methods: {
            addPlan() {
                console.log(this);
            },
            // 隐藏提示框
            modalOutFun(value) {
                this[value] = false
            },
            // 显示提示框
            modalOpFun(value) {
                this[value] = true
            },
            routeLink(val) {
                console.log(val);
                this.$router.push({path: val});
            }
        }

    }
</script>

<style>
    .tabs {
        margin: 0 0;
    }

    .tab-panel {
        padding: 0em !important;
    }
</style>



