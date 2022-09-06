import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 页面首次加载慢，使用懒加载等使用到了路由页面再去请求他
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
