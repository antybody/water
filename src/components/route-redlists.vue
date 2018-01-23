<!--巡检运维列表标签组件-->
<template>
    <list style="margin-top:0px">
        <list-item v-for="item in lists" :key="item.id" :title="item.title" :href="item.href">
            <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt="">
            <span slot="subTitle">
                <span class="list-label label-new">New</span>
                <span class="list-label label-error">{{item.errorType}}</span>
                <span class="list-label label-error">{{item.xjType}}</span>
            </span>
            <i v-if="item.xjType === '未加入巡检计划'" class="icons-e60c" slot="after" @click="addPlan()"></i>
        </list-item>
        <!--progress存在则显示带进度条的列表 超许可水量-->
        <list-item v-if="item.progress || item.progress === 'cxksl'" v-for="item in lists" :key="item.id" :title="item.title" :href="item.href">
            <img slot="img" src="http://lorempixel.com/160/160/people/" width="58" alt="">
            <span slot="subTitle">
                <cell><small>取水量</small><span class="progress" :style="{width: item.width1, background: item.color}"></span></cell>
                <cell><small>许可量</small><span class="progress" :style="{width: item.width2, background: item.color}"></span></cell>
                <!--<span class="list-label label-error">{{item.errorType}}</span>-->
                <!--<span class="list-label label-error">{{item.xjType}}</span>-->
            </span>
            <span slot="after">30%</span>
        </list-item>
        <modal role="confirm" title="提示信息" :isOpen="open2" @Confirm="confirm()" @Close="modalOutFun('open2')">{{alertText}}</modal>
    </list>

</template>

<script>
    import VueButton from "../../node_modules/vue-amazeui/src/components/button/button.vue"
    import * as util from '../libs/utils'
export default {
    components: {VueButton},
    props: ['lists'],
    data () {
      return {
        // id: this.item.id
          open2: false,
          alertText: ''
      }
    },
    methods: {
        addPlan(){
            this.open2 = true,
            this.alertText = "是否确认加入巡检";
            return;
        },
        // 隐藏提示框
        modalOutFun(value) {
            this[value] = false
        },
        // 显示提示框
        modalOpFun(value) {
            this[value] = true
        },
        //弹框确认事件
        confirm(){
            console.log("确认加入巡检计划");
            this.modalOutFun('open2');
        }
    }
}
</script>

<style>
   /*新消息提醒*/
   .label-new{
       border: 1px solid red;
       color: red;
   }
   .label-error{
       border: 1px solid #ee8934;
       color: #ee8934;
   }
   .progress{
       height: 0.2rem;
       margin-left: 0.2rem;
       display: inline-block;
       line-height: 0.2rem;
       margin-top: 0.625rem;
   }
</style>
