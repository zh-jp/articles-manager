<script setup lang="ts">
const getArticleList = () => {}
const onAddArticle = () => {}
getArticleList()
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle">添加文章</el-button>
    </template>
  </PageContainer>
</template>
