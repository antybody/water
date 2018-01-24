/**
   已巡检
   2018.1.15 by diana 
 */
<template>
  <vue-view>
        <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
          巡检反馈
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
        </navbar>
       <group noPadded class="group-clear">
        <div style="padding:5px 15px 0">
            <div class="wt-list-info">
                <div class="wt-list-line">
                    <label>巡检站点：</label>
                    <p class="g-overflow">
                        测试
                    </p>
                </div>
                <div class="wt-list-line">
                    <label>巡检地点：</label>
                    <p class="g-overflow">
                        测试
                    </p>
                </div>
                <div class="wt-list-line">
                    <label>巡检时间：</label>
                    <p class="g-overflow">
                        测试
                    </p>
                </div>
           </div>
           <div class="wt-title-line"></div>
           <div class="wt-list-info">
                <div class="wt-list-line">
                    <label>巡检原因：</label>
                    <p class="g-overflow">
                        <span class="list-label label-orange">数据中断</span>
                    </p>
                </div>
                <div class="wt-list-lineover">
                    <label>现场情况：</label>
                    <p class="g-overflow">
                        <textarea disabled placeholder="请输入"></textarea>
                    </p>
                </div>
                <div class="wt-list-lineover">
                    <label>备注：</label>
                    <p class="g-overflow">
                        <textarea disabled placeholder="请输入"></textarea>
                    </p>
                </div>
           </div>
           <div class="wt-title-line"></div>
           <div class="wt-list-info">
               <div class="wt-list-lineover">
                   <label>现场照片：</label>                   
                   <p class="g-overflow preview">
                       <span class="wt-img-preview" @click="pre_Handle()">
                            <img src="https://pic1.ajkimg.com/m/740070a6b8a69eccbd0304af848cc480/360x259x50m@2x.jpg?t=5">
                       </span>
                       <span class="wt-img-total">共6张</span>
                   </p>
               </div>               
           </div>
           <div class="wt-title-line"></div>
        </div>
       </group>
       <imgpreview :imgLists="imgLists" @closeImg="closeImg" :imgpreshow="imgpreshow"></imgpreview>
  </vue-view>
</template>

<script>
import imgpreview from '../../components/imgpreview'
export default {
    data(){
        return{
            imgpreshow:false,
            imgLists:[{url:'https://pic1.ajkimg.com/m/8389b835e4359a9bd72ac9963c577b5b/360x256x50m@2x.jpg?t=5'},
                      {url:'https://pic1.ajkimg.com/m/3b16b69a28afbbe9a64524910cc6770c/360x196x50m@2x.jpg?t=5'},
                      {url:'https://pic1.ajkimg.com/m/5e2f7159ef57d232a959d536f59ef18c/360x278x50m@2x.jpg?t=5'},
                      {url:'https://pic1.ajkimg.com/m/a7dd9500dde36d8b70be292ddb90afca/360x254x50m@2x.jpg?t=5'}]
        }
    },
    components: {
      imgpreview
    },
    methods:{
        closeImg:function(){
            this.imgpreshow = false;
        },
        // 点击照片后切换到照片预览效果
        pre_Handle:function(){ 
            this.imgpreshow = true;
        }
    }

}
</script>

<style>
.preview{
    position: relative;
}
.wt-img-total{
    position: absolute;
    bottom:10px;
    right:0;
    height: 24px;
    padding:0 6px;
    line-height: 24px;
    border-radius:10px;
    background:rgba(0,0,0,0.5);
    color:#fff;
    font-size:0.75rem;
}
</style>
