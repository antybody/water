/**
  数据质量考核-水质评价
 */
<template>
  <vue-view class="container">
    <!--页面头部区域-->
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
         数据质量考核
         <icon name="left-nav" slot="left" titleRight="返回" back></icon>
      </navbar>
      <!--首页面头部方块切换页面，有问题 这里要插入 子页面了，路径配置不应该这样写-->
      <div class="wtabs-list">
        <ul class="wtabs">
          <li><router-link to="sjzl1">今日情况</router-link></li>
          <li><router-link to="sjzl2">取用水数据</router-link></li>
          <li class="ac"><router-link to="sjzl3">水质评价数据</router-link></li>
        </ul>
      </div>
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
    -webkit-box-flex:1;
    flex:1;
    text-align: center;
    font-size:16px;
    padding-top:5px;
  }
  .container{
    background:#fff;
  }
  .wtabs{
    width:100%;
    height:40px;
    display: flex;
    border-bottom:1px dotted #eaeaea;
    flex-direction:row;
    margin:0;padding:0;
  }
  .ac{
    border-bottom:2px solid #19a0f0;
  }
  .ac a {
    color:#19a0f0;
  }
</style>
