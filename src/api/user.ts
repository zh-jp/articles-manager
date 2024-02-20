import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }: any) =>
  request.post('/api/reg', { username, password, repassword })

// 登录接口
export const userLoginService = ({ username, password }: any) =>
  request.post('/api/login', { username, password })
