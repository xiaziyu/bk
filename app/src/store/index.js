import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import jump from './modules/jump'
import admin from './modules/admin'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    setting,
    jump,
    admin
  },
  getters
})

export default store
