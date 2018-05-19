/**
*新闻详情
*/
<template>
    <div>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
            <icon name="left-nav" slot="left" back></icon>
        </navbar>
        <div class="primary">
            <h1 class="title">{{newsInfo.title}}</h1>
            <div class="meta pubtime">
                <span class="pubtime">来源：{{newsInfo.info_source}}</span>
                <span class="pubtime">时间：{{newsInfo.publish_time}}</span>
            </div>
            <div class="cont">
                <p class="text">
                    <!--<img src="">-->
                    <span class="image-desc"></span>
                </p>
                <p v-html="newsInfo.content"></p>
            </div>
        </div>
        <div class="isom">
            <span>作者：{{newsInfo.author_name}}</span>
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
            let paramData = {
                infoid: infoid
            }
            paramData = encodeURIComponent(JSON.stringify(paramData));
            this.$http.jsonp(API.NEWS_CONTENT + "&params=" + paramData).then(
                response => {
                    console.log(response.data.data[0]);
                    this.newsInfo = response.data.data[0];
                }, response => {
                    console.log("error");
                });
        },
        methods: {}
    }
</script>

<style>
    * {
        overflow: auto !important;
    }
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
