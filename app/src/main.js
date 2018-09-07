import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import './style/index.less' // global css
import store from './store'

import { Loading, Toast } from 'vant';

Vue.use(Loading)
Vue.use(Toast)
const toast_all = Toast.loading({
  duration: 0,
  forbidClick: true,
  mask: true,
  message: '加载中...'
});
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
