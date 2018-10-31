import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import jump from './modules/jump'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    setting,
    jump
  },
  getters
})

export default store
