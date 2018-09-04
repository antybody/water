/**
巡检反馈
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
                    <red-map ref="redmap" :points="mapPoints"></red-map>
                </div>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>取水户信息</span>
                    </div>
                </h5>
                <list-item title="取水户名称">
                    <a class="content" slot="after">宝信软件</a>
                </list-item>
                <list-item title="取水站点">
                    <a class="content" slot="after">宝信软件监测点</a>
                </list-item>
                <list-item title="取水许可证">
                    <a class="content" slot="after">国长 字[2015]第01001号</a>
                </list-item>
                <list-item title="瞬时流量">
                    <a class="content" slot="after">120 m³/s</a>
                </list-item>
                <list-item title="累计流量">
                    <a class="content" slot="after">3000120 m³</a>
                </list-item>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center">
                        <i class="wt-bar-i-16 red-c"></i><span>站点信息</span>
                    </div>
                </h5>
                <list-item title="站点编号">
                    <a class="content" slot="after">宝信软件测站</a>
                </list-item>
                <list-item title="计量设施厂家">
                    <a class="content" slot="after">宝信软件</a>
                </list-item>
                <list-item title="计量设施型号">
                    <a class="content" slot="after">A001</a>
                </list-item>
                <list-item title="计量设施类型">
                    <a class="content" slot="after">流量计</a>
                </list-item>
                <list-item title="安装时间">
                    <a class="content" slot="after">2018-01-01</a>
                </list-item>
            </tabs-desc>
            <tabs-desc slot="desc">
                <h5 class="wt-title">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>地表水取水</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>

                <list-item title="流量计通讯输出检查" after="正常"> </list-item>
                <list-item title="流量计数据核对" after="正常"> </list-item>
                <list-item title="通讯信号检查" after="正常"> </list-item>
                <list-item title="检测柜内电子元器件及表面清洁工作" after="正常"> </list-item>
                <list-item title="电源、避雷检查" after="正常"> </list-item>
                <list-item title="接地测试" after="正常"> </list-item>
                <list-item title="后台数据核对" after="正常"> </list-item>
                <list-item title="PLC程序备份" after="正常"> </list-item>
                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">
                </field>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>地下取水（回灌井）</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="流量计通讯输出检查" after="正常"> </list-item>
                <list-item title="流量计数据核对" after="正常"> </list-item>
                <list-item title="通讯信号检查" after="正常"> </list-item>
                <list-item title="检测柜内电子元器件及表面清洁工作" after="正常"> </list-item>
                <list-item title="电源、避雷检查" after="正常"> </list-item>
                <list-item title="接地测试" after="正常"> </list-item>
                <list-item title="后台数据核对" after="正常"> </list-item>
                <list-item title="PLC程序备份" after="正常"> </list-item>
                <list-item title="防水接线处理检查" after="正常"> </list-item>
                <list-item title="锂电池更换" after="正常"> </list-item>
                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">

                </field>

                <list-item title="巡检员" after="巡检员1号"> </list-item>
                <list-item title="巡检地点" after="江苏路389号"> </list-item>
                <list-item title="巡检时间"  after="2018-09-04"> </list-item>

            </tabs-desc>
            <tabs-desc slot="desc">
                <ul class="route-timeline">
                    <li v-if="index == 0" class="route-timeline-item cur" v-for="(tl,index) in timeline"
                        :key="tl.index">
                        <i class="wt-bar-i-16"></i>
                        <div class="route-timline-h">
                            <div class="desc">
                                <h3 style="color:rgb(254, 155, 30)">{{tl.dealcompany}}
                                    {{tl.dealperson}},{{tl.dealmsg}}</h3>
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
                offcanvas5: false,
                imgLists: [],
                imgUpload: false,
                imgIndex: 0,
                open2: false,
                open3: false,
                selectDel: -1,
                PATROL_CONTENT: '',
                BZ: '',
                mapPoints: [
                    {lng: 121.372882, lat: 31.176523, name: '上海宝信'}
                ],
                timeline: [{dealtime: '2018-10-10 12:10', dealperson: '张三', dealmsg: '已处理并回复处理结果', dealcompany: '城投公司'}
                    , {dealtime: '2018-10-10 11:10', dealperson: '张三', dealmsg: '已前往处理', dealcompany: '城投公司'}
                    , {dealtime: '2018-10-10 10:10', dealperson: 'admin', dealmsg: '异常派单', dealcompany: '城投公司'}]
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
            //地图加载事件
            Vue.set(this.$store.state.redmap, "loading", false);
        },
        methods: {
            mapAddress: function (mapAddress) {
                this.mapAddressNow = mapAddress;
            }
        }
    }
</script>

<style>
    .error {
        color: red !important;
    }

    .success {
        color: #5d85ff !important;
    }

    .upload-pre-del {
        position: relative;
        color: #000;
        /* border:1PX solid #bfbfbf; */
        font-size: 0.75rem;
        width: 76px;
        display: block;
        text-align: center;
    }

    .upload-pre-img {
        margin: 0;
        padding: 0;
    }

    .upload-pre-img li img {
        width: 76px;
        height: 76px;
    }

    .upload-pre-img li {
        float: left;
        background: no-repeat center center;
        background-size: cover;
        border: 1px solid #d9dadc;
        margin: 0.3125rem 0.3125rem 0.3125rem 0;
    }

    .input-add-img {
        opacity: 0;
        height: 100%;
        width: 100%;
    }

    .input-add-img-box {
        position: relative;
        width: 77px;
        height: 77px;
        border: 2px dotted #d9dadc;
        display: block;
    }

    .input-add-img-box::after {
        width: 39.5px;
        height: 2px;
    }

    .input-add-img-box::before {
        width: 2px;
        height: 39.5px;
    }

    .input-add-img-box::before, .input-add-img-box::after {

        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #d9d9d9;
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

    .wt-font-600 {
        font-weight: 700;
        font-size: 0.75rem;
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
    .item-after {
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

    .advice {
        height: 16px;
        width: 16px;
        display: inline-block;
        background-image: url('../../../statics/images/radio_no.png');
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
        margin-top: 5px;
    }

    input[type="radio"]:checked + .advice {
        background-image: url('../../../statics/images/radio_yes.png');
    }

</style>
