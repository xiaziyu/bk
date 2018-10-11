
const setting = {
  state: {
    // api_url:'/',
    api_url:'?r=',
    source: '',
    pin:'',
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
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
        commit('SET_PIN', pin)
        resolve()
      })
    }
  }
}

export default setting
