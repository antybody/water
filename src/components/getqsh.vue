<!--获取取水户信息-->
<template>
    <list>
        <list-item nested="input" class="fixed_div">
            <field>
                <field-input v-model="inputname" placeholder=""></field-input>
            </field>
            <a @click="queryMpInfo()">
                <icon slot="img" name="search"></icon>
            </a>
        </list-item>
        <!--取水户-->
        <div style="margin-top: 46px;">
            <!--<list-item v-for="list in qshLists">-->
                <!--<a class="content" slot="after" @click="getQshInfo(list)"> {{list.watuserName}}</a>-->
            <!--</list-item>-->
            <!--<-->
            <list-item v-for="list in mp_nm">
                <a class="content" slot="after" @click="getQshInfo(list.watuser_name,list.mp_nm,list.mp_q,list.acc_w,list.mp_cd,list.jsscnm,list.jsxh,list.jslx,list.x,list.y,list.jllx)"> {{list.mp_nm}}</a>
            </list-item>
        </div>

    </list>
</template>

<script>
    import * as API from '../store/api/api'
    import Vue from 'vue'
    import VueEvent from '../libs/VueEvent.js'
    import layer from 'vue-layer'

    export default {
        props: ['layerid'],
        data() {
            return {
                qshLists: [],
                mp_qsh:{},
                mp_nm: '',
                inputname: ''
            }
        },
        mounted() {
            //加载vue-layer组件
            Vue.prototype.$layer = layer(Vue);
            let params = {
                type: "query",
                wiuTp: '',
                watuserDivname: '',
                watuserCom: "",
                watuserWatapp: '',
                monitorlevel: '',
                watuserName:  '',
                currentPage: 10
            };
            // params = encodeURIComponent(JSON.stringify(params));
            let params2 = encodeURI(encodeURI(JSON.stringify(params)));
            // this.$http.jsonp(API.QSH_LIST + "&params=" + params2).then(
            this.$http.jsonp(API.COMPONENTS_QSH + "&params=" + params2).then(
                response => {
                    this.qshLists = response.data.data;
                    console.log(this.qshLists);
                }, response => {
                    console.log("error");
                });
        },
        watch: {
            next(val, old) {
                this.judgePage();
            }
        },
        beforeDestroy() {
            //  组件销毁的时候，需要删除scroll的监听事件。
            // this.target.removeEventListener('scroll', this.showIcon())
        },
        methods: {
            loadMore() {
                let action = "";
                if (this.isLoad)
                    this.$emit('loadMore');
                else
                    console.log("没有更多了");
            },
            judgePage() {
                if (this.next * 10 >= this.total) {
                    this.loadText = '没有更多啦~~'
                    this.isLoad = false
                    this.back = false
                }
                if (this.next * 10 >= 20) {
                    this.back = true
                }
            },
            backTop() {
                console.log("返回顶部");
                let timer = setInterval(() => {
                    let top = this.target.scrollTop
                    let speed = Math.ceil(top / 5)
                    this.target.scrollTop = top - speed
                    if (top === 0) {
                        clearInterval(timer)
                    }
                }, 20)
            },
            showIcon() {
                //  根据scrollTop的值来判断是否显示返回顶部的icon
                if (this.target.scrollTop > 200) {
                    this.back = true
                    // this.$el.addEventListener('mouseover', this.addhoverClass)
                    // this.$el.addEventListener('mouseout', this.addhoverClass)
                } else if (this.target.scrollTop < 200) {
                    this.back = false
                }
            },
            //查询取水户
            queryWatuser() {
                let params = {
                    type: "query",
                    wiuTp: '',
                    watuserDivname: '',
                    watuserCom: "",
                    watuserWatapp: '',
                    monitorlevel: '',
                    watuserName: this.inputname,
                    currentPage: 10000
                };
                // params = encodeURIComponent(JSON.stringify(params));
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.QSH_LIST + "&params=" + params).then(
                    response => {
                        this.qshLists = response.data.data;
                        console.log(this.qshLists);
                    }, response => {
                        console.log("error");
                    });
            },
            //根据监测点名称和监测点编码查询相关信息
            queryMpInfo() {
                //获取监测点信息
                let params = {
                    mp_cd: '',
                    mp_nm: this.inputname
                };
                params = encodeURI(encodeURI(JSON.stringify(params)));
                this.$http.jsonp(API.QUERY_LLL + "&params=" + params).then(
                    response => {
                        console.log(response.data)
                        this.mp_nm = response.data.cd
                        this.qshLists = response.data

                    }, response => {
                        console.log("error");
                    })

            },
            getQshInfo(watuser_name,mp_nm,mp_q,acc_w,mp_cd,jsscnm,jsxh,jslx,x,y,jllx) {
                //console.log('测试：');
                //console.log(tt);
                this.mp_qsh.watuser_name=watuser_name;
                this.mp_qsh.mp_nm=mp_nm;
                this.mp_qsh.mp_q=mp_q;
                this.mp_qsh.acc_w=acc_w;
                this.mp_qsh.mp_cd=mp_cd;
                this.mp_qsh.jsscnm=jsscnm;
                this.mp_qsh.jsxh=jsxh;
                this.mp_qsh.jslx=jslx;
                this.mp_qsh.x=x;
                this.mp_qsh.y=y;
                this.mp_qsh.jllx=jllx;
                //将选择的信息传递到parent
                VueEvent.$emit('watuser', this.mp_qsh);
                // console.log(this.layerid);
                this.$layer.close(this.layerid);
            }

        }
    }
</script>

<style>
    .fixed_div {
        position: fixed;
        margin-top: -46px !important;
        width: 100%;
        padding-right: 18px !important;
    }

    .vl-notify-content {
        margin-top: 0 !important;
        padding: 0 !important;
        height: 80% !important;
    }

    .list-label {
        margin: 0 0.1rem;
        display: inline-block;
        height: 1.125rem;
        line-height: 1.125rem;
        padding: 0 0.2rem;
        font-size: 0.75rem;
        border-radius: 0.2rem;
    }

    .label-blue {
        /* background-color:#f0f4f8; */
        border: solid 1px #6783ae;
        color: #6783ae;
    }

    .label-white {
        border: solid 1px #969696;
        /* background-color:#f0f4f8; */
        color: #969696;
    }

    .label-orange {
        border: solid 1px #e54c00;
        color: #e54c00;
    }

    .wt-desc-box {
        height: 80px;
    }

    .wt-desc {
        display: block;
        background: #f3f2f2;
        height: 40px;
        width: 100%;
        padding: 10px;
        text-align: center;
    }

    .wt-desc span {
        color: #6783ae;
        font-size: 0.875rem;
        letter-spacing: 0.3125rem;
    }

    .wt-return-top {
        position: absolute;
        bottom: 100px;
        right: 10px;
        display: block;
        height: 3.125rem;
        width: 3.125rem;
        background: #ccc;
        line-height: 3.125rem;
        border-radius: 50%;
        text-align: center;
        z-index: 1100;
    }

    .wt-return-top span {
        color: #fff;
        font-weight: 700;
    }
</style>
