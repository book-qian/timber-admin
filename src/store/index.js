/*
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:31:30
 * @Description:全局状态管理器
 */
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isGetterRouter: false, // 是否已经注册了异步路由
    isCollapse: false, //是否折叠
    userInfo: {} //用户信息
  },
  getters: {},
  mutations: {
    updateGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    updateCollapsed(state) {
      state.isCollapse = !state.isCollapse
    },
    updateUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {},
  modules: {},
  plugins: [
    // 持久化存储数据
    createPersistedState({
      paths: ['isCollapse', 'userInfo']
    })
  ]
})
