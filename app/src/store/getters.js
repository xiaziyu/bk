const getters = {
  api_url: state => state.setting.api_url,//接口base地址
  codes: state => state.setting.codes,
  states: state => state.setting.states,
  source: state => state.setting.source, //source配置
  client: state => state.setting.client,
  openid: state => state.setting.openid
}
export default getters
