<template>
    <vue-view slot="offcanvas">
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            取水工程核查
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <tabs v-model="selected" style="margin-top: 0">
            <tabs-item slot="tabs" blue hollow>工程信息</tabs-item>
            <tabs-item slot="tabs" blue hollow>情况核查</tabs-item>
            <tabs-item slot="tabs" blue hollow>监测信息</tabs-item>
            <tabs-item slot="tabs" blue hollow>现场图片</tabs-item>
            <tabs-desc slot="desc">
                <div class="plan-map" style="height: 170px;">
                    <red-map ref="redmap" :points="mapPoints" v-on:mapAddress="mapAddress"></red-map>
                </div>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>工程信息</span>
                    </div>
                </h5>
                <list-item nested="input">
                    <field label="项目名称">
                        <field-input type="text" placeholder="项目名称" id="xmmc"></field-input>
                    </field>
                </list-item>
                <list-item nested="input">
                    <!--<a class="content" slot="after">{{this.cdInfo.mp_nm | trimStr}}</a>-->
                    <field label="项目编号">
                        <field-input type="text" placeholder="项目编号" id="xmbh"></field-input>
                    </field>
                </list-item>
                <list-item nested="input">
                    <field label="投运时间">
                        <field-input type="date" name="tysj" placeholder="选择投运时间" id="tysj"></field-input>
                    </field>
                </list-item>
                <h6 class="wt-title">
                    <div class="wt-title-center">
                        <i class="wt-bar-i-16 red-c"></i>
                        <span>是否办理取水许可</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h6>
                <list-item nested="radio">
                    <field label="未许可" check>
                        <field-input name="sfxk" type="radio" val="1"></field-input>
                    </field>
                </list-item>
                <list-item nested="radio">
                    <field label="已许可" check>
                        <field-input name="sfxk" type="radio" val="2"></field-input>
                    </field>
                </list-item>
                <h6 class="wt-title">
                    <div class="wt-title-center">
                        <i class="wt-bar-i-16 red-c"></i>
                        <span>发证状态</span>
                        <span class="wt-bar-subtitle"></span>
                    </div>
                </h6>
                <list-item nested="radio">
                    <field label="未发证" check>
                        <field-input name="fzzt" type="radio" val="1"></field-input>
                    </field>
                </list-item>
                <list-item nested="radio">
                    <field label="已发证" check>
                        <field-input name="fzzt" type="radio" val="2"></field-input>
                    </field>
                </list-item>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>建议核查内容</span>
                    </div>
                </h5>
                <list-item nested="input">
                    <!--<a class="content" slot="after">{{this.cdInfo.mp_nm | trimStr}}</a>-->
                    <field label="">
                        <field-input type="text" placeholder="建议核查内容" id="jyhcnn"></field-input>
                    </field>
                </list-item>
                <h5 class="wt-title" style="padding:0.925rem 0">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>现场核查结果</span>
                    </div>
                </h5>
                <list-item nested="input">
                    <!--<a class="content" slot="after">{{this.cdInfo.mp_nm | trimStr}}</a>-->
                    <field label="">
                        <field-input type="text" placeholder="现场核查结果" id="xchcjg"></field-input>
                    </field>
                </list-item>

            </tabs-desc>
            <tabs-desc slot="desc">
                <div>
                    <list v-for="list in listInfo">
                        <h6 class="wt-title">
                            <div class="wt-title-center">
                                <i class="wt-bar-i-16 red-c"></i>
                                <span>{{list.title}}</span>
                                <span class="wt-bar-subtitle"></span>
                            </div>
                        </h6>
                        <list-item nested="radio">
                            <field label="情况一致" check>
                                <field-input :name="list.param" type="radio" val="1" ></field-input>
                            </field>
                        </list-item>
                        <list-item nested="radio">
                            <field label="情况不一致" check>
                                <field-input :name="list.param" type="radio" val="2"></field-input>
                            </field>
                        </list-item>
                        <list-item nested="radio">
                            <field label="情况无法判断" check>
                                <field-input :name="list.param" type="radio" val="3"></field-input>
                            </field>
                        </list-item>
                        <list-item nested="input">
                            <field label="备     注">
                                <field-input :id="list.param + '_bz'" placeholder="情况说明" ></field-input>
                            </field>
                        </list-item>
                    </list>
                </div>
            </tabs-desc>
            <tabs-desc slot="desc">
                <div id="jcdInfo">
                    <card :title="'取水监测点-' + num" :id="'jcd_card_' + num" v-for="num in jcdNum">
                        <!--<slot slot="header" name="header" >-->
                        <!--<icon name="close" @click.native="deleteCard('jcd_card_' + num)"></icon>-->
                        <!--</slot>-->
                        <list-item nested="input">
                            <field label="监测点名称">
                                <field-input type="text" :name="'jcd_name_' + num" :id="'jcd_name_' + num" placeholder="监测点名称"></field-input>
                            </field>
                        </list-item>
                        <list-item nested="input">
                            <field label="监测点编号">
                                <field-input type="text" :name="'jcd_num_' + num" :id="'jcd_num_' + num" placeholder="监测点编号"></field-input>
                            </field>
                        </list-item>
                        <list-item nested="input">
                            <field label="取水用途">
                                <field-input type="text" :name="'jcd_qsyt_' + num" :id="'jcd_qsyt_' + num" placeholder="取水用途"></field-input>
                            </field>
                        </list-item>
                    </card>
                </div>
                <div class="bottom-button" style="text-align: center;margin-left: 0.88rem;margin-top: 1.625rem;">
                    <vue-button amSize="xs" orange @buttonClick="deleteCard(1)">删除</vue-button>
                    <vue-button amSize="xs" sblue @buttonClick="addJcdInfo()">新增</vue-button>
                </div>
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
                                     <input id="imgupload" capture="camera" class="input-add-img" type="file"
                                            @change="changeImg($event)"
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
                        <field label="核查人员">
                            <field-input name="whry" placeholder="核查人员" id="hcry"></field-input>
                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="核查地点">
                            <span :class="mapAddressNow.type" style="width: 80%;padding-right: 0.625rem;" id="add">{{mapAddressNow.address}}</span>
                            <span hidden id="lng">{{mapAddressNow.lng}}</span>
                            <span hidden id="lat">{{mapAddressNow.lat}}</span>
                            <span style="width: 10%">
                                <img title="刷新" style="text-align: center;" @click="refreshMap()" width="16" height="16"
                                     src="../../../statics/images/refresh.png"/>
                            </span>

                        </field>
                    </list-item>
                    <list-item nested="input">
                        <field label="核查时间">
                            <field-input type="date" name="rq" placeholder="选择核查时间" id="hcsj"></field-input>
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
    import VueView from "vue-amazeui/src/components/vueview/vueview"
    import redMap from '../../components/redmap'
    import * as util from '../../libs/utils'
    import axios from 'axios'
    import VueEvent from '../../libs/VueEvent.js'
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
                wiuTp: true,
                PATROL_CONTENT: '',
                BZ: '',
                listInfo: [
                    {title: '项目实际建设规模是否与填报信息一致', param: 'sjjs'},
                    {title: '取水工程（设施）数量与类型是否与填报信息一致', param: 'gcsl'},
                    {title: '取水口地点及坐标是否与填报信息一致', param: 'ddzb'},
                    {title: '取水用途是否与填报信息一致', param: 'qsyt'},
                    {title: '实际取水量是否与填报信息一致', param: 'sjqsl'},
                    {title: '取水工程（设施）共用情况是否与填报信息一致', param: 'gyqk'},
                    {title: '填报单位上传的视频、图片材料是否符合要求', param: 'sptp'},
                    {title: '（虹吸管、泵站、水井等取水工程（设施））取水计量设施是否已安装使用', param: 'jlss'},
                    {title: '（闸、渠道、坝、人工河道、水电站等取水工程（设施））断面流量监测设施是否安装使用', param: 'dmll'},
                    {title: '（拦河闸坝等蓄水工程）最小下泄流量管控措施是否到位', param: 'xxll'},
                    {title: '（拦河闸坝等蓄水工程）是否对水生态环境造成损害', param: 'sthj'},
                    {title: '（拦河闸坝等蓄水工程）是否按批复方案进行蓄水调度运行', param: 'xsdd'},
                    {title: '计划用水管理是否落实', param: 'jhys'},
                    {title: '水资源费（税）征收是否落实', param: 'szyf'},
                    {title: '延续取水管理是否规范', param: 'yxqs'}
                ],
                formData: new FormData(),
                mapAddressNow: {
                    address: '获取位置中...',
                    type: 'error',
                    lng: '',
                    lat: ''
                },
                mapPoints: [],
                jcdNum: 1
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
            refreshName(data) {
                console.log(data);
                this.chooseName = data;
            },
            mapAddress: function (mapAddress) {
                this.mapAddressNow = mapAddress;
                console.log(mapAddress);
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
            changeImg(e) {
                let deviceFile = e.target.files;
                this.imgArray.push(deviceFile[0]);
                this.formData.append("fileArray", deviceFile[0]);
                console.log(111);
                console.log(this.imgArray);

            },
            refreshMap() {
                console.log("刷新");
                //重新获取位置
                this.$refs.redmap.initMap();
            },
            lateSumit: function () {
                // 这里记录 收单人
                let username = util.getJStore("userInfo")["user_info"];
                console.log(username);
                this.$router.go(-1);
            },
            addJcdInfo() {
                this.jcdNum = this.jcdNum + 1;
            },
            deleteCard(id) {
                this.jcdNum = this.jcdNum - 1;
                console.log(id);
            },
            formSubmit() {
                //必须上传图片
                var _this=this;
                if (this.imgLists.length === 0) {
                    this.$layer.msg("请上传现场图片！");
                    return;
                }
                let timestamp = (new Date().getTime()).toString();
                let id = "QSGCXCHC0536" + timestamp.substring(timestamp.length - 6, timestamp.length);
                let jcdNum=this.jcdNum;
                let arr=[];
                for(let i=1;i<=this.jcdNum;i++){
                    arr.push({
                        jcdmc:$("#jcd_name_"+i).val(),			//监测点名称
                        jcddm:$("#jcd_num_"+i).val(),			//监测点代码
                        jcdqsyt:$("#jcd_qsyt_"+i).val(),			//监测点取水用途
                        pid:id,			//对应主表id
                        createtime:nowtime()

                })
                }
                console.log(arr);
                let paramData = {
                    type: 'add',
                    wt_qsgc_xchc: {
                        id:id,
                        xchcrq: $("#hcsj").val(),		      //现场核查日期
                        xmbh: $("#xmbh").val(),				  //项目编号
                        xmmc: $("#xmmc").val(),			      //项目名称
                        jyhcnn: $("#jyhcnn").val(),		  //建议核查内容
                        xchcjg: $("#xchcjg").val(),		  //现场核查结果
                        tysj: $("#tysj").val(),				  //项目投运时间
                        isblxkz: typeof($("input[name='sfxk']:checked").attr("val"))=="undefined"?"":$("input[name='sfxk']:checked").attr("val"), //是否办理许可证 1 未许可 2已许可
                        spjb: "",	                                             //审批级别 1县审批 2市审批 3省审批 4长江委审批
                        isfz: typeof($("input[name='fzzt']:checked").attr("val"))=="undefined"?"":$("input[name='fzzt']:checked").attr("val"),	//是否发证 1未发证 2已发证
                        zh: "",			                                       //字号
                        nh: "",			                                       //年号
                        sxh: "",	                                           //顺序号
                        isgmyz: typeof($("input[name='sjjs']:checked").attr("val"))=="undefined"?"":$("input[name='sjjs']:checked").attr("val"),    //规模是否一致 1是 2否 3无法判断
                        issllx: typeof($("input[name='gcsl']:checked").attr("val"))=="undefined"?"":$("input[name='gcsl']:checked").attr("val"),	  //数量与类型是否一致 1是 2否 3无法判断
                        isddzb: typeof($("input[name='ddzb']:checked").attr("val"))=="undefined"?"":$("input[name='ddzb']:checked").attr("val"),    //地点与坐标是否一致 1是 2否 3无法判断
                        isqsyt: typeof($("input[name='qsyt']:checked").attr("val"))=="undefined"?"":$("input[name='qsyt']:checked").attr("val"),	  //取水用途是否一致 1是 2否 3无法判断
                        issjqsl: typeof($("input[name='sjqsl']:checked").attr("val"))=="undefined"?"":$("input[name='sjqsl']:checked").attr("val"),	 //实际取水量是否一致 1是 2否 3无法判断
                        isgyqk: typeof($("input[name='gyqk']:checked").attr("val"))=="undefined"?"":$("input[name='gyqk']:checked").attr("val"),		//共用情况是否一致 1是 2否 3无法判断
                        iscl: typeof($("input[name='sptp']:checked").attr("val"))=="undefined"?"":$("input[name='sptp']:checked").attr("val"),		//材料是否一致 1是 2否 3无法判断
                        isjlss: typeof($("input[name='jlss']:checked").attr("val"))=="undefined"?"":$("input[name='jlss']:checked").attr("val"),		//计量设施是否安装 1是 2否 3无法判断
                        isdmlljcss: typeof($("input[name='dmll']:checked").attr("val"))=="undefined"?"":$("input[name='dmll']:checked").attr("val"),	//断面流量监测设施是否安装 1是 2否 3无法判断
                        iszxxxllgkss: typeof($("input[name='xxll']:checked").attr("val"))=="undefined"?"":$("input[name='xxll']:checked").attr("val"),//最小下泄流量管控设施  1是 2否 3无法判断
                        issst: typeof($("input[name='sthj']:checked").attr("val"))=="undefined"?"":$("input[name='sthj']:checked").attr("val"),		//是否对水生态环境造成损害 1是 2否 3无法判断
                        ispffa: typeof($("input[name='xsdd']:checked").attr("val"))=="undefined"?"":$("input[name='xsdd']:checked").attr("val"),		//是否按批复方案进行蓄水 1是 2否 3无法判断
                        isjhys: typeof($("input[name='jhys']:checked").attr("val"))=="undefined"?"":$("input[name='jhys']:checked").attr("val"),		//计划用水是否落实  1是 2否 3无法判断
                        isszyf: typeof($("input[name='szyf']:checked").attr("val"))=="undefined"?"":$("input[name='szyf']:checked").attr("val"),		//水资源费征收是否落实 1是 2否 3无法判断
                        isyxqsgl: typeof($("input[name='yxqs']:checked").attr("val"))=="undefined"?"":$("input[name='yxqs']:checked").attr("val"),	//延续取水管理是否规范 1是 2否 3无法判断
                        isgmyzbz: $("#sjjs_bz").val(),			                    //规模是否一致 备注
                        issllxbz: $("#gcsl_bz").val(),		                        //数量与类型是否一致备注
                        isddzbbz: $("#ddzb_bz").val(),			                    //地点与坐标是否一致备注
                        isqsytbz: $("#qsyt_bz").val(),			                    //取水用途是否一致 备注
                        issjqslbz: $("#sjqsl_bz").val(),			               //实际取水量是否一致备注
                        isgyqkbz: $("#gyqk_bz").val(),		                       //共用情况是否一致备注
                        isclbz: $("#sptp_bz").val(),		                        //材料是否一致备注
                        isjlssbz: $("#jlss_bz").val(),		                         //计量设施是否安装备注
                        isdmlljcssbz: $("#dmll_bz").val(),				            //断面流量监测设施是否安装 备注
                        iszxxxllgkssbz: $("#xxll_bz").val(),		                 //最小下泄流量管控设施备注
                        issstbz: $("#sthj_bz").val(),			                      //是否对水生态环境造成损害备注
                        ispffabz: $("#xsdd_bz").val(),				                  //是否按批复方案进行蓄水 备注
                        isjhysbz: $("#jhys_bz").val(),					              //计划用水是否落实备注
                        isszyfbz: $("#szyf_bz").val(),					              //水资源费征收是否落实备注
                        isyxqsglbz: $("#yxqs_bz").val(),			                  //延续取水管理是否规范备注
                        isxgwh: "",		                                               //是否在系统中完成信息修改与完善 1是 2否
                        isxgwhbcsm: "",			                                   //是否在系统中完成信息修改与完善 补冲说明
                        hczzqm: $("#hcry").val(),			                           //核查组长签名
                        lxdh: "",			                                            //联系电话
                        createtime: nowtime(),			                                //创建时间
                        createuser: localStorage.getItem("user"),			           //创建人
                        hcdd:$("#add").text(),
                        lng:$("#lng").text(),
                        lat:$("#lat").text()

            },
                    wt_qsgc_xchc_jcd:arr,
                    user:localStorage.getItem("user")
                }
                paramData = encodeURIComponent(JSON.stringify(paramData));
                this.formData.append('params', paramData);
                //console.log(this.imgArray);
                this.formData.append('fileArray', this.imgArray);
                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                Vue.prototype.$ajax = axios;
                this.$ajax({
                    method: 'post',
                    url: API.QSGC_XCHC,
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
    //获取日期
    function nowtime() {//将当前时间转换成yyyymmdd格式
        var mydate = new Date();
        var str = "" + mydate.getFullYear();
        var mm = mydate.getMonth() + 1;
        if (mm > 9) {
            str = str + "-" + mm;
        } else {
            str = str + "-0" + mm;
        }
        if (mydate.getDate() > 9) {
            str = str + "-" + mydate.getDate();
        } else {
            str += "-0" + mydate.getDate();
        }
        var houers=mydate.getHours();
        var minutes=mydate.getMinutes()>9?mydate.getMinutes() :"0"+mydate.getMinutes();
        var seconds=mydate.getSeconds();
        return str+" "+houers+":"+minutes+":"+seconds;
    }
</script>

<style>
    .list {
        margin: 0.4rem 0 !important;
    }

    .wt-title {
        padding: 0.625rem 0.1rem !important;
    }

    p {
        display: inline-block;
    }

    .error {
        color: red !important;
    }

    .success {
        color: #5d85ff !important;
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

    .tab-panel {
        padding-top: 0.2rem !important;
    }

    .card {
        margin: 8px 0 0 0 !important;
    }

    .card-body {
        padding: 0 !important;
    }
</style>
