import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const userId = ref<string | null>(null)

  function setUserId(id: string) {
    userId.value = id
  }

  return {
    userId,
    setUserId,
  }
})