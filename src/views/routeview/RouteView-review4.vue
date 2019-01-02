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
        <tabs v-model="selected" style="margin-top: 0;height: 100%">
            <tabs-item slot="tabs" blue hollow>基础信息</tabs-item>
            <tabs-item slot="tabs" blue hollow>巡检记录</tabs-item>
            <tabs-item slot="tabs" blue hollow>现场图片</tabs-item>
            <tabs-desc slot="desc" style="height:100%">
                <h5 class="wt-title h5add" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常地址</span>
                    </div>
                </h5>
                <div class="plan-map" style="height: 170px;" >
                    <red-map  ref="redmap" :points="mapPoints"  v-on:mapAddress="mapAddress"></red-map>
                </div>
                <div style="width: 100%;height: auto">
                    <div class="boxHand footerBoxHandle box active" @click="toMax()">
                        <div class="active"></div>
                    </div>
                    <h5 class="wt-title" style="padding:0.925rem 0">
                        <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常信息</span>
                        </div>
                    </h5>
                    <list-item title="事件名称">
                        <a class="content" slot="after">{{qsh.patrol_title}}</a>
                    </list-item>
                    <list-item title="事件地点">
                        <a class="content" slot="after">{{qsh.patrol_address}}</a>
                    </list-item>
                    <list-item title="发生时间">
                        <a class="content" slot="after">{{qsh.patrol_time}}</a>
                    </list-item>
                    <list-item title="情况描述">
                        <a class="content" slot="after">{{qsh.patrol_content}}</a>
                    </list-item>
                </div>
            </tabs-desc>
            <tabs-desc slot="desc">
                <h5 class="wt-title" style="padding: 0.925rem 0px;">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>情况描述</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
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
                <imgpreview :imgLists="imgLists" @closeImg="closeImg" :imgpreshow="imgpreshow"></imgpreview>
                <ul class="upload-pre-img" v-show="imgLists.length >0">
                    <span v-for="item in imgLists" :key="imgLists.index" class="wt-img-preview" @click="pre_Handle()">
                            <img :src="item.url"/>
                       </span>
                </ul>




                <!--<ul class="route-timeline">-->
                    <!--<li v-if="index == 0" class="route-timeline-item cur" v-for="(tl,index) in timeline" :key="tl.index">-->
                        <!--<i class="wt-bar-i-16"></i>-->
                        <!--<div class="route-timline-h">-->
                        <!--<div class="desc">-->
                            <!--<h3 style="color:rgb(254, 155, 30)">{{tl.dealcompany}} {{tl.dealperson}},{{tl.dealmsg}}</h3>-->
                            <!--<p>{{tl.dealtime}}</p>-->
                        <!--</div>-->
                        <!--</div>-->
                    <!--</li>-->
                    <!--<li v-else class="route-timeline-item none">-->
                        <!--<i class="wt-bar-i-16"></i>-->
                        <!--<div class="route-timline-h">-->
                        <!--<div class="desc">-->
                            <!--<h3>{{tl.dealcompany}} {{tl.dealperson}},{{tl.dealmsg}}</h3>-->
                            <!--<p>{{tl.dealtime}}</p>-->
                        <!--</div>-->
                        <!--</div>-->
                    <!--</li>-->
                    <!--<li class="route-timeline-item none">-->
                        <!--<i class="wt-bar-i-16"></i>-->
                    <!--</li>-->
                <!--</ul>-->
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
                imgpreshow: false,
                qsh: {
                    patrol_title:this.$route.params.patrol_title,
                    patrol_address: this.$route.params.patrol_address,
                    patrol_content:this.$route.params.patrol_content,
                    patrol_time: this.$route.params.patrol_time
                },
                station:{bh:'宝信测站',cs:'宝信厂商',xh:'A0001',lx:'流量计',addtime:'2010-01-01'},
                PATROL_CONTENT: '',
                BZ: '',
                imgLists: [],
                xjList:{errormsg:'ceshi',ischeck:'已核查',clmsg:'ceshi',xjpersion:'张三',xjdate:'2018-01-01'},
                mapAddressNow: {
                    address: '获取位置中...',
                    type: 'error'
                },
                mapPoints: [
                    {lng:this.$route.params.patrol_long, lat:this.$route.params.patrol_lat, name: ''}
                ],
                timeline:[{dealtime:'2018-10-31 16:10',dealperson:'巡检员1',dealmsg:'已处理并回复处理结果',dealcompany:'中国石化上海石油化...'}
                          ,{dealtime:'2018-10-31 11:10',dealperson:'巡检员1',dealmsg:'已前往处理',dealcompany:'中国石化上海石油化...'}
                          ,{dealtime:'2018-10-30 10:10',dealperson:'傅旭升',dealmsg:'异常派单',dealcompany:'中国石化上海石油化...'}]
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
            //let id = this.$route.params.id;
            let paramDataAdd = {
                type: 'query',
                id: this.$route.params.id,
                file_id:this.$route.params.id
            }
            paramDataAdd = encodeURI(encodeURI(JSON.stringify(paramDataAdd)));
            let _this=this;
            this.$http.jsonp(API.SAVE_XJJL_SWR + '&params=' + paramDataAdd).then(
                response => {
                    console.log(response.data.code);
                    if (response.data.code === 0) {
                        console.log(response.data);
                        _this.xjList.errormsg=response.data.data[0].patrol_content;
                        _this.xjList.xjpersion=response.data.data[0].patrol_user;
                        _this.xjList.xjdate=response.data.data[0].patrol_time;
                        for (let i = 0; i < response.data.filesData.length; i++) {
                            var path = response.data.filesData[i].file_adress;
                            var arr = path.split("C:/FileServer/apacheFtpserver/res/home/");
                            var url = "http://31.16.10.52:8000/" + arr[1];
                            this.imgLists.push({url: url});
                        }
                        console.log(this.imgLists);
                    }else{
                        this.$layer.msg("页面出错，请返回重试！");
                    }
                    // this.lists = response.data.data;
                }, response => {
                    this.$layer.msg("页面出错，请返回重试！");
                    console.log("error");
                });
            //console.log(id);
            //地图加载事件
            Vue.set(this.$store.state.redmap, "loading", false);
        },
        methods: {
            mapAddress: function (mapAddress) {
                this.mapAddressNow = mapAddress;
                console.log(mapAddress);
            },
            closeImg: function () {
                this.imgpreshow = false;
            },
            toMax: function (v) {
                if($('.footerBoxHandle').hasClass('active')){
                    $('.footerBoxHandle').removeClass('active');
                    var hStr=document.getElementsByClassName('tabs')[0].offsetHeight-document.getElementsByClassName('tabs-nav')[0].offsetHeight-document.getElementsByClassName('h5add')[0].offsetHeight-20;
                    $('.plan-map').css('height',hStr)
                }
                else{
                    $('.footerBoxHandle').addClass('active');
                    $('.plan-map').css('height','170px')
                }
            }
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
    .boxHand {
        cursor: pointer;
    }

    .footerBoxHandle {
        width: 75px;
        height: 20px;
        position: absolute;
        margin-top: -21px;
        right: 50%;
        margin-left: -32px;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
    }
    .box {
        position: absolute;
        border: 1px solid rgba(255,255,255, 1);
        border-radius: 4px;
        background: rgba(255,255,255, .8);
        color: rgb(230,230,230);
        font-size: 12px;
    }
    .footerBoxHandle.active div {
        -webkit-transform: rotate(225deg);
        transform: rotate(225deg);
        top: 5px;
    }
    .footerBoxHandle div {
        position: absolute;
        width: 10px;
        height: 10px;
        border: 1px solid #CCC;
        top: 50%;
        left: 50%;
        border-bottom: none;
        border-right: none;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        margin: -2px -5px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 11px;
    }
</style>
