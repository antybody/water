/**
  搜索条件
 */
<template>
   <searchbar :open="openSearch" :inputtext="inputtext" :searchtype="t" @closeBar="closeBar"></searchbar>
</template>

<script>
import searchbar from '../../components/searchbar'
export default {
    components:{
        searchbar
    },
    data(){
        return {
            inputtext:'',
            t:'',
            openSearch:true
        }
    },
    mounted(){
        console.log(this.$route.params.t);
        this.inputtext = this.$route.params.text;
        this.t = this.$route.params.t;
        console.log(this.t);
    },
    methods:{
        searchBar:function(){
           this.openSearch = true;
           alert();
       },
       closeBar(){
            // this.openSearch = false;
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>
