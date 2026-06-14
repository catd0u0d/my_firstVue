<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const account = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function login() {
    try {
        const resp = await api.post('/User/Login', {
            account: account.value, 
            password:password.value, 
    })    
        authStore.setAuth(resp.data)
        alert(`歡迎回來，${resp.data.name}！`)
        router.push({ name: 'shop-list' })
    }
    catch(error) {
        console.error("登入失敗：", error)
        alert("帳號或密碼錯誤，請重新輸入")
    }
}
</script>

<template>
    <div class="col-md-4 my-5 m-auto">
        <h3 class="mb-4 fw-bold">柑仔店管理系統 - 登入</h3>

        <div class="mb-3">
            <label class="form-label">帳號</label>
            <input 
                type="text" 
                class="form-control" 
                v-model="account"
                placeholder="請輸入帳號"
            />
        </div>
        <div class="mb-3">
            <label class="form-label">密碼</label>
            <input 
                type="password" 
                class="form-control" 
                v-model="password"
                @keyup.enter="login"
                placeholder="請輸入密碼"
            />
        </div>

        <button class="btn btn-primary w-100 py-2" type="button" @click="login">登入</button>
    </div>
</template>

<style scoped></style>
