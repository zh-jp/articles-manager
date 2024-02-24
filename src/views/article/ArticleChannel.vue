<script setup lang="ts">
import { ref } from 'vue'
import {
  getChannelListService,
  deleteChannelService
} from '@/api/articleChannel'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
const loading = ref(false)
const channelList = ref([])
const dialog = ref()
const getChannelList = async () => {
  loading.value = true
  const { data } = await getChannelListService()
  channelList.value = data.data
  loading.value = false
}
getChannelList()
const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row: Record<string, any>) => {
  row.is_edit = true
  dialog.value.open(row)
}
const onDelChanel = (row: object | any) => {
  ElMessageBox.confirm('确认要删除该分类吗?', 'Warning', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteChannelService(row.id)
      ElMessage.success('删除成功')
      getChannelList()
    })
    .catch(() => {})
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <PageContainer title="文章类型">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="150">
        <!-- row: chanelList 的一个对象，$index：下表-->
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          />
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChanel(row)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂时还没有文章分类" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess" />
  </PageContainer>
</template>
<style lang="scss" scoped></style>
