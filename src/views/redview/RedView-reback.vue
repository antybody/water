/**
  水功能区反馈
 */
<template>
  <vue-view slot="offcanvas">
      <navbar slot="header" class="wt-linear-blue" style="z-index:1010;">
          水功能区现场反馈
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>          
        </navbar>
       <group noPadded class="group-clear">
        <div style="padding:5px 15px 0">
           <div class="wt-list-info">
                <div class="wt-list-line">
                    <label>名称：</label>
                    <p class="g-overflow">
                        吴淞江
                    </p>
                </div>
                <div class="wt-list-line">
                    <label>巡检位置：</label>
                    <p class="g-overflow">
                        杨浦区军工路3988号
                    </p>
                </div>
                <div class="wt-list-line">
                    <label>巡检时间：</label>
                    <p class="g-overflow">
                        2017-12-12 09:30
                    </p>
                </div>
                <div class="wt-list-line">
                    <label>巡检人员：</label>
                    <p class="g-overflow">
                        张三
                    </p>
                </div>
           </div>
           <div class="wt-title-line"></div>
           <div class="wt-list-info">
                <div class="wt-list-lineover">
                    <label>现场情况：</label>
                    <p class="g-overflow">
                        <textarea placeholder="请输入"></textarea>
                    </p>
                </div>
                <div class="wt-list-lineover">
                    <label>备注：</label>
                    <p class="g-overflow">
                        <textarea placeholder="请输入"></textarea>
                    </p>
                </div>
           </div>
           <div class="wt-title-line"></div>
           <div class="wt-list-info">
               <div class="wt-list-lineover">
                   <label>现场照片：
                       <span class="wt-lits-subtilte">最多上传6张</span>
                       <span style="float:right">{{imgLists.length}}/6</span>
                    </label>
                   
                   <p class="g-overflow">
                       <!-- <span class="js_add_img"> -->
                           <!-- <i  class="icon_add_gray" @click="open('offcanvas5')"></i> -->
                        <span class="input-add-img-box">
                           <input id="imgupload" class="input-add-img" type="file" accept="image/*"  />
                        </span>
                       <!-- </span> -->
                       <ul class="upload-pre-img" v-show="imgLists.length >0">
                           <li v-for="item in imgLists" :key="imgLists.index">                               
                               <div><img :src="item.url"></div>
                               <span class="upload-pre-del"><i class="icons-e616" @click="delImg(item)"></i></span>
                           </li>
                           <vue-button block @buttonClick="imgSubmit()">提交照片</vue-button>
                       </ul>
                   </p>
               </div>
           </div>
           <vue-button block orange @buttonClick="formSubmit()"> 提交反馈 </vue-button>
        </div>
       </group>
       <!-- 从下向上 弹出框组件-->
       <offcanvas style="height:4.375rem" sildewh="82%" silde="top" :open="offcanvas5" @Close="close('offcanvas5')">
            <div style="padding:0.3125rem;">
                <vue-button block>拍照</vue-button>
                <vue-button block>从手机相册选择</vue-button>
            </div>
        </offcanvas>
        <!--提醒不能超过-->
        <modal role="alert" title="提醒" :isOpen="open3"  @Close="modalOutFun('open3')">不能超过6张图</modal>
        <!-- 确定删除该图片 -->
        <modal role="confirm" title="提醒" :isOpen="open2" @Confirm="del()" @Close="modalOutFun('open2')">确定删除？</modal>
  </vue-view>
</template>

<script>
import ImageUpload from "../../libs/imageUpload"
import Vue from 'vue'
export default {
    data(){
        return {
              offcanvas5: false,
              imgLists:[],
              imgUpload:false,
              imgIndex:0,
              open2:false,
              open3:false,
              selectDel:-1
        }
    },
    mounted(){
         var imgload = new ImageUpload({
            inputEl: '#imgupload',
            showEl:false,
            isCompress: true,
            isDev: false
        }, (blob) => {
            if(this.imgLists.length < 6){
              this.imgLists.push({id:this.imgIndex,url:blob});
              this.imgIndex +=1;
            }
            else
              this.open3 = true;              
        })
    },
    methods:{
        close(value,push){
            this[value] = false;
            if (push) this[push] = false;
        },
        open(value, push) {
            this[value] = true
            if (push) this[push] = true
        },
        delImg(item){ // 点击弹出回调
            this.open2 = true
            this.selectDel = item.id;
            console.log(item);
        },
        modalOutFun(value) {
            this[value] = false
        },
        del(){ // 确定删除
            let j = 0;
            this.imgLists.forEach(element => {                
                if(element.id == this.selectDel)
                    this.imgLists.splice(j,1);
                j += 1;                  
            });
            
            this.modalOutFun('open2');
        },
        formSubmit(){
            console.log("提交表单信息");
        },
        imgSubmit(){
            console.log("提交照片信息");
        }
    }
}
</script>

<style>
  .upload-pre-del{
      position: relative;
      color:#000;
      /* border:1PX solid #bfbfbf; */
      font-size:0.75rem;
      width:76px;
      display:block;
      text-align: center;
  }
  .wt-lits-subtilte{
      color:#e54c00;
      font-size:0.75rem;
  }
  .upload-pre-img{
      margin:0;
      padding:0;
  }
  .upload-pre-img li img{
      width:76px;
      height: 76px;
  }
  .upload-pre-img li{
      float: left;      
      background:no-repeat center center;
      background-size:cover;
      border:1px solid #d9dadc;
      margin:0.3125rem 0.3125rem 0.3125rem 0;
  }
  .input-add-img{
      opacity: 0;
      height: 100%;
      width:100%;
  }
  .input-add-img-box{
      position: relative;
      width:77px;
      height:77px;
      border:2px dotted #d9dadc;
      display: block;
  }
  .input-add-img-box::after{
      width:39.5px;
      height: 2px;
  }
  .input-add-img-box::before{
      width:2px;
      height: 39.5px;
  }
  .input-add-img-box::before ,.input-add-img-box::after{

      content:" ";
      position: absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      background-color:#d9d9d9;
  }
  .wt-list-lineover label{
      display: block;
      color:#666;
      font-size:0.875rem;
  }
  .js_add_img{
      display: block;
      border:2px dotted #d9dadc;
      line-height:80px;
      text-align: center;
  }
  .js_add_img:hover{
      border:2px dotted #969696;
  }
  .icon_add_gray{
      background:url("../../../statics/images/base.png") 0 -2509px no-repeat;
      cursor: pointer;
      line-height:300px;
      overflow: hidden;
      width:35px;
      height: 35px;
      vertical-align: middle;
      display: inline-block;
  }
</style>
