<!--新的界面样式-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            上海水资源
            <icon name="more-vertical" slot="left"></icon>
            <!-- <icon name="person" slot="right" href="/home"></icon> -->
        </navbar>
        <!--圆形-->
        <group noPadded class="group-clear">
            <div class="wt-header">
                <!-- <div class="wt-text text-center">
                    <span class="wt-h-15">上海水资源</span>
                </div> -->
                <grid avg="4" align="center">
                    <cell :class="text-center" v-for="item in clists" :key="item.id">
                        <div class="wt-text">
                            <router-link :to="item.href">
                                <i :class="item.img"></i>
                                <span class="icon-title">{{item.title}}</span>
                            </router-link>
                        </div>
                    </cell>
                </grid>
            </div>
        </group>
        <!--可拖动的方框-->
        <group noPadded class="group-clear group-top-10">
            <div style="padding:0.625rem 0">
                <h5 class="wt-title">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>红线指标</span></div>
                </h5>
                <div class="wt-tab-lists">
                    <router-link :to="item.href" v-for="item in tablists1" :key="item.id" :class="item.cl">

                        <span>{{item.text}}</span><br/>
                        <span>{{item.num}}</span>
                    </router-link>
                    <br>
                    <router-link :to="item.href" v-for="item in tablists2" :key="item.id" :class="item.cl">

                        <span>{{item.text}}</span><br/>
                        <span>{{item.num}}</span>
                    </router-link>
                </div>
            </div>
        </group>
        <!--取水详情-->
        <group noPadded class="group-clear group-top-10">
            <div style="padding:0.625rem 0">
                <h5 class="wt-title">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>取水详情</span>
                        <span class="wt-bar-subtitle">每日更新</span>
                    </div>
                </h5>
                <div class="wt-tab-lists">
                    <grid avg="3" align="center" class="grid-title">
                        <cell class="cell-box wt-font-600">
                            <span>取水类型</span>
                        </cell>
                        <cell class="cell-box wt-font-600">
                            <span>昨日水量</span>
                        </cell>
                        <cell class="cell-box wt-font-600">
                            <span>本年累计</span>
                        </cell>
                    </grid>
                    <grid avg="3" v-for="water in waters" align="center" :key="water.index">
                        <cell style="text-align: left;padding-left: 1.5rem;" class="cell-box">{{water.typen}}</cell>
                        <cell style="text-align: right;" class="cell-box wt-dblue">{{parseFloat(water.todayn)}} 万m³
                        </cell>
                        <cell style="text-align: right;" class="cell-box wt-orange">{{water.yearn/10000 | numFilter}}
                            亿m³
                        </cell>
                    </grid>
                </div>
            </div>
        </group>
    </vue-view>
</template>

