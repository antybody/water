<template>
  <vue-view>
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
          水功能区基本信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
          <icon name="edit" slot="right" href="/sgnqreback"></icon>
        </navbar>
       <group noPadded class="group-clear">
           <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                        <div class="wt-title-center"><span>('取水 '||{{xkzzh}} || ' 字['|| {{xkznh}} || ']第' || {{xkzsxh}} || '号')</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">

                        <div class="wt-list-line">
                            <label>取水户：</label>
                            <p class="g-overflow"><span class="wt-list-red">{{qsqrmc}}</span>
                            </p>
                        </div>
                    <div class="wt-list-line">
                        <label>区县：</label>
                        <p class="g-overflow">{{watuserDivname}}</p>
                    </div>
                        <div class="wt-list-line">
                            <label>许可水量：</label>
                            <p class="g-overflow">{{qsl}}</p>
                        </div>
                        <div class="wt-list-line">
                            <label>取水地点：</label>
                            <p class="g-overflow">{{qsdd}}
                            </p>
                        </div>
                        <div class="wt-list-line">
                            <label>取水方式：</label>
                            <p class="g-overflow">{{qsfs}}
                            </p>
                        </div>
                    <div class="wt-list-line">
                        <label>水源类型：</label>
                        <p class="g-overflow">{{sylx}}
                        </p>
                    </div>
                    <div class="wt-list-line">
                        <label>取水类型：</label>
                        <p class="g-overflow">{{qslx}}
                        </p>
                    </div>
                    <div class="wt-list-line">
                        <label>取水用途：</label>
                        <p class="g-overflow">{{qsyt}}
                        </p>
                    </div>
                    <div class="wt-list-line">
                        <label>过期状态：</label>
                        <p class="g-overflow">{{overDate}}
                        </p>
                    </div>

                </div>

           </div>
       </group>


  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
import * as API from '../../store/api/api'
// import echarts from 'echarts'xl
export default {
    data(){
        return{
            isShow:false,
            // ,jcInfo:[]
            xkzzh:'',
            xkznh:'',

            xkzsxh:'',
            qsqrmc:'',
            watuserDivname:'',
            qsl:'',
            qsdd:'',
            qsfs:'',
            sylx:'',
            qslx:'',
            qsyt:'',
            overDate:''//过期状态
        }
    },
    mounted(){
        let id = this.$route.params.id;
        let paramData = {
            id: id
        }
        paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
        this.$http.jsonp(API.QSH_XKZ + "&params=" + paramData).then(
            response => {
                this.xkzzh= response.data.dmxx[0].xkzzh;
                    this.xkznh= response.data.dmxx[0].xkznh;
                this.xkzsxh= response.data.dmxx[0].xkzsxh;
                    this.qsqrmc= response.data.dmxx[0].qsqrmc;
                    this.watuserDivname= response.data.dmxx[0].watuserDivname;
                    this.qsl= response.data.dmxx[0].qsl;
                    this.qsdd= response.data.dmxx[0].qsdd;
                    this.qsfs= response.data.dmxx[0].qsfs;
                    this.sylx= response.data.dmxx[0].sylx;
                    this.qslx= response.data.dmxx[0].qslx;
                    this.qsyt= response.data.dmxx[0].qsyt;
                    this.overDate= response.data.dmxx[0].overDate;
            }, response => {
                console.log("error");
            });
    },
    computed:{
        // ...mapState({
        //     listInfo:state => state.sgnqInfo.listDetail
        //     ,jcInfo:state => state.sgnqInfo.jcInfo
        // })
    },
    methods:{
        ...mapActions([
            'getListsDetail'
        ]),
        toMap:function(){
            this.$router.push({name:'smap',params:{list:this.listInfo,t:'sgnq'}});
        },
        isShowEvent:function(){
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style>

  .wt-title-line{
      position: relative;
  }
  .wt-title-line:after{
      border-width:0 0 1px 0;
      width:200%;
      height:200%;
      display: block;
      content:"";
      border:1px solid #e6e6e6;
      position: absolute;
      left: 0;
      top:0;
      box-sizing:border-box;
      pointer-events: none;
      -webkit-transform:scale(0.5);
      transform:scale(0.5);
      transform-origin: left top;
      -webkit-transform-origin: left top;
  }
  .wt-list-more{
     display: block;
     font-size:1rem;
     color:#62ab00;
     height: 34px;
     line-height:34px;
     text-align:center;
     padding:5px 15px 10px;
     /* margin:-5px -10px; */
  }
  .wt-list-info{
      padding:5px 0;
  }
  .wt-list-line{
      display:-webkit-box;
      line-height: 24px;
      color:#333;
      font-size:0.75rem;
  }
  .wt-list-line label{
      display: block;
      color:#666;
      font-size:0.875rem;
  }
  .wt-list-line p{
      width:100%;
      -webkit-box-flex:1;
      box-flex:1;
      margin:0;
      padding:0;
      font-size:0.875rem;
      color:#333;
  }
  .g-overflow{
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;      
  }
  .classify-tags{
      box-flex:1;
      -webkit-box-flex:1;
      display: inline-block;
      padding:0.3125rem 0 0;
  }
  .classify-tags a{
      display: inline-block;
      font-size:0.875rem;
      color:#666;
      height: 26px;
      line-heigt:26px;
      box-sizing: border-box;
      -webkit-border-radius:3px;
      margin-right:10px;
      padding:0 6px;
      border:1px solid #ccc;
  }
  .classify-tags .select{
      color:#3cb950;
      border:1px solid #3cb950;
  }
  .wt-list-red{
      font-size:1.125rem;
      color:#e54b00;
      font-weight: 600;
  }
  .wt-list-reds{
      font-size:0.875rem;
      color:#e54b00;
      font-weight: 600;
  }
</style>
