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
                    <red-map ref="redmap" :points="mapPoints" v-on:mapAddress="mapAddress"></red-map>
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

                <list-item title="流量计通讯输出检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_lljtxscjc" id="db_lljtxscjc_yes" value="1" hidden checked/>
                        <label for="db_lljtxscjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_lljtxscjc" id="db_lljtxscjc_no" value="2" hidden/>
                        <label for="db_lljtxscjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="流量计数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_lljsjhd" id="db_lljsjhd_yes" value="1" hidden checked/>
                        <label for="db_lljsjhd_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_lljsjhd" id="db_lljsjhd_no" value="2" hidden/>
                        <label for="db_lljsjhd_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="通讯信号检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_txxhjc" id="db_txxhjc_yes" value="1" hidden checked/>
                        <label for="db_txxhjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_txxhjc" id="db_txxhjc_no" value="2" hidden/>
                        <label for="db_txxhjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测柜内电子元器件及表面清洁工作">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_dzyjjc" id="db_dzyjjc_yes" value="1" hidden checked/>
                        <label for="db_dzyjjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_dzyjjc" id="db_dzyjjc_no" value="2" hidden/>
                        <label for="db_dzyjjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="电源、避雷检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_dybljc" id="db_dybljc_yes" value="1" hidden checked/>
                        <label for="db_dybljc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_dybljc" id="db_dybljc_no" value="2" hidden/>
                        <label for="db_dybljc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="接地测试">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_jdcs" id="db_jdcs_yes" value="1" hidden checked/>
                        <label for="db_jdcs_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_jdcs" id="db_jdcs_no" value="2" hidden/>
                        <label for="db_jdcs_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="后台数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_htsjhd" id="db_htsjhd_yes" value="1" hidden checked/>
                        <label for="db_htsjhd_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_htsjhd" id="db_htsjhd_no" value="2" hidden/>
                        <label for="db_htsjhd_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="PLC程序备份">
                    <a class="radio" slot="after">
                        <input type="radio" name="db_plc" id="db_plc_yes" value="1" hidden checked/>
                        <label for="db_plc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="db_plc" id="db_plc_no" value="2" hidden/>
                        <label for="db_plc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">
                    <field-input type="textarea" placeholder="请填写情况说明及处理结果"></field-input>
                </field>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>地下取水（回灌井）</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <list-item title="流量计通讯输出检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_lljtxscjc" id="dx_lljtxscjc_yes" value="1" hidden checked/>
                        <label for="dx_lljtxscjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_lljtxscjc" id="dx_lljtxscjc_no" value="2" hidden/>
                        <label for="dx_lljtxscjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="流量计数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_lljsjhd" id="dx_lljsjhd_yes" value="1" hidden checked/>
                        <label for="dx_lljsjhd_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_lljsjhd" id="dx_lljsjhd_no" value="2" hidden/>
                        <label for="dx_lljsjhd_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="通讯信号检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_txxhjc" id="dx_txxhjc_yes" value="1" hidden checked/>
                        <label for="dx_txxhjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_txxhjc" id="dx_txxhjc_no" value="2" hidden/>
                        <label for="dx_txxhjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="检测柜内电子元器件及表面清洁工作">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_dzyjjc" id="dx_dzyjjc_yes" value="1" hidden checked/>
                        <label for="dx_dzyjjc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_dzyjjc" id="dx_dzyjjc_no" value="2" hidden/>
                        <label for="dx_dzyjjc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="电源、避雷检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_dybljc" id="dx_dybljc_yes" value="1" hidden checked/>
                        <label for="dx_dybljc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_dybljc" id="dx_dybljc_no" value="2" hidden/>
                        <label for="dx_dybljc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="接地测试">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_jdcs" id="dx_jdcs_yes" value="1" hidden checked/>
                        <label for="dx_jdcs_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_jdcs" id="dx_jdcs_no" value="2" hidden/>
                        <label for="dx_jdcs_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="后台数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_htsjhd" id="dx_htsjhd_yes" value="1" hidden checked/>
                        <label for="dx_htsjhd_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_htsjhd" id="dx_htsjhd_no" value="2" hidden/>
                        <label for="dx_htsjhd_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="PLC程序备份">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_plc" id="dx_plc_yes" value="1" hidden checked/>
                        <label for="dx_plc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_plc" id="dx_plc_no" value="2" hidden/>
                        <label for="dx_plc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="防水接线处理检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_fsjs" id="dx_fsjs_yes" value="1" hidden checked/>
                        <label for="dx_fsjs_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_fsjs" id="dx_fsjs_no" value="2" hidden/>
                        <label for="dx_fsjs_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <list-item title="锂电池更换">
                    <a class="radio" slot="after">
                        <input type="radio" name="dx_ldc" id="dx_ldc_yes" value="1" hidden checked/>
                        <label for="dx_ldc_yes" class="advice"></label>
                        <span class="radio-name">正常</span>
                        <input type="radio" name="dx_ldc" id="dx_ldc_no" value="2" hidden/>
                        <label for="dx_ldc_no" class="advice"></label>
                        <span class="radio-name">异常</span>
                    </a>
                </list-item>
                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">
                    <field-input type="textarea" placeholder="请填写情况说明及处理结果"></field-input>
                </field>
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
                            <li v-for="item in imgLists" :key="imgLists.index">
                                <div><img :src="item.url"></div>
                                <span class="upload-pre-del"><i class="icons-e616" @click="delImg(item)"></i></span>
                            </li>
                            <vue-button block @buttonClick="imgSubmit()">提交照片</vue-button>
                        </ul>
                        </p>
                    </div>
                </div>
                <list>
                    <list-item nested="input">
                        <field label="巡检人员">
                            <field-input placeholder="巡检人员"></field-input>
                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="巡检地点">
                            <span :class="mapAddressNow.type" style="width: 80%;padding-right: 0.625rem;">{{mapAddressNow.address}}</span>
                            <span hidden id="lng">{{mapAddressNow.lng}}</span>
                            <span hidden id="lat">{{mapAddressNow.lat}}</span>
                            <span style="width: 10%">
                                <img title="刷新" style="text-align: center;" @click="refreshMap()" width="16" height="16"
                                     src="../../../statics/images/refresh.png" />
                            </span>

                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="巡检时间">
                            <field-input type="date" placeholder="选择巡检时间"></field-input>
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
                offcanvas5: false,
                imgLists: [],
                imgUpload: false,
                imgIndex: 0,
                open2: false,
                open3: false,
                selectDel: -1,
                PATROL_CONTENT: '',
                BZ: '',
                mapAddressNow: {
                    address: '获取位置中...',
                    type: 'error'
                },
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
            mapAddress: function(mapAddress) {
                this.mapAddressNow = mapAddress;
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
                let ID = this.$route.params.id;
                console.log("提交表单信息");
                let paramData = {
                    type: 'resultPlan',
                    ID: ID,
                    PATROL_CONTENT: this.PATROL_CONTENT,
                    BZ: this.BZ
                }
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                this.$http.jsonp(API.ROUTE_PLAN + '&params=' + paramData).then(
                    response => {
                        console.log(response.data);
                    }, response => {
                        console.log("error:" + response.data);
                    });
            },
            imgSubmit() {
                console.log("提交照片信息");
            },
            refreshMap() {
                console.log("刷新");
                //重新获取位置
                this.$refs.redmap.initMap();
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

    .advice{
        height: 16px;
        width: 16px;
        display: inline-block;
        background-image: url('../../../statics/images/radio_no.png');
        background-repeat: no-repeat;
        background-position: center;
        vertical-align: middle;
        margin-top: 5px;
    }
    input[type="radio"]:checked + .advice{
        background-image: url('../../../statics/images/radio_yes.png');
    }

</style>
