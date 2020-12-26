/**
 * @description 渲染进程入口 - 网页入口
 */
import './preload'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/common.css'

// import App from './App.vue';
import App from './pages/data.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
