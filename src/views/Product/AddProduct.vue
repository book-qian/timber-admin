<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 22:55:00
 * @Description:添加产品组件
-->
<template>
  <div>
    <el-page-header :icon="null" title="产品管理" content="添加产品" />

    <el-form class="product-form" ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="80px"
      status-icon>
      <el-form-item label="标题" prop="title">
        <el-input v-model="productForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="indroduction">
        <el-input v-model="productForm.indroduction" type="textarea" placeholder="请输入产品简要描述" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" placeholder="请输入产品详细描述" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @upload-change="changeHandler" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加产品</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup name="AddProduct">
import Upload from '@/components/Upload'
import { ref, reactive } from 'vue';
import { uploadAvatar } from '@/util/upload'
import { useRouter } from 'vue-router'

const productFormRef = ref()
const productForm = reactive({
  title: '',
  indroduction: '',
  detail: '',
  cover: '',
  file: null
})
const productFormRules = reactive({
  title: [
    {
      required: true, message: '请输入产品名称', trigger: 'blur'
    }
  ],
  indroduction: [
    {
      required: true, message: '请输入简要描述', trigger: 'blur'
    }
  ],
  detail: [
    {
      required: true, message: '请输入详细描述', trigger: 'blur'
    }
  ],
  cover: [
    {
      required: true, message: '请上传产品图片', trigger: 'blur'
    }
  ],
})
// 文件变化时钩子
const changeHandler = (file) => {
  productForm.file = file
  // 上传图片预览
  productForm.cover = URL.createObjectURL(file)
}


const router = useRouter()
// 提交更新
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log('product', productForm)
      await uploadAvatar(productForm, '/adminapi/product/add')

      router.push('/productList')
    }
  })
}
</script>

<style lang="scss" scoped>
.product-form {
  margin-top: 50px;
}
</style>



