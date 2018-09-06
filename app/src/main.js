import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import './style/index.less' // global css


new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
