<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 22:52:52
 * @Description:新闻列表组件
-->
<template>
  <div>
    <el-card class="box-card">
      <el-page-header :icon="null" title="新闻管理" content="新闻列表" />
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column label="分类">
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ timeFormat.dateFormat(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
              @change="switchHandler(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Star" type="success" @click="previewHandler(scope.row)"></el-button>
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

    <el-dialog v-model="dialogVisible" title="新闻预览" width="70%" :close-on-click-modal="false">
      <div class="preview-container">
        <h2>{{ previewData.title }}</h2>
        <p class="preview-time">{{ timeFormat.dateFormat(previewData.editTime) }}</p>
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="preview-content" v-html="previewData.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup name="NewsList">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import timeFormat from '@/util/timeFormat'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router';

const tableData = ref([])
const getTableData = async () => {
  const { data: { result } } = await axios.get('/adminapi/news/getList')

  tableData.value = result
}
onMounted(() => {
  getTableData()
})

const categoryFormat = (value) => {
  const arr = ['最新动态', '典型案例', '通过公告']
  return arr[value - 1]
}

const switchHandler = async ({ _id, isPublish }) => {
  const { data: { code } } = await axios.put('/adminapi/news/publish', { _id, isPublish })

  if (code === '0') {
    ElMessage.success('操作成功')
    getTableData()
  }
}


const previewData = ref()
const dialogVisible = ref(false)
const previewHandler = (data) => {
  previewData.value = data
  dialogVisible.value = true
}

const deleteHandler = async ({ _id }) => {
  const { data: { code } } = await axios.delete(`/adminapi/news/delList/${_id}`)

  if (code === '0') {
    ElMessage.success('操作成功')
    getTableData()
  }
}

const editHandler = async ({ _id }) => {
  router.push(`/editNews/${_id}`)
}

</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}

.preview-container {
  .preview-time {
    font-size: 12px;
    color: gray;
  }
}

::v-deep .preview-content {
  img {
    max-width: 100% !important;
  }
}
</style>

