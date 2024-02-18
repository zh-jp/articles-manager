import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'store-user',
  () => {
    const token = ref('')
    const setToken = (newToken: string): void => {
      token.value = newToken
    }
    const removeToken = (): void => {
      token.value = ''
    }
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true
  }
)
