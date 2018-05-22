<template>
    <list style="margin-top:0px">
        <!--取水户-->
        <list-item v-if="routeName == '/qsh'" v-for="item in lists" :key="item.watuserId" :title="item.watuserName" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.watuserWatapp}}</span>
                <span class="list-label label-white">{{item.watuserWorktype}}</span>
                <span class="list-label label-blue">{{item.wiuTp}}</span>
            </span>
        </list-item>
        <!--水功能区-->
        <list-item v-if="routeName == '/redsgnq'" v-for="item in lists" :key="item.wrReg2" :title="item.wfzNm" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.wtType}}</span>
                <span class="list-label label-white">{{item.belRiv}}</span>
                <span class="list-label label-blue">{{item.engManCd}}</span>
            </span>
        </list-item>
        <list-item v-show='showMore'>
            <div slot="subTitle" @click="loadMore()" class="wt-desc">
                <span>{{loadText}}</span>
            </div>
            <div slot="desc" class="wt-desc" v-show="back" @click.stop="backTop()">
                <span>返回顶部</span>
            </div>
        </list-item>

    </list>
</template>

<script>
export default {
    props: ['lists','next','total','showMore'],
    data () {
      return {
        // id: this.item.id
         loadText:'点击加载更多~~',
         isLoad:true,
         back:false,
         target:'',
         routeName: ''
      }
    },
    mounted(){
        console.log(this.$refs.viewBox);
        // this.target = this.$el.parentNode
        this.target = this.$el.parentNode.parentNode.parentElement
        this.target.addEventListener('scroll', this.showIcon,true)
        // 如果超过了，那么修正文字
        this.judgePage()
        this.routeName = this.$route.path
    },
    watch:{
        next(val,old){
           this.judgePage();
        }
    },
    beforeDestroy () {
     //  组件销毁的时候，需要删除scroll的监听事件。
      this.target.removeEventListener('scroll', this.showIcon())
    },
    methods:{
        loadMore(){
            let action = "";
            if(this.isLoad)
              this.$emit('loadMore');
            else
              console.log("没有更多了");
        },
        judgePage(){          
          if (this.next*10 >= this.total){
            this.loadText = '没有更多啦~~'
            this.isLoad = false
            this.back = false
          }
          if(this.next*10 >=20){
              this.back = true
          }
        },
        backTop(){
            console.log("返回顶部");
            let timer = setInterval(() => {
                let top = this.target.scrollTop
                let speed = Math.ceil(top / 5)
                this.target.scrollTop = top - speed
                if (top === 0) {
                  clearInterval(timer)
                 }
            }, 20)
        },
        showIcon () {
        //  根据scrollTop的值来判断是否显示返回顶部的icon
            if (this.target.scrollTop > 200) {
                this.back = true
                // this.$el.addEventListener('mouseover', this.addhoverClass)
                // this.$el.addEventListener('mouseout', this.addhoverClass)
            } else if (this.target.scrollTop < 200) {
                this.back = false
            }
        }
    }
}
</script>

<style>
   .list-label{
      margin:0 0.1rem;
      display: inline-block;
      height: 1.125rem;
      line-height: 1.125rem;
      padding:0 0.2rem;
      font-size:0.75rem;
      border-radius:0.2rem;
   }
   .label-blue{
       /* background-color:#f0f4f8; */
       border:solid 1px #6783ae;
       color:#6783ae;
   }
   .label-white{
       border:solid 1px #969696;
       /* background-color:#f0f4f8; */
       color:#969696;
   }
   .label-orange{
       border:solid 1px #e54c00;
       color:#e54c00;
   }
   .wt-desc-box{
       height:80px;
   }
   .wt-desc{
       display: block;
       background:#f3f2f2;
       height: 40px;
       width:100%;
       padding:10px;
       text-align: center;
   }
   .wt-desc span{
       color:#6783ae;
       font-size:0.875rem;
       letter-spacing:0.3125rem;
   }
   .wt-return-top{
       position: absolute;
       bottom:100px;right:10px;
       display: block;
       height:3.125rem;
       width:3.125rem;
       background:#ccc;
       line-height: 3.125rem;
       border-radius: 50%;
       text-align: center;
       z-index:1100;
   }
   .wt-return-top span{
       color:#fff;
       font-weight: 700;
   }
</style>
