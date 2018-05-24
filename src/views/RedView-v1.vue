<!--新的界面样式-->
<template>
    <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
            上海水资源
            <icon name="more-vertical" slot="left"></icon>
            <!-- <icon name="person" slot="right" href="/home"></icon> -->
        </navbar>
        <!--圆形-->
        <group noPadded class="group-clear">
            <div class="wt-header">
                <!-- <div class="wt-text text-center">
                    <span class="wt-h-15">上海水资源</span>
                </div> -->
                <grid avg="4" align="center">
                    <cell :class="text-center" v-for="item in clists" :key="item.id">
                        <div class="wt-text">
                            <router-link :to="item.href">
                                <i :class="item.img"></i>
                                <span class="icon-title">{{item.title}}</span>
                            </router-link>
                        </div>
                    </cell>
                </grid>
            </div>
        </group>
        <!--可拖动的方框-->
        <group noPadded class="group-clear group-top-10">
            <div style="padding:0.625rem 0">
                <h5 class="wt-title">
                    <div class="wt-title-center"><i class="wt-bar-i-16 red-c"></i><span>红线指标</span></div>
                </h5>
                <div class="wt-tab-lists">
                    <router-link :to="item.href" v-for="item in tablists" :key="item.id" :class="item.cl">
                        <span>{{item.num}}</span>
                        <span>{{item.text}}</span>
                    </router-link>
                </div>
            </div>
        </group>
        <!--新闻列表-->
        <group noPadded class="group-clear group-top-10">
            <h5 class="wt-title">
                <div class="wt-title-center"><i class="wt-bar-i-16 red-news"></i><span>水利热点</span></div>
            </h5>
            <list>
                <list-item :key="item.id" v-for="item in newlists" :title="item.txt" :href="item.href"
                           :after="item.date">
                   <span slot="subTitle">
                        <span class="list-label label-red">{{item.createTime}}</span>
                    </span>
                </list-item>
            </list>
        </group>

        <!--<div class="get-more theme-blue">-->
            <!--<a href="javascript:void(0)">更新新闻</a>-->
        <!--</div>-->
    </vue-view>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import * as API from '../store/api/api'

    export default {
        data() {
            return {
                clists: [
                    {href: '/qsh', img: 'wt-bar-i-46 wt-bar-1', title: '地表取水户'},
                    {href: '/xkz', img: 'wt-bar-i-46 wt-bar-3', title: '取水许可证'},
                    {href: '/redsyd', img: 'wt-bar-i-46 wt-bar-5', title: '水源地'},
                    {href: '/dysh', img: 'wt-bar-i-46 wt-bar-8', title: '大用水户'},
                    {href: '/redsyd', img: 'wt-bar-i-46 wt-bar-5', title: '水源地'},
                    {href: '/redsgnq', img: 'wt-bar-i-46 wt-bar-6', title: '水功能区'},
                    {href: '/redxc', img: 'wt-bar-i-46 wt-bar-7', title: '咸潮'},
                    {href: '/redsgnqjc', img: 'wt-bar-i-46 wt-bar-5', title: '水文测站'}

                ],
                tablists: [
                    {href: 'redwater', cl: 'wt-linear-purple', num: '30', text: '年度取水总量'},
                    {href: '/cxksl', cl: 'wt-linear-blue', num: '30', text: '超许可取水'},
                    {href: '/xkz', cl: 'wt-linear-red', num: '30', text: '取水许可超期'},
                    {href: '/sgnq', cl: 'wt-linear-yellow', num: '30%', text: '水功能区达标率'}
                ],
                newlists: [
                    {href: '/newDetail/12233', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'},
                    {href: '/', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'},
                    {href: '/', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'},
                    {href: '/', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'},
                    {href: '/', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'},
                    {href: '/', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'},
                    {href: '/', title: '供水行业全力落实防寒潮各项防冻保暖措施', date: '2018-01-08'}

                ]
            }
        },
        computed: {
            // ...mapState({
            //     tablists:state => state.red.tablists,
            //     newlists:state => state.red.newlists
            // })
        },
        mounted() {
            this.$http.jsonp(API.NEWS_LIST).then(
                response => {
                    //循环设置跳转地址 href
                    for (let value of response.data.data) {
                        value.href = "/newDetail/" + value.id;
                        // console.log(value);
                    }
                    this.newlists = response.data.data;
                }, response => {
                    console.log("error");
                });
        },
        created() {

        },
        methods: {
            ...mapActions([
                'getTabLists', 'getNewLists'
            ])
        }
    }
</script>

<style>
    .list-label {
        border-radius: 1px;
    }

    .wt-header {
        height: 12.3125rem;
        color: #3b3b3b;
    }

    .wt-linear-blue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #66c4ff, #5d85ff);
        background-image: linear-gradient(90deg, #66c4ff, #5d85ff);
    }

    .wt-text {
        font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
    }

    .wt-h-15 {
        display: block;
        height: 2.875rem;
        line-height: 2.875rem;
        font-size: 1rem;
        text-align: left;
        padding-left: 1.25rem;
    }

    .wt-bar-i-46 {
        display: block;
        height: 3rem;
        width: 3rem;
        margin: 0 auto;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .wt-bar-i-16 {
        display: block;
        height: 1.3125rem;
        width: 1rem;
        margin: 0 auto;
        float: left;
        padding: 0 0.625rem;
        line-height: 1.3125rem;
        /* box-shadow: 0 0 5px rgba(250,0,0,0.5); */
    }

    .wt-bar-1 {
        background: url('../../statics/images/1.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-2 {
        background: url('../../statics/images/2.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-7 {
        background: url('../../statics/images/7.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-3 {
        background: url('../../statics/images/3.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-4 {
        background: url('../../statics/images/4.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-5 {
        background: url('../../statics/images/5.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-6 {
        background: url('../../statics/images/6.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .wt-bar-8 {
        background: url('../../statics/images/8.png') no-repeat;
        background-size: 70%;
        background-position: 10px 10px;
    }

    .icon-title {
        font-size: .875rem;
        line-height: .3466666667rem;
    }

    .wt-text a {
        /* color:#ffffff; */
    }

    .wt-title {
        color: #434f65;
        padding: 0.625rem 0.9375rem;
        font-weight: 500;
        margin: 0;
    }

    .wt-title .red-c {
        background: url('../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .red-news {
        background: url('../../statics/images/article.png') no-repeat;
        background-size: 4px;
    }

    .wt-title-center {
        display: block;
        line-height: 1.125rem;
    }

    .wt-tab-lists {
        white-space: nowrap;
        overflow-x: auto;
    }

    .wt-tab-lists a {
        position: relative;
        display: inline-block;
        width: 10.3125rem;
        line-height: 4.375rem;
        height: 4.375rem;
        margin: 0.125rem 0.5rem;
        padding: 0 0.625rem;
        box-shadow: 0 0 0.2375rem rgba(117, 117, 117, 0.8);
    }

    .wt-linear-red {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #ff935c, #ff6e69);
        background-image: linear-gradient(270deg, #ff935c, #ff6e69);
    }

    .wt-linear-dblue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #4fa1f5, #3d61f5);
        background-image: linear-gradient(90deg, #4fa1f5, #3d61f5);
    }

    .wt-linear-blue {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #5ccfff, #69baff);
        background-image: linear-gradient(270deg, #5ccfff, #69baff);
    }

    .wt-linear-purple {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #8cb4ff, #699eff);
        background-image: linear-gradient(270deg, #8cb4ff, #699eff);
    }

    .wt-linear-lgreen {
        color: #ffffff;
        background-image: -webkit-linear-gradient(90deg, #56f1dd, #21e1ce);
        background-image: linear-gradient(90deg, #56f1dd, #21e1ce);
    }

    .wt-linear-yellow {
        color: #ffffff;
        background-image: -webkit-linear-gradient(270deg, #fbb24f, #f9a32d);
        background-image: linear-gradient(270deg, #fbb24f, #f9a32d);
    }

    h3 {
        color: #3b3b3b;
        font-size: 0.875rem;
    }

    .get-more {
        text-align: center;
        padding: 10px 0 20px 0;
    }

    .get-more.theme-blue a {
        background-color: #498bf8;
        color: #fff;
    }

    .get-more a {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        padding: 0 20px;
        border: 1px solid #498bf8;
        border-radius: 14px;
        font-size: 12px;
        text-decoration: none;
        box-sizing: content-box;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
    }
</style>
