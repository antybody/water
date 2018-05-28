﻿import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'


import App from './App.vue'
import VueAmazeui from 'vue-amazeui'
import 'vue-amazeui/dist/static/css/vue-amazeui.css'
import '../statics/css/app.css'
import store from './store'
import FastClick from 'fastclick'

import {_beforeEnter} from '../src/libs/router'

import Indicator from 'vue-indicator';

FastClick.attach(document.body);
Vue.use(VueAmazeui)

Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(Indicator)

// tab 切换

// 管理考核
// import check from './views/CheckView'
const check = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/CheckView'))
        // Indicator.close()
      },'group-check')
}
// 数据质量考核
const sjzl1 = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/checkview/CheckView-szsl1.vue'))
        // Indicator.close()
      },'group-check')
}
const sjzl2 = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/checkview/CheckView-szsl2.vue'))
        // Indicator.close()
      },'group-check')
}
const sjzl3 = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/checkview/CheckView-szsl3.vue'))
        // Indicator.close()
      },'group-check')
}
// 运维巡检考核
const ywkh1 = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/checkview/CheckView-ywkh1.vue'))
        // Indicator.close()
      },'group-check')
}
const ywkh2 = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/checkview/CheckView-ywkh2.vue'))
        // Indicator.close()
      },'group-check')
}
const ywkh3 = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/checkview/CheckView-ywkh3.vue'))
        // Indicator.close()
      },'group-check')
}

// 巡检
// import route from './views/RouteView'
const route = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/RouteView'))
        // Indicator.close()
      },'group-route')
}


// 取水户
// import qsh from './views/redview/RedView-query'
const qsh = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-query.vue'))
        // Indicator.close()
      },'group-qsh')
}
// import search from './views/redview/SearchView'
const search = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/SearchView.vue'))
        // Indicator.close()
      },'group-qsh')
}
// import redmap from './views/redview/RedView-map'
const redmap = r => {
    // Indicator.open();
    require.ensure([], () => {r(require('./views/redview/RedView-map.vue')); 
    // Indicator.close() 
    }
    ,'group-qsh')
}
// import sredmap from './views/redview/RedView-smap'
const sredmap = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-smap.vue'))
        // Indicator.close()
      },'group-qsh')
}
// import qshDetail from './views/redview/RedView-qshDetail'
const qshDetail = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-qshDetail.vue'))
        // Indicator.close()
      },'group-qsh')
}

// 三条红线水功能区
const redsgnq = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-sgnq.vue'))
        // Indicator.close()
      },'group-qsh')
}
const sgnqDetail = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-sgnqDetail.vue'))
        // Indicator.close()
      },'group-qsh')
}
const sgnqReback = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-reback.vue'))
        // Indicator.close()
      },'group-qsh')
}

// 水源地
const redsyd = resolve => {
    // console.log(Indicator);
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-syd.vue'))
        // Indicator.close()
      },'group-qsh')
}
// 水功能区监测
const redsgnqjc = resolve => {
    // console.log(Indicator);
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/redview/RedView-sgnqjc.vue'))
        // Indicator.close()
    },'group-qsh')
}
//水文测站曲线
const swczDetail = resolve => {
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/redview/RedView-swczDetail.vue'))
        // Indicator.close()
    },'group-qsh')
}
// 咸潮
const redxc = resolve => {
    // console.log(Indicator);
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/redview/RedView-xc.vue'))
        // Indicator.close()
    },'group-qsh')
}
const sydDetail = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/RedView-sydDetail.vue'))
        // Indicator.close()
      },'group-qsh')
}

//首页
// import redv1 from './views/RedView-v1' // 主页面
const redv1 = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/RedView-v1.vue'))
        // Indicator.close()
      },'group-home')
}
const newDetail = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/redview/newview.vue'))
        // Indicator.close()
      },'group-home')
}
// import redwater from './views/redview/RedView-water' // 取水量
const redwater = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/RedView/RedView-water.vue'))
        // Indicator.close()
      },'group-home')
}
// import xkz from './views/homeview/HomeView-xkz' // 许可
const xkz = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/homeview/HomeView-xkz.vue'))
        // Indicator.close()
      },'group-home')
}
// import cxksl from './views/homeview/HomeView-cxksl' // 超许可
const cxksl = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/homeview/HomeView-cxksl.vue'))
        // Indicator.close()
      },'group-home')
}

const sgnq = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/homeview/HomeView-sgnq.vue'))
        // Indicator.close()
      },'group-home')
}

