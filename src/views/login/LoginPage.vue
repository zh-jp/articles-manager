<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const isRegister = ref(false)

const ruleForm = reactive({
  username: '',
  password: '',
  repassword: ''
})
watch(isRegister, () => {
  ruleForm.username = ''
  ruleForm.password = ''
  ruleForm.repassword = ''
})

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
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [{ validator: validateRePass, trigger: 'blur' }]
})

const ruleFormRef = ref<FormInstance>() // 与表单DOM元素绑定

const register = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate(async (valid) => {
    if (valid) {
      await userRegisterService(ruleForm)
      ElMessage.success('注册成功')
      isRegister.value = false
    } else {
      return false
    }
  })
}
const userStore = useUserStore()
const router = useRouter()
const login = async (form: FormInstance | undefined) => {
  if (!form) return
  await form.validate(async (valid) => {
    if (valid) {
      const {
        data: { token }
      } = await userLoginService(ruleForm)
      ElMessage.success('登录成功')
      userStore.setToken(token)
      router.push('/')
    } else {
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
        <el-form-item prop="password">
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
