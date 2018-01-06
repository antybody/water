<template>
  <vue-view>
      <navbar slot="header" blue style="z-index:1010;">
          取水户基本信息
          <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>
       <group header="取水户基本信息">
           <field label="取水户" style="padding-left:10px;">：上海市城投供水有限公司</field>
           <grid avg="2">
               <cell>机构代码：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
               <cell>单位类别：11</cell>
           </grid>
       </group>
       <group header="上海城投原水有限公司" noPadded>
           <ul>
               <li>黄浦江取水口： 取水许可证A 10立方米</li>
               <li>黄浦江取水口： 取水许可证A 10立方米</li>
               <li>黄浦江取水口： 取水许可证A 10立方米</li>
               <li>黄浦江取水口： 取水许可证A 10立方米</li>
           </ul>
       </group>
       <group header="取用水监测" noPadded>
           
       </group>
  </vue-view>
</template>

<script>
export default {

}
</script>

<style>

</style>
