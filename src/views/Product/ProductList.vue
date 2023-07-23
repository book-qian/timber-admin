<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 22:54:19
 * @Description:产品列表组件
-->
<template>
  <div>
    <el-card class="box-card">
      <el-page-header :icon="null" title="产品管理" content="产品列表" />
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="产品名称" width="180" />
        <el-table-column prop="indroduction" label="产品简要描述" width="180" />
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ timeFormat.dateFormat(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Edit" @click="editHandler(scope.row)"></el-button>
            <el-popconfirm width="220" title="你确定要删除吗？" @confirm="deleteHandler(scope.row)" confirm-button-text="确定"
              cancel-button-text="取消">
              <template #reference>
                <el-button circle :icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script setup name="ProductList">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import timeFormat from '@/util/timeFormat'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router';

const tableData = ref([])
const getTableData = async () => {
  const { data: { result } } = await axios.get('/adminapi/product/getList')

  tableData.value = result
}
onMounted(() => {
  getTableData()
})

const deleteHandler = async ({ _id }) => {
  const { data: { code } } = await axios.delete(`/adminapi/product/delList/${_id}`)

  if (code === '0') {
    ElMessage.success('操作成功')
    getTableData()
  }
}

const editHandler = async ({ _id }) => {
  router.push(`/editProduct/${_id}`)
}

</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
</style>

