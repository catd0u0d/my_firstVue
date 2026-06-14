import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
    'cart',
    () => {
        // 存放購物車商品
        const items = ref([])

        // 加入購物車
        function addItem(product, qty = 1) {
            // 檢查購物車裡是否已經有這個商品
            const existingItem = items.value.find((i) => i.id === product.id)

            if (existingItem) {
                // 如果商品已存在，加上這次傳入的數量
                existingItem.quantity += qty
            } 
            else {
                // 如果商品不存在，複製商品資訊，並將初始數量設為傳入的數量
                items.value.push({ ...product, quantity: qty })
            }
        }

        // 商品數量增減（預設單次扣 1）
        function reduceItem(productId, qty = 1) {
            const existingItem = items.value.find((i) => i.id === productId)
            if (existingItem) {
                existingItem.quantity -= qty
                // 如果數量減到 0 或以下，從購物車移除這個商品
                if (existingItem.quantity <= 0) {
                    removeItem(productId)
                }
            }
        }

        // 移除商品
        function removeItem(productId) {
            const index = items.value.findIndex((i) => i.id == productId)
            if (index !== -1) {
                items.value.splice(index, 1)
            }
        }

        // 計算購物車總價（使用reduce）
        const total = computed(() => {
            return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
        })

        return { items, addItem, reduceItem, removeItem, total }
    },
    {
        persist: true, // 啟用持久化
    },
)
