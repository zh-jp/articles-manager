<script setup lang="ts">
import { ref } from 'vue'
import { type FormInstance } from 'element-plus'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const pwdForm = ref({ old_pwd: '', new_pwd: '', re_pwd: '' })

const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === pwdForm.value.old_pwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== pwdForm.value.new_pwd) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const pwdFormRef = ref()
const userStore = useUserStore()
const router = useRouter()
const submitForm = async (formRef: FormInstance | undefined) => {
  if (!formRef) return
  await formRef.validate(async (valid: boolean) => {
    if (valid) {
      await userUpdatePasswordService(
        pwdForm.value.old_pwd,
        pwdForm.value.new_pwd,
        pwdForm.value.re_pwd
      )
      ElMessage.success('修改密码成功')
      // 清空token和用户信息
      userStore.setToken('')
      userStore.setUser({})

      // 拦截登录
      router.push('/login')
    } else {
      return false
    }
  })
}

const resetForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.resetFields()
}
</script>
<template>
  <el-row>
    <el-col :span="12">
      <el-form
        :model="pwdForm"
        :rules="rules"
        ref="pwdFormRef"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input v-model="pwdForm.old_pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="pwdForm.new_pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input v-model="pwdForm.re_pwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(pwdFormRef)"
            >修改密码</el-button
          >
          <el-button @click="resetForm(pwdFormRef)">重置</el-button>
        </el-form-item>
      </el-form></el-col
    >
  </el-row>
</template>
