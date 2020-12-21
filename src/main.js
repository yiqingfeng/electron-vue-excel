/**
 * @description 渲染进程入口 - 网页入口
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import './assets/styles/common.css';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
import App from './pages/data.vue';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app');
