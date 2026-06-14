<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps ({
    orderId: { type:String, required:true },
    orderStatus: { type:String, required:true },
    orderDate: { type:String, required:true },
    orderTotal: { type:Number, required:true },
    orderItems: { type:Array, required:true },
    orderInvoice: { type:String, default:null },
})
const emit = defineEmits(['viewDetail', 'viewInvoice'])

function handleDetail() {
    // 傳整個物件
    // emit('viewDetail', props)
    // 傳單個值
    emit('viewDetail', props.orderId)
}

function handleInvoice() {
    // 傳發票號碼
    emit('viewInvoice', props.orderInvoice)
}
</script>

<template>
    <div class="card mb-3">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <span class="badge text-bg-primary me-2"
                        :class="{
                            'text-bg-success': props.orderStatus == '已完成',
                            'text-bg-warning': props.orderStatus == '處理中',
                            'text-bg-secondary': props.orderStatus == '已取消',
                        }"
                    >
                        {{ props.orderStatus }}
                    </span>
                    <small class="text-body-secondary">訂單編號：{{ props.orderId }}</small>
                </div>
                <small class="text-body-secondary">{{ props.orderDate }}</small>
            </div>
            <div class="mb-2 small">
                <div v-for="item in props.orderItems" class="d-flex justify-content-between">
                    <span>{{ item.name }} x {{ item.qty }}</span>
                    <span>NT$ {{ item.price }}</span>
                </div>
            </div>
            <hr class="my-2" />
            <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold">合計 NT$ {{ props.orderTotal }}</span>
                <div>
                    <button 
                        type="button" 
                        class="btn btn-sm btn-outline-primary me-1"
                        @click="handleInvoice()"
                        v-if="props.orderInvoice != null"
                    >
                        發票
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-sm btn-outline-primary"
                        @click="handleDetail()"
                    >
                        查看詳情
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
