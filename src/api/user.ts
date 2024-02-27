import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }: any) =>
  request.post('/api/reg', { username, password, repassword })

// 登录接口
export const userLoginService = ({ username, password }: any) =>
  request.post('/api/login', { username, password })

// 获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新-用户基本资料
export const userUpdateInfoService = (data: any) =>
  request.put('/my/userinfo', data)

// 更新-用户头像
export const userUpdateAvatarService = (avatar: string) =>
  request.patch('/my/update/avatar', { avatar })

// 更新-用户密码
export const userUpdatePasswordService = (
  old_pwd: string,
  new_pwd: string,
  re_pwd: string
) => request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
