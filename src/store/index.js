/*
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:31:30
 * @Description:全局状态管理器
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    isGetterRouter: false // 是否已经注册了异步路由
  },
  getters: {},
  mutations: {
    updateGetterRouter(state, value) {
      state.isGetterRouter = value
    }
  },
  actions: {},
  modules: {}
})
