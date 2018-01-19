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
            t:'dbsqsh',
            openSearch:true
        }
    },
    mounted(){
        this.inputtext = this.$route.params.text
        this.t = this.$route.params.t
    },
    methods:{
        searchBar:function(){
           this.openSearch = true;
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
