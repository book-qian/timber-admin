<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:36:21
 * @Description:
-->
<template>
  <el-container>
    <AsideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="MainBox">
import AsideMenu from '@/components/AsideMenu';
import TopHeader from '@/components/TopHeader';
</script>

<style lang="scss" scoped>
.el-main {
  height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

