<!--取水许可证超期查看页面-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            取水许可证超期情况
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <!--许可证列表查询-->
        <tabs v-model="selected">
            <tabs-item v-for="tabitem in tabsItem" slot="tabs" blue hollow>
                {{tabitem.name}}
            </tabs-item>
        </tabs>
        <table>
            <tr><th>行政区</th><th>总数</th><th>有效证</th><th>过期证</th></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
            <tr><td>青浦区</td><td>123</td><td>123</td><td>123</td></tr>
        </table>
        <!--过期情况图表-->
        <div class="charts" id="myCharts" :style="{width:'70%',height:'38%'}"></div>
        <div class="charts" :style="{width:'30%',height:'38%'}">

        </div>
    </vue-view>
</template>

<script>
    import echarts from 'echarts';
    export default {
        components: {
        },
        data(){
            return{
                tabsItem: [
                    {"name":"金山区"},
                    {"name":"金山区"},
                    {"name":"金山区"},
                    {"name":"金山区"}
                ]
            }
        },
        mounted(){
            let myChart = echarts.init(document.getElementById('myCharts'));
            var options = {
                backgroundColor: '#FFFFFF',
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    show: false
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ]
                    }
                ]
            };
            myChart.setOption(options);
        }
    }
</script>

<style>
    .btn{
        border: 0px !important;
    }
    .tabs{
        margin: 0 0;
    }
    table{
        width: 100%;
        height: 57%;
        background-color: #ffffff;
        border: 1px solid #d5e7f1;
    }
    tr{
        text-align: center;
    }
    td{
        border-top: 1px solid #d5e7f1;
        border-bottom: 1px solid #d5e7f1;
    }
    .charts{
        float: left;
        background-color: #FFFFFF;
    }
</style>
