import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const token = ref('')
        const name = ref('')
        const account = ref('')
        const role = ref('') // "member" | "admin"
        const isLoggedIn = computed(() => !!token.value)
        const isAdmin = computed(() => role.value === 'admin')

        // 設定登入資訊
        function setAuth(data) {
            token.value = data.token
            name.value = data.name
            account.value = data.account
            role.value = data.role
        }

        // 清除登入資訊
        function clearAuth() {
            token.value = ''
            name.value = ''
            account.value = ''
            role.value = ''
        }

        return {
            token,
            name,
            account,
            role,
            isLoggedIn,
            isAdmin,
            setAuth,
            clearAuth,
        }
    },
    { persist: true },
)
