/**
  个人信息
 */
<template>
  <vue-view>
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          个人信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
       </navbar>
       <group noPadded class="group-clear">
        <list>
            <list-item title="张三" class="wt-list-title"></list-item>
            <list-item title="手机号" after="155983342"></list-item>
            <list-item title="固定电话" after="155983342"></list-item>
            <list-item title="Email" after="4311@qq.com"></list-item>
            <list-item title="组织机构" after="水务局"></list-item>
            <list-item title="角色" after="管理员"></list-item>
        </list>
       </group>
  </vue-view>
</template>

<script>
export default {

}
</script>

<style>
.wt-list-title .item-title{
   font-weight: 700;
   text-align: center;
}
</style>
