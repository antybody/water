/**
login
*/
<template>
    <div>
        <navbar slot="header" class="wt-linear-blue">
            用户登录
            <icon v-show="isShow" name="left-nav" slot="left" titleRight="返回" back></icon>

        </navbar>
        <group class="group-clear group-top-10">
            <list>
                <!-- <input type="text" placeholder="账号" v-model="username"> -->
                <list-item nested="input">
                    <field-input placeholder="账号" v-model="username"></field-input>
                </list-item>
                <list-item nested="input">
                    <input v-if="showPassword" type="password" v-model="pwd" placeholder="密码">
                    <input v-else type="text" placeholder="密码" v-model="pwd">
                </list-item>
                <list-item>
                    <a slot="subTitle" @click="showPwd()" class="wt-link-bt wt-dblue" href="javascript:void(0)">{{showText}}</a>
                </list-item>
            </list>
            <vue-button block green @buttonClick="login()"> 登录</vue-button>
        </group>

        <modal role="alert" title="提示信息" :isOpen="open2" @Close="modalOutFun('open2')">{{alertText}}</modal>
    </div>
</template>

<script>
    import * as util from '../../libs/utils'
    import * as API from '../../store/api/api'
    import Utils from '../../libs/util'

    //import * as App from './Appxj.vue'
    import crypto from "crypto"

    export default {

        data() {
            return {
                open2: false,
                showPassword: true,
                showText: '显示密码',
                alertText: '',
                username: '',
                pwd: '',
                isShow: true
            }
        },
        mounted() {
            let p = this.urlParam()
            if (p) this.isShow = false;

        },
        methods: {
            // 登录验证

            login() {
                if (!this.username) {
                    this.open2 = true;
                    this.alertText = '请输入用户名';
                    return
                } else if (!this.pwd) {
                    // this.open2 = true;
                    // this.alertText = '请输入密码';
                    // return
                }
                var a;
                var md5 = crypto.createHash("md5");
                md5.update(this.pwd);
                var pwdMd5 = md5.digest('hex');
                // console.log(pwdMd5);
                //47bce5c74f589f4867dbd57e9ca9f808
                let paramData = {
                    user_code:this.username,
                    user_pwd:pwdMd5// pwdMd5
                }
                paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
                this.$http.jsonp(API.LOGIN + "&params=" + paramData).then(
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
                            if (!nextUrl){
                                if(response.data.data.user_code=='xjy'){
                                    this.$router.push({name: 'route'});
                                    Utils.$emit('demo','type1');
                                }else if(response.data.data.name=='fuxs'){
                                    this.$router.push({name: 'route'});
                                    Utils.$emit('demo','type2');
                                }else if(response.data.data.name=='whb'||response.data.data.name=='fqs'||response.data.data.name=='hfl'){
                                    this.$router.push({name: 'redv1'});
                                    Utils.$emit('demo','type4');
                                }else{
                                    this.$router.push({name: 'redv1'});
                                    Utils.$emit('demo','type3');
                                }
                                $('.tabbar-item').removeClass('active');

                            }

                            else
                                this.$router.push({path: nextUrl});

                        }else{
                            this.open2 = true;
                            this.alertText = '账号或密码错误'
                        }
                    }, response => {
                        console.log("error");
                    });
            },
            urlParam: function () {
                return this.$route.params.next
            },
            // 显示密码
            showPwd() {
                this.showPassword = !this.showPassword;
                if (this.showPassword)
                    this.showText = '显示密码';
                else
                    this.showText = '隐藏密码';
            },
            // 隐藏提示框
            modalOutFun(value) {
                this[value] = false
            },
            // 显示提示框
            modalOpFun(value) {
                this[value] = true
            }
        }
    }
</script>

<style>
    .wt-link-bt {
        font-size: 0.75rem;
        display: block;
        text-align: right;
    }
</style>
