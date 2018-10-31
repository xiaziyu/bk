const getters = {
  api_url: state => state.setting.api_url,//接口base地址
  token: state => state.setting.token, //token配置
  source: state => state.setting.source, //source配置
  client: state => state.setting.client,
  openid: state => state.setting.openid
}
export default getters
