<template>
    <vue-view class="container1">
        <!--页面头部区域-->
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            运维巡检
            <icon name="more-vertical" slot="left"></icon>
            <icon name="plus" slot="right" @click.native="addPlanTable()"></icon>
        </navbar>
        <!--巡检人员页面-->
        <div>
            <div class="route-fixed">
                <div class="route-tabs" v-if="userRole === 'xjy'">
                    <a :class="{cur:menu1 === 1}" @click="menu1Click(1)">待巡检</a>
                    <a :class="{cur:menu1 === 2}" @click="menu1Click(2)">历史巡检</a>
                </div>
                <div class="route-tabs" v-else-if="userRole === 'admin'">
                    <a :class="{cur:menu1 === 1}" @click="menu1Click(1)">计划列表</a>
                    <a :class="{cur:menu1 === 2}" @click="menu1Click(2)">历史巡检</a>
                </div>
                <div class="route-subtabs">
                    <div class="sub" v-show="listType">
                        <span :class="{cur:menu2 === 1}" @click="menu2Click(1)">数据断开</span>
                        <span :class="{cur:menu2 === 2}" @click="menu2Click(2)">数据负值</span>
                    </div>
                    <div class="sub" v-show="!listType">
                        <span :class="{cur:menu2 === 1}" @click="menu2Click(1)">预警巡检</span>
                        <span :class="{cur:menu2 === 2}" @click="menu2Click(2)">派单巡检</span>
                    </div>
                    <div class="selectTime">
                        <input type="text" readonly="readonly" @click="openCal" v-model="time.selectedDate">
                    </div>
                </div>
            </div>
            <!--巡检人员-->
            <div class="route-lists" v-show="userRole === 'xjy'">
                <!--
                待办列表
                  1.预警巡检计划列表
                  2.派单计划列表
                -->
                <div v-show="listType" class="mui-table-view mt0" v-for="list in lists"
                     v-if="list.patrol_state === '0'">
                    <div class="mui-card-header">
                        <span class="mui-pull-right" v-if="list.bz==='yjgd'">工单类型：预警工单</span>
                        <span class="mui-pull-right" v-else>工单类型：巡检工单</span>
                        <span>{{list.patrol_time}}</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="row">
                                <img slot="img" src="../../statics/images/shanghai1.png"
                                     style="width: 78px;height: 60px;" alt="">
                                <span>工单标题：{{list.patrol_title|titleSplit}}</span>

                            </div>
                            <div class="row">
                                <span>测点编号：{{list.station_id}}</span>
                                <a v-if="list.patrol_state === '2'" class="banli success" href="javascript:void(0);"
                                   @click="listClick(list)">查看详情</a>
                                <a v-else class="banli" href="javascript:void(0);" @click="listClick(list)">办理</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--
                已办列表
                  1.预警巡检计划列表
                  2.派单计划列表
                -->
                <div v-show="!listType" class="mui-table-view mt0" v-for="list in lists"
                     v-if="list.patrol_state === '2'">
                    <div class="mui-card-header">
                        <span class="mui-pull-right" v-if="list.bz==='yjgd'">工单类型：预警工单</span>
                        <span class="mui-pull-right" v-else>工单类型：巡检工单</span>
                        <span>{{list.patrol_time}}</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="row">
                                <img slot="img" src="../../statics/images/shanghai1.png" style="width: 78px;height: 60px;" alt="">
                                <span>工单标题：{{list.patrol_title|titleSplit}}</span>
                            </div>
                            <div class="row">
                                <span>测点编号：{{list.station_id}}</span>
                                <a v-if="list.patrol_state === '2'" class="banli success" href="javascript:void(0);"
                                   @click="listClick(list)">查看详情</a>
                                <a v-else class="banli" href="javascript:void(0);" @click="listClick(list)">办理</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--管理人员列表-->
            <div class="route-lists" v-show="userRole === 'admin'">
                <!--
                计划列表
                  1.预警列表
                    ①日水量断开
                    ②日水量负值
                -->
                <div v-show="listType" class="mui-table-view mt0" v-for="list in lists">
                    <div class="mui-card-header">
                        <span class="mui-pull-right">异常类型：{{list.error_num}}</span>
                        <span>{{list.error_time}}</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="row">
                                <img slot="img" src="../../statics/images/shanghai1.png" style="width: 78px;height: 60px;" alt="">
                                <span>取水户名称：{{list.watuser_name|titleSplit}}</span>

                            </div>
                            <div class="row">
                                <span>测点编号：{{list.error_point_num}}</span>
                                <a class="banli" href="javascript:void(0);" @click="addPlan(list)">加入巡检</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--
                历史列表
                  1.预警工单
                  2.历史派单
                -->
                <div v-show="!listType" class="mui-table-view mt0" v-for="list in lists">
                    <div class="mui-card-header">
                        <span class="mui-pull-right" v-if="list.bz==='yjgd'">工单类型：预警工单</span>
                        <span class="mui-pull-right" v-else>工单类型：巡检工单</span>
                        <span>{{list.patrol_time}}</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="row">
                                <img slot="img" src="../../statics/images/shanghai1.png" style="width: 78px;height: 60px;" alt="">
                                <span>工单标题：{{list.patrol_title|titleSplit}}</span>

                            </div>
                            <div class="row">
                                <span>测点编号：{{list.station_id}}</span>
                                <a v-if="list.patrol_state === '2'" class="banli success" href="javascript:void(0);"
                                   @click="listClick(list)">查看详情</a>
                                <a v-else class="banli" href="javascript:void(0);" @click="listClick(list)">待处理</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal role="confirm" title="提示信息" :isOpen="open2" @Confirm="confirm(patrolState, type)"
               @Close="modalOutFun('open2')">{{alertText}}
        </modal>
        <calendar
                v-model="time.calendarShow"
                :defaultDate="time.defaultDate"
                @change="handelChange">
        </calendar>
    </vue-view>
