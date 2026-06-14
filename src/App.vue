<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import confetti from 'canvas-confetti'

confetti() // 快樂灑花特效

const title = import.meta.env.VITE_APP_TITLE
const authStore = useAuthStore()
const router = useRouter()

function logout() {
    if (confirm('確定要登出嗎？')) {
        authStore.clearAuth() // 清空保險箱中的 Token 與角色資料
        alert('您已成功登出')
        router.push({ name: 'login' }) // 回登入頁
    }
}
</script>

<template>
    <div class="container">
        <header class="border-bottom lh-1 py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-3 pt-1"><img src="/favicon.ico" alt="Logo" /></div>
                <div class="col-6 text-center">
                    <h1 class="fw-bold">{{ title }}</h1>
                </div>
                <div class="col-3 d-flex justify-content-end align-items-center">
                    <template v-if="!authStore.isLoggedIn">
                        <RouterLink
                            class="btn btn-sm btn-outline-info me-2"
                            :to="{ name: 'register' }"
                        >
                            會員註冊
                        </RouterLink>
                        <RouterLink
                            class="btn btn-sm btn-outline-primary me-2"
                            :to="{ name: 'login' }"
                        >
                            登入
                        </RouterLink>
                    </template>
                    <template v-else>
                        <span class="me-3 text-success small fw-semibold">
                            🖐 {{ authStore.name }}，你好
                        </span>
                        <a href="#" class="btn btn-sm btn-outline-danger" @click.prevent="logout">
                            登出
                        </a>
                    </template>
                </div>
            </div>
        </header>
        <div class="nav-scroller py-1 mb-3 border-bottom">
            <nav class="nav nav-underline">
                <RouterLink class="nav-item nav-link" :to="{ name: 'home' }">首頁</RouterLink>
                <RouterLink class="nav-item nav-link" :to="{ name: 'about' }">關於我們</RouterLink>
                <RouterLink class="nav-item nav-link" :to="{ name: 'donate' }">贊助我</RouterLink>
                <RouterLink class="nav-item nav-link" :to="{ name: 'shop-list' }"
                    >線上購物</RouterLink
                >
                <RouterLink class="nav-item nav-link" :to="{ name: 'shop2' }">線上購物2</RouterLink>
                <RouterLink class="nav-item nav-link" :to="{ name: 'cart' }">購物車</RouterLink>
                <RouterLink class="nav-item nav-link" :to="{ name: 'checkout' }">結帳</RouterLink>
                <RouterLink class="nav-item nav-link" :to="{ name: 'order' }">訂單紀錄</RouterLink>
                <RouterLink
                    v-if="authStore.isAdmin"
                    class="nav-item nav-link"
                    :to="{ name: 'admin-product' }"
                >
                    商品管理
                </RouterLink>
            </nav>
        </div>
        <div class="py-3">
            <!--頁面內容預留區-->
            <RouterView />
        </div>
    </div>
    <div class="container">
        <footer class="py-3 my-4">
            <p class="text-center text-body-secondary">© 2026 Vue.js {{ title }}</p>
        </footer>
    </div>
</template>

<style scoped></style>
