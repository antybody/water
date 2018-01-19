/**
  login 
 */
<template>
   <div>
       <navbar slot="header" class="wt-linear-blue">
          密码登录
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
           <vue-button block green @buttonClick="login()"> 登录 </vue-button>
       </group>

        <modal role="alert" title="提示信息" :isOpen="open2" @Close="modalOutFun('open2')">{{alertText}}</modal>
   </div>
</template>

<script>
import * as util from '../../libs/utils'
export default {
   data(){
       return{
           open2:false,
           showPassword:true,
           showText:'显示密码',
           alertText:'',
           username:'',
           pwd:'',
           isShow:true
       }
   },
   mounted(){
       let p = this.urlParam()
       if(p) this.isShow = false;       
   },
   methods:{
       // 登录验证
       login(){
           if (!this.username) {
                this.open2 = true;
                this.alertText = '请输入用户名';
                return
            }else if(!this.pwd){
                this.open2 = true;
                this.alertText = '请输入密码';
                return
            }

            // 这里开启登录 await
            this.userInfo = {user_id:this.username} 

            // 登录后的情况
             if (!this.userInfo.user_id) {
                 this.open2 = true;
                 this.alertText = '账号或密码错误'
             }else{
                 // 记录信息
                 util.setStore('userInfo',this.userInfo);
                 var nextUrl = this.$route.params.next;
                 if(!nextUrl)
                   this.$router.go(-1);
                 else
                    this.$router.push({ path:nextUrl});
             }
       },
       urlParam:function(){
          return this.$route.params.next
       },
       // 显示密码
       showPwd(){
           this.showPassword = !this.showPassword;
           if(this.showPassword)
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
 .wt-link-bt{
     font-size:0.75rem;
     display: block;
     text-align:right;
 }
</style>
