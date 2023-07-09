/*
 * @Author: yangyongqian
 * @Date: 2023-07-09 10:45:35
 * @Description:请求拦截器
 */

import axios from 'axios'
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    // 请求头设置token
    config.headers.authorization = `Bearer ${token}`
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 返回头获取最新token
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const { status } = error.response
    // token过期返回登录页面
    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href = '#/login'
    }
    // Do something with response error
    return Promise.reject(error)
  }
)
