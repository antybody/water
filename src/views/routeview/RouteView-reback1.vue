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
                <div class="plan-map"  style="height: 170px;">
                    <red-map :points="mapPoints"></red-map>
                </div>
                <h5 class="wt-title"  style="padding:0.925rem 0">
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
                        <input type="radio" name="lljtxsc" />正常
                        <input type="radio" name="lljtxsc" />异常
                    </a>
                </list-item>
                <list-item title="流量计数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="lljsjhd" />正常
                        <input type="radio" name="lljsjhd" />异常
                    </a>
                </list-item>
                <list-item title="通讯信号检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="检测柜内电子元器件及表面清洁工作">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="电源、避雷检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="接地测试">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="后台数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="PLC程序备份">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
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
                <list-item title="水表通讯输出检测">
                    <a class="radio" slot="after">
                        <input type="radio" name="lljtxsc" />正常
                        <input type="radio" name="lljtxsc" />异常
                    </a>
                </list-item>
                <list-item title="流量计数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="lljsjhd" />正常
                        <input type="radio" name="lljsjhd" />异常
                    </a>
                </list-item>
                <list-item title="通讯信号检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="检测柜内电子元器件及表面清洁工作">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="电源、避雷检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="接地测试">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="后台数据核对">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="PLC程序备份">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="防水接线处理检查">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <list-item title="锂电池更换">
                    <a class="radio" slot="after">
                        <input type="radio" name="txxhjc" />正常
                        <input type="radio" name="txxhjc" />异常
                    </a>
                </list-item>
                <field label="备注" style="padding: 0.625rem 0 0 0.9375rem">
                    <field-input type="textarea" placeholder="请填写情况说明及处理结果"></field-input>
                </field>
                <list>
                    <list-item nested="input">
                        <field label="巡检人员">
                            <field-input placeholder="巡检人员"></field-input>
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
            </tabs-desc>
            <tabs-desc slot="desc">
                养护记录
            </tabs-desc>
        </tabs>
        <!--&lt;!&ndash; 从下向上 弹出框组件&ndash;&gt;-->
        <!--<offcanvas style="height:4.375rem" sildewh="82%" silde="top" :open="offcanvas5" @Close="close('offcanvas5')">-->
            <!--<div style="padding:0.3125rem;">-->
                <!--<vue-button block>拍照</vue-button>-->
                <!--<vue-button block>从手机相册选择</vue-button>-->
            <!--</div>-->
        <!--</offcanvas>-->
        <!--&lt;!&ndash;提醒不能超过&ndash;&gt;-->
        <!--<modal role="alert" title="提醒" :isOpen="open3" @Close="modalOutFun('open3')">不能超过6张图</modal>-->
        <!--&lt;!&ndash; 确定删除该图片 &ndash;&gt;-->
        <!--<modal role="confirm" title="提醒" :isOpen="open2" @Confirm="del()" @Close="modalOutFun('open2')">确定删除？</modal>-->
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
                ]
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
            }
        }
    }
</script>

<style>
    .upload-pre-del {
        position: relative;
        color: #000;
        /* border:1PX solid #bfbfbf; */
        font-size: 0.75rem;
        width: 76px;
        display: block;
        text-align: center;
    }

    .wt-lits-subtilte {
        color: #e54c00;
        font-size: 0.75rem;
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

    .wt-header {
        height: 12.3125rem;
        color: #3b3b3b;
    }

    .wt-bar-subtitle {
        font-size: 0.75rem;
        color: #8b8b8b;
    }

    .wt-linear-blue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #66c4ff, #5d85ff);
        background-image: linear-gradient(90deg, #66c4ff, #5d85ff);
    }

    .wt-text {
        font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
    }

    .wt-h-15 {
        display: block;
        height: 2.875rem;
        line-height: 2.875rem;
        font-size: 1rem;
        text-align: left;
        padding-left: 1.25rem;
    }

    .wt-bar-i-46 {
        display: block;
        height: 3rem;
        width: 3rem;
        margin: 0 auto;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .wt-bar-i-16 {
        display: block;
        height: 1.3125rem;
        width: 1rem;
        margin: 0 auto;
        float: left;
        padding: 0 0.625rem;
        line-height: 1.3125rem;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .wt-bar-1 {
        background: url('../../../statics/images/1.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-2 {
        background: url('../../../statics/images/2.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-7 {
        background: url('../../../statics/images/7.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-3 {
        background: url('../../../statics/images/3.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-4 {
        background: url('../../../statics/images/4.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-5 {
        background: url('../../../statics/images/5.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-6 {
        background: url('../../../statics/images/6.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-8 {
        background: url('../../../statics/images/8.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .icon-title {
        font-size: .875rem;
        line-height: .3466666667rem;
    }

    .wt-text a {
        /* color:#ffffff; */
    }

    .wt-title {
        color: #3d3d3d;
        padding: 0.125rem 0 0.625rem;
        font-weight: 500;
        margin: 0;
    }

    .wt-title .red-c {
        background: url('../../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .red-news {
        background: url('../../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .wt-title-center {
        display: block;
        line-height: 1.125rem;
    }

    .wt-tab-lists {
        white-space: nowrap;
        overflow-x: auto;
    }

    .wt-tab-lists a {
        position: relative;
        display: inline-block;
        width: 10.3125rem;
        line-height: 4.375rem;
        height: 4.375rem;
        margin: 0.125rem 0.5rem;
        padding: 0 0.625rem;
        box-shadow: 0 0 0.2375rem rgba(117, 117, 117, 0.8);
    }

    .wt-linear-red {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #ff935c, #ff6e69);
        background-image: linear-gradient(270deg, #ff935c, #ff6e69);
    }

    .wt-linear-dblue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #4fa1f5, #3d61f5);
        background-image: linear-gradient(90deg, #4fa1f5, #3d61f5);
    }

    .wt-linear-blue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #5ccfff, #69baff);
        background-image: linear-gradient(270deg, #5ccfff, #69baff);
    }

    .wt-linear-purple {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #8cb4ff, #699eff);
        background-image: linear-gradient(270deg, #8cb4ff, #699eff);
    }

    .wt-linear-lgreen {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #56f1dd, #21e1ce);
        background-image: linear-gradient(90deg, #56f1dd, #21e1ce);
    }

    .wt-linear-yellow {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #fbb24f, #f9a32d);
        background-image: linear-gradient(270deg, #fbb24f, #f9a32d);
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
    .btn-hollow.btn-primary.active, .btn-hollow.btn-primary:active {
        background-color: #65bfff !important;
    }
    .btn-hollow.btn-primary{
        border: 0px !important;
    }
    .item {
        padding-right: 0 !important;
    }
    .radio {
        font-size: 0.88rem !important;
        font-weight: 200 !important;
    }
    input {
        height: 0.7rem !important;
        margin-right: 0.2rem !important;
    }
    .bottom-button button {
        padding: 0.6rem 2.625rem 0.6rem 2.625rem !important;
        font-size: 0.9rem !important;
        border-radius: 0.2rem;
    }

</style>
