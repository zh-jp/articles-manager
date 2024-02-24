import request from '@/utils/request'

// 获取-文章分类
export const getChannelListService = () => request.get('/my/cate/list')

// 增加-文章分类
export const addChannelService = (data: object) =>
  request.post('/my/cate/add', data)

// 更新-文章分类
export const updateChannelService = (data: object) =>
  request.put('/my/cate/info', data)

// 获取-文章分类详情
export const getChannelDetailService = (id: string) =>
  request.get('/my/cate/info', { params: { id } })

// 删除-文章分类
export const deleteChannelService = (id: string) =>
  request.delete('/my/cate/del', { params: { id } })
