<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

function gotoShop() {
    router.push({ name: 'shop-list' })
}

function gotoCheckout() {
    // if (!isLoggedIn) {
    //     window.alert('請先登入會員！')
    //     router.push({ name: 'login' })
    //     return
    // }
    router.push({ name: 'checkout' })
}
</script>

<template>
    <h3 class="fw-bold mb-4">購物車</h3>

    <!-- 購物車空狀態 -->
    <div v-if="cartStore.items.length === 0"
        class="text-center py-5 text-body-secondary bg-light rounded border"
    >
        <div class="fs-1 mb-2">🛒</div>
        <p class="mb-3">購物車是空的，快去選購吧！</p>
        <button class="btn btn-primary" @click="gotoShop()">前往商品列表</button>
    </div>

    <div v-else class="row g-4">
        <!-- 購物車品項 -->
        <div class="col-md-8">
            <div class="card">
                <div class="card-body p-0">
                    <table class="table mb-0 align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>商品</th>
                                <th class="text-center">單價</th>
                                <th class="text-center" style="width: 140px">數量</th>
                                <th class="text-end">小計</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in cartStore.items" :key="product.id">
                                <td>
                                    <div class="fw-semibold">{{ product.name }}</div>
                                    <small class="text-body-secondary">{{
                                        product.categoryId
                                    }}</small>
                                </td>
                                <td class="text-center">NT$ {{ product.price }}</td>
                                <td>
                                    <div class="input-group input-group-sm">
                                        <button
                                            class="btn btn-secondary"
                                            type="button"
                                            @click="cartStore.reduceItem(product.id, 1)"
                                        >
                                            －
                                        </button>
                                        <span class="input-group-text px-3">{{
                                            product.quantity
                                        }}</span>
                                        <button
                                            class="btn btn-secondary"
                                            type="button"
                                            @click="cartStore.reduceItem(product.id, -1)"
                                        >
                                            ＋
                                        </button>
                                    </div>
                                </td>
                                <td class="text-end fw-semibold">
                                    NT$ {{ product.price * product.quantity }}
                                </td>
                                <td class="text-end">
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-link text-danger p-0"
                                        @click="cartStore.removeItem(product.id)"
                                    >
                                        移除
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 訂單摘要 -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h6 class="fw-bold mb-3">訂單摘要</h6>
                    <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
                        <span>合計</span>
                        <span class="text-primary">NT$ {{ cartStore.total }}</span>
                    </div>
                    <button
                        type="button"
                        class="btn btn-primary w-100"
                        @click="gotoCheckout()"
                    >
                        前往結帳
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
