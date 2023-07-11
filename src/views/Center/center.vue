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
              <el-option v-for="item in selectData" :key="item.value" :value="item.value" :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人简介" prop="indroduction">
            <el-input v-model="userForm.indroduction" type="textarea" placeholder="请输入简介" />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false" :auto-upload="false">
              <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
        </el-form>

      </el-card>
    </el-col>
  </el-row>
</template>
<script setup name="center">
import { Plus } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore();
const avatarUrl = computed(() => store.state.userInfo.avatar ? store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const roleName = computed(() => store.state.userInfo.role === 1 ? '管理员' : '编辑')
const userName = computed(() => store.state.userInfo.username)

const { username, role, gender, avatar, indroduction } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
  username,
  gender,
  role,
  indroduction,
  avatar
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


</script>
<style scoped lang="scss">
.el-row {
  margin-top: 20px;

  .box-card {
    text-align: center;
  }

  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  ::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
