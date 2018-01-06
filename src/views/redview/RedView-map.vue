<template>
   <vue-view>
       <navbar slot="header" blue>
          地图查看
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
       <redmap :points="mapPoints"></redmap>
   </vue-view>
</template>

<script>
import redmap from '../../components/redmap'
export default {
    data(){
        return{
            mapPoints:[{lng:121.372882,lat:31.176523,name:'上海宝信'},
            {lng:121.604799,lat:31.217459,name:'上海宝信'},
            {lng:121.403122,lat:31.317181,name:'上海宝信'}]
       }
    },    
    components: {
      redmap
    },
    methods:{
        dragMap(){

        }
    }
}
</script>

<style>

</style>
