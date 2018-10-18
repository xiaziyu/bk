import Vue from 'vue'
import Vuex from 'vuex'
import setting from './modules/setting'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    setting,
    app,
    user
  },
  getters
})

export default store