</template>

<script>
    import calendar from '../components/calendar'
    import chooseTable from '../components/chooseTable'
    import Vue from 'vue'
    import layer from 'vue-layer'
    import * as API from '../store/api/api'

    export default {
        components: {
            calendar, chooseTable
        },
        data() {
            return {
                open2: false,
                listType: true,
                alertText: '123',
                menu1: 1,
                menu2: 1,
                time: {
                    calendarShow: false,
                    defaultDate: new Date(),
                    selectedDate: dateFormat(new Date(), "yyyy-MM-dd")
                },
                ywLists: [],
                lists: [],
                userRole: localStorage.getItem("userRole")
            }
        },
        mounted() {
            if (this.userRole === 'admin') {
                //初始化数据
                this.getWarnList(this.time.selectedDate);
            } else if (this.userRole === 'xjy') {
                this.getPlanList(this.time.selectedDate);
            }
        },
        filters: {
            titleSplit(name) {
                if (name === undefined) return
                if (name.length > 10) return name.substring(0, 9) + '...'
                else return name;

            }
        },
        methods: {
            handelChange: function (date, formatDate) {
                this.time.selectedDate = dateFormat(date, "yyyy-MM-dd");
                console.log(this.time.selectedDate);
                if (this.listType && this.userRole === 'admin') {
                    this.getWarnList(this.time.selectedDate);
                } else if (this.listType && this.userRole === 'xjy') {
                    this.getPlanList(this.time.selectedDate);
                } else {
                    this.getPlanList(this.time.selectedDate);
                }
                // 这里查询数据库
            },
            openCal: function () {
                this.time.calendarShow = true;
            },
            menu1Click: function (index) {
                this.menu1 = index;
                if (index == 1 && this.userRole === 'admin') {// 加载常规巡检列表
                    this.listType = true;
                    this.getWarnList(this.time.selectedDate);

                } else if (index == 1 && this.userRole === 'xjy') {
                    this.listType = true;
                    //管理员用户 加载巡检计划列表
                    this.getPlanList(this.time.selectedDate);
                }
                if (index == 2) {
                    this.listType = false;
                    //管理员用户 加载巡检计划列表
                    this.getPlanList(this.time.selectedDate);
                }
            },
            menu2Click: function (index) {
                this.menu2 = index;
                if (index == 1) {// 取水户

                }
                if (index == 2) {// 大用水户

                }
                if (index == 3) {// 水源地

                }
                if (index == 4) {// 水功能区

                }
            },
            listClick: function (data) {
                console.log(data);
                if (this.userRole === 'admin') {
                    if (this.menu1 == 2 && data.patrol_state == 2 && data.bz !== 'yjgd')
                        this.$router.push({name: 'routeView', params: {id: data.id, t: 'pd'}});
                    else if (this.menu1 == 2 && data.patrol_state == 2 && data.bz == 'wtXjjl')
                        this.$router.push({
                            name: 'routeReback1View',
                            params: {id: data.id, patrol_lat: data.patrol_lat, patrol_long: data.patrol_long, t: 'pd'}
                        });
                } else if (this.userRole === 'xjy') {
                    if (this.menu1 == 2 && data.patrol_state == 2 && data.patrol_type !== 'yjgd')
                        this.$router.push({name: 'routeView', params: {id: data.id, t: 'pd'}});
                    else if (this.menu1 == 2 && data.patrol_state == 2 && data.patrol_type == 'yjgd')
                        this.$router.push({
                            name: 'routeReback1View',
                            params: {id: data.id, patrol_lat: data.patrol_lat, patrol_long: data.patrol_long, t: 'pd'}
                        });
                    else
                        this.$router.push({name: 'routeReback2', params: {id: data.id, t: 'pd'}});
                }

            },
            addPlan(val) {
                this.type = 'addPlan';
                this.patrolState = val;
                this.open2 = true;
                this.alertText = "是否确认加入巡检计划";
                return;
            },
            //开始巡检
            startPlan(val) {
                this.type = 'startPlan';
                this.id = val;
                this.open2 = true;
                this.alertText = "是否确认开始巡检";
                return;
            },
            // 隐藏提示框
            modalOutFun(value) {
                this[value] = false
            },
            // 显示提示框
            modalOpFun(value) {
                this[value] = true
            },
            //弹框确认事件
            confirm(val, type) {
                console.log(type);
                switch (type) {
                    case 'addPlan':
                        let paramDataAdd = {
                            type: 'add',
                            lx: 'yj',
                            wr_patrol_b: {
                                id: val.id,
                                patrol_title: val.watuser_name,
                                patrol_time: val.error_time,
                                patrol_content: '',
                                patrol_address: '',
                                patrol_long: '',
                                patrol_lat: '',
                                patrol_x: '',
                                patrol_y: '',
                                patrol_user: localStorage.getItem("userName"),
                                patrol_type: 'yjgd',
                                create_user: localStorage.getItem("userName"),
                                create_time: '',
                                isin: '1',
                                data_sources: '移动端',
                                patrol_file: '',
                                patrol_state: '0',
                                station_id: val.mp_cd,
                                bz: 'yjgd'
                            },
                            id: val.id
                        }
                        paramDataAdd = encodeURI(encodeURI(JSON.stringify(paramDataAdd)));
                        this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramDataAdd).then(
                            response => {
                                console.log(response.data.code);
                                if (response.data.code === 0) {
                                    this.getWarnList(this.time.selectedDate);
                                    this.$layer.msg("加入巡检成功！");
                                }
                                // this.lists = response.data.data;
                            }, response => {
                                console.log("error");
                            });

                        break;
                    case 'startPlan':
                        let paramDataStart = {
                            type: 'startPlan',
                            val: val
                        }
                        paramDataStart = encodeURI(encodeURI(JSON.stringify(paramDataStart)));
                        this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramDataStart).then(
                            response => {
                                console.log(response.data.data);
                                // this.lists = response.data.data;
                            }, response => {
                                console.log("error");
                            });
                        break;
                }
                this.modalOutFun('open2');
            },
            getWarnList(time) {
                let paramData = {
                    type: 'query',
                    beginTime: time,
                    endTime: time
                    // ,errornum: ['10201', '10102']
                }
                //获取预警信息列表
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                console.log(API.WARN_LIST + '&params=' + paramData);
                this.$http.jsonp(API.WARN_LIST + '&params=' + paramData).then(
                    response => {
                        console.log(response);
                        this.lists = response.data.data;
                        console.log(this.lists);
                    }, response => {
                        console.log("error");
                    });
            },
            getPlanList(time) {
                let paramData = {
                    type: 'query'
                }
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                console.log(API.ROUTE_PLAN + '&params=' + paramData);
                this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                    response => {
                        this.lists = response.data.data;
                        console.log(this.lists);
                    }, response => {
                        console.log("error");
                    });
            },
            addPlanTable() {
                //获取取水户信息
                this.$layer.iframe({
                    content: {
                        content: chooseTable, //传递的组件对象
                        parent: this,//当前的vue对象
                        data: {
                            //props
                            userRole: this.userRole
                        }
                    },
                    area: ['45%', '25%'],
                    title: '选择巡检内容'
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

<style>

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
        top: 83px;
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
        background: #3bb4f2 !important;
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



