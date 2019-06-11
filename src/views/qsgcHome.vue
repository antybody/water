<template>
    <vue-view slot="offcanvas">
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            核查列表
            <icon name="more-vertical" slot="left"></icon>
            <icon name="plus" slot="right" @click.native="newQsgcTable()"></icon>
        </navbar>
        <!--头部查询-->
        <div>
            <div class="route-fixed">
                <div class="wt-top-search">
                    <div class="h-search" @click="searchBar()">
                        <i class="h-search-ico"></i>
                        搜索核查列表
                    </div>
                </div>
                <div class="route-lists">
                    <div  class="mui-table-view mt0" v-for="list in lists">
                       <div class="mui-card-header">
                            <span class="mui-pull-right">工单类型：工程核查</span>
                           <span>{{list.xchcrq}}</span>
                        </div>
                        <div class="mui-card-content">
                            <div class="mui-card-content-inner">
                                <div class="row">
                                    <img slot="img" src="../../statics/images/shanghai1.png"
                                         style="width: 78px;height: 60px;" alt="">
                                    <span>项目名称：{{list.xmmc}}</span>

                                </div>
                                <div class="row">
                                    <span>项目编号：{{list.xmbh}}</span>
                                  <!--  <a v-if="list.patrol_state === '2'" class="banli success" href="javascript:void(0);"
                                       @click="listClick(list)">查看详情</a>-->
                                    <a  class="banli" href="javascript:void(0);" @click="listClick(list)">查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <calendar
                v-model="time.calendarShow"
                :defaultDate="time.defaultDate"
                @change="handelChange">
        </calendar>
    </vue-view>
</template>

