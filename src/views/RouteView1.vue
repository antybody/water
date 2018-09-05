<template>
    <vue-view class="container1">
        <!--页面头部区域-->
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            运维巡检
            <icon name="more-vertical" slot="left"></icon>
            <icon v-show="userRole === 'xjy'" name="plus" slot="right" href="/routeReback1"></icon>
        </navbar>
        <!--巡检人员页面-->
        <div>
            <div class="route-fixed">
                <div class="route-tabs" v-if="userRole === 'xjy'">
                    <a :class="{cur:menu1 === 1}" @click="menu1Click(1)">常规巡检</a>
                    <a :class="{cur:menu1 === 2}" @click="menu1Click(2)">派单巡检</a>
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
            <!--管理人员列表-->
            <div class="route-lists" v-show="userRole === 'admin'">
                <!--未加入计划列表-->
                <div v-show="listType" style="background:#fff;margin-bottom:10px" v-for="list in lists">
                    <div class="route-header clearfix">
                        <span class="l">编号：{{list.companycode}}</span>

                    </div>
                    <div class="route-body clearfix">
                        <div class="route-body-message">
                            <!--<div class="route-body-img">-->
                                <!--<img src="../../statics/images/icon_03.png">-->
                            <!--</div>-->
                            <div class="route-body-content">
                                <span class="r">{{list.watuser_name}}</span>
                                <p class="route-body-content-title">
                                    {{list.error_time}}
                                </p>
                                <p class="route-body-content-title" style="color: #ec5c30;">
                                    日水量 {{list.error_num}}
                                </p>
                            </div>
                        </div>
                        <div class="route-body-option">
                            <span v-if="userRole === 'admin'" class="undone" @click="addPlan(list)">添加巡检</span>
                            <span v-else-if="userRole === 'xjy'" class="undone" @click="listClick(list)">巡检中</span>
                        </div>
                    </div>
                </div>
                <!--历史列表-->
                <div v-show="!listType" style="background:#fff;margin-bottom:10px" v-for="list in lists">
                    <div class="route-header clearfix">
                        <span class="l">编号：{{list.STATION_ID}}</span>

                    </div>
                    <div class="route-body clearfix">
                        <div class="route-body-message">
                            <!--<div class="route-body-img">-->
                                <!--<img :src="list.PATROL_FILE">-->
                            <!--</div>-->
                            <div class="route-body-content">
                                <span class="r">{{list.PATROL_TITLE}}</span>
                                <p class="route-body-content-title">
                                    {{list.PATROL_TIME}}
                                </p>
                                <p class="route-body-content-title" style="color: #ec5c30;">
                                    {{list.DATA_TYPE}} {{list.ERROR_NUM}}
                                </p>
                            </div>
                        </div>
                        <div class="route-body-option">
                            <span v-if="list.PATROL_STATE === '2'" class="done" @click="listClick(list)">查看详情</span>
                            <span v-else class="undone" @click="listClick(list)">待处理</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="route-lists" v-show="userRole === 'xjy'">
                <!--未加入计划列表-->
                <!--历史列表-->
                <div style="background:#fff;margin-bottom:10px" v-for="list in lists">
                    <div class="route-header clearfix">
                        <span class="l">编号：{{list.STATION_ID}}</span>

                    </div>
                    <div class="route-body clearfix">
                        <div class="route-body-message">
                            <!--<div class="route-body-img">-->
                                <!--<img :src="list.PATROL_FILE">-->
                            <!--</div>-->
                            <div class="route-body-content">
                                <span class="r">{{list.PATROL_TITLE}}</span>
                                <p class="route-body-content-title">
                                    {{list.PATROL_TIME}}
                                </p>
                                <p class="route-body-content-title" style="color: #ec5c30;">
                                    {{list.DATA_TYPE}} {{list.ERROR_NUM}}
                                </p>
                            </div>
                        </div>
                        <div class="route-body-option">
                            <span v-if="list.PATROL_STATE === '2'" class="done" @click="listClick(list)">查看详情</span>
                            <span v-else class="undone" @click="listClick(list)">待处理</span>
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
    import * as API from '../store/api/api'

    export default {
        components: {
            calendar
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
        methods: {
            handelChange: function (date, formatDate) {
                this.time.selectedDate = dateFormat(date, "yyyy-MM-dd");
                console.log(this.time.selectedDate);
                this.getWarnList(this.time.selectedDate);
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
                    this.listType = false;
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
                if (this.userRole === 'admin') {
                    if (this.menu1 == 2 && data.PATROL_STATE == 2)
                        this.$router.push({name: 'routeView', params: {id: data.ID, t: 'pd'}});
                } else if (this.userRole === 'xjy') {
                    if (this.menu1 == 2 && data.PATROL_STATE == 2)
                        this.$router.push({name: 'routeView', params: {id: data.ID, t: 'pd'}});
                    else
                        this.$router.push({name: 'routeReback2', params: {id: data.id, t: 'pd'}});
                }
                // if (this.menu1 == 1)
                //     this.$router.push({name: 'routeReback1', params: {id: '', t: ''}});
                //
                // if (this.menu1 == 2 && data.PATROL_STATE == 0)
                //     this.$router.push({name: 'routeReback2', params: {id: data.id, t: 'pd'}});

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
                                patrol_user: localStorage.getItem("user"),
                                patrol_type: 'yjgd',
                                create_user: localStorage.getItem("user"),
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
                                    this.getWarnList('2018-09-04');
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
                    type: 'query',
                    PATROL_STATE: ['0']
                }
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                    response => {
                        this.lists = response.data.data;
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
            "d+": date.getDate()-1
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
        width: 100px;
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
        top: 93px;
        position: relative;
    }

    .route-tabs {
        line-height: 45px;
        text-align: center;
        border-bottom: 1px solid #f1ecec;
        background: #fff;
        display: block;
    }

    .route-tabs a {
        font-size: 18px;
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
</style>



