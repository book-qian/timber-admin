<!--
 * @Author: yangyongqian
 * @Date: 2023-07-02 00:36:47
 * @Description:404组件
-->
<template>
  <div class="not-found">
    <el-empty description="404 走丢了" />
  </div>
</template>

<script setup name="404">
import { onMounted } from 'vue';
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

