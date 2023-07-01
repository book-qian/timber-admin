/*
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:31:30
 * @Description:路由文件
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login'
import MainBox from '@/views/MainBox'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'mainbox',
    path: '/mainbox',
    component: MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
