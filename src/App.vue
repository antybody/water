<template>
    <container fill direction="column">
        <tabbar slot="tabbar" class="am-view-push">
            <tabbar-item active icon="home" title="首页" @tabbarItemClick="tabbarItemClick('redv1')"></tabbar-item>
            <!-- <tabbar-item icon="bars" title="三条红线" href="/redv1"></tabbar-item> -->
            <tabbar-item icon="more" title="管理考核" @tabbarItemClick="tabbarItemClick('check')"></tabbar-item>
            <tabbar-item icon="gear" title="巡检运维" @tabbarItemClick="tabbarItemClick('route')"></tabbar-item>
            <tabbar-item icon="person" title="我的" @tabbarItemClick="tabbarItemClick('home')"></tabbar-item>
        </tabbar>
    </container>
</template>

<script>
    import * as util from './libs/utils'
    import * as API from './store/api/api'
    import crypto from "crypto"
    export default {
        data() {
            return {}
        },
        mounted() {
            //登陆验证
            if (localStorage.getItem("_isUse") === 'false') {
                //this.$router.push({name: 'home'});
                //this.$layer.msg("请登录！");
                // let paramData = {
                //     user_code:this.username,
                //     user_pwd:''// pwdMd5
                // }
                let paramData = {
                    'account': this.getvl('account'),
                    'msgSignature': this.getvl('msgSignature'),
                    'timeStamp': this.getvl('timeStamp'),
                    'nonce': this.getvl('nonce'),
                    'encrypt': this.getvl('encrypt')
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
                            if (!nextUrl)
                                this.$router.go(-1);
                            else
                                this.$router.push({path: nextUrl});
                        }else{
                            this.open2 = true;
                            this.alertText = '账号或密码错误'
                        }
                    }, response => {
                        console.log("error");
                    });
            } else {
                console.log(this.$route);
            }

        },
        methods: {
            getvl: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
             },
            tabbarItemClick: function (e) {
                console.log(this.$route);
                console.log(localStorage.getItem("_isUse"));
                //登陆验证
                if (localStorage.getItem("_isUse") === 'false') {
                    this.$router.push({name: 'home'});
                    this.$layer.msg("请登录！");
                    console.log(localStorage.getItem("_isUse"));
                } else {
                    this.$router.push({name: e});
                }
            }
        }
    }
</script>

<style>
    .am-view-push {
        transition: transform .5s cubic-bezier(0.23, 1, 0.320, 1);
    }
</style>
