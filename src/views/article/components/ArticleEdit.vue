<script setup lang="ts">
import { type Ref, ref, reactive } from 'vue'
import { type FormInstance, type UploadFile } from 'element-plus'
import { getArticleDetailService } from '@/api/articleManage'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

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

const imgUrl: Ref<string> = ref('')
const onSelectFile = (uploadFile: UploadFile | any) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  ruleForm.cover_img = uploadFile.raw
}

const editorRef = ref<FormInstance>()
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
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 需要关闭 el-upload 默认的自动上传，不需要配置 action -->
        <!-- 只需要做前端的本地图片预览，无需在提交前上传 -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
          ><img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon class="avatar-uploader-icon" v-else><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="editorRef"
            v-model:content="ruleForm.content"
            theme="snow"
            content-type="html"
            placeholder="开始新的文章内容！"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish(0)" type="primary">发布</el-button>
        <el-button @click="onPublish(1)" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  // 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素，
  // 父组件的样式将不会渗透到子组件。 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，
  //例如影响子组件，你可以使用深度选择器 :deep() 。
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-container) {
    min-height: 300px;
  }
}
</style>
