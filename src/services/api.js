import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    // baseURL: 'https://localhost:7193/api',
    baseURL: import.meta.env.VITE_API_URL, // 環境變數
    timeout: 30000,                        // 連線逾時
})

// 請求攔截器
api.interceptors.request.use(
    (config) => {
        
        const authStore = useAuthStore() // 在函式內部建立 store 實例發送 API 時才會即時去抓        
        const token = authStore.token    // 從保險箱拿出真正的 Token
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)
// 回應攔截器
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status
        if (status == 401) {
            alert('登入已過期，請重新登入')
            window.location.href = '/login'
        } 
        else if (status == 403) {
            alert('您沒有執行此操作的權限')
        } 
        else if (status >= 500) {
            alert('伺服器發生錯誤，請稍後再試')
        }
        return Promise.reject(error)
    },
)

export default api
