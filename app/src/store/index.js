import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    setting
  },
  getters
})

export default store
