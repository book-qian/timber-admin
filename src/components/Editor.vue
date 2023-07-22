<!--
 * @Author: yangyongqian
 * @Date: 2023-07-21 22:27:47
 * @Description:富文本编辑器组件
-->
<template>
  <div id="myeditor">

  </div>
</template>

<script setup name="Editor">
import { onMounted, defineEmits, defineProps } from 'vue';
import E from "wangeditor"

const emit = defineEmits(['editor-change'])
const props = defineProps({
  content: String
})
onMounted(() => {
  const editor = new E("#myeditor")

  // 配置 onchange 回调函数
  editor.config.onchange = function (newHtml) {
    emit('editor-change', newHtml)
  }
  editor.create()

  editor.txt.html(props.content) // 重新设置编辑器内容
})
</script>

<style lang="less" scoped>
</style>

