<script setup lang="ts">
import { ref } from 'vue'
import { type UploadFile } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'

const uploadRef = ref()

const {
  user: { user_pic },
  getUser
} = useUserStore()
const imgUrl = ref(user_pic)
const onSelectFile = (uploadFile: UploadFile | any) => {
  // 使用FileReader对象将文件转为base64格式
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const handleUpload = async () => {
  await userUpdateAvatarService(imgUrl.value)
  ElMessage.success('上传头像成功')
  getUser()
}
</script>
<template>
  <PageContainer title="用户头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <!-- $el 表示绑定的DOM元素 -->
    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      :icon="Plus"
      size="large"
      >选择图片</el-button
    >
    <el-button @click="handleUpload" type="success" :icon="Upload" size="large"
      >上传图片</el-button
    >
  </PageContainer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
