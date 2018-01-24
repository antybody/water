<template>
    <vue-view>
        <navbar class="header" blue>
            巡检计划
            <icon name="left-nav" slot="left" titleRight="返回" back></icon>
        </navbar>

        <!--条件筛选区域-->
        <group noPadded class="group-clear">
            <div>
                <topquery :items="queryItems">  </topquery>
            </div>
            <routeRedlists :lists="lists"></routeRedlists>
        </group>
    </vue-view>
</template>

<script>
    import searchbar from '../../components/searchbar'
    import routeRedlists from '../../components/route-redlists'
    import topquery from '../../components/topquery'
    export default {
        components: {
            searchbar,topquery,routeRedlists
        },
        data() {
            return {
                totaldesc:'共计300户，颁证水量15万立方米',
                queryItems:[
                    {title:'巡检状态'}
                ],
                lists:[
                    {title:'上海宝信软件',errorType: '数据中断', href:'#', xjType: '巡检未完成'}
                    ,{title:'上海嘛哩屋',errorType: '日水量跳大',href:'#', xjType: '巡检未完成'}
                    ,{title:'上海报亭',errorType: '负值',href:'#', xjType: '巡检未完成'}
                    ,{title:'上海报亭',errorType: '数据异常',href:'#', xjType: '巡检未完成'}
                    ,{title:'上海报亭',errorType: '数据中断',href:'#', xjType: '巡检未完成'}
                    ,{title:'上海报亭',errorType: '数据中断',href:'#', xjType: '巡检未完成'}
                    ,{title:'上海报亭',errorType: '数据中断',href:'#', xjType: '巡检未完成'}
                ]
            }
        }
    }
</script>

<style>

</style>
