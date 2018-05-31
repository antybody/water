/**
 * 水文测站
 */
<template>
  <vue-view>
      <navbar slot="header" class="wt-linear-blue">
          水文测站监测信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>   
      </navbar>
      <group noPadded class="group-clear">      
          <ul class="wt-tabs" :style="{
              'transition-timing-function':'cubic-bezier(0.1, 0.57, 0.1, 1)',
              'transition-duration':tranDuration+'ms',
              'transform':'translate3d('+tranX+'px,'+tranY+'px) translateZ(0px)'
             }">

              <li :class="{cur:sydId === site.hdst_num}"  v-for="site in sites" @click="selectStation(site.hdst_num)"><span>{{site.hdst_nm}}</span></li>
              <!--
              <li :class="{cur:sydId === '2'}" @click="selectStation('2')"><span>陈行新头部</span></li>
              <li :class="{cur:sydId === '3'}" @click="selectStation('3')"><span>三角渡</span></li>
              <li :class="{cur:sydId === '4'}" @click="selectStation('4')"><span>赵屯</span></li>
              <li :class="{cur:sydId === '5'}" @click="selectStation('5')"><span>黄渡</span></li>
              -->

          </ul>
          <div class="showCharts">
               <!-- <loader amStyle="orange" style="display:block"></loader> -->
               <div id="myCharts4" :style="{width:'100%',height:'300px'}"></div>
          </div>
      </group>
      <group class="group-top-10" noPadded>
           <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>最新监测值({{lastdate}})&nbsp;</span></div>
                </h5>
                <div class="wt-title-line"></div>  
                <grid avg="3">
                    <table class="wt-tb" border="1" bordercolor='#a0c6e5'>
                        <thead>
                            <td>分类</td><td>指标项</td><td>监测值</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="5">常规五项</td><td>水温</td><td>{{wt}}</td>
                            </tr>
                            <tr>
                                <td>电导率</td><td>{{cond}}</td>
                            </tr>
                            <tr>
                                <td>浊度</td><td>{{turb}}</td>
                            </tr>
                            <tr>
                                <td>溶解氧</td><td>{{dox}}</td>
                            </tr>
                            <tr>
                                <td>pH</td><td>{{ph}}</td>
                            </tr>
                            <tr>
                                <td rowspan="2">必要指标</td><td>高猛酸盐指数</td><td>{{codmn}}</td>
                            </tr>
                            <tr>
                                <td>氨氮</td><td>{{nh3n}}</td>
                            </tr>
                            <tr>
                                <td rowspan="2">富营养化指标</td><td>总磷</td><td>{{tp}}</td>
                            </tr>
                            <tr>
                                <td>总氮</td><td>{{tn}}</td>
                            </tr>
                        </tbody>
                    </table>
                </grid>
           </div>
       </group>
  </vue-view>
</template>

<script>
import Slider from 'vue-plain-slider'
import Vue from 'vue'
import * as API from '../../store/api/api'

