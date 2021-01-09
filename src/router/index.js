import Vue from 'vue'
import VueRouter from 'vue-router'
import ExcelList from '@/pages/excel/data.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ExcelList
    },
    {
        path: '/excel/list',
        name: 'excelList',
        component: ExcelList
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    // 测试相关页面
    {
        path: '/test',
        name: 'TestPage',
        component: () => import('../pages/test/index.vue'),
    }
]

const router = new VueRouter({
    routes
})

export default router
