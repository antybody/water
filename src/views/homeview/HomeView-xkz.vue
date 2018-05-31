<!--取水许可证超期查看页面-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            取水许可证超期情况
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <!--许可证列表查询-->

        <div class="wttabs-second">
            <ul>
                <li><span :class="isClick4 == 1 ? 'wtac':''" @click="searchQslx('qb')">全部</span></li>
                <li><span :class="isClick4 == 2 ? 'wtac':''" @click="searchQslx('dbs')">地表水</span></li>
                <li><span :class="isClick4 == 3 ? 'wtac':''" @click="searchQslx('dxs')">地下水</span></li>
            </ul>
        </div>
        <table>
            <tr><th>行政区</th><th>总数</th><th>有效证</th><th>过期证</th></tr>
            <tr v-for="item in listInfo"><td>{{item.ID}}</td><td>{{item.XKZZS}}</td><td>{{item.YXZ}}</td><td>{{item.GQZ}}</td></tr>
        </table>
        <!--过期情况图表-->
        <div class="pies-month">
            <div class="pies" id="myCharts"></div>
            <div class="month">
                <span class="title">一个月后过期</span>
                <span class="content">{{onM}}</span>
            </div>
            <div class="month">
                <span class="title">三个月后过期</span>
                <span class="content">{{threeM}}</span>
            </div>
        </div>
    </vue-view>
</template>

<script>
    // import echarts from 'echarts';
    import * as API from '../../store/api/api'
    export default {
        components: {
        },
        data(){
            return{
                listInfo:[{
                    "GQZ": 6,
                    "ID": "中心城区",
                    "ONEGQ": 0,
                    "THREEGQ": 1,
                    "XKZZS": 206,
                    "YXZ": 200
                }
                ],
                isClick4:1,
                selected:false,
                tabsItem: [
                    {"name":"全部","id":"qb"},
                    {"name":"地表水","id":"dbs"},
                    {"name":"地下水","id":"dxs"}
                ],
                onM:'0',//一个月过期
                threeM:'0',//三个月过期
                yxz:'0',//一个月过期
                gqz:'0'//三个月过期
            }
        },
        methods:{
            searchQslx:function(val){
                switch (val){
                    case 'qb':
                        this.isClick4=1;
                        break;
                    case 'dbs':
                        this.isClick4=2;
                        break;
                    case 'dxs':
                        this.isClick4=3;
                        break;
                }
                this.query(val)
            },
            query:function (val) {

                let paramData = {
                    param:val
                }
                paramData = encodeURIComponent(JSON.stringify(paramData));
                this.$http.jsonp(API.QSH_XKZ_FB+ "&params=" + paramData).then(
                    response => {
                        //循环设置跳转地址 href
                        for (let value of response.data.data) {
                            if(value.ID=='上海市'){
                                this.onM=value.ONEGQ;
                                this.threeM=value.THREEGQ;
                                this.yxz=value.YXZ;
                                this.gqz=value.GQZ;
                            }
                        }
                        this.listInfo = response.data.data;
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
                                    name:'取水许可证状态分布：',
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
                                        {value:this.yxz, name:'有效许可证'},
                                        {value:this.gqz, name:'过期许可证'},
                                        {value:this.onM, name:'一个月过期'},
                                        {value:this.threeM, name:'三个月过期'}
                                    ]
                                }
                            ]
                        };
                        myChart.setOption(options);
                    }, response => {
                        console.log("error");
                    });
            }
        },
        mounted(){
            this.query('qb');
        }
    }
</script>

<style>
    .btn {
        border: 0px !important;
    }
    .btn :active{
        background-color: #1df2ff !important;
    }
    .tabs{
        margin: 0 0;
    }
    table{
        width: 100%;
        height: 57%;
        background-color: #ffffff;
        /*border: 1px solid #d5e7f1;*/
        /*margin-left: 10px;*/
    }
    tr{
        text-align: center;
    }
    .wttabs-second ul{
        margin:0;padding:0;
    }
    .wttabs-second li{
        float:left;
        width:33.33%;
        margin-top:5px;
        margin-bottom:5px;
    }
    .wttabs-second li span{
        display:block;
        background:#f6f6f6;
        line-height:30px;
        padding:0 5px;
        margin:0 8px;
        text-align:center;
        overflow:hidden;
        border-radius:5px;
        text-overflow:ellipsis;
        font-size:0.8125rem;
    }
    .wtac{
        color:#fff;
        background:#11b9e8 !important;
    }
    th{
        background-color: #dff1fc;
    }
    td{
        font-size: 14px;
        border-top: 1px solid #d5e7f1;
        border-bottom: 1px solid #dff1fc;
    }
    .pies-month{
        float: left;
        width: 100%;
        height: 38%;
        background-color: #FFFFFF;
        padding: 10px 10px 10px 10px;
    }
    .pies{
        width: 60%;
        height: 100%;
        float: left;
        border: solid 1px #d5e7f1;
    }
    .month{
        float: right;
        width: calc(40% - 10px);
        height: calc(50% - 5px);
        margin-bottom: 10px;
        border: dashed 1px #fecf63;
    }
    .month span{
        height: 30%;
        line-height: 20%;
        text-align: center;
        display: block;
    }
    .title{
        font-size: 16px;
        font-weight: 600;
        margin-top: 30px;
    }
    .content{
        font-size: 18px;
        font-weight: 600;
        color: red;
    }
</style>
