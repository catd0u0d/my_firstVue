import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 首頁
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
        },
        // 關於我們
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView.vue'),
        },
        // 線上購物 和商品資訊
        {
            path: '/shop',
            children: [
                {
                    path: 'list',
                    name: 'shop-list',
                    component: () => import('@/views/ShopView.vue'),
                },
                {
                    path: 'product',
                    name: 'shop-product',
                    component: () => import('@/views/ShopProductView.vue'),
                },
                {
                    path: 'list2',
                    name: 'shop2',
                    component: () => import('@/views/ShopView2.vue'),
                },
                {
                    path: 'product2/:productId?',
                    name: 'product2',
                    component: () => import('@/views/ShopProductView2.vue'),
                },
            ],
        },
        // 購物車結帳 和訂單紀錄
        {
            path: '/member',
            children: [
                {
                    path: 'cart',
                    name: 'cart',
                    component: () => import('@/views/ShopCartView.vue'),
                    meta: { requiresMember: true }, // 這行就是 to.meta.requiresMember
                },
                {
                    path: 'checkout',
                    name: 'checkout',
                    component: () => import('@/views/ShopCheckoutView.vue'),
                    meta: { requiresMember: true },
                },
                {
                    path: 'order',
                    name: 'order',
                    component: () => import('@/views/ShopOrderView.vue'),
                    meta: { requiresMember: true },
                },
            ],
        },
        // 會員註冊
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegistView.vue'),
        },
        // 會員登入
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
        // 贊助
        {
            path: '/donate',
            name: 'donate',
            component: () => import('@/views/DonateView.vue'),
        },
        // 管理者頁面
        {
            path: '/admin/product',
            name: 'admin-product',
            component: () => import('@/views/admin/ProductView2.vue'),
            meta: { requiresAdmin: true }, // 這行就是 to.meta.requiresAdmin
        },
        // 404 Not Found
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
})

// 加入全域守衛
import { useAuthStore } from '@/stores/auth'

router.beforeEach((to) => {
    const authStore = useAuthStore()

    // 檢查是否需要一般會員權限
    if (to.meta.requiresMember && !authStore.isLoggedIn) {
        alert('請先登入會員！')
        return { name: 'login' } // Vue Router 推薦回傳路由物件，最安全也不容易打錯字
    }

    // 檢查是否需要管理者權限
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
        alert('請先登入管理者權限進入！')
        return { name: 'home' } // 踢回首頁
    }
})
export default router
