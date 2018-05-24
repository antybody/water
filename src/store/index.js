import Vue from 'vue'
import Vuex from 'vuex'

import redmap from './modules/redmap'
import qshInfo from './modules/qshInfo'
import dyshInfo from './modules/dyshInfo'
import sgnqInfo from './modules/sgnqInfo'
import xcInfo from './modules/xcInfo'
import sydInfo from './modules/sydInfo'
import searchBar from './modules/searchBar'
import login from './modules/login'
import red from './modules/red'
import homeview from './modules/homeview'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    redmap,qshInfo,dyshInfo,searchBar,login,red,homeview,sgnqInfo,sydInfo,xcInfo
  },
  proxyTable: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
})

