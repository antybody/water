/**
巡检反馈-查看界面
2018.1.15 by diana
*/
<template>
    <vue-view slot="offcanvas">
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            巡检反馈
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <tabs v-model="selected" style="margin-top: 0">
            <tabs-item slot="tabs" blue hollow>基础信息</tabs-item>
            <tabs-item slot="tabs" blue hollow>巡检记录</tabs-item>
            <tabs-item slot="tabs" blue hollow>处理流程</tabs-item>
            <tabs-desc slot="desc">
                <div class="plan-map" style="height: 170px;">
                    <red-map :points="mapPoints"></red-map>
                </div>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>取水户信息</span>
                    </div>
                </h5>
                <list-item title="取水户名称">
                    <a class="content" slot="after">{{qsh.name}}</a>
                </list-item>
                <list-item title="取水站点">
                    <a class="content" slot="after">{{qsh.station}}</a>
                </list-item>
                <list-item title="取水许可证">
                    <a class="content" slot="after">{{qsh.xkz}}</a>
                </list-item>
                <list-item title="瞬时流量">
                    <a class="content" slot="after">{{qsh.ssll}} m³/s</a>
                </list-item>
                <list-item title="累计流量（本年）">
                    <a class="content" slot="after">{{qsh.ljll}} m³</a>
                </list-item>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center">
                        <i class="wt-bar-i-16 red-c"></i><span>站点信息</span>
                    </div>
                </h5>
                <list-item title="站点编号">
                    <a class="content" slot="after">{{station.bh}}</a>
                </list-item>
                <list-item title="计量设施厂家">
                    <a class="content" slot="after">{{station.cs}}</a>
                </list-item>
                <list-item title="计量设施型号">
                    <a class="content" slot="after">{{station.xh}}</a>
                </list-item>
                <list-item title="计量设施类型">
                    <a class="content" slot="after">{{station.lx}}</a>
                </list-item>
                <list-item title="安装时间">
                    <a class="content" slot="after">{{station.addtime}}</a>
                </list-item>
            </tabs-desc>
            <tabs-desc slot="desc">
                <h5 class="wt-title" style="padding: 0.925rem 0px;">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常信息</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="异常信息描述：">
                </list-item>
                <textarea readonly="readonly" v-model="xjList.errormsg"></textarea>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>巡检反馈</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="是否去现场核查">
                    <a class="radio" slot="after">
                        <i class="wt-bar-i-16 route-r"></i>{{xjList.ischeck}}</a>
                </list-item>
                <list-item title="处理详情：">
                </list-item>
                <textarea readonly="readonly" v-model="xjList.clmsg"></textarea>
               
                <list>
                    <list-item nested="input">
                        <field label="巡检人员">
                            <field-input placeholder="巡检人员" v-model="xjList.xjpersion"></field-input>
                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="巡检时间">
                            <field-input type="text" v-model="xjList.xjdate"></field-input>
                        </field>
                    </list-item>
                </list>
            </tabs-desc>
            <tabs-desc slot="desc">
                <ul class="route-timeline">
                    <li v-if="index == 0" class="route-timeline-item cur" v-for="(tl,index) in timeline" :key="tl.index">
                        <i class="wt-bar-i-16"></i>
                        <div class="route-timline-h">
                        <div class="desc">
                            <h3 style="color:rgb(254, 155, 30)">{{tl.dealcompany}} {{tl.dealperson}},{{tl.dealmsg}}</h3>
                            <p>{{tl.dealtime}}</p>
                        </div>
                        </div>
                    </li>
                    <li v-else class="route-timeline-item none">
                        <i class="wt-bar-i-16"></i>
                        <div class="route-timline-h">
                        <div class="desc">
                            <h3>{{tl.dealcompany}} {{tl.dealperson}},{{tl.dealmsg}}</h3>
                            <p>{{tl.dealtime}}</p>
                        </div>
                        </div>
                    </li>
                    <li class="route-timeline-item none">
                        <i class="wt-bar-i-16"></i>
                    </li>
                </ul>
            </tabs-desc>
        </tabs>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import ImageUpload from "../../libs/imageUpload"
    import Vue from 'vue'
    import * as API from '../../store/api/api'
    import VueView from "vue-amazeui/src/components/vueview/vueview";
    import redMap from '../../components/redmap'

    export default {
        components: {
            redMap,
            VueView
        },
        data() {
            return {
                selectDel: -1,
                qsh:{name:'宝信软件',station:'宝信监测点',xkz:'国长 字[2015]第01001号',
                    ssll:'120',ljll:'2300'},
                station:{bh:'宝信测站',cs:'宝信厂商',xh:'A0001',lx:'流量计',addtime:'2010-01-01'},
                PATROL_CONTENT: '',
                BZ: '',
                xjList:{errormsg:'ceshi',ischeck:'已核查',clmsg:'ceshi',xjpersion:'张三',xjdate:'2018-01-01'},
                mapPoints: [
                    {lng: 121.372882, lat: 31.176523, name: '上海宝信'}
                ],
                timeline:[{dealtime:'2018-10-10 12:10',dealperson:'张三',dealmsg:'已处理并回复处理结果',dealcompany:'城投公司'}
                          ,{dealtime:'2018-10-10 11:10',dealperson:'张三',dealmsg:'已前往处理',dealcompany:'城投公司'}
                          ,{dealtime:'2018-10-10 10:10',dealperson:'admin',dealmsg:'异常派单',dealcompany:'城投公司'}]
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
            let id = this.$route.params.id;
            //地图加载事件
            Vue.set(this.$store.state.redmap, "loading", false);
        },
        methods: {
           
        }
    }
</script>

<style>

    h3 {
        color: #3b3b3b;
        font-size: 0.875rem;
    }

    .grid-title {
        background: #f5f5f5;
        border-top: 1px solid #e3e3e3;
    }

    .grid-top-border {
        border-top: 1px solid #e3e3e3;
    }

    .item-title, .field-container {
        font-size: 0.812rem !important;
        font-weight: 400 !important;
    }

    .content {
        font-size: 0.7rem !important;
        font-weight: 300 !important;
    }

    .item {
        padding-right: 0 !important;
    }

    .radio {
        font-size: 0.88rem !important;
        font-weight: 200 !important;
    }

    .bottom-button button {
        padding: 0.6rem 2.625rem 0.6rem 2.625rem !important;
        font-size: 0.9rem !important;
        border-radius: 0.2rem;
    }

</style>
