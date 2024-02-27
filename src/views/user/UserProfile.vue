<script setup lang="ts">
import PageContainer from '@/components/PageContainer.vue'
import { ref, reactive } from 'vue'
import { type FormRules, type FormInstance } from 'element-plus'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const {
  user: { id, username, nickname, email },
  getUser
} = useUserStore()

const ruleForm = ref({
  id,
  username,
  nickname,
  email
})
const rules = reactive<FormRules<typeof ruleForm>>({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ]
})

const ruleFormRef = ref()

const submitForm = async (formRef: FormInstance | undefined) => {
  if (!formRef) return
  await formRef.validate(async (valid: boolean) => {
    if (valid) {
      console.log('hello!')

      userUpdateInfoService(ruleForm.value)
      getUser()
      ElMessage.success('修改成功')
    }
  })
}
</script>
<template>
  <PageContainer title="用户信息">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormRef"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="登录名称">
        <el-input v-model="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </PageContainer>
</template>
<style lang="scss" scoped>
.ruleForm {
  max-width: 50%;
  margin: 0;
}
</style>
<!-- 主要内容基于以下 prompt 利用ChatGPT生成 -->
<!-- 请基于 elementPlus 和 Vue3 的语法，生成组件代码要求:
表单结构要求组件中包含一个el-form表单，有四行内容，
前三行是输入框，
第四行是按钮
第一行 label: 登录名称，输入框禁用不可输入状态
第二行 label: 用户昵称，输入框可输入
第三行 label: 用户邮箱，输入框可输入
第四行按钮，提交修改
校验需求: 给昵称 和 邮箱添加校验（使用 element-plus的form组件的rules元素）
昵称 nickname 必须是2-10位的非空字符
邮箱 email符合邮箱格式即可，且不能为空 -->
