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
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>异常信息</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h5>
                <textarea name="errormsg" readonly="readonly" v-model="xjList.errormsg"></textarea>
                
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
                            <field-input name="xjperson" placeholder="巡检人员"></field-input>
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
                        <div v-if="timeline.length == 0"> 暂未开始</div>
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
    import * as util from '../../libs/utils'
    import 'jquery' 

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
                qsh:{name:'宝信软件',station:'宝信监测点',xkz:'国长 字[2015]第01001号',
                    ssll:'120',ljll:'2300'},
                station:{bh:'宝信测站',cs:'宝信厂商',xh:'A0001',lx:'流量计',addtime:'2010-01-01'},
                PATROL_CONTENT: '',
                BZ: '',
                mapPoints: [
                    {lng: 121.372882, lat: 31.176523, name: '上海宝信'}
                ],
                xjList:{errormsg:'111111'},
                timeline:[]
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
                console.log(ID);
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
            rClick:function(v){
                for(var i = 0 ; i < $("input[name='lljtxsc']").length; i++){
                    $($("input[name='lljtxsc']")[i]).prop("checked",false);
                    console.log($("input[name='lljtxsc']")[i]);
                    if($($("input[name='lljtxsc']")[i]).val() == v){
                        $($("input[name='lljtxsc']")[i]).prop("checked","checked");
                    }
                }       
            },
            lateSumit:function(){
                // 这里记录 收单人
                let username = util.getJStore("userInfo")["user_info"];
                console.log(username);
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    .clear{
        clear:both
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