<script>
    import Vue from 'vue'
    import layer from 'vue-layer'
    import calendar from '../components/calendar'
    import * as API from '../store/api/api'

    export default {
        components: {
            calendar
        },
        data() {
            return {
                open2: false,
                menu1: 1,
                lists: [],
                listType: true,
                time: {
                    calendarShow: false,
                    defaultDate: new Date(),
                    selectedDate: dateFormat(new Date(), "yyyy-MM-dd")
                }
            }
        },
        mounted() {
        /*    this.lists = [{
                bz: 'yjgd',
                patrol_state: '0',
                patrol_time: '2019-04-15',
                patrol_title: 'ceshi',
                station_id: '001',
            }];
            console.log(this.lists);*/
            this.getGchcList("","");
        },
        filters: {
            titleSplit(name) {
                if (name === undefined) return
                if (name.length > 10) return name.substring(0, 9) + '...'
                else return name;
            }
        },
        methods: {
            searchBar: function () {
                //    this.openSearch = true;
                this.$router.push({name: 'search',path:'hclb', params: {text: '请搜索核查列表', t: 'hclb'}});
            },
            newQsgcTable () {
                this.$router.push({name: 'qsgcTable'})
            },
            menuClick: function (menu) {
                console.log(menu);

            },
            handelChange: function (date, formatDate) {
                this.time.selectedDate = dateFormat(date, "yyyy-MM-dd");
                console.log(this.time.selectedDate);

            },
            listClick: function (data) {
                this.$router.push({
                    name: 'qsgcTableView',
                    params: {id: data.id}
                });
            },
            openCal: function () {
                this.time.calendarShow = true;
            },
            getGchcList(id,xmmc) {
                let paramData = {
                    type: 'query',
                    id:id,
                    xmmc:xmmc
                }
                //获取预警信息列表
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                console.log( API.QSGC_XCHC + '&params=' + paramData);
                this.$http.jsonp(API.QSGC_XCHC + '&params=' + paramData).then(
                    response => {
                        console.log(response);
                        this.lists = response.data.jcxx;
                        console.log(this.lists);
                    }, response => {
                        console.log("error");
                    });
            }
        }
    }

    function dateFormat(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate() - 1
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
</script>

<style scoped>
    .route-fixed {
        width: 100%;
        position: fixed;
        z-index: 1200;
    }

    .route-body {
        margin: 10px;
    }

    .route-body-message {
        float: left;
    }

    .route-body-option {
        float: right;
        height: 76px;
        line-height: 76px;
    }

    .route-body-option span {
        border-radius: 40px;
        padding: 2px 5px;
    }

    .route-body-option .undone {
        border: 1px solid rgb(228, 89, 89);
        color: rgb(228, 89, 89);
    }

    .route-body-option .done {
        border: 1px solid rgb(82, 223, 77);
        color: rgb(82, 223, 77);
    }

    .route-body-content {
        display: inline-block;
        vertical-align: top;
        color: rgb(141, 140, 140);
    }

    .route-body-content p {
        margin-bottom: 10px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .route-body-img {
        width: 70px;
        margin: 0px !important;
        display: inline-block;
    }

    .route-body-img img {
        width: 100%;
        display: block;
        border-radius: 6px;
    }

    .selectTime input {
        color: #666;
        border: 1px solid #e5e5e5;
        background: #f2f2f2;
        /*padding: 0 28px 0 12px;*/
        height: 28px;
        margin: 0;
    }

    .route-lists {
        -webkit-overflow-scrolling: touch;
        /*top: 83px;*/
        position: relative;
    }

    .route-tabs {
        line-height: 35px;
        text-align: center;
        border-bottom: 1px solid #f1ecec;
        background: #fff;
        display: block;
    }

    .route-tabs a {
        font-size: 16px;
        display: inline-block;
        text-align: center;
        width: 49.2%;
        color: rgb(141, 140, 140);
    }

    .route-tabs a.cur {
        color: #000;
        border-bottom: 2px solid #ff9d1f;
    }

    .route-subtabs {
        overflow: hidden;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
    }

    .sub {
        float: left;
        background: #fff;
        margin: 5px 5px;
    }

    .selectTime {
        float: right;
        width: 30%;
        margin: 5px 5px;
    }

    .sub span.cur {
        border-radius: 40px;
        background: #ffe2d7;
        color: #f66e3c;
    }

    .sub span {
        padding: 0.1rem 0.3rem 0.1rem 0.3rem;
        /*width: 48px;*/
        /*line-height: 28px;*/
        font-size: 12px;
        color: #333;
        margin-right: 5px;
        text-align: center;
        /*height: 28px;*/
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
    }

    .route-header {
        border-bottom: 1px solid #e5e5e5;
        height: 45px;
        line-height: 35px;
    }

    .route-header span {
        padding: 6px;
    }

    .route-header .l {
        float: left;
    }

    .route-header .r {
        float: right;
    }

    .clearfix {
        zoom: 1;
        overflow: hidden;
    }

    .clearfix:after {
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
        display: block;
    }

    .navbar-primary {
        background: #086ED3 !important;
        color: #fff;
    }

    .mui-table-view:first-child {
        margin-top: 15px;
    }

    .mt0 {
        margin-top: 0 !important;
        font-size: 14px;
    }

    .mui-table-view:before {
        position: absolute;
        right: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
        top: -1px;
    }

    .mui-card-header {
        border-bottom: 1px #eae4e4 solid;
    }

    .mui-card-content {
        margin-bottom: 0.5rem;
        border-bottom: 1px #eae4e4 solid;
    }

    .mui-table-view {
        position: relative;
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
        background-color: #fff;
    }

    .mui-card-content-inner {
        padding: 10px 15px;
    }

    .mui-card-content-inner {
        position: relative;
        padding: 15px;
    }

    .mui-card-content-inner .row {
        margin: 5px 0;
    }

    .banli {
        position: absolute;
        right: 15px;
        font-size: 12px;
        color: #fff;
        background: #f39827;
        border-radius: 12px;
        padding: 1px 15px;
    }

    .success {
        /*background: #3bb4f2 !important;*/
    }

    .mui-pull-right {
        float: right;
    }

    .mui-card-footer, .mui-card-header {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        min-height: 44px;
        padding: 10px 15px;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

</style>