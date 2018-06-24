<template>
 <vue-view class="container">
   <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          管理考核
   </navbar>
   <div class="ckhome">
       <a href="#/check/sjsb1">
        <div class="cr bl">
             数据上报
        </div>
        </a>
        <div class="crdesc">
            <ul>
                <li style="display:flex">
                    <div class="arrow bl-arrow"></div>
                    <div class="bl-bottom">取水户 {{qsh}}，监测站点 {{qshzd}}</div>
                </li>
                <li style="display:flex">
                    <div class="arrow bl-arrow"></div>
                    <div class="bl-bottom">用水户 {{ysh}}，监测站点 {{yshzd}}</div>
                </li>
                <li style="display:flex">
                    <div class="arrow bl-arrow"></div>
                    <div class="bl-bottom">水质监测站 {{szjcz}}</div>
                </li>
            </ul>
        </div>
   </div>
   <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
   <div class="ckhome">
       <a href="#/check/sjzl1">
        <div class="cr rd">
             数据质量
        </div>
        </a>
        <div class="crdesc">
            <ul>
                <li style="display:flex" >
                     <div class="arrow rd-arrow"></div>
                     <div class="rd-bottom">监测站点 {{sjzl_jczd}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow rd-arrow"></div>
                    <div class="rd-bottom">取水上报数据量 {{sjzl_qssl}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow rd-arrow"></div>
                    <div class="rd-bottom">用水上报数据量 {{sjzl_yssl}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow rd-arrow"></div>
                    <div class="rd-bottom">水质上报数据量 {{sjzl_szsl}}</div>
                </li>
            </ul>
        </div>
   </div>
   <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
   <div class="ckhome">
       <a href="#/check/ywkh1">
        <div class="cr gr">
             运维巡检
        </div>
        </a>
        <div class="crdesc">
            <ul>
                <li style="display:flex" >
                     <div class="arrow gr-arrow"></div>
                     <div class="gr-bottom">巡检站点{{ywxj_xjzd}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow gr-arrow"></div>
                    <div class="gr-bottom">运行维护站点 {{ywxj_yxwhzd}}</div>
                </li>
            </ul>
        </div>
   </div>
   <div style="border-bottom:1px dotted #e3e3e3;padding-top:10px"></div>
   <div class="ckhome">
       <a href="#/check/jgkh1">
        <div class="cr or">
             业务监管
        </div>
        </a>
        <div class="crdesc">
            <ul>
                <li style="display:flex" >
                     <div class="arrow or-arrow"></div>
                     <div class="or-bottom">取水户 {{ywjg_qsh}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow or-arrow"></div>
                    <div class="or-bottom">用水户 {{ywjg_ysh}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow or-arrow"></div>
                    <div class="or-bottom">饮用水源地 {{ywjg_yysyd}}</div>
                </li>
                <li style="display:flex" >
                    <div class="arrow or-arrow"></div>
                    <div class="or-bottom">水功能区 {{ywjg_sgnq}}</div>
                </li>
            </ul>
        </div>
   </div>
 </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as API from '../store/api/api'
export default {
  data(){
     return {
        sjzl:[],
         //数据上报
         qsh:0,
         qshzd:0,
         ysh:0,
         yshzd:0,
         szjcz:0,
        //数据 质量
         sjzl_jczd:0,
         sjzl_qssl:0,
         sjzl_yssl:0,
         sjzl_szsl:0,
         //运维巡检
         ywxj_xjzd:0,
         ywxj_yxwhzd:0,
         //业务监管
        ywjg_qsh:0,
        ywjg_ysh:0,
         ywjg_yysyd:0,
         ywjg_sgnq:0

     }
  },
  computed:{
      ...mapState({
          // sjzlList: state => state.sjzl.sjzlList,
          // sjsbList: state => state.sjzl.sjsbList,
          // ywxjList: state => state.sjzl.ywxjList,
          // ywjgList: state => state.sjzl.ywjgList,
          // nowTime: state => state.sjzl.nowDate
    })
   },mounted(){
        this.$http.jsonp(API.GLKH_SJSB).then(
            response => {
                this.qsh = response.data.data.qsh;
                this.qshzd = response.data.data.qsjcd;
                this.ysh = response.data.data.ysh;
                this.yshzd = response.data.data.yshjcd;
                this.szjcz = response.data.data.szjcz;
            }, response => {
                console.log("error");
            });
        this.$http.jsonp(API.GLKH_SJZL).then(
            response => {
                this.sjzl_jczd = response.data.zd;
                this.sjzl_qssl = response.data.qsh;
                this.sjzl_yssl = response.data.ysh;
                this.sjzl_szsl = response.data.sz;
            }, response => {
                console.log("error");
            });
    }
}
</script>

<style>
.container{
    background: #fff;
}
.ckhome{
    margin:10px;
    display:flex;
}
.cr{
    border-radius: 100%;
    width:130px;
    height:130px;
    line-height:120px;
    text-align: center;
    font-size:1.35rem;
    color:#666;
    margin-top:15px;
}
.rd{ 
    border:4px solid #de4751;
}
.rd-bottom{  
    border-bottom:1px dotted #de4751;
    width:150px;
}
.rd-arrow{
    border: 8px solid transparent;
    border-left-color: #de4751;
}
.gr{ 
    border:4px solid #62ab00;
}
.gr-bottom{  
    border-bottom:1px dotted #62ab00;
    width:130px;
}
.gr-arrow{
    border: 8px solid transparent;
    border-left-color: #62ab00;
}
.bl{ 
    border:4px solid #0a9fde;
}
.bl-bottom{  
    border-bottom:1px dotted #0a9fde;
    width:180px;
}
.bl-arrow{
    border: 8px solid transparent;
    border-left-color: #0a9fde;
}
.or{ 
    border:4px solid #FFBB00;
}
.or-bottom{  
    border-bottom:1px dotted #FFBB00;
    width:130px;
}
.or-arrow{
    border: 8px solid transparent;
    border-left-color: #FFBB00;
}
.crdesc{
    margin:10px 0;
}
.crdesc li{
    height:36px;
    line-height:36px;
}
.arrow{
  width: 0;
  height: 0;
  margin-top:11px;
}
</style>



