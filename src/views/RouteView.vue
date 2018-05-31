<template>
    <vue-view>
        <!--页面头部区域-->
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            巡检运维
        </navbar>
        <!--巡检首页面头部方块切换页面-->
        <card v-for="title in titleItems" :href="title.href" noPadded class="group-clear group-top-10">
            <h5 class="wt-title">
                <div class="wt-title-center">
                    <i class="wt-bar-i-16 red-news"></i>
                    <span>{{title.txt}} </span>
                </div>
            </h5>
            <card>
                <div id="myCharts2" :style="{width:'100%',height:'200px'}"></div>
                <a slot="footer" href="javascript: void(0)"></a>
                <a slot="footer" href="javascript: void(0)"></a>
                <a slot="footer" href="javascript: void(0)" @click="routeLink(title.href)">详情>></a>

            </card>
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
        name: 'chart',
        components: {
            TabsDesc,
            searchbar, topquery, routeRedlists
        },
        data() {
            return {
                titleItems: [
                    {icon: 'home', txt: '报警站点', href: '/routeWarn'},
                    {icon: 'bars', txt: '巡检计划', href: '/routePlan'},
                    {icon: 'home', txt: '巡检记录', href: '/routeRecord'},
                    {icon: 'home', txt: '巡检记录', href: '/routeDone'},
                    {icon: 'bars', txt: '即时反馈', href: '/routeReback'}
                ],
                open2: false,
                alertText: '',
                isShow: true
            }
        },
        mounted() {
            console.log("12");
            let myChart2 = echarts.init(document.getElementById('myCharts2'));
            var options2 = {
                color: ['#3398DB'],
                title: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    dataIndex: 1
                },
                legend: {
                    show: false
                },
                grid: {
                    x: -1,
                    y: 0,
                    x2: 0,
                    y2: 20,
                    borderWidth: 1,
                    containLabel: true
                },
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: [0, 1, 2, 3, 4, 5],
                    show: false
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#ffab3d'
                            }
                        },
                        data: [3, 1, 1, 2, 1, 1]
                    }
                ]
            };
            myChart2.setOption(options2);

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

    .card {
        margin: 0.35rem 0rem !important;
    }

    .list-label {
        border-radius: 1px;
    }

    .wt-header {
        height: 12.3125rem;
        color: #3b3b3b;
    }

    .wt-linear-blue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #66c4ff, #5d85ff);
        background-image: linear-gradient(90deg, #66c4ff, #5d85ff);
    }

    .wt-text {
        font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
    }

    .wt-h-15 {
        display: block;
        height: 2.875rem;
        line-height: 2.875rem;
        font-size: 1rem;
        text-align: left;
        padding-left: 1.25rem;
    }

    .wt-bar-i-46 {
        display: block;
        height: 3rem;
        width: 3rem;
        margin: 0 auto;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .wt-bar-i-16 {
        display: block;
        height: 1.3125rem;
        width: 1rem;
        margin: 0 auto;
        float: left;
        padding: 0 0.625rem;
        line-height: 1.3125rem;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .icon-title {
        font-size: .875rem;
        line-height: .3466666667rem;
    }

    .wt-text a {
        /* color:#ffffff; */
    }

    .wt-title {
        color: #434f65;
        /*padding: 0.625rem 0.9375rem;*/
        font-weight: 500;
        margin: 0;
    }

    .wt-title .red-c {
        background: url('../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .red-news {
        background: url('../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .wt-title-center {
        display: block;
        line-height: 1.125rem;
    }

    .wt-tab-lists {
        white-space: nowrap;
        overflow-x: auto;
    }

    .wt-tab-lists a {
        position: relative;
        display: inline-block;
        width: 10.3125rem;
        line-height: 4.375rem;
        height: 4.375rem;
        margin: 0.125rem 0.5rem;
        padding: 0 0.625rem;
        box-shadow: 0 0 0.2375rem rgba(117, 117, 117, 0.8);
    }

    .wt-linear-red {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #ff935c, #ff6e69);
        background-image: linear-gradient(270deg, #ff935c, #ff6e69);
    }

    .wt-linear-dblue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #4fa1f5, #3d61f5);
        background-image: linear-gradient(90deg, #4fa1f5, #3d61f5);
    }

    .wt-linear-blue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #5ccfff, #69baff);
        background-image: linear-gradient(270deg, #5ccfff, #69baff);
    }

    .wt-linear-purple {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #8cb4ff, #699eff);
        background-image: linear-gradient(270deg, #8cb4ff, #699eff);
    }

    .wt-linear-lgreen {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #56f1dd, #21e1ce);
        background-image: linear-gradient(90deg, #56f1dd, #21e1ce);
    }

    .wt-linear-yellow {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #fbb24f, #f9a32d);
        background-image: linear-gradient(270deg, #fbb24f, #f9a32d);
    }

    h3 {
        color: #3b3b3b;
        font-size: 0.875rem;
    }

    .get-more {
        text-align: center;
        padding: 10px 0 20px 0;
    }

    .get-more.theme-blue a {
        background-color: #498bf8;
        color: #fff;
    }

    .get-more a {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        padding: 0 20px;
        border: 1px solid #498bf8;
        border-radius: 14px;
        font-size: 12px;
        text-decoration: none;
        box-sizing: content-box;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }
</style>



