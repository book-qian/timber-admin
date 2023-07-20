<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 22:46:14
 * @Description:用户列表组件
-->
<template>
  <div>
    <el-card class="box-card">
      <el-page-header :icon="null" title="用户管理" content="用户列表" />
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="`http://localhost:3000${scope.row.avatar}`"></el-avatar>
            </div>
            <div v-else>
              <el-avatar :size="50"
                :src="`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <div v-if="scope.row.role === 1">
              <el-tag type="danger">管理员</el-tag>
            </div>
            <div v-else>
              <el-tag type="success">编辑</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="你确定要删除吗？" @confirm="handleDelete(scope.row)" confirm-button-text="确定"
              cancel-button-text="取消">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="编辑" width="30%">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" show-password type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select style="width: 100%;" v-model="userForm.role" fit-input-width placeholder="请选择权限">
            <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="indroduction">
          <el-input v-model="userForm.indroduction" type="textarea" placeholder="请输入简介" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmHandler">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="UserList">
import { onMounted, ref, reactive } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'

const tableData = ref([])
const getTableData = async () => {
  const { data: { result } } = await axios.get('/adminapi/user/list')
  tableData.value = result
}
onMounted(() => {
  getTableData()
})

const dialogVisible = ref(false)
const handleEdit = async (data) => {
  dialogVisible.value = true
  const { data: { result = [] } } = await axios.get(`/adminapi/user/list/${data._id}`)
  Object.assign(userForm, result[0])
}
const handleDelete = async ({ _id }) => {
  const { data } = await axios.delete(`/adminapi/user/list/${_id}`)
  if (data?.code === '0') {
    ElMessage.success('操作成功')
    getTableData()
  }
}

const userFormRef = ref()
const userForm = reactive({
  username: '',
  role: 2, // 1管理员 2编辑
  password: '',
  indroduction: '',
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
})
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

// 确认更新
const confirmHandler = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
      dialogVisible.value = false
      ElMessage.success('操作成功')
      getTableData()
    }
  })
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
</style>

