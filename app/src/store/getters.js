const getters = {
  sidebar: state => state.admin.sidebar,
  pagination: state => state.admin.pagination, //页码配置
  loading: state => state.admin.loading, //loading配置

  api_url: state => state.setting.api_url,//接口base地址
  pin: state => state.setting.pin, //pin配置
  token: state => state.setting.token, //token配置
  source: state => state.setting.source //source配置
}
export default getters
