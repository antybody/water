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
                        <div class="wt-title-center"><span>{{listInfo.name}}</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">
                        <div class="wt-list-line">
                            <label>目标水质：</label>
                            <p class="g-overflow">
                                <span class="wt-list-red">{{listInfo.sz}}</span>
                                类
                            </p>
                        </div>
                        <div class="wt-list-line">
                            <label>评价水质：</label>
                            <p class="g-overflow"><span class="wt-list-red">{{listInfo.pj}}</span>
                              类</p>
                        </div>
                        <div class="wt-list-line">
                            <label>主导功能：</label>
                            <p class="g-overflow">{{listInfo.zdgn}}</p>
                        </div>
                        <div class="wt-list-line">
                            <label>所在水体：</label>
                            <p class="g-overflow">{{listInfo.addrwater}}                                
                            </p>
                        </div>
                        <div class="wt-list-line">
                            <label>起止断面：</label>
                            <p class="g-overflow">{{listInfo.sdm}} ~ {{listInfo.edm}}                                 
                            </p>
                            <i class="icons-ea25 wt-dblue" @click="toMap"></i>
                        </div>
                        <div class="wt-list-more" @click="isShowEvent">{{isShow?'收起信息':'更多信息'}}</div>
                </div>
                <div class="wt-title-line"></div>
                <div class="wt-list-info lpextend" v-show="isShow">
                    <div class="wt-list-line">
                            <label>XXXXX：</label>
                            <p class="g-overflow">{{listInfo.sdm}}</p>
                    </div>
                </div>
           </div>
       </group>
       <group class="group-clear group-top-10" noPadded>
           <div style="padding:5px 15px 0">
           <h5 class="wt-title" style="padding:0.625rem 0 ">
                        <div class="wt-title-center"><span>监测站（人工和自动站）</span></div>
           </h5>
           <div class="wt-title-line"></div>
           <ul class="layui-timeline">
               <li @click.stop="stationClick(item)" class="layui-timeline-item" v-for="item in listInfo.jcz" :key="item.index">
                   <div class="layui-circle"></div>
                   <div  class="layui-timeline-content" >
                       <span>{{item.name}}：目标水质 {{item.zb}}，评价水质 <span class="wt-list-reds">{{item.pj}}</span>类
                       </span>
                    </div>
                </li>
           </ul>
           </div>
       </group>
       <group class="group-top-10" noPadded>
           <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>{{selectStation}}&nbsp;采样情况</span></div>
                </h5>
                <div class="wt-title-line"></div>  
                <grid avg="2">
                    <cell class="cell-box-left" v-for="item in jcInfo.name" :key="item.index">{{item}}</cell>
                </grid>
           </div>
       </group>
  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'
// import echarts from 'echarts'xl
export default {
    data(){
        return{
            isShow:false,
            listmore:'更多信息',
            selectStation:'白鹤'
        }
    },
    mounted(){
    },
    computed:{
        ...mapState({
            listInfo:state => state.sgnqInfo.listDetail,
            jcInfo:state => state.sgnqInfo.jcInfo
        })        
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
        },
        stationClick:function(item){
            console.log(item.name);
            this.selectStation = item.name;
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
