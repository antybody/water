/**
新闻详情
*/
<template>
    <div>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            <icon name="left-nav" slot="left" back></icon>
        </navbar>
        <div class="primary">
            <h1 class="title">最近5天 20省份29名政府副职履新</h1>
            <div class="meta">
                <div class="pubtime">2018 - 01 - 23
                11
                :
                58
                :
                59</div>
            </div>
            <div class="cont">
                <p class="text">
                    <img src="">
                    <span class="image-desc"></span>
                </p>
                <p class="text">近日，各省份的政府副职密集调整。</p>
                <p class="text">近日，各省份的政府副职密集调整。</p>
                <p class="text">近日，各省份的政府副职密集调整。</p>
                <p class="text">近日，各省份的政府副职密集调整。</p>
                <p class="text">近日，各省份的政府副职密集调整。</p>
                <p class="text">近日，各省份的政府副职密集调整。</p>
            </div>
        </div>
        <div class="isom">
            作者：水利水务事业部
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import * as API from '../../store/api/api'

    export default {
        data() {
            return {
                newsInfo: []
            }
        },
        created() {
            // let param = this.$route.params.id
            // console.log(param);
            //   this.$store.dispatch({type:'getNewDetail',id:param})
            //           .then(res =>{
            //               if(res.status === 200){
            //                   console.log('获取新闻');
            //               }
            //   });
        },
        mounted() {
            let infoid = this.$route.params.id;
            console.log(infoid);
            let params = {
                infoid: infoid
            }
            this.$http.jsonp(API.NEWS_CONTENT, {params: params}).then(
                response => {
                    console.log(response.data.data);
                    this.newsInfo = response.data.data;
                }, response => {
                    console.log("error");
                });
        },
        methods: {}
    }
</script>

<style>
    .primary {
        background: #fff;
        padding: 0 13px 0 13px;
    }

    .primary .title {
        font-size: 1.3125rem;
        color: #111;
        padding: 18px 0 11px;
        line-height: 31px;
        font-weight: 700;
        margin: 0;
    }

    .primary .meta {
        font-size: 12px;
        color: #888;
        overflow: hidden;
        line-height: 17px;
    }

    .primary .pubtime {
        height: 17px;
        display: inline-block;
        margin-right: 10px;
        overflow: hidden;
        font-family: Helvetica;
    }

    .primary .cont {
        padding-bottom: 15px;
    }

    .primary .cont .text {
        line-height: 1.5625rem;
        word-wrap: break-word;
        margin-bottom: 16px;
        text-align: justify;
        word-break: break-all;
        margin: 0;
        padding: 0;
    }

    .cont img {
        margin-bottom: 16px;
        max-width: 100%;
        margin: 0 auto;
        display: block;
        border: 0;
    }

    .isom {
        font-size: 14px;
        color: #999;
        margin: -15px 0 20px 0;
        line-height: 20px;
        border-left: 2px solid #999;
        padding-left: 8px;
    }
</style>
