/*
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:31:30
 * @Description:路由文件
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login'
import MainBox from '@/views/MainBox'
import asyncRouter from '@/router/config'
import store from '@/store'

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

// 每次路由跳转之前
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    // 如果授权 next()
    if (localStorage.getItem('token')) {
      // 如果没有注册动态路由
      if (!store.state.isGetterRouter) {
        // 先清空
        router.removeRoute('mainbox')
        // 再注册路由
        loadRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    } else {
      // 未授权 重定向 登录
      next({
        path: '/login'
      })
    }
  }
})

const loadRouter = () => {
  // 判断是否有mainbox
  if (!router.hasRoute('mainbox')) {
    router.addRoute({
      name: 'mainbox',
      path: '/mainbox',
      component: MainBox
    })
  }

  asyncRouter.forEach((t) => {
    checkAuthority(t) && router.addRoute('mainbox', t)
  })

  // 改变第一次状态
  store.commit('updateGetterRouter', true)
}

// 检查权限
const checkAuthority = (item) => {
  if (!item.requireAdmin) return true
  return store.state.userInfo.role === 1
}

export default router