<script>
    import * as util from './../libs/utils'
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import * as API from '../store/api/api'
    import Utils from './../libs/util'

    export default {
        data() {
            return {
                clists: [
                    {href: '/qsh', img: 'wt-bar-i-46 wt-bar-1', title: '取水户'},
                    {href: '/qsxkz', img: 'wt-bar-i-46 wt-bar-2', title: '许可证'},
                    {href: '/redsyd', img: 'wt-bar-i-46 wt-bar-7', title: '水源地'},
                    {href: '/dysh', img: 'wt-bar-i-46 wt-bar-3', title: '大用水户'},
                    // {href: '/redsyd', img: 'wt-bar-i-46 wt-bar-5', title: '水源地'},
                    {href: '/redsgnq', img: 'wt-bar-i-46 wt-bar-4', title: '水功能区'},
                    {href: '/redxc', img: 'wt-bar-i-46 wt-bar-5', title: '咸潮'},
                    {href: '/redsgnqjc', img: 'wt-bar-i-46 wt-bar-6', title: '水质监测'},
                    {href: '/gq', img: 'wt-bar-i-46 wt-bar-8', title: '样点灌区'}


                ],
                waters: [
                    // {type: '地表水取水', today: '0.1', year: '60.34'},
                    // {type: '地下水取水', today: '0.1', year: '60.34'},
                    // {type: '大用水户', today: '0.1', year: '60.34'},
                    // {type: '农业用水', today: '0.1', year: '60.34'}
                ],
                tablists1: [
                    // {href: 'redwater', cl: 'wt-linear-purple', num: '60.34', text: '年度取水总量'},
                    // {href: '/cxksl', cl: 'wt-linear-blue', num: '3', text: '超许可取水'},
                    // {href: '/xkz', cl: 'wt-linear-red', num: '30', text: '取水许可超期'},
                    // {href: '/sgnq', cl: 'wt-linear-yellow', num: '30%', text: '水功能区达标率'}
                ],
                tablists2: [
                    // {href: 'redwater', cl: 'wt-linear-purple', num: '60.34', text: '年度取水总量'},
                    // {href: '/cxksl', cl: 'wt-linear-blue', num: '3', text: '超许可取水'},
                    // {href: '/xkz', cl: 'wt-linear-red', num: '30', text: '取水许可超期'},
                    // {href: '/sgnq', cl: 'wt-linear-yellow', num: '30%', text: '水功能区达标率'}
                ],
                rivers: [
                    {name: '黄浦江', type: '1', typeName: '优'},
                    {name: '黄浦江', type: '0', typeName: '良'},
                    {name: '黄浦江', type: '2', typeName: '差'},
                    {name: '黄浦江', type: '1', typeName: '优'},
                    {name: '黄浦江', type: '1', typeName: '优'},
                    {name: '黄浦江', type: '1', typeName: '优'}
                ]
            }
        },
        computed: {
            // ...mapState({
            //     tablists:state => state.red.tablists,
            //     newlists:state => state.red.newlists
            // })
        },
        mounted() {
            if(localStorage.getItem("_isUse") === 'false'&&this.getQueryString('msgSignature')==null){
                //this.$layer.msg(1);
                this.$router.push({name: 'home'});
                this.$layer.msg("请登录！");
            }
            else if(this.getQueryString('msgSignature')!=null){
                //this.$layer.msg(2);
                let paramData = {
                    //'account': this.getQueryString('account'),
                    'msgSignature': this.getQueryString('msgSignature'),
                    'timeStamp': this.getQueryString('timeStamp'),
                    'nonce': this.getQueryString('nonce'),
                    'encrypt': this.getQueryString('encrypt')
                }
                // let paramData = {
                //     'account': '',
                //     'msgSignature': 'ef2ec5cecd12f8225ade228d6483dd8c1b57c480',
                //     'timeStamp': '1538026804',
                //     'nonce': 'cOlPTjIN',
                //     'encrypt': 'PXQWtE3DOjAqbFbP1jn5wAkxalGMLjd9JCiC27vBmsIYo3p6eAFvlIrMqBiRrb1BIWpjg+ZX1mTYJy48wJwS2/5GVffTb8c2GC/aSsv/dN8='
                // }
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                console.log(paramData);
                this.$http.jsonp(API.LOGIN_N + "&params=" + paramData).then(
                    response => {
                        if(response.data.message=='SUCCESS'){
                            console.log(response.data.data);
                            this.userInfo = {
                                user_id: response.data.data.name,
                                name:response.data.data.display_name,
                                phone:response.data.data.mobile_phone,
                                tel:response.data.data.user_tel,
                                mail:response.data.data.email,
                                roleCode:response.data.data.org_code,
                                roleName:response.data.data.org_code
                            }
                            // 记录信息
                            util.setStore('userInfo', this.userInfo);
                            util.setStore('userRole', response.data.data.user_code); // 用户角色
                            util.setStore('_isUse', 'true'); // 登录状态
                            util.setStore('user', response.data.data.name); // 登录状态
                            util.setStore('userName', response.data.data.display_name); // 登录状态
                            var nextUrl = this.$route.params.next;
                            //alert(nextUrl);
                            //alert(response.data.data.user_code);
                            //alert(response.data.data.name);
                            if (!nextUrl){
                                //this.$router.go(-1);
                                if(response.data.data.user_code=='xjy'){
                                    this.$router.push({name: 'route'});
                                    Utils.$emit('demo','type1');
                                }else if(response.data.data.name=='fuxs'||response.data.data.name=='fqs'||response.data.data.name=='hfl'){
                                    //this.$router.push({name: 'route'});
                                    Utils.$emit('demo','type2');
                                }else if(response.data.data.name=='whb'){
                                    //this.$router.push({name: 'redv1'});
                                    Utils.$emit('demo','type4');
                                }else{
                                    //this.$router.push({name: 'redv1'});
                                    Utils.$emit('demo','type3');
                                }
                                $('.tabbar-item').removeClass('active');
                            }
                            else{
                                this.$router.push({path: nextUrl});
                            }
                        }else{
                            this.open2 = true;
                            this.alertText = '账号或密码错误'
                            this.$router.push({name: 'home'});
                        }
                    }, response => {
                        console.log("error");
                        this.$router.push({name: 'home'});
                    });
            }
            else {
                //this.$layer.msg(window.location.href);
                // if(localStorage.getItem("userRole")=='xjy'){
                //     this.$router.push({name: 'route'});
                //     Utils.$emit('demo','type1');
                // }else if(localStorage.getItem("user")=='fuxs'||localStorage.getItem("user")=='fqs'||localStorage.getItem("user")=='hfl'){
                //     this.$router.push({name: 'route'});
                //     Utils.$emit('demo','type2');
                // }else if(localStorage.getItem("user")=='whb'){
                //     this.$router.push({name: 'redv1'});
                //     Utils.$emit('demo','type4');
                // }else{
                //     this.$router.push({name: 'redv1'});
                //     Utils.$emit('demo','type3');
                // }
                // $('.tabbar-item').removeClass('active');
                //
                // console.log(this.$route);
            }

            // this.$http.jsonp(API.NEWS_LIST).then(
            //     response => {
            //         //循环设置跳转地址 href
            //         for (let value of response.data.data) {
            //             value.href = "/newDetail/" + value.id;
            //             // console.log(value);
            //         }
            //         this.newlists = response.data.data;
            //     }, response => {
            //         console.log("error");
            //     });
            //年度取水总量、超许可取水、取水许可超期、水功能区达标率
            //this.$layer.msg('数据加载中...')
            let params1 = {
                //xzqh: ''
            };
            params1 = encodeURI(encodeURI(JSON.stringify(params1)));
            this.$http.jsonp(API.QSXKCQDBL + "&params=" + params1).then(
                response => {
                    this.tablists1 = response.data.list1;
                    this.tablists2 = response.data.list2;
                }, response => {
                    console.log("error")
                });
            //取水户列表查询所需要的参数
            let params = {
                //xzqh: ''
            };
            params = encodeURI(encodeURI(JSON.stringify(params)));
            this.$http.jsonp(API.QS_XQ + "&params=" + params).then(
                response => {
                    console.log(response.data.yearSl);
                    this.waters = response.data.yearSl;
                    this.$layer.closeAll()
                }, response => {
                    console.log("error");
                });
        },
        created() {

        },
        methods: {
            ...mapActions([
                'getTabLists', 'getNewLists'
            ]),
            getQueryString:function (key)
            {
                var after = window.location.search;
                //alert(after);
                if(after.indexOf('?') === -1){
                    //key存在先通过search取值如果取不到就通过hash来取
                    after =  window.location.hash.split("?")[1];
                } //return null; //如果url中没有传参直接返回空
                if(after)
                {
                    var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
                    var r = after.match(reg);
                    if(r != null)
                    {
                        return  decodeURIComponent(r[2]);
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        },
        filters: {
            numFilter(value) {
                // 截取当前数据到小数点后两位
                let realVal = Number(value).toFixed(2)
                if (Number(realVal) === 0) {
                    return '0.01'
                } else {
                    return Number(realVal)
                }
                // num.toFixed(2)获取的是字符串
            }
        }
    }
</script>

<style>
    .list-label {
        border-radius: 1px;
    }

    .wt-header {
        height: 12.3125rem;
        color: #3b3b3b;
    }

    .wt-bar-subtitle {
        font-size: 0.75rem;
        color: #8b8b8b;
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

    .riverlist {
        background: url('../../statics/images/icon_28.png');
        background-size: 100%;
        height: 50px;
        width: 100%;
        line-height: 35px;
        padding: 10px;
        text-align: left;
    }

    .riverlist span {
        vertical-align: text-bottom;
        padding-left: 10px;
    }

    .vgood {
        display: inline-block;
        margin: 0 auto;
        height: 32px;
        width: 32px;
        background: url('../../statics/images/27.png');
        background-size: 100%;
    }

    .good {
        display: inline-block;
        margin: 0 auto;
        height: 32px;
        width: 32px;
        background: url('../../statics/images/27-11.png');
        background-size: 100%;
    }

    .bad {
        display: inline-block;
        margin: 0 auto;
        height: 32px;
        width: 32px;
        background: url('../../statics/images/27-12.png');
        background-size: 100%;
    }

    .wt-bar-1 {
        background: url('../../statics/images/icon_03.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-2 {
        background: url('../../statics/images/icon_05.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-7 {
        background: url('../../statics/images/icon_07.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-3 {
        background: url('../../statics/images/icon_09.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-4 {
        background: url('../../statics/images/icon_16.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-5 {
        background: url('../../statics/images/icon_18.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-6 {
        background: url('../../statics/images/icon_19.png') no-repeat;
        background-position: 10px 10px;
        background-size: 70%;
    }

    .wt-bar-8 {
        background: url('../../statics/images/8.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .icon-title {
        font-size: .875rem;
        line-height: .3466666667rem;
        color: #3d3d3d;
    }

    .wt-text a {
        /* color:#ffffff; */
    }

    .red-news {
        background: url('../../statics/images/article.png') no-repeat;
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
        text-align: center;
        position: relative;
        display: inline-block;
        width: 10.3125rem;
        line-height: 2.19rem;
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
        background: #c1b7bc0d;
        border-top: 1px solid #e3e3e3;
        border-top: 1px solid #e8e7e7;
    }

    .grid-top-border {
        border-top: 1px solid #e3e3e3;
    }
</style>
