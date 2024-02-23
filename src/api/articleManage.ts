import request from '@/utils/request'

// 获取-文章列表
export const getArticleListServe = (
  pagenum: number,
  pagesize: string | any,
  cate_id: string | any,
  state: string | any
) =>
  request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })

// 删除-文章
export const deleteArticleServe = (id: string) =>
  request.delete('/my/article/info', {
    params: { id }
  })

// 获取-文章详情
export const getArticleDetailServe = (id: string) =>
  request.get('/my/article/info', {
    params: { id }
  })

// 发布-文章
export const addArticleServe = (
  title: string,
  cate_id: string,
  content: string,
  cover_img: File | any,
  state: string
) =>
  request.post('/my/article/add', {
    title,
    cate_id,
    content,
    cover_img,
    state
  })

// 更新-文章详情
export const updateArticleServe = (
  id: string,
  title: string,
  cate_id: string,
  content: string,
  cover_img: File | any,
  state: string
) =>
  request.put('/my/article/edit', {
    id,
    title,
    cate_id,
    content,
    cover_img,
    state
  })
