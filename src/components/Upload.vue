<!--
 * @Author: yangyongqian
 * @Date: 2023-07-16 13:24:44
 * @Description: 上传组件
-->
<template>
  <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false" :auto-upload="false" :on-change="changeHandler">
    <img v-if="props.avatar" :src="uploadUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script setup name="Upload">
import { Plus } from '@element-plus/icons-vue'
import { defineEmits, defineProps, computed } from 'vue';

const uploadUrl = computed(() => {
  return props.avatar.includes('blob') ? props.avatar : `${process.env.VUE_APP_BASE_API}${props.avatar}`
})

const emit = defineEmits(['upload-change'])
const props = defineProps({
  avatar: {
    type: String
  }
})

const changeHandler = (file) => {
  emit('upload-change', file.raw)
}

</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>

