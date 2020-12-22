/**
 * @description 渲染进程入口 - 网页入口
 */
import Vue from 'vue';
import Lodash from 'lodash'
import ElementUI from 'element-ui';
import './assets/styles/common.css';
import 'element-ui/lib/theme-chalk/index.css';

// import App from './App.vue';
import App from './pages/data.vue';

import store from './store'

global._ = Lodash;

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
