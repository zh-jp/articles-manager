<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { addChannelService, updateChannelService } from '@/api/articleChannel'
const dialogVisible: Ref<boolean> = ref(false)
const ruleForm = reactive<Record<string, any>>({
  cate_name: '',
  cate_alias: ''
})
const rules = reactive<FormRules<typeof ruleForm>>({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是 1-15 位的字母或数字',
      trigger: 'blur'
    }
  ]
})
const ruleFormRef = ref<FormInstance>()
const open = (row: Record<string, any>) => {
  dialogVisible.value = true
  Object.assign(ruleForm, row)
}
defineExpose({
  open
})
const emit = defineEmits(['success'])
const onSubmit = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate(async (valid) => {
    if (valid) {
      if (ruleForm.id) {
        // 编辑分类
        await updateChannelService(ruleForm)
        ElMessage.success('编辑成功')
      } else {
        // 添加分类
        await addChannelService(ruleForm)
        ElMessage.success('添加成功')
      }
    }
    dialogVisible.value = false
    emit('success')
  })
}
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    width="30%"
    :title="ruleForm.id ? '编辑分类' : '添加分类'"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="ruleForm.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="ruleForm.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-button">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="onSubmit(ruleFormRef)" type="primary"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
