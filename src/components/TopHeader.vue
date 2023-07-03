<!--
 * @Author: yangyongqian
 * @Date: 2023-07-02 17:05:20
 * @Description:顶部导航组件
-->
<template>
  <el-header>
    <div class="left">
      <el-icon :size="20" @click="collapseHandler">
        <Menu />
      </el-icon>
      <span>企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span>欢迎admin回来</span>
      <el-dropdown>
        <el-icon :size="30" color="white">
          <User />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="centerHandler">个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </el-header>
</template>

<script setup name="TopHeader">
import { Menu, User } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
// 折叠
const collapseHandler = () => {
  store.commit('updateCollapsed')
}

// 个人中心跳转
const centerHandler = () => {
  router.push('/center')
}

// 退出
const loginOut = () => {
  router.push('/login')
  localStorage.removeItem('token')
}
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #2a3b4d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
  }

  .left {
    i {
      margin: auto;
      cursor: pointer;
    }
  }

  .right {
    .el-dropdown {
      margin: auto;

      &:focus-visible {
        outline: none;
      }

      i:focus-visible {
        outline: none;
      }

    }


  }
}
</style>