export default {
    data(){
        return{
            sites: [
                { hdst_nm: '青草沙',hdst_num:'1' },
                { hdst_nm: 'Google',hdst_num:'2' },
                { hdst_nm: 'Taobao',hdst_num:'3' }
            ],
            tranDuration:600,
            tranX:0,
            tranY:0,
            sydId:0,

            lastdate:'2017-10-12 12:15',
            wt:0,
            cond:0,
            turb:0,
            dox:0,
            ph:0,
            codmn:0,
            nh3n:0,
            tp:0,
            tn:0,
            doxArr:[],
            turbArr: [],
            condArr: [],
            codmnArr: [],
            xArr:['2017/1/1 10:00', '2017/1/1 12:00', '2017/1/1 14:00', '2017/1/1 16:00', '2017/1/1 18:00', '2017/1/1 20:00', '2017/1/1 22:00'],
            phArr:[820, 932, 901, 934, 1290, 1330, 1320],
            wtArr:[22, 32, 1, 34, 90, 30, 20],
            nh3nArr:[220, 32, 91, 34, 190, 30, 20]
        }
    },
    mounted(){
        let paramData = {
            stlx:'',  //页面路径 用于注册接口
            mbsz:''
        }
        paramData = encodeURIComponent(JSON.stringify(paramData));
        this.$http.jsonp(API.SGNQJC_LIST+ "&params=" + paramData).then(
            response => {
                //循环设置跳转地址 href
                // for (let value of response.data.data) {
                //     value.href = "/newDetail/" + value.id;
                //     // console.log(value);
                // }
                this.sites = response.data.data;
            }, response => {
                console.log("error");
            });



        this.$nextTick(function(){
            this.sydId = this.$route.params.id;
            this.changeIcon( this.sydId);
        })


    },
    methods:{
        GetDateStr:function(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            var d = dd.getDate();
            return y+"-"+m+"-"+d;
        },
        changeIcon:function (v) {
            let paramData = {
                id:v,  //页面路径 用于注册接口
                beginTime:this.GetDateStr(0),
                endTime:this.GetDateStr(0)
            }
            this.xArr= [];
            this.phArr= [];
            this.nh3nArr= [];
            this.wtArr= [];
            this.doxArr= [];
            this.turbArr= [];
            this.condArr= [];
            this.codmnArr= [];
            this.lastdate='暂无',
            this.wt=0;
            this.cond=0;
            this.turb=0;
            this.dox=0;
            this.ph=0;
            this.codmn=0;
            this.nh3n=0;
            this.tp=0;
            this.tn=0;
            //alert('-----选中了v'+v);
            paramData = encodeURIComponent(JSON.stringify(paramData));
            this.$http.jsonp(API.SWCZ_CHART+ "&params=" + paramData).then(
                response => {
                    //循环设置跳转地址 href
                     for (let value of response.data.data) {
                        value.href = "/newDetail/" + value.id;


                        this.xArr.push(value.spt);
                        this.phArr.push(value.ph);
                        this.nh3nArr.push(value.nh3n);
                        this.wtArr.push(value.wt);
                         this.lastdate=value.spt;

                         this.doxArr.push(value.dox);
                         this.turbArr.push(value.turb);
                         this.condArr.push(value.cond);
                         this.codmnArr.push(value.codmn);

                         this.wt=value.wt;
                         this.cond=value.cond;
                         this.turb=value.turb;
                         this.dox=value.dox;
                         this.ph=value.ph;
                         this.codmn=value.codmn;
                         this.nh3n=value.nh3n;
                         this.tp=value.tp;
                         this.tn=value.tn;

                         //alert('-----选中了v'+v);
                    }
                    let myChart = echarts.init(document.getElementById('myCharts4'));
                    let options = {
                        grid: {
                            top:'10%',
                            left: '',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend:{
                            data:['pH','氨氮','水温','溶解氧','浊度','电导率','高锰酸盐指数'],
                            x: 'left',
                            selectedMode: 'single'
                        },
                        xAxis: {
                            type: 'category',
                            data: this.xArr.map(function (str) {
                                return str.replace(' ', '\n')
                            })
                        },
                        yAxis: {
                            type: 'value',
                            scale   :true
                        },
                        series: [
                            {
                                name:'pH',
                                data: this.phArr,
                                type: 'line',
                                smooth: true
                            },
                            {
                                name:'氨氮',
                                data: this.nh3nArr,
                                type: 'line',
                                smooth: true
                            },
                            {
                                name:'水温',
                                data: this.wtArr,
                                type: 'line',
                                smooth: true
                            },
                            {
                                name:'溶解氧',
                                data: this.doxArr,
                                type: 'line',
                                smooth: true
                            },
                            {
                                name:'浊度',
                                data: this.turbArr,
                                type: 'line',
                                smooth: true
                            },
                            {
                                name:'电导率',
                                data: this.condArr,
                                type: 'line',
                                smooth: true
                            }
                            // ,
                            // {
                            //     name:'高锰酸盐指数',
                            //     data: this.codmnArr,
                            //     type: 'line',
                            //     smooth: true
                            // }
                        ]
                    };
                    myChart.setOption(options);
                    //this.sites = response.data.data;
                }, response => {
                    console.log("error");
                });


        },
        selectStation:function(v){
            this.sydId = v;
            //alert('-----选中了',v);
            this.changeIcon(v);
        }
   }

}
</script>

<style>
.wt-tabs{
    margin:0;
    padding:0;
    white-space:nowrap;
    overflow-x:auto;
    background-color:#ffffff;
}
.wt-tabs li:first-child{
    margin-left:0;
}
.wt-tabs li{
    display:inline-block;
    position: relative;
    height:100%;
    font-size:0.875rem;
    line-height:35px;
    text-align: center;
    padding:0 15px;
}
.wt-tabs .cur span{
    color:#deb260;
    border-color:#deb260;
}
.wt-tabs .cur:after{
   content:'';
   position: absolute;
   display:block;
   top:0;
   left:0;
   width:100%;
   height:100%;
   border-bottom: 2px solid #deb260;
   z-index: 1;
}
.showCharts{
    padding-top:1rem;
}
.wt-tb{
    width:100%;
    height:auto;
    text-align: center;
    font-size:0.875rem;
    cellspacing:0;
    cellpadding:0;
    margin-bottom:10px;
    border-collapse:collapse;
}
.wt-tb td{
    padding:5px;
}
.wt-tb thead td{
    font-weight: 700;
}
</style>
