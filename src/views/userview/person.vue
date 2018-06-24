/**
  个人信息
 */
<template>
  <vue-view>
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          个人信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
       </navbar>
       <group noPadded class="group-clear">
        <list>
            <list-item :title="name" class="wt-list-title"></list-item>
            <list-item title="手机号" :after="phone"></list-item>
            <list-item title="固定电话" :after="tel"></list-item>
            <list-item title="Email" :after="mail"></list-item>
            <list-item title="组织机构" after="水务局"></list-item>
            <list-item title="角色" :after="roleName"></list-item>
        </list>
       </group>
  </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import * as util from '../../libs/utils'
export default {
    data() {
        return {
            user_id:'',
            name:'李四',
            phone:'6668888',
            tel:'13366668888',
            mail:'abcabc@qq.com',
            roleCode:'admin',
            roleName:'管理员'
        }
    },
    computed:{
        ...mapState({
            userInfo: state => state.login.userInfo
        })
    }, mounted() {
        if (this.userInfo && this.userInfo.user_id) {
            this.name = this.userInfo.name;
            this.phone = this.userInfo.phone;
            this.tel = this.userInfo.tel;
            this.mail = this.userInfo.mail;
            this.roleCode = this.userInfo.roleCode;
            this.roleName = this.userInfo.roleName;
        }else{
            this.name = '尚未登录';
            this.phone = '尚未登录';
            this.tel = '尚未登录';
            this.mail = '尚未登录';
            this.roleCode = '尚未登录';
            this.roleName = '尚未登录';
        }
    }
}
</script>

<style>
.wt-list-title .item-title{
   font-weight: 700;
   text-align: center;
}
</style>
