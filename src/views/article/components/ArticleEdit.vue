<script setup lang="ts">
import { type Ref, ref, reactive } from 'vue'
import {
  type FormInstance,
  type UploadFile,
  type FormRules
} from 'element-plus'
import { getArticleDetailService } from '@/api/articleManage'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  publishArticleService,
  updateArticleService
} from '@/api/articleManage'
import { baseURL } from '@/utils/request'
import urlToFile from '@/utils/url2File'

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

const rules = reactive<FormRules<typeof ruleForm>>({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    {
      pattern: /^\S{1,50}$/,
      message: '标题必须是 1-50 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传文章封面', trigger: 'change' }]
})
const ruleFormRef = ref<FormInstance>()
const editorRef = ref()
const open = async (row: Record<string, any>) => {
  drawerVisible.value = true
  if (row.id) {
    const {
      data: { data }
    } = await getArticleDetailService(row.id)
    // 此时的图像是网络地址，返回后端时需要转为 File 对象
    imgUrl.value = baseURL + data.cover_img
    data.cover_img.File = urlToFile(imgUrl.value, data.cover_img)
    console.log('cover_img', data.cover_img.File)

    Object.assign(ruleForm, data)
  } else {
    Object.assign(ruleForm, {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '',
      state: ''
    })
    imgUrl.value = ''

    editorRef.value.setHTML('') // 清空富文本编辑器内容：需要使用vue-quill组件提供的ref属性
  }
}
defineExpose({
  open
})

const emit = defineEmits(['success'])

const onPublish = async (formRef: FormInstance | undefined, state: number) => {
  ruleForm.state = state == 0 ? '已发布' : '草稿'
  if (!formRef) return
  await formRef.validate(async (valid) => {
    if (valid) {
      const fd = new FormData() // 后端要求，如果不转为 FormData 格式，会报错
      for (let key in ruleForm) {
        fd.append(key, ruleForm[key])
      }
      if (ruleForm.id) {
        await updateArticleService(fd)
        ElMessage.success('编辑成功')
        emit('success', 'edit')
      } else {
        await publishArticleService(fd)
        ElMessage.success('添加成功')
        emit('success', 'add')
      }
    }
  })
  drawerVisible.value = false
}

const imgUrl: Ref<string> = ref('')
const onSelectFile = (uploadFile: UploadFile | any) => {
  // 取消自动上传后，Upload 组件提供的 UploadFile 类型对象不会返回 response 和 url
  // 相对的，会有 raw 属性，它是一个 File 对象
  // 通过 URL.createObjectURL 方法，输入对象是File或Blob生成一个临时的 URL 预览
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  ruleForm.cover_img = uploadFile.raw
}
</script>
<template>
  <el-drawer
    v-model="drawerVisible"
    :title="ruleForm.id ? '编辑文章' : '添加文章'"
    :direction="direction"
    :before-close="handleClose"
    size="60%"
  >
    <el-form
      :model="ruleForm"
      ref="ruleFormRef"
      label-width="100px"
      :rules="rules"
    >
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
        <el-button @click="onPublish(ruleFormRef, 0)" type="primary"
          >发布</el-button
        >
        <el-button @click="onPublish(ruleFormRef, 1)" type="info"
          >草稿</el-button
        >
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
