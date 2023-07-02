/*
 * @Author: yangyongqian
 * @Date: 2023-07-01 22:29:28
 * @Description:路由配置文件
 */

import Center from '@/views/Center/center'

import UserList from '@/views/User/UserList'
import AddUser from '@/views/User/AddUser'
import NewsList from '@/views/News/NewsList'
import AddNews from '@/views/News/AddNews'
import ProductList from '@/views/Product/ProductList'
import AddProduct from '@/views/Product/AddProduct'

const routers = [
  {
    name: 'index',
    path: '/index',
    component: () => import('@/views/Home/home')
  },
  {
    name: 'center',
    path: '/center',
    component: Center
  },
  {
    name: 'userList',
    path: '/userList',
    component: UserList
  },
  {
    name: 'addUser',
    path: '/addUser',
    component: AddUser
  },
  {
    name: 'newsList',
    path: '/newsList',
    component: NewsList
  },
  {
    name: 'addNews',
    path: '/addNews',
    component: AddNews
  },
  {
    name: 'productList',
    path: '/productList',
    component: ProductList
  },
  {
    name: 'addProduct',
    path: '/addProduct',
    component: AddProduct
  },
  {
    path: '/',
    redirect: '/index'
  }
]

export default routers
