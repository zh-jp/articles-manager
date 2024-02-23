<script setup lang="ts">
import { ref } from 'vue'
import { getChannelListService } from '@/api/articleChannel'
import { Delete, Edit } from '@element-plus/icons-vue'
const loading = ref(false)
const channelList = ref([])
const getChannelList = async () => {
  loading.value = true
  const { data } = await getChannelListService()
  channelList.value = data.data
  loading.value = false
}
getChannelList()
const onAddChannel = () => {}
const onEditChannel = (row: object) => {}
const onDelChanel = (row: object) => {}
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
  </PageContainer>
</template>
<style lang="scss" scoped></style>
