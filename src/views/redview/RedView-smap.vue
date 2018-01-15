<template>
   <vue-view>
       <navbar slot="header" class="wt-linear-blue" style="z-index:1010">
          地图查看
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>

       <redmap :points="mapPoints"></redmap>

   </vue-view>
</template>

<script>
import redmap from '../../components/redmap'
import * as utils from '../../libs/utils'
export default {
    data(){
        return{
            
       }
    },    
    components: {
      redmap
    },
    computed: {
      mapPoints:function(){
          console.log(this.$route.params.list);
          let map = utils.buildJson(this.$route.params.list);
          console.log(map);
          return map
      }
    },
    created(){
        // this.getMapPoints();
        // console.log(this.urlParam);
    },
    filters:{
        
    },
    methods:{
        
    }
}
</script>

