<!--
 * @Author: yangyongqian
 * @Date: 2023-07-02 17:06:02
 * @Description:侧边栏组件
-->
<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <el-menu :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="route.fullPath">
      <el-menu-item index="/index">
        <el-icon>
          <home-Filled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon>
          <avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user">
        <template #title>
          <el-icon>
            <user-filled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/userList">用户列表</el-menu-item>
        <el-menu-item index="/addUser">添加用户</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news">
        <template #title>
          <el-icon>
            <message-box />
          </el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/newsList">新闻列表</el-menu-item>
        <el-menu-item index="/addNews">创建新闻</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product">
        <template #title>
          <el-icon>
            <pointer />
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/productList">产品列表</el-menu-item>
        <el-menu-item index="/addProduct">添加产品</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup name="AsideMenu">
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()

const isCollapse = computed(() => store.state.isCollapse)
const route = useRoute();
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100%;
  }
}
</style>

