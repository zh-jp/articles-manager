<script setup lang="ts">
const onAddChannel = () => {}
</script>

<template>
  <PageContainer title="文章类型">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
  </PageContainer>
</template>
