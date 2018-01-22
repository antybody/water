<!--报警站点 地图显示-->
<template>
    <vue-view>
        <navbar class="header" blue>
            报警站点
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
            <!--列表显示-->
            <icon name="more-vertical" slot="right" href="/route" ></icon>
        </navbar>
        <red-map :points="mapPoints"></red-map>
    </vue-view>
</template>

<script>
    //加载地图组件
    import { mapState, mapActions } from 'vuex'
    import redMap from '../../components/redmap'
    import routeRedlists from '../../components/route-redlists'
    import Vue from 'vue'
    export default {
        components: {
            redMap
        },
        data(){
            return{
//                 mapPoints:[
//                     {lng:121.372882,lat:31.176523,name:'上海宝信'},
//                     {lng:121.604799,lat:31.217459,name:'上海宝信'},
//                     {lng:121.403122,lat:31.317181,name:'上海宝信'}
//                     ]
            }
        },
        watch: {

        },
        computed: {
            ...mapState({
                loading: state => state.redmap.loading,
                mapPoints: state => state.redmap.mapPoints,
                mapQuery: state => state.redmap.mapQuery
            })
        },
        created(){
            this.getMapPoints();
            console.log(this.urlParam);
        },
        mounted(){
            console.log("加载完成");
            Vue.set(this.$store.state.redmap,"loading",false);
        },
        methods:{
            ...mapActions([
                'getMapPoints'
            ])

        }
    }
</script>

<style>

</style>
