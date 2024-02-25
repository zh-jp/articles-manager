<script setup lang="ts">
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
const getArticleList = () => {}
const onAddArticle = () => {}
getArticleList()
// 请求参数
const params = ref({
  pagenum: 1,
  pageSize: 5,
  cate_id: '',
  state: ''
})
const stateOptions = ref([
  { label: '已发布', value: 1 },
  { label: '未发布', value: 0 }
])

const onSearch = () => {}
const onRest = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
}
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
  </PageContainer>
</template>
