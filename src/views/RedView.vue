<template>
   <vue-view>
       <navbar slot="header" blue>三条红线</navbar>
        <div class="grid">
            <div class="cell-1"><router-link to="/redwater"><div class="cell"> 年度取水总量 <span class="col-red"> 62.9</span>亿立方米</div></router-link></div>
            <div class="cell-1"><div class="cell"> 超许可取水 <span class="col-red">&nbsp;62</span>户</div></div>
            <div class="cell-1"><div class="cell"> 取水许可超期 <span class="col-red"> 10</span>本</div></div>
            <div class="cell-1"><div class="cell"> 年度水功能区达标率 <span class="col-red"> 62.9</span>%</div></div>
        </div>
        <group header="用水总量" noPadded>
            <grid avg="4" bordered  class="textcenter">
                <cell v-for="item in items" :key="item.id">                  
                    
                    <router-link :to='item.href'>
                        <div>
                        <icon :name='item.icon' :href='item.href'>
                        </icon>
                        </div>
                        {{item.txt}}
                    </router-link>
                    
                </cell>
            </grid>
        </group>
        <group header="用水效率" noPadded>
            <grid avg="4" bordered class="textcenter">
                <cell v-for="item in items" :key="item.id">
                    <router-link :to='item.href'>
                        <div>
                        <icon :name='item.icon' :href='item.href'>
                        </icon>
                        </div>
                        {{item.txt}}
                    </router-link>
                </cell>
            </grid>
        </group>
        <group header="纳污总量" noPadded>
            <grid avg="4" bordered class="textcenter">
                <cell v-for="item in items" :key="item.id">
                    <router-link :to='item.href'>
                        <div>
                        <icon :name='item.icon' :href='item.href'>
                        </icon>
                        </div>
                        {{item.txt}}
                    </router-link>
                </cell>
            </grid>
        </group>
        <group header="监测考核" noPadded>
            <grid avg="4" bordered class="textcenter">
                <cell v-for="item in items" :key="item.id">
                    <router-link :to='item.href'>
                        <div>
                        <icon :name='item.icon' :href='item.href'>
                        </icon>
                        </div>
                        {{item.txt}}
                    </router-link>
                </cell>
            </grid>
        </group>
   </vue-view>
</template>

<script>
export default {
     data(){
         return {
             items:[
                 {icon:'home',txt:'取水户',href:'qsh'},
                 {icon:'bars',txt:'取水户',href:'#'},
                 {icon:'home',txt:'取水户',href:'#'},
                 {icon:'bars',txt:'取水户',href:'#'},
                 {icon:'home',txt:'取水户',href:'#'},
                 {icon:'bars',txt:'取水户',href:'#'}
             ]
         }
     }
}
</script>

<style>
  .textcenter{
      text-align:center!important;
  }
  .cell-1{
      flex:0 0 25%;
      -webkit-box-flex:0;
      max-width:25%;
      padding:0.3125rem;
  }
  .grid{
      flex-wrap: wrap;
      display: flex;
      position: relative;
      padding-top:0.9375rem;
  }
  .cell{
     background-color: #0e90d2;
     font-size: 0.8125rem;
     color:#f2f2f2;
     padding:0.3125rem;
  }
</style>



