import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // BASE_URL 指代的是 vite.config.ts 中的 base
  routes: []
})

export default router
