import request from '@/utils/request'

// 获取-文章列表
export const getArticleListService = (params: Record<string, any>) =>
  request.get('/my/article/list', {
    params
  })

// 删除-文章
export const deleteArticleService = (id: string) =>
  request.delete('/my/article/info', {
    params: { id }
  })

// 获取-文章详情
export const getArticleDetailService = (id: string) =>
  request.get('/my/article/info', {
    params: { id }
  })

// 发布-文章
export const publishArticleService = (data: Record<string, any>) =>
  request.post('/my/article/add', data)

// 更新-文章详情
export const updateArticleService = (data: Record<string, any>) =>
  request.put('/my/article/info', data)
