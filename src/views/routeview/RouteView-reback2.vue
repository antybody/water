/**
巡检反馈-查看界面
2018.1.15 by diana
*/
<template>
    <vue-view slot="offcanvas">
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            巡检反馈
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>        <tabs v-model="selected" style="margin-top: 0">
            <tabs-item slot="tabs" blue hollow>基础信息</tabs-item>
            <tabs-item slot="tabs" blue hollow>巡检记录</tabs-item>
            <!--<tabs-item slot="tabs" blue hollow>处理流程</tabs-item>-->
            <tabs-desc slot="desc"   style="margin-top: 0;height: 100%">
                <h5 class="wt-title h5add" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常地址</span>
                    </div>
                </h5>
                <div class="plan-map" style="height: 170px;">
                    <red-map ref="redmap" :points="mapPoints" v-on:mapAddress="mapAddress"></red-map>
                </div>
                <div style="width: 100%;height: auto">
                    <div class="boxHand footerBoxHandle box active" @click="toMax()">
                        <div class="active"></div>
                    </div>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center">
                        <i class="wt-bar-i-16 red-c"></i><span>站点信息</span>
                    </div>
                </h5>
                <list-item title="所属取水户">
                    <a class="content" slot="after">{{this.mpData.patrol_title | trimStr | subStr}}</a>
                </list-item>
                <list-item title="站点编号">
                    <a class="content" slot="after">{{this.mpData.mp_cd | trimStr}}</a>
                </list-item>
                <list-item title="安装地址">
                    <a class="content" slot="after">{{this.mapPoints[0].desc | trimStr}}</a>
                </list-item>
                <list-item title="取水站点">
                    <a class="content" slot="after">{{this.mpData.mp_nm | trimStr | subStr}}</a>
                </list-item>
                <!--<list-item title="瞬时流量(m³/s)">-->
                    <!--<a class="content" slot="after">{{this.userInfo.ll.mp_q | trimStr}} </a>-->
                <!--</list-item>-->
                <!--<list-item title="累计流量(m³)">-->
                    <!--<a class="content" slot="after">{{this.userInfo.ll.acc_w | trimStr}} </a>-->
                <!--</list-item>-->
                <list-item title="计量设施厂家">
                    <a class="content" slot="after">{{this.mpData.jsscnm | trimStr}}</a>
                </list-item>
                <list-item title="计量设施型号">
                    <a class="content" slot="after">{{this.mpData.jsxh | trimStr}}</a>
                </list-item>
                <list-item title="计量设施类型">
                    <a class="content" slot="after">{{this.mpData.jllx | trimStr}}</a>
                </list-item>
                <list-item title="安装时间">
                    <a class="content" slot="after">{{this.mpData.dt | trimStr}}</a>
                </list-item>
                </div>
            </tabs-desc>
            <tabs-desc slot="desc">
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常信息</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <textarea name="errormsg" v-model="xjList.errormsg"></textarea>

                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>巡检反馈</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="是否去现场核查">
                    <a class="radio" slot="after">
                        <input type="radio" name="lljtxsc" id="lljtxsc_yes" value="1" hidden checked/>
                        <label for="lljtxsc_yes" class="advice"></label>
                        <span class="radio-name" @click="rClick(1)">去现场</span>
                        <input type="radio" name="lljtxsc" id="lljtxsc_no" value="0" hidden/>
                        <label for="lljtxsc_no" class="advice"></label>
                        <span class="radio-name" @click="rClick(0)">无需</span>
                    </a>
                </list-item>

                <div class="wt-list-info">
                    <div class="wt-list-lineover">
                        <label>现场照片：
                            <span class="wt-lits-subtilte">最多上传6张</span>
                            <span style="float:right">{{imgLists.length}}/6</span>
                        </label>
                        <p class="g-overflow">
                        <span class="js_add_img">
                             <i class="icon_add_gray" @click="open('offcanvas5')"></i>
                                 <span class="input-add-img-box">
                                     <input id="imgupload" capture="camera" class="input-add-img" type="file"  @change="changeImg($event)"
                                            accept="image/*"/>
                                 </span>
                             </span>
                        <ul class="upload-pre-img" v-show="imgLists.length >0">
                            <li v-for="item in imgLists" :key="index">
                                <div><img :src="item.url"></div>
                                <span class="upload-pre-del"><i class="icons-e616" @click="delImg(item)"></i></span>
                            </li>
                            <div class="clear"></div>
                        </ul>
                        </p>
                    </div>
                </div>
                <list>
                    <list-item nested="input">
                        <field label="巡检人员">
                            <field-input name="xjperson" placeholder="巡检人员"></field-input>
                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="巡检地点">
                            <span :class="mapAddressNow.type" id="address" style="width: 80%;padding-right: 0.625rem;">{{mapAddressNow.address}}</span>
                            <span hidden id="lng">{{mapAddressNow.lng}}</span>
                            <span hidden id="lat">{{mapAddressNow.lat}}</span>
                            <span style="width: 10%">
                                <img title="刷新" style="text-align: center;" @click="refreshMap()" width="16" height="16"
                                     src="../../../statics/images/refresh.png"/>
                            </span>

                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="巡检时间">
                            <field-input name="xjdate" type="date" placeholder="选择巡检时间"></field-input>
                        </field>
                    </list-item>
                </list>
                <div class="bottom-button" style="text-align: center;margin-left: 0.88rem;margin-top: 1.625rem;">
                    <vue-button amSize="xs" sblue @buttonClick="formSubmit()">完成提交</vue-button>
                    <vue-button amSize="xs" orange @buttonClick="lateSumit()">稍后巡检</vue-button>
                </div>
                <!-- 从下向上 弹出框组件-->
                <offcanvas style="height:4.375rem" sildewh="82%" silde="top" :open="offcanvas5"
                           @Close="close('offcanvas5')">
                    <div style="padding:0.3125rem;">
                        <vue-button block>拍照</vue-button>
                    </div>
                </offcanvas>
                <!--提醒不能超过-->
                <modal role="alert" title="提醒" :isOpen="open3" @Close="modalOutFun('open3')">不能超过6张图</modal>
                <!-- 确定删除该图片 -->
                <modal role="confirm" title="提醒" :isOpen="open2" @Confirm="del()" @Close="modalOutFun('open2')">确定删除？
                </modal>
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
    import * as util from '../../libs/utils'
    import axios from 'axios'
    import 'jquery'

    export default {
        components: {
            redMap,
            axios,
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
                mpData: {},
                userInfo: {},
                imgArray: [],
                formData: new FormData(),
                qsh: {
                    name: '宝信软件', station: '宝信监测点', xkz: '国长 字[2015]第01001号',
                    ssll: '120', ljll: '2300'
                },
                station: {bh: '宝信测站', cs: '宝信厂商', xh: 'A0001', lx: '流量计', addtime: '2010-01-01'},
                PATROL_CONTENT: '',
                BZ: '',
                mapAddressNow: {
                    address: '获取位置中...',
                    type: 'error'
                },
                mapPoints:
                    [{lng: 0, lat: 0, name: '上海宝信', desc: ''}],
                xjList: {errormsg: ''},
                timeline: []
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
            let id = this.$route.params.id
            let data = this.$route.params.data
            this.mpData = data
            console.log(data)
            //获取流量信息
            let params = {
                mp_cd: data.mp_cd
            };
            params = encodeURI(encodeURI(JSON.stringify(params)));
            this.$http.jsonp(API.QUERY_LL + "&params=" + params).then(
                response => {
                    console.log(response.data)
                    this.userInfo = response.data
                    this.mapPoints = [{
                        lng: this.userInfo.users[0].jd,
                        lat: this.userInfo.users[0].wd,
                        name: this.userInfo.users[0].watuser_name,
                        desc: this.userInfo.users[0].watuser_addr
                    }]
                }, response => {
                    console.log("error");
                })
            var imgload = new ImageUpload({
                inputEl: '#imgupload',
                showEl: false,
                isCompress: true,
                isDev: false
            }, (blob) => {
                if (this.imgLists.length < 6) {
                    this.imgLists.push({id: this.imgIndex, url: blob});
                    this.imgIndex += 1;
                    console.log(this.imgLists);
                }
                else
                    this.open3 = true;
            });
            //地图加载事件
            Vue.set(this.$store.state.redmap, "loading", false);
        },
        methods: {
            close(value, push) {
                this[value] = false;
                if (push) this[push] = false;
            },
            open(value, push) {
                this[value] = true
                if (push) this[push] = true
            },
            mapAddress: function (mapAddress) {
                this.mapAddressNow = mapAddress;
                console.log(mapAddress);
            },
            delImg(item) { // 点击弹出回调
                this.open2 = true
                this.selectDel = item.id;
                console.log(item);
            },
            changeImg(e) {
                let deviceFile = e.target.files;
                this.imgArray.push(deviceFile[0]);
                this.formData.append("fileArray", deviceFile[0]);
                console.log(this.imgArray);

            },
            modalOutFun(value) {
                this[value] = false
            },
            del() { // 确定删除
                let j = 0;
                this.imgLists.forEach(element => {
                    if (element.id == this.selectDel)
                        this.imgLists.splice(j, 1);
                    j += 1;
                });

                this.modalOutFun('open2');
            },
            refreshMap() {
                console.log("刷新");
                //重新获取位置
                this.$refs.redmapSwr.initMap();
            },
            formSubmit() {
                //必须上传图片
                var _this=this;
                if (this.imgLists.length === 0) {
                    this.$layer.msg("请上传现场图片！");
                    return;
                }
                let ID = this.$route.params.id;
                console.log(ID);
                let paramData = {
                    type: 'update',
                    user: localStorage.getItem("userName"),
                    patrol_address: this.mapAddressNow.address,
                    patrol_long: this.mapAddressNow.lng,
                    patrol_lat: this.mapAddressNow.lat,
                    //patrol_title: this.cdInfo.mp_nm,
                    patrol_content: this.xjList.errormsg,
                    // patrol_x: '',
                    // patrol_y: '',
                    //patrol_type: 'wtXjjl',
                    id: ID
                    // lx:'yj',
                    // PATROL_CONTENT: this.PATROL_CONTENT,
                    // BZ: this.BZ
                }
                console.log(paramData);
                paramData = encodeURIComponent(JSON.stringify(paramData));
                this.formData.append('params', paramData);
                // this.formData.append('fileArray', this.imgArray);
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                Vue.prototype.$ajax = axios;
                this.$ajax({
                    method: 'post',
                    url: API.SAVE_LLY_YJ,
                    processData: false,//用于对data参数进行序列化处理 这里必须false
                    contentType: false, //必须
                    data: this.formData
                }).then(function (response) {
                    if(response.data.code==0){
                        _this.$layer.msg("提交成功！");
                        _this.$router.go(-1);
                    }else{
                        _this.$layer.msg("提交失败！");
                    }
                    console.log(response);
                }).catch(function (error) {
                    _this.$layer.msg("提交失败！");
                    console.log(error);
                });
                // this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                //     response => {
                //         if(response.data.code==0){
                //             _this.$layer.msg("提交成功！");
                //         }else{
                //             _this.$layer.msg("提交失败！");
                //         }
                //         console.log(response);
                //     }, response => {
                //         _this.$layer.msg("提交失败！");
                //         console.log(error);
                //     });
            },
            rClick: function (v) {
                for (var i = 0; i < $("input[name='lljtxsc']").length; i++) {
                    $($("input[name='lljtxsc']")[i]).prop("checked", false);
                    console.log($("input[name='lljtxsc']")[i]);
                    if ($($("input[name='lljtxsc']")[i]).val() == v) {
                        $($("input[name='lljtxsc']")[i]).prop("checked", "checked");
                    }
                }
            },
            lateSumit: function () {
                // 这里记录 收单人
                let username = util.getJStore("userInfo")["user_info"];
                console.log(username);
                this.$router.go(-1);
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
        },
        filters: {
            trimStr: function (e) {
                if (e === '') {
                    return '暂无数据'
                } else {
                    return e
                }
            },
            subStr: function (e) {
                if (e!=null && e.length > 15) {
                    return e.substr(0, 15) + '...'
                } else {
                    return e
                }
            }
        }
    }
</script>

<style>
    .clear {
        clear: both
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
