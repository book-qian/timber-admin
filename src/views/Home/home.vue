<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 18:11:08
 * @Description:首页组件
-->
<template>
  <el-page-header :icon="null" title="企业门户网站管理系统" content="首页" />
  <el-card class="box-card">
    <el-row>
      <el-col :span="4">
        <el-avatar :size="100" :src="avatarUrl" />
      </el-col>
      <el-col :span="20">
        <h3 style="line-height: 100px;">
          欢迎回来，{{ store.state.userInfo.username }}，{{ welcomeText }}
        </h3>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>公司产品</span>
      </div>
    </template>
    <el-carousel v-if="loopData.length" :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in loopData" :key="item._id">
        <div :style="{
          backgroundImage: `url(http://localhost:3000${item.cover})`,
          backgroundSize: 'cover'
        }">
          <h3 text="2xl" justify="center">{{ item.title }}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup name="home">

import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';

const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const welcomeText = computed(() => new Date().getHours() > 12 ? '你可能累有些了，喝杯咖啡提提神吧！' : '开心快乐每一天，加油！')

onMounted(() => {
  getLoopData()
})

const loopData = ref([])
const getLoopData = async () => {
  const { data: { result } } = await axios.get('/adminapi/product/getList')

  loopData.value = result
}


</script>

<style scoped lang="scss">
.box-card {
  margin-top: 50px;
}

.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
</style>
