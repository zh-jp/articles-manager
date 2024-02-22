import request from '@/utils/request'

// 获取-文章分类
export const getChannelListService = () => request.get('/my/cate/list')

// 增加-文章分类
export const addChannelService = (cate_name: string, cate_alias: string) =>
  request.post('/my/cate/add', { cate_name, cate_alias })
