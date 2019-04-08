/**
流量计
2018.1.15 by diana
*/
<template>
    <vue-view slot="offcanvas">
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            巡检反馈
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <tabs v-model="selected" style="margin-top: 0;padding: 0 1rem 0 1rem;">
            <div class="plan-map" style="height: 170px;">
                <red-map ref="redmap" :points="mapPoints" v-on:mapAddress="mapAddress"></red-map>
            </div>
            <h5 class="wt-title" style="padding:0.925rem 0">
                <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>站点信息</span>
                </div>
            </h5>
            <list-item title="取水户名称">
                <a class="content" slot="after" name="">
                    {{chooseName.watuser_name}}
                    <img title="选中取水户" style="text-align: center;" @click="getQsh()" width="16" height="16"
                         src="../../../statics/images/add.png"/>
                </a>
            </list-item>
            <list-item title="取水站点">
                <a class="content" slot="after">{{this.cdInfo.mp_nm | trimStr}}</a>
            </list-item>
            <list-item title="站点编号">
                <a class="content" slot="after">{{this.cdInfo.mp_cd | trimStr}}</a>
            </list-item>
            <list-item title="瞬时流量(m³/s)">
                <a class="content" slot="after">{{this.cdInfo.mp_q | trimStr}}</a>
            </list-item>
            <list-item title="累计流量(m³)">
                <a class="content" slot="after">{{this.cdInfo.acc_w | trimStr}}</a>
            </list-item>
            <list-item title="计量设施厂家">
                <a class="content" slot="after">{{this.cdInfo.jsscnm | trimStr}}</a>
            </list-item>
            <list-item title="计量设施型号">
                <a class="content" slot="after">{{this.cdInfo.jsxh | trimStr}}</a>
            </list-item>
            <list-item title="计量设施类型">
                <a class="content" slot="after">{{this.cdInfo.jslx | trimStr}}</a>
            </list-item>
            <list-item title="安装时间">
                <a class="content" slot="after">{{this.cdInfo.dt | trimStr}}</a>
            </list-item>

            <h5 class="wt-title" style="padding:0.925rem 0">
                <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常信息</span>
                    <span class="wt-bar-subtitle"></span>
                </div>
            </h5>
            <textarea name="errormsg" v-model="xjList.errormsg"></textarea>
            <div class="bottom-button" style="text-align: center;margin-left: 0.88rem;margin-top: 1.625rem;">
                <vue-button amSize="xs" sblue @buttonClick="formSubmit()">完成提交</vue-button>
                <vue-button amSize="xs" orange  @buttonClick="lateSumit()">稍后派单</vue-button>
            </div>
        </tabs>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import ImageUpload from "../../libs/imageUpload"
    import Vue from 'vue'
    import * as API from '../../store/api/api'
    import VueView from "vue-amazeui/src/components/vueview/vueview"
    import redMap from '../../components/redmap'
    import getqsh from '../../components/getqsh'
    import axios from 'axios'
    import VueEvent from '../../libs/VueEvent.js'

    export default {
        components: {
            redMap,
            getqsh,
            axios,
            VueView
        },
        data() {
            return {
                offcanvas5: false,
                chooseName: {},
                cdInfo: {},
                llInfo: {},
                imgLists: [],
                imgUpload: false,
                imgIndex: 0,
                imgArray: [],
                imgArrayI: 0,
                open2: false,
                open3: false,
                selectDel: -1,
                PATROL_CONTENT: '',
                BZ: '',
                formData: new FormData(),
                mapAddressNow: {
                    address: '获取位置中...',
                    type: 'error'
                },
                xjList: {errormsg: ''},
                mapPoints: [
                    {lng: 0, lat: 0, name: '上海宝信'}
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
            var _this = this;
            //非父子组件之间通过广播传递值
            VueEvent.$on('watuser', function (data) {
                _this.chooseName = data;
                _this.cdInfo = data;
                //_this.llInfo = data.ll;
                //console.log(data);
                _this.mapPoints = [
                    {lng: data.x, lat: data.y, name: data.watuser_name}
                ]
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
                }
                else
                    this.open3 = true;
            });
            //地图加载事件
            Vue.set(this.$store.state.redmap, "loading", false);
        },
        methods: {
            refreshName(data) {
                console.log(data);
                this.chooseName = data;
            },
            mapAddress: function (mapAddress) {
                this.mapAddressNow = mapAddress;
                console.log(mapAddress);
            },
            watuser: function (watuser) {
                console.log(watuser);
            },
            close(value, push) {
                this[value] = false;
                if (push) this[push] = false;
            },
            open(value, push) {
                this[value] = true
                if (push) this[push] = true
            },
            delImg(item) { // 点击弹出回调
                this.open2 = true
                this.selectDel = item.id;
                console.log(item);
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
            rClick: function (v) {
                for (var i = 0; i < $("input[name='lljtxsc']").length; i++) {
                    $($("input[name='lljtxsc']")[i]).prop("checked", false);
                    console.log($("input[name='lljtxsc']")[i]);
                    if ($($("input[name='lljtxsc']")[i]).val() == v) {
                        $($("input[name='lljtxsc']")[i]).prop("checked", "checked");
                    }
                }
            },
            GetDateStr:function(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth()+1;//获取当前月份的日期
                var d = dd.getDate();
                return y+"-"+m+"-"+d;
            },
            lateSumit: function () {
                // 这里记录 收单人
                let username = util.getJStore("userInfo")["user_info"];
                console.log(username);
                this.$router.go(-1);
            },
            formSubmit() {
                var _this=this;
                let paramDataAdd = {
                    type: 'add',
                    lx: 'sd',
                    wr_patrol_b: {
                        id: '',
                        patrol_title: this.cdInfo.watuser_name,
                        patrol_time: this.GetDateStr(0),
                        patrol_content: '',
                        patrol_address: '',
                        patrol_long: '',
                        patrol_lat: '',
                        patrol_x: '',
                        patrol_y: '',
                        patrol_user: localStorage.getItem("userName"),
                        patrol_type: 'pd',
                        patrol_t:this.xjList.errormsg,
                        create_user: localStorage.getItem("userName"),
                        create_time: '',
                        isin: '1',
                        data_sources: '移动端',
                        patrol_file: '',
                        patrol_state: '0',
                        station_id:this.cdInfo.mp_cd,
                        bz: 'yjxj'
                    }
                }
                console.log(paramDataAdd);
                paramDataAdd = encodeURI(encodeURI(JSON.stringify(paramDataAdd)));
                this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramDataAdd).then(
                    response => {
                        console.log(response.data.code);
                        if (response.data.code === 0) {
                            //this.getWarnList(this.time.selectedDate);
                            _this.$layer.msg("加入巡检成功！");
                            _this.$router.go(-1);
                        }
                        // this.lists = response.data.data;
                    }, response => {
                        _this.$layer.msg("加入巡检失败！");
                    });
            },
            changeImg(e) {
                let deviceFile = e.target.files;
                this.imgArray.push(deviceFile[0]);
                this.formData.append("fileArray", deviceFile[0]);
                console.log(this.imgArray + 'change');

            },
            refreshMap() {
                console.log("刷新");
                //重新获取位置
                this.$refs.redmap.initMap();
            },
            getQsh() {
                //获取取水户信息
                this.$layer.iframe({
                    content: {
                        content: getqsh, //传递的组件对象
                        parent: this,//当前的vue对象
                        data: {
                            //props
                        }
                    },
                    area: ['70%', '55%'],
                    title: '获取取水户信息',
                    shade: false
                });
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
                if (e.length > 15) {
                    return e.substr(0, 15) + '...'
                } else {
                    return e
                }
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

    p {
        display: inline-block;
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

    .upload-pre-del {
        text-align: center;
        width: 100%;
        display: inline-block;
        border-top: 1PX solid #e6e6e6;
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
