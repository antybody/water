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
        <tabs v-model="selected" style="margin-top: 0">
            <tabs-item slot="tabs" blue hollow>基础信息</tabs-item>
            <tabs-item slot="tabs" blue hollow>巡检记录</tabs-item>
            <tabs-item slot="tabs" blue hollow>现场图片</tabs-item>
            <tabs-desc slot="desc">
                <div class="plan-map" style="height: 170px;">
                    <red-map ref="redmap" :points="mapPoints" v-on:mapAddress="mapAddress"></red-map>
                </div>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>取水户信息</span>
                    </div>
                </h5>
                <list-item title="取水户名称">
                    <a class="content" slot="after" name="">
                        {{chooseName.watuserName}}
                        <img title="选中取水户" style="text-align: center;" @click="getQsh()" width="16" height="16"
                             src="../../../statics/images/add.png"/>
                    </a>

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
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>流量仪传感器部分</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="检查外观是否正常">
                    <a class="radio" slot="after">
                        <input type="radio" name="cgq_wgjc" id="cgq_wgjc_yes" value="1" hidden checked/>
                        <label for="dx_lljtxscjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="cgq_wgjc" id="cgq_wgjc_no" value="2" hidden/>
                        <label for="cgq_wgjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测电极是否正常">
                    <a class="radio" slot="after">
                        <input type="radio" name="cgq_djjc" id="cgq_djjc_yes" value="1" hidden checked/>
                        <label for="cgq_djjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="cgq_djjc" id="cgq_djjc_no" value="2" hidden/>
                        <label for="cgq_djjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测精度">
                    <a class="radio" slot="after">
                        <input type="radio" name="cgq_jdjc" id="cgq_jdjc_yes" value="1" hidden checked/>
                        <label for="cgq_jdjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="cgq_jdjc" id="cgq_jdjc_no" value="2" hidden/>
                        <label for="cgq_jdjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检查管径设定是否正确">
                    <a class="radio" slot="after">
                        <input type="radio" name="cgq_gjjc" id="cgq_gjjc_yes" value="1" hidden checked/>
                        <label for="cgq_gjjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="cgq_gjjc" id="cgq_gjjc_no" value="2" hidden/>
                        <label for="cgq_gjjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检查传送信号是否正常">
                    <a class="radio" slot="after">
                        <input type="radio" name="cgq_csxhjc" id="cgq_csxhjc_yes" value="1" hidden checked/>
                        <label for="cgq_csxhjc_no" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="cgq_csxhjc" id="cgq_csxhjc_no" value="2" hidden/>
                        <label for="cgq_csxhjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>

                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">
                    <field-input type="textarea" name="cgq_bz" placeholder="请填写情况说明及处理结果"></field-input>
                </field>

                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>流量仪变送器部分</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="检查外观是否完好">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_wgjc" id="bsq_wgjc_yes" value="1" hidden checked/>
                        <label for="bsq_wgjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="bsq_wgjc" id="bsq_wgjc_no" value="2" hidden/>
                        <label for="bsq_wgjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检查量程设定参数">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_lcsdjc" id="bsq_lcsdjc_yes" value="1" hidden checked/>
                        <label for="bsq_lcsdjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="bsq_lcsdjc" id="bsq_lcsdjc_no" value="2" hidden/>
                        <label for="bsq_lcsdjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测自检功能">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_zjgnjc" id="bsq_zjgnjc_yes" value="1" hidden checked/>
                        <label for="bsq_zjgnjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="bsq_zjgnjc" id="bsq_zjgnjc_no" value="2" hidden/>
                        <label for="bsq_zjgnjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测输出脉冲">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_scmcjc" id="bsq_scmcjc_yes" value="1" hidden checked/>
                        <label for="bsq_scmcjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="bsq_scmcjc" id="bsq_scmcjc_no" value="2" hidden/>
                        <label for="bsq_scmcjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测单项累计功能">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_dxljgnjc" id="bsq_dxljgnjc_yes" value="1" hidden checked/>
                        <label for="bsq_dxljgnjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_sbtxscjc" id="bsq_dxljgnjc_no" value="2" hidden/>
                        <label for="bsq_dxljgnjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测接收信号值是否正常">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_xhzjc" id="bsq_xhzjc_yes" value="1" hidden checked/>
                        <label for="bsq_xhzjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="bsq_xhzjc" id="bsq_xhzjc_no" value="2" hidden/>
                        <label for="bsq_xhzjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测显示部分是否正常">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_xsjc" id="bsq_xsjc_yes" value="1" hidden checked/>
                        <label for="bsq_xsjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="bsq_xsjc" id="bsq_xsjc_no" value="2" hidden/>
                        <label for="bsq_xsjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测瞬时流量值">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_ssllz" id="dx_lljtxscjc_yes" value="1" hidden checked/>
                    </a>
                </list-item>
                <list-item title="检测累计流量值">
                    <a class="radio" slot="after">
                        <input type="radio" name="bsq_ljllz" id="dx_lljtxscjc_yes" value="1" hidden checked/>

                    </a>
                </list-item>
                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">
                    <field-input type="textarea" name="bsq_bz" placeholder="请填写情况说明及处理结果"></field-input>
                </field>

            </tabs-desc>
            <tabs-desc slot="desc">
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
                                     <input id="imgupload" capture="camera" class="input-add-img" type="file" accept="image/*"/>
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
                            <field-input name="whry" placeholder="巡检人员"></field-input>
                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="巡检地点">
                            <span :class="mapAddressNow.type" style="width: 80%;padding-right: 0.625rem;">{{mapAddressNow.address}}</span>
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
                            <field-input type="date" name="rq" placeholder="选择巡检时间"></field-input>
                        </field>
                    </list-item>
                </list>
                <div class="bottom-button" style="text-align: center;margin-left: 0.88rem;margin-top: 1.625rem;">
                    <vue-button amSize="xs" sblue @buttonClick="formSubmit()">完成提交</vue-button>
                    <vue-button amSize="xs" orange>稍后巡检</vue-button>
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
            var _this = this;
            //非父子组件之间通过广播传递值
            VueEvent.$on('watuser', function (data) {
                _this.chooseName = data;
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
            formSubmit() {
                //必须上传图片
                if (this.imgArray.length === 0) this.$layer.msg("请上传现场图片！"); return;
                //获取所有checked的input
                var radioH = document.getElementsByTagName("input");
                console.log(radioH);
                var radioStr = "{";//初始化空数组，用来存放radio对象。
                radioStr += '"id":"' + '1' + '",'
                    + '"sbazd":"' + '测试' + '",'
                    + '"sbbh":"' + 'SH00001' + '",'
                    + '"sbmc":"' + '类型' + '",'
                    + '"whbysj":"' + '类型' + '",'
                    + '"bsq_ssllz":"' + '类型' + '",'
                    + '"bsq_ljllz":"' + '类型' + '",'
                    + '"cgq_bz": "' + document.getElementsByName("cgq_bz")[0].value + '",'
                    + '"bsq_bz":"' + document.getElementsByName("bsq_bz")[0].value + '",'
                    + '"whry":"' + document.getElementsByName("whry")[0].value + '",'
                    + '"rq":"' + document.getElementsByName("rq")[0].value + '",';
                for (var i = 0; i < radioH.length; i++) {
                    var obj = radioH[i];
                    if (obj.type === 'radio' && obj.checked === true) {
                        radioStr += '"' + obj.name + '":"' + obj.value + '",';
                    }
                }
                radioStr += "}";
                console.log(eval('(' + radioStr + ')'));
                let paramData = {
                    type: 'add',
                    user: localStorage.getItem("userName"),
                    patrol_address: this.mapAddressNow.address,
                    patrol_long: this.mapAddressNow.lng,
                    patrol_lat: this.mapAddressNow.lat,
                    patrol_title: '工单1',
                    patrol_content: '工单1',
                    patrol_x: '',
                    patrol_y: '',
                    bz: 'wtXjjl',
                    wt_lly_whby: eval('(' + radioStr + ')')
                };
                paramData = encodeURIComponent(JSON.stringify(paramData))
                // paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                this.formData.append('params', paramData);
                // this.formData.append('fileArray', this.imgArray);
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                Vue.prototype.$ajax = axios;

                this.$ajax({
                    method: 'post',
                    url: API.SAVE_XJJL,
                    processData: false,//用于对data参数进行序列化处理 这里必须false
                    contentType: false, //必须
                    data: this.formData
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            changeImg(e) {
                let deviceFile = e.target.files;
                this.imgArray.push(deviceFile[0]);
                this.formData.append("fileArray", deviceFile[0]);
                console.log(this.imgArray);

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
