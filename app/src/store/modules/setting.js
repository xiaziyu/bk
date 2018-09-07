import { pubData } from '@/api/setting'
import { IsWap } from '@/utils/index'

const setting = {
  state: {
    baseUrl:'/?r=',
    code: '',
    app_url: {
      redirect_uri: 'https://buicktest.jdxyst.com',
      jd_url: 'https://oauth.jd.com/oauth/authorize?response_type=code&state=jdbk',
      key: 'D2BF35C3E4CAC36C464BCF810C676123'
    }
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    }
  },
  actions:{
    setCode({ commit, state }, code) {
      return new Promise((resolve) => {
        commit('SET_CODE', code)
        resolve()
      })
    },
    jumpUrl({ commit, state }) {
      return new Promise((resolve) => {
        let url = state['app_url']['jd_url']+'&client_id=' +state['app_url']['key']+'&redirect_uri=' +state['app_url']['redirect_uri']
        url = IsWap()?url+'&view=wap':url
        resolve(url)
      })
    }
  }
}

export default setting
