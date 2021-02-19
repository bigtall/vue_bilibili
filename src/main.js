// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 引入全局https
import http from '../http';
Vue.prototype.$http = http;

import {Toast} from 'vant'
Vue.prototype.$msg = Toast

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
