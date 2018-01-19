import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'


import App from './App.vue'
import VueAmazeui from 'vue-amazeui'
import 'vue-amazeui/dist/static/css/vue-amazeui.css'
import '../statics/css/app.css'
import store from './store'
import FastClick from 'fastclick'

import {_beforeEnter} from '../src/libs/router'


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

import search from './views/redview/SearchView'
import redmap from './views/redview/RedView-map'
import sredmap from './views/redview/RedView-smap'
import qshDetail from './views/redview/RedView-qshDetail'

//巡检部分
import routeStation from './views/routeview/RouteView-station'
import routeReback from './views/routeview/RouteView-reback'
import routeDone from './views/routeview/RouteView-done'

// 页面权限部分
import forbidden from './views/userview/forbidden'
import error404 from './views/userview/404'
import login from './views/userview/login'
import loginInfo from './views/userview/loginInfo'
import help from './views/userview/help'
import person from './views/userview/person'
// 配置相关的路由规则
// 子页面的规则，第一个都为details / home (这个根据当前子页面属于哪个父下面来决定) / 看是否需要参数

console.log(_beforeEnter);
const router = new VueRouter({
    mode: 'hash',  //不想看到#号则配置这个 (可以用来解决与html本身锚点冲突的问题)
    routes: [
   		{ path: '/', redirect:'/redv1'},
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
            component:check,
            meta:{auth:true}
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
            path:'/search',
            name:'search',
            component:search
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
        },
        { 
            path:'/forbidden',
            name:'forbidden',
            component:forbidden
        },
        { 
            path:'/error404',
            name:'error404',
            component:error404
        },
        { 
            path:'/login',
            name:'login',
            component:login
        },
        { 
            path:'/loginInfo',
            name:'loginInfo',
            component:loginInfo
        },
        { 
            path:'/help',
            name:'help',
            component:help
        },
        { 
            path:'/person',
            name:'person',
            component:person
        }

    ]
})

// 注册跳转的钩子，判断是否需要等待验证
router.beforeEach((to,from,next) =>{
    _beforeEnter(to,from,next);
})


new Vue({
    el: '#app',
    router:router, //使用路由对象实例
    store:store,
    render: h => h(App)
  })