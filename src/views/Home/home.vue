<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 18:11:08
 * @Description:首页组件
-->
<template>
  home
</template>

<script setup>
import axios from 'axios';
axios.get('/adminapi/home').then(res => {
  console.log('res', res.data)
}).catch(err => {
  console.log(err)
})
</script>
