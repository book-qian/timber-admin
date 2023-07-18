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
  </div>
</template>

<script setup name="UserList">
import { onMounted, ref } from 'vue';
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

const handleEdit = (data) => {
  console.log(data)
}
const handleDelete = async ({ _id }) => {
  const { data } = await axios.delete(`/adminapi/user/list/${_id}`)
  if (data?.code === '0') {
    ElMessage.success('操作成功')
    getTableData()
  }
}

</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
</style>

