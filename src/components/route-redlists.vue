<!--巡检运维列表标签组件-->
<template>
    <list style="margin-top:0px">
        <list-item v-for="item in lists" :key="item.id" :title="item.title" :href="item.href">
            <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt="">
            <span slot="subTitle">
                <span class="list-label label-new">New</span>
                <span class="list-label label-error">数据中断</span>
                <span class="list-label label-error">未加入巡检计划</span>
            </span>
        </list-item>
    </list>
</template>

<script>
export default {
    props: ['lists'],
    data () {
      return {
        // id: this.item.id
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
