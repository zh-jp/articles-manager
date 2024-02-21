import { userGetInfoService } from '@/api/user'
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

    const user = ref<Record<string, any>>({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = (newUser: any) => (user.value = newUser)
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
