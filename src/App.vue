<template>
    <container fill direction="column">
        <tabbar slot="tabbar" class="am-view-push">
            <tabbar-item active icon="home" title="首页" @tabbarItemClick="tabbarItemClick('redv1')"></tabbar-item>
            <!-- <tabbar-item icon="bars" title="三条红线" href="/redv1"></tabbar-item> -->
            <tabbar-item icon="more" title="管理考核" @tabbarItemClick="tabbarItemClick('check')"></tabbar-item>
            <tabbar-item icon="gear" title="巡检运维" @tabbarItemClick="tabbarItemClick('route')"></tabbar-item>
            <tabbar-item icon="person" title="我的" @tabbarItemClick="tabbarItemClick('home')"></tabbar-item>
        </tabbar>
    </container>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            //登陆验证
            if (localStorage.getItem("_isUse") === 'false') {
                this.$router.push({name: 'home'});
                this.$layer.msg("请登录！");
            } else {
                this.$router.push({name: 'redv1'});
                console.log(this.$route);
            }
        },
        methods: {
            tabbarItemClick: function (e) {
                console.log(this.$route);
                console.log(localStorage.getItem("_isUse"));
                //登陆验证
                if (localStorage.getItem("_isUse") === 'false') {
                    this.$router.push({name: 'home'});
                    this.$layer.msg("请登录！");
                    console.log(localStorage.getItem("_isUse"));
                } else {
                    this.$router.push({name: e});
                }
            }
        }
    }
</script>

<style>
    .am-view-push {
        transition: transform .5s cubic-bezier(0.23, 1, 0.320, 1);
    }
</style>
