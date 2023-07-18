<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 22:47:30
 * @Description:添加用户组件
-->
<template>
  <div>
    <el-page-header :icon="null" title="用户管理" content="添加用户" />

    <el-form class="user-form" ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" status-icon>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择权限">
          <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="indroduction">
        <el-input v-model="userForm.indroduction" type="textarea" placeholder="请输入简介" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @upload-change="changeHandler" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加用户</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup name="AddUser">
import Upload from '@/components/Upload'
import { ref, reactive } from 'vue';
import { uploadAvatar } from '@/util/upload'
import { useRouter } from 'vue-router'

const userFormRef = ref()
const userForm = reactive({
  username: '',
  password: '',
  role: 2, // 1管理员 2编辑
  indroduction: '',
  avatar: '',
  gender: 0,
  file: null
})
const userFormRules = reactive({
  username: [
    {
      required: true, message: '请输入用户名', trigger: 'blur'
    }
  ],
  password: [
    {
      required: true, message: '请输入密码', trigger: 'blur'
    }
  ],
  role: [
    {
      required: true, message: '请选择权限', trigger: 'blue'
    }
  ],
  indroduction: [
    {
      required: true, message: '请输入简介', trigger: 'blur'
    }
  ],
  avatar: [
    {
      required: true, message: '请上传头像', trigger: 'change'
    }
  ],
})
// 文件变化时钩子
const changeHandler = (file) => {
  userForm.file = file
  // 上传图片预览
  userForm.avatar = URL.createObjectURL(file)
}
const selectData = [
  {
    label: '管理员',
    value: 1
  },
  {
    label: '编辑',
    value: 2
  },
]

const router = useRouter()
// 提交更新
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await uploadAvatar(userForm, '/adminapi/user/add')

      router.push('/userList')
    }
  })
}
</script>

<style lang="scss" scoped>
.user-form {
  margin-top: 50px;
}
</style>

