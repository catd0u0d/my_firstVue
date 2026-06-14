<script setup>
import { useCartStore } from '@/stores/cart'
import { ref, watch, watchEffect, reactive } from 'vue'

const cartStore = useCartStore()
const shipMessage = ref('')
const shipFee = ref(0)
const discountMessage = ref('')
const discountFee = ref(0)
const totalAmount = ref(0)
const info = reactive({
    name: '',
    phone: '',
    address: '',
})
const done = ref(false)

// 使用 watchEffect 來自動計算應付金額變化 
watchEffect(() => {
    totalAmount.value = cartStore.total + shipFee.value - discountFee.value
})
// 使用 watchEffect 根據欄位是否空白來變化
watchEffect(() => {
    done.value = info.name != "" && info.phone != "" && info.address != ""
})

// 使用 watch 監聽 cartStore.total 的變化
watch(
    () => cartStore.total,
    (newTotal, oldTotal) => {
        // 先印出變更前的舊值
        console.log('舊的總價 (oldTotal):', oldTotal)

        // 運費門檻判斷 (1000 元免運)
        if (newTotal >= 1000) {
            shipMessage.value = '🎉 已達免運門檻，免收運費！'
            shipFee.value = 0

        }
        else {
            const remainingForFreeShipping = 1000 - newTotal
            shipMessage.value = `🚚 運費 NT$ 60，差 NT$ ${remainingForFreeShipping} 元即可免運`
            shipFee.value = 60
        }

        // 折扣門檻判斷 (2000 元享 9 折)
        if (newTotal >= 2000) {
            discountMessage.value = ''
            // 使用 Math.round() 將折扣金額四捨五入到整數
            discountFee.value = Math.round(cartStore.total * 0.1) 
        }
        else {
            const remainingForDiscount = 2000 - newTotal
            discountMessage.value = `還差 NT$ ${remainingForDiscount} 元即可享 9 折優惠`
            discountFee.value = 0
        }
    },
    { immediate: true }, // 讓元件立即執行一次，確保初始畫面有文字提示
)
</script>

<template>
    <h3 class="fw-bold mb-4">確認結帳</h3>
    <!-- 訂單明細 -->
    <div class="row g-4 mb-3">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h6 class="fw-bold mb-3">訂單明細</h6>
                    <table class="table align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>商品名稱</th>
                                <th>數量</th>
                                <th class="text-end">售價</th>
                                <th class="text-end">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in cartStore.items" :key="product.id">
                                <td class="text-body-secondary small">{{ index + 1 }}</td>
                                <td class="fw-semibold">{{ product.name }}</td>
                                <td>
                                    <div class="d-flex align-items-center gap-2">
                                        <button 
                                            class="btn btn-outline-secondary btn-sm px-2 py-0"
                                            @click="cartStore.reduceItem(product.id, 1)"
                                        >
                                            －
                                        </button>
                                        <span style="min-width: 1.5rem" class="text-center">
                                            {{ product.quantity }}
                                        </span>
                                        <button 
                                            class="btn btn-outline-secondary btn-sm px-2 py-0"
                                            @click="cartStore.reduceItem(product.id, -1)"
                                        >
                                            ＋
                                        </button>
                                    </div>
                                </td>
                                <td class="text-end">NT$ {{ product.price }}</td>
                                <td class="text-end">NT$ {{ product.price * product.quantity }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-body-secondary">小計</span>
                        <span>NT$ {{ cartStore.total }}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-body-secondary">
                            全館優惠
                            <small v-if="discountMessage" class="text-muted d-block">{{ discountMessage }}</small>
                        </span>
                        <span class="text-danger">－NT$ {{ discountFee }}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-body-secondary">
                            運費
                            <small class="text-muted d-block">{{ shipMessage }}</small>
                        </span>
                        <span :class="shipFee === 0 ? 'text-success fw-semibold' : 'text-body'">
                            {{ shipFee === 0 ? '免運' : `NT$ ${shipFee}` }}
                        </span>
                    </div>
                    <hr />
                    <div class="d-flex justify-content-between fw-bold fs-5">
                        <span>應付金額</span>
                        <span class="text-primary">NT$ {{ totalAmount }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 收件資訊 -->
    <div class="col-md-12">
        <div class="card mb-3">
            <div class="card-body">
                <h6 class="fw-bold mb-3">收件資訊</h6>
                <div class="row g-2 mb-3">
                    <div class="col-md-6">
                        <label class="form-label">姓名</label>
                        <input type="text" class="form-control" v-model="info.name"/>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">電話</label>
                        <input type="tel" class="form-control" v-model="info.phone"/>
                    </div>
                </div>
                <div class="row g-2 mb-3">
                    <div class="col-12">
                        <label class="form-label">收件地址</label>
                        <input type="text" class="form-control" v-model="info.address"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12">
        <button 
            type="button" 
            class="btn btn-primary w-100"
            :disabled="!done"
        >
            確認送出訂單
        </button>
    </div>
</template>

<style scoped></style>
