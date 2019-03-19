<template>
    <container fill direction="column">
        <tabbar slot="tabbar" class="am-view-push">
            <!--<tabbar-item v-show="isShowB1"   active icon="home" title="首页" @tabbarItemClick="tabbarItemClick('redv1')"></tabbar-item>-->
            <!--&lt;!&ndash; <tabbar-item icon="bars" title="三条红线" href="/redv1"></tabbar-item> &ndash;&gt;-->
            <!--<tabbar-item v-show="isShowB2" icon="more" title="管理考核" @tabbarItemClick="tabbarItemClick('check')"></tabbar-item>-->
            <!--
              运维巡检部分需要指定 业务人员和巡检人员
            -->
            <tabbar-item v-show="isShowB3" icon="gear" title="巡检运维" @tabbarItemClick="tabbarItemClick('route')"></tabbar-item>
            <!--登陆部分集成了织语的框架-->
            <!--&lt;!&ndash;登陆部分集成了织语的框架&ndash;&gt;-->
            <tabbar-item v-show="isShowB4" icon="person" title="我的" @tabbarItemClick="tabbarItemClick('home')"></tabbar-item>
        </tabbar>
    </container>
</template>

<script>
    import * as util from './libs/utils'
    import * as API from './store/api/api'
    import Utils from './libs/util'
    import crypto from "crypto"
    export default {
        data() {
            return {
                isShowB1:true,
                isShowB2:true,
                isShowB3:true,
                isShowB4:true
            }
        },
        mounted() {
            if (localStorage.getItem("_isUse") === 'false' || localStorage.getItem("_isUse") === null) {
                this.$router.push({name: 'home'});
                this.$layer.msg("请登录！");
                console.log(localStorage.getItem("_isUse"));
            } else {
                this.$router.push({name: 'home'});
            }
            // var _this=this;
            // Utils.$on('demo', function (msg) {
            //     console.log(msg)
            //     if(msg=='type1'){
            //         _this.isShowB1=false;
            //         _this.isShowB2=false;
            //         _this.isShowB3=true;
            //         _this.isShowB4=true;
            //     }else if(msg=='type2'){
            //         _this.isShowB4=false;
            //         _this.isShowB1=true;
            //         _this.isShowB2=true;
            //         _this.isShowB3=true;
            //     }else if(msg=='type3'){
            //         _this.isShowB4=false;
            //         _this.isShowB3=false;
            //         _this.isShowB2=true;
            //         _this.isShowB1=true;
            //     }
            //     //that.functionB();
            // })
            // //登陆验证
            // console.log(localStorage.getItem("_isUse"))
            // if (localStorage.getItem("_isUse") === 'false' || localStorage.getItem("_isUse") === null ) {
            //     //this.$router.push({name: 'home'});
            //     //
            //     // let paramData = {
            //     //     user_code:this.username,
            //     //     user_pwd:''// pwdMd5
            //     // }
            //     if(this.getQueryString('account')==null){
            //         this.$router.push({name: 'home'});
            //         this.$layer.msg("请登录！");
            //     }else{
            //         let paramData = {
            //             'account': this.getQueryString('account'),
            //             'msgSignature': this.getQueryString('msgSignature'),
            //             'timeStamp': this.getQueryString('timeStamp'),
            //             'nonce': this.getQueryString('nonce'),
            //             'encrypt': this.getQueryString('encrypt')
            //         }
            //         // let paramData = {
            //         //     'account': '',
            //         //     'msgSignature': 'ef2ec5cecd12f8225ade228d6483dd8c1b57c480',
            //         //     'timeStamp': '1538026804',
            //         //     'nonce': 'cOlPTjIN',
            //         //     'encrypt': 'PXQWtE3DOjAqbFbP1jn5wAkxalGMLjd9JCiC27vBmsIYo3p6eAFvlIrMqBiRrb1BIWpjg+ZX1mTYJy48wJwS2/5GVffTb8c2GC/aSsv/dN8='
            //         // }
            //         paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            //         console.log(paramData);
            //         this.$http.jsonp(API.LOGIN_N + "&params=" + paramData).then(
            //             response => {
            //                 if(response.data.message=='SUCCESS'){
            //                     console.log(response.data.data);
            //                     this.userInfo = {
            //                         user_id: response.data.data.name,
            //                         name:response.data.data.display_name,
            //                         phone:response.data.data.mobile_phone,
            //                         tel:response.data.data.user_tel,
            //                         mail:response.data.data.email,
            //                         roleCode:response.data.data.org_code,
            //                         roleName:response.data.data.org_code
            //                     }
            //                     // 记录信息
            //                     util.setStore('userInfo', this.userInfo);
            //                     util.setStore('userRole', response.data.data.user_code); // 用户角色
            //                     util.setStore('_isUse', 'true'); // 登录状态
            //                     util.setStore('user', response.data.data.name); // 登录状态
            //                     util.setStore('userName', response.data.data.display_name); // 登录状态
            //                     var nextUrl = this.$route.params.next;
            //                     if (!nextUrl)
            //                         this.$router.go(-1);
            //                     else
            //                         this.$router.push({path: nextUrl});
            //                 }else{
            //                     this.open2 = true;
            //                     this.alertText = '账号或密码错误'
            //                     this.$router.push({name: 'home'});
            //                 }
            //             }, response => {
            //                 console.log("error");
            //                 this.$router.push({name: 'home'});
            //             });
            //     }
            // } else {
            //
            //     if(localStorage.getItem("user")=='xjy'){
            //         this.$router.push({name: 'route'});
            //         Utils.$emit('demo','type1');
            //     }else if(localStorage.getItem("user")=='fuxs'){
            //         this.$router.push({name: 'route'});
            //         Utils.$emit('demo','type2');
            //     }else{
            //         this.$router.push({name: 'redv1'});
            //         Utils.$emit('demo','type3');
            //     }
            //     $('.tabbar-item').removeClass('redv1active');
            //
            //     console.log(this.$route);
            // }

        },
        methods: {
            getvl: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.hash.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            /**
             * 解析URL传参
             * @param {Object} key
             */

            getQueryString:function (key)
            {
                var after = window.location.search;
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
            },
            tabbarItemClick: function (e) {
                console.log(this.$route);
                console.log(localStorage.getItem("_isUse"));
                // 登陆验证
                if (localStorage.getItem("_isUse") === 'false'  || localStorage.getItem("_isUse") === null) {
                    this.$router.push({name: 'home'});
                    this.$layer.msg("请登录！");
                    console.log(localStorage.getItem("_isUse"));
                } else {
                    this.$router.push({name: e});
                }
                //this.$router.push({name: e});
            }
        }
    }
</script>

<style>
    .am-view-push {
        transition: transform .5s cubic-bezier(0.23, 1, 0.320, 1);
    }
</style>
