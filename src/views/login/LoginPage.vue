<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const isRegister = ref(false)

const ruleForm = reactive({
  username: '',
  password: '',
  repassword: ''
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 5 || value.length > 10) {
    callback(new Error('长度在 5 到 10 个字符'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  const regex = /^\S{6,15}$/
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!regex.test(value)) {
    callback(new Error('密码长度在6-15个非空字符'))
  } else {
    callback()
  }
}

const validateRePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  repassword: [{ validator: validateRePass, trigger: 'blur' }]
})

const register = async (form: FormInstance | undefined) => {
  if (!form) return
  console.log(form)

  await form.validate()
}

const login = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate((valid) => {
    if (valid) {
      console.log(true)
    } else {
      console.log(false)
      return false
    }
  })
}
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg" />
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <!-- model 表示绑定的数据对象 rule 绑定的规则对象 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item><h1>注册</h1></el-form-item>
        <!-- prop 表示选择的对应规则 -->
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input
        ></el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="ruleForm.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register(ruleFormRef)"
            class="button"
            type="primary"
            auto-insert-space
            >注册</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"
            >返回登录</el-link
          >
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        autocomplete="off"
        v-else
      >
        <el-form-item><h1>登录</h1></el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-input
            v-model="ruleForm.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login(ruleFormRef)"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"
            >前往注册</el-link
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column; // 子元素垂直排列
    justify-content: center; // 子元素垂直居中
    user-select: none; // 文本不可选
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between; // 子元素之间的空间相等且尽可能填充满
    }
  }
}
</style>
