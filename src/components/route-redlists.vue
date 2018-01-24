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
        <modal role="confirm" title="提示信息" :isOpen="open2" @Confirm="confirm()" @Close="modalOutFun('open2')">{{alertText}}</modal>
    </list>

</template>

<script>
import * as util from '../libs/utils'
export default {
    components: {},
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
</style>
