// import { IsWap } from '@/utils/index'

const redirectUrl = 'https://buicktest.g100.org.cn'
const setting = {
  state: {
    // api_url:'/',
    api_url:'?r=',
    /*parmars:'?state=jdbk&code=7ME5RK',
    codes: '',
    states: '',*/
    source: '',
    pin:'',
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CODE: (state, codes) => {
      state.codes = codes
    },
    SET_STATES: (state, states) => {
      state.states = states
    },
    SET_SOURCE: (state, source) => {
      state.source = source
    },
    SET_PIN: (state, pin) => {
      state.pin = pin
    }
  },
  actions:{
    setToken({ commit, state }, data) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', data.token)
        // commit('SET_CODE', data.codes)
        // commit('SET_STATES', data.states)
        // commit('SET_SOURCE', data.source)
        resolve()
      })
    },
    setSource({ commit }, source ){
      return new Promise((resolve) => {
        commit('SET_SOURCE', source)
        resolve()
      })
    },
    setPin({ commit, state}, pin){
      return new Promise((resolve) => {
        console.log(pin)
        commit('SET_PIN', pin)
        resolve()
      })
    }
  }
}

export default setting
