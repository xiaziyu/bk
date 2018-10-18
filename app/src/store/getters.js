const getters = {
  api_url: state => state.setting.api_url,//接口base地址
  pin: state => state.setting.pin, //pin配置
  token: state => state.setting.token, //token配置
  source: state => state.setting.source, //source配置
  client: state => state.setting.client
}
export default getters
