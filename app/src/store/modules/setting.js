import { IsWap } from '@/utils/index'

const baseUrl = 'https://buicktest.jdxyst.com'
const setting = {
  state: {
    // api_url:'/',
    api_url:'?r=',
    parmars:'?state=jdbk&code=7ME5RK',
    codes: '',
    states: '',
    login_url: {
      redirect_uri: baseUrl,
      jd_url: 'https://oauth.jd.com/oauth/authorize?response_type=code&state=jdbk',
      key: 'D2BF35C3E4CAC36C464BCF810C676123'
    },
    token_url: baseUrl+'/?r=App/Auth/getToken',
    auth_url: {
      url:'https://bt.jd.com/v3/mobile/zoneAuth?source=s2',
      backURL: baseUrl+'/userauth/success',
      failback: baseUrl+'/userauth/fail'
    }
  },
  mutations: {
    SET_CODE: (state, codes) => {
      state.codes = codes
    },
    SET_STATES: (state, states) => {
      state.states = states
    }
  },
  actions:{
    setCode({ commit, state }, data) {
      return new Promise((resolve) => {
        commit('SET_CODE', data.codes)
        commit('SET_STATES', data.states)
        resolve()
      })
    },
    jumpUrl({ commit, state }) {
      return new Promise((resolve) => {
        const [jd_url, key, redirect_uri] = [state['login_url']['jd_url'], state['login_url']['key'], state['login_url']['redirect_uri']]
        let url = jd_url+'&client_id=' +key+'&redirect_uri=' +redirect_uri
        url = IsWap()?url+'&view=wap':url
        resolve(url)
      })
    },
    // tokenUrl({ commit, state}){
    //   return new Promise(resolve => {
    //     const [token_url, codes, states] = [state['token_url'], state['codes'], state['states']]
    //     let url = token_url+'&code='+codes+'&state='+states
    //     resolve(url)
    //   })
    // },
    authUrl({ commit, state}) {
      return new Promise(resolve => {
        const [jd_url, back, fail] = [state['auth_url']['url'], state['auth_url']['backURL'], state['auth_url']['failback']]
        let url = jd_url+'&backURL='+back+'&failbackurl='+fail
        resolve(url)
      })
    }
  }
}

export default setting
