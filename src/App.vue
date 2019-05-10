<template>
    <container fill direction="column">
        <tabbar slot="tabbar" class="am-view-push">
            <!--<tabbar-item v-show="isShowB1"   active icon="home" title="首页" @tabbarItemClick="tabbarItemClick('redv1')"></tabbar-item>-->
            <!--&lt;!&ndash; <tabbar-item icon="bars" title="三条红线" href="/redv1"></tabbar-item> &ndash;&gt;-->
            <!--<tabbar-item v-show="isShowB2" icon="more" title="管理考核" @tabbarItemClick="tabbarItemClick('check')"></tabbar-item>-->
            <!--
              运维巡检部分需要指定 业务人员和巡检人员
            -->
            <tabbar-item v-show="isShowB3" icon="gear" title="巡检运维"
                         @tabbarItemClick="tabbarItemClick('route')"></tabbar-item>
            <tabbar-item v-show="isShowB5" icon="gear" title="工程核查"
                         @tabbarItemClick="tabbarItemClick('qsgcHome')"></tabbar-item>
            <!--登陆部分集成了织语的框架-->
            <!--&lt;!&ndash;登陆部分集成了织语的框架&ndash;&gt;-->
            <tabbar-item v-show="isShowB4" icon="person" title="我的"
                         @tabbarItemClick="tabbarItemClick('home')"></tabbar-item>
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
                isShowB1: true,
                isShowB2: true,
                isShowB3: true,
                isShowB4: true,
                isShowB5: true
            }
        },
        mounted() {
            let address = this.getQueryString('address');
            let type = this.getQueryString('type');
            localStorage.setItem("address", address);
            localStorage.setItem("type", type);
            //巡检员页面
            if (type === '0') {
                this.userInfo = {
                    user_id: 'qsxjy',
                    name: '取水巡检员',
                    phone: '182',
                    tel: '182',
                    mail: '',
                    roleCode: '',
                    roleName: ''
                }
                util.setStore('userInfo', this.userInfo);
                localStorage.setItem('userRole', 'xjy'); // 用户角色
                localStorage.setItem('_isUse', 'true'); // 登录状态
                localStorage.setItem('user', 'qsxjy'); // 登录状态
                localStorage.setItem('userName', '取水巡检员'); // 登录状态
                this.$router.push({name: 'route'});
            } else if (type === '1') {
                this.isShowB3 = false;
                this.userInfo = {
                    user_id: 'hdh',
                    name: '黄大宏',
                    phone: '182',
                    tel: '182',
                    mail: '',
                    roleCode: '',
                    roleName: ''
                }
                util.setStore('userInfo', this.userInfo);
                localStorage.setItem('userRole', 'hdh'); // 用户角色
                localStorage.setItem('_isUse', 'true'); // 登录状态
                localStorage.setItem('user', 'hdh'); // 登录状态
                localStorage.setItem('userName', '黄大宏'); // 登录状态
                this.$router.push({name: 'qsgcHome'});
            } else {
                if (localStorage.getItem("_isUse") === 'false' || localStorage.getItem("_isUse") === null) {
                    this.$router.push({name: 'home'});
                    this.$layer.msg("请登录！");
                    console.log(localStorage.getItem("_isUse"));
                } else {
                    this.$router.push({name: 'home'});
                }
            }

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

            getQueryString: function (key) {
                var after = window.location.search;
                if (after.indexOf('?') === -1) {
                    //key存在先通过search取值如果取不到就通过hash来取
                    after = window.location.hash.split("?")[1];
                } //return null; //如果url中没有传参直接返回空
                if (after) {
                    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
                    var r = after.match(reg);
                    if (r != null) {
                        return decodeURIComponent(r[2]);
                    }
                    else {
                        return null;
                    }
                }
            },
            tabbarItemClick: function (e) {
                console.log(this.$route);
                console.log(localStorage.getItem("_isUse"));
                // 登陆验证
                if (localStorage.getItem("_isUse") === 'false' || localStorage.getItem("_isUse") === null) {
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
