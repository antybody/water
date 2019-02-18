<!--获取取水户信息-->
<template>
    <ul class="chooseTable">
        <li @click="clickList('routeReback5')" v-show="userRole==='admin'" title="" href="#">
            <img title="选中取水户" style="text-align: center;" width="16" height="16"
                 src="../../statics/images/add.png"/>
            &nbsp;&nbsp;应急巡检

        </li>
        <li @click="clickList('routeReback1')" v-show="userRole==='xjy'" title="" href="#">
            <img title="选中取水户" style="text-align: center;"
                 width="16" height="16"
                 src="../../statics/images/add.png"/>
            &nbsp;&nbsp;取水巡检

        </li>
        <li @click="clickList('routeReback3')" v-show="userRole==='xjy'" title="" href="#">
            <img title="选中取水户" style="text-align: center;" width="16" height="16"
                 src="../../statics/images/add.png"/>
            &nbsp;&nbsp;流量计巡检

        </li>
    </ul>
</template>

<script>
    import * as API from '../store/api/api'
    import Vue from 'vue'
    import VueEvent from '../libs/VueEvent.js'
    import layer from 'vue-layer'

    export default {
        props: ['layerid', 'userRole'],
        data() {
            return {
                qshLists: [],
                inputname: ''
            }
        },
        mounted() {

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
            clickList(name) {
                this.$router.push({name: name});
                this.$layer.close(this.layerid);
            }

        }
    }
</script>

<style>
    .chooseTable {
        margin: 0 !important;
        padding-left: 0;
    }

    .chooseTable li {
        height: 30px !important;
        line-height: 30px !important;
    }

    .vl-notify.vl-notify-main {
        min-width: 200px;
    }

</style>
