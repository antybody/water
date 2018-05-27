/**
  数据质量考核-整体页面
 */
<template>
  <vue-view class="container">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         数据质量考核
         <icon name="left-nav" slot="left" titleRight="返回" back></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <ul class="wtabs">
        <li><router-link to="sjzl1">整体</router-link></li>
        <li><router-link to="sjzl2">取用水</router-link></li>
        <li><router-link to="sjzl3">水质与评价</router-link></li>
      </ul>
      <!--环形图-->
      <div>
        
      </div>
  </vue-view>
</template>

<script>
export default {
  data(){
     return {
       titleItems:[
                {icon:'home',txt:'整体',href:'sjzl1'},
                {icon:'bars',txt:'取用水',href:'sjzl1'},
                {icon:'home',txt:'水质与评价',href:'sjzl3'}
            ]
     }
  }
}
</script>

<style>
  .wtabs li {
    float:left;
    display:block;
    text-align: center;
    border-radius:3px;
    margin-right:15px;
    background:#f8f8f8;
    height:28px;
    line-height: 28px;
    padding:0 10px;
  }
  .container{
    background:#fff;
  }
</style>
