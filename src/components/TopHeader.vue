<!--
 * @Author: yangyongqian
 * @Date: 2023-07-02 17:05:20
 * @Description:顶部导航组件
-->
<template>
  <el-header>Header
    <button @click="collapseHandler">
      折叠
    </button>
  </el-header>
</template>

<script setup name="TopHeader">
import { onMounted } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const collapseHandler = () => {
  store.commit('updateCollapsed')
}
</script>

<style lang="scss" scoped>
</style>

