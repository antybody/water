<!--获取取水户信息-->
<template>
    <list>
        <list-item nested="input" class="fixed_div">
            <field>
                <field-input v-model="inputname" placeholder=""></field-input>
            </field>
            <a @click="queryWatuser()">
                <icon slot="img" name="search"></icon>
            </a>
        </list-item>
        <!--取水户-->
        <div style="margin-top: 46px;">
            <list-item v-for="list in qshLists">
                <a class="content" slot="after" @click="getQshInfo(list)"> {{list.watuserName}}</a>
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
            this.$http.jsonp(API.QSH_LIST + "&params=" + params2).then(
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
            getQshInfo(name) {
                //将选择的信息传递到parent
                VueEvent.$emit('watuser', name);
                console.log(this.layerid);
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
