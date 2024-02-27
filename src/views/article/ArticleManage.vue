<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { getArticleListService } from '@/api/articleManage'
import { Delete, Edit } from '@element-plus/icons-vue'
import formatTime from '@/utils/formatTime'
import ArticleEdit from './components/ArticleEdit.vue'
import { onMounted } from 'vue'

// 请求参数
const params: Ref<Record<string, any>> = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading: Ref<boolean> = ref(false)
const articleList: Ref<Record<string, any>[]> = ref([])
const total: Ref<number> = ref(0)
const getArticleList = async () => {
  loading.value = true
  const { data } = await getArticleListService(params.value)
  articleList.value = data.data
  total.value = data.total
  loading.value = false
}
onMounted(() => {
  getArticleList()
})
const stateOptions = ref([
  { label: '已发布', value: 0 },
  { label: '草稿', value: 1 }
])

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onRest = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
// 处理每页 size 变化
const handleSizeChange = (val: number) => {
  params.value.pagenum = 1
  params.value.pagesize = val
  getArticleList()
}
// 处理页码变化
const handleCurrentChange = (val: number) => {
  params.value.pagenum = val
  getArticleList()
}
const articleRef = ref()
const onAddArticle = () => {
  articleRef.value.open({})
}
const onSuccess = (type: string) => {
  if (type === 'add') {
    const lastPage: number = Math.ceil(
      (total.value + 1) / params.value.pagesize
    )
    params.value.pagenum = lastPage
  }
  getArticleList()
}
const onEditArticle = (row: Record<string, any>) => {
  articleRef.value.open(row)
}
const onDelArticle = (row: Record<string, any>) => {}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">添加文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <!-- v-model 为语法糖 -->
        <!-- 在Vue2中：v-model=:value + @input -->
        <!-- 在vue3中：v-model=:modelValue + @update:modelValue -->
        <ChannelSelect v-model="params.cate_id" width="160px" />
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select
          v-model="params.state"
          placeholder="请选择发布状态"
          style="width: 160px"
        >
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onRest" type="warning">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name" />
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }"> {{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column label="操作"
        ><template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          />
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelArticle(row)"
          /> </template
      ></el-table-column>
      <template #empty> <el-empty description="暂时还没有文章" /> </template>
    </el-table>
    <!-- drawer 组件 -->
    <ArticleEdit ref="articleRef" @success="onSuccess" />
    <!-- 分页 组件 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[5, 10]"
      background
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </PageContainer>
</template>
