<script setup>
import { ref } from 'vue'

const amount = ref(null)
const submitted = ref(false)

function handleSubmit() {
    if (amount.value === null || amount.value === '') {
        alert('請輸入想要贊助的金額！')
        return
    }
    submitted.value = true
    alert('感謝您的贊助！')
    console.log('贊助金額=' + amount.value)
}

function handleRangeCheck() {
    // 防護機制 使用者清空輸入框先允許它保持空白
    if (amount.value === null || amount.value === '') {
        return
    }

    // 限制範圍為 15 ~ 100,000，並在觸發時跳出 alert 提醒
    if (amount.value < 15) {
        amount.value = 15
        alert('最低贊助金額為 15 元，已自動為您調整為 15 元！')
    } else if (amount.value > 100000) {
        amount.value = 100000
        alert('最高贊助金額為 100,000 元，已自動為您調整為 100,000 元！')
    }
}

function handleResubmit() {
    submitted.value = false
    amount.value = null
}
</script>

<template>
    <div class="container col-md-6 py-5">
        <div class="text-center mb-4">
            <div style="font-size: 100px">💰</div>
            <h2 class="fw-bold">開店不容易，歡迎斗內</h2>
        </div>
        <div class="card border rounded p-4" v-show="!submitted">
            <div class="mb-3">
                <label class="form-label fw-semibold">歡迎斗內金額 (15 ~ 100,000)</label>
                <input
                    type="number"
                    class="form-control"
                    min="15"
                    max="100000"
                    v-model.number="amount"
                    @blur="handleRangeCheck"
                />
                <div class="form-text text-muted">目前輸入的值為：NT$ {{ amount }} 元</div>
            </div>
            <div class="mb-3">
                <!-- 情緒價值的訊息 -->
                <div v-if="amount == null || amount == ''">👀 輸入金額，看看會發生什麼事...</div>
                <div v-else-if="amount >= 1 && amount < 100">😡 太小氣了！請給多一點</div>
                <div v-else-if="amount >= 100 && amount < 500">😍 太感謝了！這杯咖啡超香的</div>
                <div v-else>🤑 謝謝乾爹！感激的痛哭流涕</div>
            </div>
            <button type="button" class="btn btn-primary w-100" @click="handleSubmit">贊助</button>
        </div>
        <!-- 贊助成功後顯示 -->
        <div class="card border rounded p-4" v-show="submitted">
            <div class="text-center">
                <label style="font-size: 100px">🎊</label>
                <p class="fs-4 fw-bold">感謝您贊助的 NT$ {{ amount ?? 0 }} 元</p>
                <button type="button" class="btn btn-primary w-100" @click="handleResubmit()">
                    再次贊助
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
