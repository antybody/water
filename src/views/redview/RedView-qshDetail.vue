<template>
  <vue-view>
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
          取水户基本信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
       <group noPadded class="group-clear">
           <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                        <div class="wt-title-center"><span>{{jcInfo.watuserName}}</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">
                        <div class="wt-list-line">
                            <label>颁证水量：</label>
                            <p class="g-overflow">
                                <span class="wt-list-red">{{qshContent.bzsl}}</span>
                                万m³
                            </p>
                        </div>
                        <div class="wt-list-line">
                            <label>日&nbsp;&nbsp;水&nbsp;&nbsp;量：</label>
                            <p class="g-overflow">{{qshContent.rsl}}（本年监测累计 {{qshContent.nsl}}）</p>
                        </div>
                        <div class="wt-list-line">
                            <label>取水用途：</label>
                            <p class="g-overflow">{{jcInfo.watuserWatapp}}</p>
                        </div>
                        <div class="wt-list-line">
                            <label>单位地址：</label>
                            <p class="g-overflow">{{jcInfo.watuserAddr}}
                            </p>
                            <i class="icons-ea25 wt-dblue" @click="toMap"></i>
                        </div>
                        <div class="wt-list-more" @click="isShowEvent">{{isShow?'收起信息':'更多信息'}}</div>
                </div>
                <div class="wt-title-line"></div>
                <div class="wt-list-info lpextend" v-show="isShow">
                    <div class="wt-list-line">
                            <label>法人代表：</label>
                            <p class="g-overflow">{{jcInfo.watuserLegrep}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>单位类型：</label>
                        <p class="g-overflow">{{jcInfo.watuserWorktype}}</p>
                    </div>
                </div>
           </div>
       </group>
       <group class="group-clear group-top-10" noPadded>
           <div style="padding:5px 15px 0">
           <h5 class="wt-title" style="padding:0.625rem 0 ">
                        <div class="wt-title-center"><span>取水口</span></div>
           </h5>
           <div class="wt-title-line"></div>
           <ul class="layui-timeline">
               <li class="layui-timeline-item" v-for="item in qskInfo" :key="item.index">
                   <div class="layui-circle"></div>
                   <div  class="layui-timeline-content" >
                       {{item.int_nm}}：<br/>{{item.license_id}} <span class="wt-list-reds">{{item.qsl}}</span>万m³
                    </div>
                </li>
           </ul>
           </div>
       </group>
       <group class="group-top-10" noPadded>
           <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>监测水量（万m³）</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="classify-tags">
                    <div class="tags-wrap">
                        <a :class="{select:isSelect == 'm'}" @click="tagChange('m')">月水量</a>
                        <a :class="{select:isSelect == 'y'}" @click="tagChange('y')">年水量</a>
                    </div>
                </div>
                <div id="myCharts" :style="{width:'410px',height:'300px'}"></div>
           </div>
       </group>
  </vue-view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as API from '../../store/api/api'
import Vue from 'vue'
// import echarts from 'echarts'xl
export default {
    data(){
        return{
            isSelect:'m',
            isShow:false,
            listmore:'更多信息',
            qskInfo: [],
            qshContent: [],
            jcInfo:[],
            monthSl:[],
            yearSl:[]
        }
    },
    mounted(){
        let watuser_id = this.$route.params.id;
        let paramData = {
            watuser_id: watuser_id,
            wiuTp: '03060001',
            year: '2018'
        }
        paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
        this.$http.jsonp(API.QSH_QSK + "&params=" + paramData).then(
            response => {
                this.qskInfo = response.data.data;
            }, response => {
                console.log("error");
            });
        this.$http.jsonp(API.QSH_CONTENT + "&params=" + paramData).then(
            response => {
                console.log(response.data);
                this.qshContent = response.data;
                this.jcInfo = response.data.jcxx;
            }, response => {
                console.log("error");
            });
        //图表数据
        this.$http.jsonp(API.QSH_QSL + "&params=" + paramData).then(
            response => {
                console.log(response.data);
                this.monthSl = response.data.monthSl;
                this.yearSl = response.data.yearSl;
                let xData = [],yData = [];
                for (let value of this.monthSl) {
                    xData.push(value.dt);
                    yData.push(parseFloat(value.day_w));
                }
                this.loadChart({x:xData,y:yData,t:'line'});
            }, response => {
                console.log("error");
            });
    },
    computed:{
        ...mapState({
            listInfo:state => state.qshInfo.listDetail
        })        
    },
    methods:{
        ...mapActions([
            'getListsDetail'
        ]),
        toMap:function(){
            console.log(this.jcInfo);
            let mapList = {
                addr: this.jcInfo.watuserAddr,
                lng: this.jcInfo.watuserLon,
                lat: this.jcInfo.watuserLat,
                pcode: this.jcInfo.watuserName,
                qsk: [],
                wtnum: this.jcInfo.watuserName,
                yt: this.jcInfo.watuserName
            }
            this.$router.push({name:'smap',params:{list: mapList, t:'qsh'}});
        },
        isShowEvent:function(){
            this.isShow = !this.isShow;
        },
        tagChange:function(val){
            this.isSelect = val;
            let xmData = [],ymData = [],
                xyData = [],yyData = [];
            for (let value of this.monthSl) {
                xmData.push(value.dt);
                ymData.push(parseFloat(value.day_w));
            }
            for (let value of this.yearSl) {
                xyData.push(value.dt);
                yyData.push(parseFloat(value.day_w));
            }

            // 切换图表
            switch(val){
                case 'm':this.loadChart({x: xmData,y: ymData,t:'line'});break;
                case 'y':this.loadChart({x: xyData,y: yyData,t:'bar'});break;
            }        

        },
        loadChartData:function(val){
            this.$store.dispatch({type:'getQslInfo',type:val})
              .then(res =>{
                  if(res.status === 200){
                      console.log('获取数据');
                  }
              });
        },
        loadChart:function(val){
             let myChart = echarts.init(document.getElementById('myCharts'));
             var options = {
                color: ['#3398DB'],
                tooltip: {},
                legend: {
                    show: false
                },
                grid:{
                    left: '10%',
                    right: '14%',
                    bottom: '13%',
                    top:'5%'
                },
                xAxis: {
                    data: val.x
                },
                yAxis: {},
                series: [{
                    name: '取水量',
                    type: val.t,
                    data: val.y,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    }
                }]
            };
            myChart.setOption(options);
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
