import Vue from 'vue'
import Vuex from 'vuex'

import redmap from './modules/redmap'
import qshInfo from './modules/qshInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    redmap,qshInfo
  }
})