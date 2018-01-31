/**
 * 水源地详细信息
 */
<template>
  <vue-view>
      <navbar slot="header" class="wt-linear-blue">
          水源地基础信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>   
      </navbar>
      <group noPadded class="group-clear">
          <ul class="wt-tabs">
              <li class="cur"><span>青草沙上游水源地</span></li>
              <li><span>陈行新头部</span></li>
              <li><span>陈行新头部</span></li>
              <li><span>陈行新头部</span></li>
              <li><span>陈行新头部</span></li>
          </ul>
          <div>

          </div>
      </group>
      <group noPadded class="group-clear">
          <grid></grid>
      </group>
  </vue-view>
</template>

<script>
export default {

}
</script>

<style>
.wt-tabs{
    transition-duration:600ms;
    transition-timing-function:cubic-bezier(0.1, 0.57, 0.1, 1);
    transform:translate(0px, 0px) translateZ(0px);
    margin:0;
    padding:0;
    white-space:nowrap;
    overflow:hidden;
}
.wt-tabs li:first-child{
    margin-left:0;
}
.wt-tabs li{
    display:inline-block;
    position: relative;
    height:100%;
    font-size:1rem;
    line-height:50px;
    text-align: center;
    padding:0 15px;
}
.wt-tabs .cur span{
    color:#deb260;
    border-color:#deb260;
}
.wt-tabs .cur:after{
   content:'';
   position: absolute;
   display:block;
   top:0;
   left:0;
   width:100%;
   height:100%;
   border-bottom: 2px solid #deb260;
   z-index: 1;
}
</style>
