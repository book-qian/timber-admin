<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 18:11:08
 * @Description:个人中心组件
-->
<template>
  <el-page-header :icon="null" title="企业门户网站管理系统" content="个人中心" />
  <el-row :gutter="20" class="el-row">
    <el-col :span="8">
      <el-card class="box-card">
        <el-avatar :size="100" :src="avatarUrl" />
        <h2>{{ userName }}</h2>
        <h3>{{ roleName }}</h3>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>

        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" status-icon>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="userForm.gender" placeholder="请选择性别">
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
            <el-button type="primary" @click="submitForm">更新</el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import Upload from '@/components/Upload'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { uploadAvatar } from '@/util/upload'

const store = useStore();
const avatarUrl = computed(() => store.state.userInfo.avatar ? process.env.VUE_APP_BASE_API + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const roleName = computed(() => store.state.userInfo.role === 1 ? '管理员' : '编辑')
const userName = computed(() => store.state.userInfo.username)


const { username, role, gender = 1, avatar, indroduction = '' } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
  username,
  gender,
  role,
  indroduction,
  avatar,
  file: null
})
const selectData = [
  {
    label: '未知',
    value: 0
  },
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  },
]
const userFormRules = reactive({
  username: [
    {
      required: true, message: '请输入用户名', trigger: 'blur'
    }
  ],
  gender: [
    {
      required: true, message: '请选择性别', trigger: 'change'
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

// 提交更新
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const { result, code } = await uploadAvatar(userForm, '/adminapi/user/upload')
      if (code === '0') {
        store.commit('updateUserInfo', result)
        ElMessage.success('操作成功')
      }

    }
  })
}


</script>
<style scoped lang="scss">
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }

}
</style>
