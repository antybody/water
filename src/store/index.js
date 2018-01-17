import Vue from 'vue'
import Vuex from 'vuex'

import redmap from './modules/redmap'
import qshInfo from './modules/qshInfo'
import searchBar from './modules/searchBar'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    redmap,qshInfo,searchBar
  }
})