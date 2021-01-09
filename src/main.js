/**
 * @description 渲染进程入口 - 网页入口
 */
import './node/renderer/preload'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/common.css'

import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount('#app')
