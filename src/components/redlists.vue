<template>
    <list style="margin-top:0px">
        <list-item v-for="item in lists" :key="item.id" :title="item.title" :href="item.href">
            <!-- <img slot="img" src="http://lorempixel.com/160/160/people/" width="48" alt=""> -->
            <span slot="subTitle">
                <span class="list-label label-orange">{{item.tag1}}</span>
                <span class="list-label label-white">{{item.tag2}}</span>
                <span class="list-label label-blue">{{item.tag3}}</span>
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
</style>
