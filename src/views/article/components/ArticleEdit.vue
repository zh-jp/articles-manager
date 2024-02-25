<script setup lang="ts">
import { type Ref, ref, reactive } from 'vue'
import { type FormInstance } from 'element-plus'
import { getArticleDetailService } from '@/api/articleManage'
import ChannelSelect from './ChannelSelect.vue'

const drawerVisible: Ref<boolean> = ref(false)
const direction: Ref<any> = ref('rtl')
const handleClose = () => {
  drawerVisible.value = false
}
const ruleForm = reactive<Record<string, any>>({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
const open = async (row: Record<string, any>) => {
  drawerVisible.value = true
  if (row.id) {
    const {
      data: { data }
    } = await getArticleDetailService(row.id)
    Object.assign(ruleForm, data)
  }
}
defineExpose({
  open
})

const ruleFormRef = ref<FormInstance>()
const onPublish = (state: number) => {}
</script>
<template>
  <el-drawer
    v-model="drawerVisible"
    :title="ruleForm.id ? '编辑文章' : '添加文章'"
    :direction="direction"
    :before-close="handleClose"
    size="60%"
  >
    <el-form :model="ruleForm" ref="ruleFormRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect v-model="ruleForm.cate_id" width="100%" />
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">文章封面</el-form-item>
      <el-form-item label="文章内容" prop="content">文章内容</el-form-item>
      <el-form-item>
        <el-button @click="onPublish(0)" type="primary">发布</el-button>
        <el-button @click="onPublish(1)" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
