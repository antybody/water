<!--2018.12.03 huaibaoqi-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            灌区基本信息
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
        <group noPadded class="group-clear">
            <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>{{jcInfo.irrname}}</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="wt-list-info">

                    <div class="wt-list-line">
                        <label>日&nbsp;&nbsp;水&nbsp;&nbsp;量：</label>
                        <p class="g-overflow">{{dsl}}（本年监测累计 {{rsl}}m³）</p>
                    </div>
                    <div class="wt-list-line">
                        <label>灌区规模：</label>
                        <p class="g-overflow">{{jcInfo.irrscale}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>设计灌溉面积（亩）：</label>
                        <p class="g-overflow">{{jcInfo.desirrarea}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>有效灌溉面积（亩）：</label>
                        <p class="g-overflow">{{jcInfo.effirrarea}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>计量方式：</label>
                        <p class="g-overflow">{{jcInfo.calculatetype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>取水方式：</label>
                        <p class="g-overflow">{{jcInfo.irrwatertype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>灌区位置：</label>
                        <p class="g-overflow">{{jcInfo.irrcity + jcInfo.irrtown + jcInfo.irrvillage  }}
                        </p>
                        <i class="icons-ea25 wt-dblue" @click="toMap"></i>
                    </div>
                    <div class="wt-list-more" @click="isShowEvent">{{isShow?'收起信息':'更多信息'}}</div>
                </div>
                <div class="wt-title-line"></div>
                <div class="wt-list-info lpextend" v-show="isShow">
                    <div class="wt-list-line">
                        <label>是否样点灌区：</label>
                        <p class="g-overflow">{{jcInfo.irrsample}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>农田类型：</label>
                        <p class="g-overflow">{{jcInfo.irrtype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>土壤类型：</label>
                        <p class="g-overflow">{{jcInfo.irrsoiltype}}</p>
                    </div>
                    <div class="wt-list-line">
                        <label>管理单位：</label>
                        <p class="g-overflow">{{jcInfo.managementunit}}</p>
                    </div>
                </div>
            </div>
        </group>

        <group class="group-top-10" noPadded>
            <div style="padding:5px 15px 0">
                <h5 class="wt-title" style="padding:0.625rem 0 ">
                    <div class="wt-title-center"><span>监测水量（m³）</span></div>
                </h5>
                <div class="wt-title-line"></div>
                <div class="classify-tags">
                    <div class="tags-wrap">
                         <a :class="{select:isSelect == 'y'}" @click="tagChange('y')">水量信息</a>
                        <!--   <a :class="{select:isSelect == 'm'}" @click="tagChange('m')">月水量</a>-->
                    </div>
                </div>
                <div id="myCharts" :style="{width:'410px',height:'300px'}"></div>
            </div>
        </group>
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import * as API from '../../store/api/api'
    import Vue from 'vue'
    // import echarts from 'echarts'xl
    export default {
        data() {
            return {
                isSelect: 'm',
                isShow: false,
                listmore: '更多信息',
               // qskInfo: [],
               // qshContent: [],
                jcInfo: [],
                monthSl: [],
                yearSl: [],
                daySl:[],
                hourSl:[],
                rsl:'',       //本年水量
                dsl:''        //当日水量
            }
        },
        mounted() {
            let id = this.$route.params.id;
            let paramData = {
                id: id,
               //year: '2018'
                year: new Date().getFullYear()
            }
            paramData = encodeURI(encodeURI(JSON.stringify(paramData)));
            this.$http.jsonp(API.GQ_CONTENT + "&params=" + paramData).then(
                response => {
                    console.log(response.data);
                    this.jcInfo = response.data.jcxx;
                    this.yearSl = response.data.year;
                    this.monthSl = response.data.month;
                    this.daySl = response.data.day;
                    //this.hourSl = response.data.hour;
                    this.rsl= this.yearSl[ this.yearSl.length-1].sum;
                    this.dsl= this.daySl[ this.daySl.length-1].sum;
                    if(this.dsl= [null]){
                        this.dsl=0;
                    }
                    //this.tagChange('m');
                    this.tagChange('y');

                }, response => {
                    console.log("error");
                });
        },
        computed: {
            ...mapState({
                listInfo: state => state.gqInfo.listDetail     //state.gqInfo.listDetail
            })
        },
        methods: {
            ...mapActions([
                'getListsDetail'
            ]),
            toMap: function () {
                console.log(this.jcInfo);
                let mapPoint = {
                    addr: this.jcInfo.irrcity+this.jcInfo.irrtown+this.jcInfo.irrvillage,
                    lng: this.jcInfo.irrlongtitude,
                    lat: this.jcInfo.irrlatitude,
                    name:this.jcInfo.irrname,
                    jlfs:this.jcInfo.calculatetype,
                    gqgm:this.jcInfo.irrscale,
                    qsfs:this.jcInfo.irrwatertype,
                    sjgg:this.jcInfo.desirrarea,
                    yxgg:this.jcInfo.effirrarea,
                    gldw:this.jcInfo.managementunit,
                }
                this.$router.push({name:'smap',params:{list: mapPoint, t:'gq'}});
               // this.$router.push({name: 'smap', params: {list: this.listInfo, t: 'qsh'}});
            },
            isShowEvent: function () {
                this.isShow = !this.isShow;
            },
            tagChange: function (val) {
                this.isSelect = val;
                let xmData = [], ymData = [],
                    xyData = [], yyData = [],
                   // mdData = [], xdData = [], ydData = [],
                   // dhData = [], xhData = [], yhData = [],
                    id=this.$route.params.id;
                for (let value of this.yearSl) {
                    xyData.push(value.dt);
                    yyData.push(parseFloat(value.sum));
                }
                for (let value of this.monthSl) {
                    xmData.push(value.dt);
                    ymData.push(parseFloat(value.sum));
                }
             /*   for (let value of this.daySl) {
                    mdData.push(value.ydt);
                    xdData.push(value.rdt);
                    ydData.push(parseFloat(value.sum));
                }
                for (let value of this.hourSl) {
                    dhData.push(value.ddt);
                    xhData.push(value.hdt);
                    yhData.push(parseFloat(value.sum));
                }*/


            switch(val){
                case val='y':
                    this.loadChart({x: xyData, y: yyData, id, t: 'bar'});
                    break;
               /* case val='m':
                    this.loadChart2({x: xmData, y: ymData, id, t: 'bar'});
                    break;*/
            }
                // 切换图表
            },
            loadChart: function (val) {//年水量
                let myChart = echarts.init(document.getElementById('myCharts'));
                   //  myChart.off('click')
                var options = {
                    color: ['#3398DB'],
                    tooltip: {},
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '10%',
                        right: '14%',
                        bottom: '13%',
                        top: '5%'
                    },
                    xAxis: {
                        data: val.x
                    },
                    yAxis: {},
                    series: [

                        {
                        name: '用水量',
                        type: val.t,
                        data: val.y,
                        barMaxWidth:30,
                    label: {
                            normal: {

                                show: true,
                                position: 'top'
                            }
                        }
                    }

                    ]
                };
                myChart.setOption(options);
                //开始
                let _this=this;
                let  id=val.id;
                myChart.on('click', function (params) {
                    let xname = params.name,
                        xData = [], yData = [],
                        monthSl=[];
                    let paramMdata={
                        id:id,
                        year:xname
                    }
                    paramMdata=encodeURI(encodeURI(JSON.stringify(paramMdata)));
                    _this.$http.jsonp(API.GQ_CONTENT_M + "&params=" + paramMdata).then(
                        response => {
                            console.log(response.data);
                            monthSl = response.data.month;
                            for (let i=0;i< monthSl.length;i++) {
                                xData[i]= monthSl[i].dt;
                                yData[i]= monthSl[i].sum;
                            }
                            _this.$options.methods.loadChart2({x: xData, y: yData,id,t: 'bar',_this});
                        }, response => {
                            console.log("error");
                        }
                    );
                   // for (let i=0;i< _this.monthSl.length;i++) {
                   //     xData[i]= _this.monthSl[i].dt;
                   //     yData[i]= _this.monthSl[i].sum;
                   // }

                    //_this.$options.methods.loadChart2({x: xData, y: yData,id,t: 'bar',_this});
                });
                //结束
            },
            loadChart2: function (val) {//月水量
                let myChart = echarts.init(document.getElementById('myCharts'));
                var options = {
                    color: ['#3398DB'],
                    tooltip: {},
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '10%',
                        right: '14%',
                        bottom: '13%',
                        top: '5%'
                    },
                    xAxis: {
                        data: val.x
                    },
                    yAxis: {},
                    series: [{
                        name: '用水量',
                        type: val.t,
                        data: val.y,
                        barMaxWidth:30,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    }]
                };
                myChart.setOption(options);
            /*    let _this=this;
                myChart.on('click', function (params) {
                    let xname = params.name,
                        mdData = [], xdData = [], ydData = [];
                    for (let i=0;i< _this.daySl.length;i++) {
                       // mdData.push(value.ydt);
                        mdData[i]= _this.daySl[i].ydt;
                        //xdData.push(value.rdt);
                        xdData[i]= _this.daySl[i].rdt;
                       // ydData.push(parseFloat(value.sum));
                        ydData[i]= _this.daySl[i].sum;
                    }
                    _this.$options.methods.loadChart3({x: xdData, y: ydData, z: mdData, xname,t: 'bar',_this});
                });*/
                let _this=val._this;
                //let _this=this;
                myChart.on('click', function (params) {
                    let xname = params.name,
                        id=val.id,
                        xData = [], yData = [],
                        daySl=[];
                    let paramDdata={
                        id:id,
                        month:xname
                    }
                    paramDdata=encodeURI(encodeURI(JSON.stringify(paramDdata)));
                    _this.$http.jsonp(API.GQ_CONTENT_D + "&params=" + paramDdata).then(
                        response => {
                            console.log(response.data);
                            daySl = response.data.day;
                            for (let i=0;i< daySl.length;i++) {
                                xData[i]= daySl[i].dt;
                                yData[i]= daySl[i].sum;
                            }
                            _this.$options.methods.loadChart3({x: xData, y: yData,id,t: 'bar',_this});
                        }, response => {
                            console.log("error");
                        }
                    );
                  /*  for (let i=0;i< _this.daySl.length;i++) {
                        xData[i]= _this.daySl[i].dt;
                        yData[i]= _this.daySl[i].sum;
                    }
                    _this.$options.methods.loadChart3({x: xData, y: yData,id,t: 'bar',_this});*/
                });

            },
            loadChart3: function (val) {//日水量
                let myChart = echarts.init(document.getElementById('myCharts'));
               /* let m1,m2,
                    xdata = [],ydata = [];

                for( let i=0;i<=val.z.length;i++){
                    if(val.z[i] === val.xname){
                        m1 = i;
                        break;
                    }
                }
                for( let i =m1;i<=val.z.length;i++){
                    if(val.z[i] !== val.xname){
                        m2 = i;
                        break;
                    }
                }
                for(let j = 0,i = m1,k = m2;j < k-i ;j++ ){
                    xdata[j] = val.x[i+j];
                    ydata[j] = val.y[i+j];
                }*/
                var options = {
                    color: ['#3398DB'],
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '10%',
                        right: '14%',
                        bottom: '13%',
                        top: '5%'
                    },
                    xAxis: {
                        data: val.x
                    },
                    yAxis: {},
                    series: [{
                        name: '用水量',
                        type: val.t,
                        data: val.y,
                        barMaxWidth:30,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    }]
                };
                myChart.setOption(options);
                let _this=val._this;
               // let _this=this;
              /*  myChart.on('click', function (params) {
                    let xname = params.name,
                        dhData = [], xhData = [], yhData = [];
                    for (let i=0;i< _this.hourSl.length;i++) {
                        //dhData.push(value.ddt);
                        dhData[i]= _this.hourSl[i].ddt;
                        //xhData.push(value.hdt);
                        xhData[i]= _this.hourSl[i].hdt;
                        //yhData.push(parseFloat(value.sum));
                        yhData[i]= _this.hourSl[i].sum;
                    }
                    _this.$options.methods.loadChart4({x: xhData, y: yhData, z: dhData, xname,t: 'bar'})
                });*/
                myChart.on('click', function (params) {
                    let xname = params.name,
                        id=val.id,
                        xData = [], yData = [],
                        hourSl=[];
                    let paramHdata={
                        id:id,
                        day:xname
                    }
                    paramHdata=encodeURI(encodeURI(JSON.stringify(paramHdata)));
                    _this.$http.jsonp(API.GQ_CONTENT_H + "&params=" + paramHdata).then(
                        response => {
                            console.log(response.data);
                            hourSl = response.data.hour;
                            for (let i=0;i< hourSl.length;i++) {
                                xData[i]= hourSl[i].dt;
                                yData[i]= hourSl[i].sum;
                            }
                            _this.$options.methods.loadChart4({x: xData, y: yData,t: 'bar',_this});
                        }, response => {
                            console.log("error");
                        }
                    );
                  /*  for (let i=0;i< _this.hourSl.length;i++) {
                        xData[i]= _this.hourSl[i].dt;
                        yData[i]= _this.hourSl[i].sum;
                    }
                    _this.$options.methods.loadChart4({x: xData, y: yData,t: 'bar',_this});*/
                });
            },
            loadChart4: function (val) {//小时水量
                let myChart = echarts.init(document.getElementById('myCharts'));
                    myChart.off('click');
               /* let m1,m2,
                    xdata = [],ydata = [];
                for( let i=0;i<=val.z.length;i++){
                    if(val.z[i] === val.xname){
                        m1 = i;
                        break;
                    }
                }
                for( let i =m1;i<=val.z.length;i++){
                    if(val.z[i] !== val.xname){
                        m2 = i;
                        break;
                    }
                }
                for(let j = 0,i = m1,k = m2;j < k-i ;j++ ){
                    xdata[j] = val.x[i+j];
                    ydata[j] = val.y[i+j];
                }*/
                var options = {
                    color: ['#3398DB'],
                    legend: {
                        show: false
                    },
                    grid: {
                        left: '10%',
                        right: '14%',
                        bottom: '13%',
                        top: '5%'
                    },
                    xAxis: {
                        data: val.x
                    },
                    yAxis: {},
                    series: [{
                        name: '用水量',
                        type: val.t,
                        data: val.y,
                        barMaxWidth:30,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    }]
                };
                myChart.on('click', function (params) {});
                myChart.setOption(options);

            },
        }
    }
</script>

<style>

    .wt-title-line {
        position: relative;
    }

    .wt-title-line:after {
        border-width: 0 0 1px 0;
        width: 200%;
        height: 200%;
        display: block;
        content: "";
        border: 1px solid #e6e6e6;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        pointer-events: none;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        transform-origin: left top;
        -webkit-transform-origin: left top;
    }

    .wt-list-more {
        display: block;
        font-size: 1rem;
        color: #62ab00;
        height: 34px;
        line-height: 34px;
        text-align: center;
        padding: 5px 15px 10px;
        /* margin:-5px -10px; */
    }

    .wt-list-info {
        padding: 5px 0;
    }

    .wt-list-line {
        display: -webkit-box;
        line-height: 24px;
        color: #333;
        font-size: 0.75rem;
    }

    .wt-list-line label {
        display: block;
        color: #666;
        font-size: 0.875rem;
    }

    .wt-list-line p {
        width: 100%;
        -webkit-box-flex: 1;
        box-flex: 1;
        margin: 0;
        padding: 0;
        font-size: 0.875rem;
        color: #333;
    }

    .g-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .classify-tags {
        box-flex: 1;
        -webkit-box-flex: 1;
        display: inline-block;
        padding: 0.3125rem 0 0;
    }

    .classify-tags a {
        display: inline-block;
        font-size: 0.875rem;
        color: #666;
        height: 26px;
        line-heigt: 26px;
        box-sizing: border-box;
        -webkit-border-radius: 3px;
        margin-right: 10px;
        padding: 0 6px;
        border: 1px solid #ccc;
    }

    .classify-tags .select {
        color: #3cb950;
        border: 1px solid #3cb950;
    }

    .wt-list-red {
        font-size: 1.125rem;
        color: #e54b00;
        font-weight: 600;
    }

    .wt-list-reds {
        font-size: 0.875rem;
        color: #e54b00;
        font-weight: 600;
    }
</style>