import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'

import store from './store'

import App from './App.vue'
import VueAmazeui from 'vue-amazeui'
import 'vue-amazeui/dist/static/css/vue-amazeui.css'


Vue.use(VueAmazeui)

Vue.use(VueRouter)
Vue.use(vueResource)

import home from './views/HomeView'
// 配置相关的路由规则
// 子页面的规则，第一个都为details / home (这个根据当前子页面属于哪个父下面来决定) / 看是否需要参数
const router = new VueRouter({
    mode: 'hash',  //不想看到#号则配置这个 (可以用来解决与html本身锚点冲突的问题)
    routes: [
   		{ path: '/', redirect:'/home'},
        { path: '/home', component: home }       
    ]
})


new Vue({
    el: '#app',
    router:router, //使用路由对象实例
    render: h => h(App)
  })