//大用水户
const dysh = resolve => {
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/redview/RedView-dysh.vue'))
        // Indicator.close()
    },'group-home')
}
const dyshDetail = resolve => {
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/redview/RedView-dyshDetail.vue'))
        // Indicator.close()
    },'group-qsh')
}

//巡检部分
// import routeWarn from './views/routeview/RouteView-warn'
const routeWarn = resolve => {
    // Indicator.open();
    require.ensure([], () => {
        resolve(require('./views/routeview/RouteView-warn.vue'))
        // Indicator.close()
    },'group-route')
}
const routeStation = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/routeview/RouteView-station.vue'))
        // Indicator.close()
      },'group-route')
}
// import routePlan from './views/routeview/RouteView-plan'
const routePlan = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/routeview/RouteView-plan.vue'))
        // Indicator.close()
      },'group-route')
}
// import routeReback from './views/routeview/RouteView-reback'
const routeReback = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/routeview/RouteView-reback.vue'))
        // Indicator.close()
      },'group-route')
}
// import routeDone from './views/routeview/RouteView-done'
const routeDone = resolve => {
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/routeview/RouteView-done.vue'))
        // Indicator.close()
      },'group-route')
}

// 页面权限部分
// import home from './views/HomeView'
const home = resolve => { 
    // Indicator.open();
      require.ensure([], () => {
        resolve(require('./views/HomeView'))
        // Indicator.close()
      },'group-home')
}
// import forbidden from './views/userview/forbidden'
const forbidden = () => import('./views/userview/forbidden')
// import error404 from './views/userview/404'
const error404 = () => import('./views/userview/404')
// import login from './views/userview/login'
const login = () => import('./views/userview/login')
// import loginInfo from './views/userview/loginInfo'
const loginInfo = () => import('./views/userview/loginInfo')
// import help from './views/userview/help'
const help = () => import('./views/userview/help')
// import person from './views/userview/person'
const person = () => import('./views/userview/person')

// 配置相关的路由规则
// 子页面的规则，第一个都为details / home (这个根据当前子页面属于哪个父下面来决定) / 看是否需要参数

// console.log(_beforeEnter);
const router = new VueRouter({
    mode: 'hash',  //不想看到#号则配置这个 (可以用来解决与html本身锚点冲突的问题)
    routes: [
   		{ path: '/', redirect:'/redv1'},
        { path: '/home', component: home },
        { 
            path:'/redv1',
            component:redv1
        },
        {
            path:'/newDetail/:id',
            name:'newDetail',
            component:newDetail
        },
        { 
            path:'/check',
            component:check
            // meta:{auth:true}
        },
        { 
            path:'/check/sjzl1',
            name:'sjzl1',
            component:sjzl1
            // meta:{auth:true}
        },
        { 
            path:'/check/sjzl2',
            name:'sjzl2',
            component:sjzl2
            // meta:{auth:true}
        },
        { 
            path:'/check/sjzl3',
            name:'sjzl3',
            component:sjzl3
            // meta:{auth:true}
        },
        { 
            path:'/check/ywkh1',
            name:'ywkh1',
            component:ywkh1
            // meta:{auth:true}
        },
        { 
            path:'/check/ywkh2',
            name:'ywkh2',
            component:ywkh2
            // meta:{auth:true}
        },
        { 
            path:'/check/ywkh3',
            name:'ywkh3',
            component:ywkh3
            // meta:{auth:true}
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
            path:'/redxc',
            component:redxc
        },
        {
            path: '/xkz',
            component: xkz
        },
        {
            path: '/cxksl',
            component: cxksl
        },
        {
            path: '/dysh',
            component: dysh
        },
        {
            path: '/dyshDetail:id',
            component: dyshDetail
        },
        { 
            path:'/redwater',
            component:redwater
        },
        { 
            path:'/sgnq',
            name:'sgnq',
            component:sgnq
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
            path:'/sgnqDetail/:id',
            component:sgnqDetail
        },  
        { 
            path:'/sgnqreback',
            name:'sgnqreback',
            component:sgnqReback
        },
        {
            path: '/routeStation',
            component: routeStation
        },
        {
            path: '/routePlan',
            component: routePlan
        },
        {
            path: '/routeWarn',
            component: routeWarn
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
        },
        { 
            path:'/redsgnq',
            name:'redsgnq',
            component:redsgnq
        },
        { 
            path:'/redsyd',
            name:'redsyd',
            component:redsyd
        },
        {
            path:'/redsgnqjc',
            name:'redsgnqjc',
            component:redsgnqjc
        },
        { 
            path:'/sydDetail/:id',
            name:'sydDetail',
            component:sydDetail
        },
        {
            path:'/swczDetail/:id',
            name:'swczDetail',
            component:swczDetail
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