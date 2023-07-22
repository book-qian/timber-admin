<!--
 * @Author: yangyongqian
 * @Date: 2023-07-22 22:08:10
 * @Description:编辑新闻
-->
<template>
  <div>
    <el-page-header title="新闻管理" content="编辑新闻" @back="backHandler" />
    <el-form class="news-form" ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" status-icon>
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <Editor v-if="newsForm.content" :content="newsForm.content" @editor-change="editorChange" />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select v-model="newsForm.category" placeholder="请选择类别">
          <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @upload-change="changeHandler" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">更新新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="editNews">
import { ref, reactive, onMounted } from 'vue';
import Editor from '@/components/Editor'
import Upload from '@/components/Upload'
import { uploadAvatar } from '@/util/upload'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios';
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const newsFormRef = ref()
const newsForm = reactive({
  title: '',
  content: '',
  category: 1,
  cover: '',
  file: null,
  isPublish: 0, // 0 未发布 1已发布
})
const newsFormRules = reactive({
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'blur'
    }
  ],
  cover: [
    {
      required: true,
      message: '请上传封面',
      trigger: 'blur'
    }
  ],
})

const editorChange = (html) => {
  newsForm.content = html
}

const selectData = [
  {
    label: '最新动态',
    value: 1
  },
  {
    label: '典型案例',
    value: 2
  },
  {
    label: '通过公告',
    value: 3
  },
]

// 文件变化时钩子
const changeHandler = (file) => {
  newsForm.file = file
  // 上传图片预览
  newsForm.cover = URL.createObjectURL(file)
}

// 提交更新
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      await uploadAvatar(newsForm, `/adminapi/news/edit`)
      ElMessage.success('操作成功')
      router.back()
    }
  })
}

const backHandler = () => {
  router.back()
}

onMounted(async () => {
  const { id } = route.params
  const { data: { result } } = await axios.post(`/adminapi/news/getList/${id}`)

  Object.assign(newsForm, result[0])
})
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 30px;
}
</style>


