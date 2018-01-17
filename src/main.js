import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'


import App from './App.vue'
import VueAmazeui from 'vue-amazeui'
import 'vue-amazeui/dist/static/css/vue-amazeui.css'
import '../statics/css/app.css'
import store from './store'
import FastClick from 'fastclick'


FastClick.attach(document.body);
Vue.use(VueAmazeui)

Vue.use(VueRouter)
Vue.use(vueResource)

import home from './views/HomeView'
import red from './views/RedView'
import redv1 from './views/RedView-v1'
import check from './views/CheckView'
import route from './views/RouteView'
import qsh from './views/redview/RedView-query'
import redwater from './views/redview/RedView-water'

import redmap from './views/redview/RedView-map'
import sredmap from './views/redview/RedView-smap'
import qshDetail from './views/redview/RedView-qshDetail'

//巡检部分
import routeStation from './views/routeview/RouteView-station'
import routeReback from './views/routeview/RouteView-reback'
import routeDone from './views/routeview/RouteView-done'
// 配置相关的路由规则
// 子页面的规则，第一个都为details / home (这个根据当前子页面属于哪个父下面来决定) / 看是否需要参数
const router = new VueRouter({
    mode: 'hash',  //不想看到#号则配置这个 (可以用来解决与html本身锚点冲突的问题)
    routes: [
   		{ path: '/', redirect:'/home'},
        { path: '/home', component: home },
        { 
            path:'/red',
            component:red
        },
        { 
            path:'/redv1',
            component:redv1
        },
        { 
            path:'/check',
            component:check
        },
        { 
            path:'/route',
            component:route
        },
        { 
            path:'/qsh',
            component:qsh
        },
        { 
            path:'/redwater',
            component:redwater
        },
        { 
            path:'/redmap/:kt',
            name:'redmap',
            component:redmap
        },
        { 
            path:'/qshDetail/:id',
            component:qshDetail
        }, 
        {
            path: '/routeStation',
            component: routeStation
        },
        { 
            path:'/smap',
            name:'smap',
            component:sredmap
        },
        { 
            path:'/reback',
            name:'reback',
            component:routeReback
        },
        { 
            path:'/redone',
            name:'redone',
            component:routeDone
        }

    ]
})


new Vue({
    el: '#app',
    router:router, //使用路由对象实例
    store:store,
    render: h => h(App)
  })