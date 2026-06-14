<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from "vue-router"
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const quantity = ref(1)
const route = useRoute()
const id = route.query.id
const products = ref([
  {
    id: 1,
    name: "古早味麥芽餅",
    price: 35,
    categoryId: "零食",
    desc: "用傳統配方製作，香脆餅皮包覆濃郁麥芽糖，勾起童年的甜蜜記憶。",
    tags: ["人氣", "古早味"],
    stock: 28,
  },
  {
    id: 2,
    name: "手工鳳梨酥",
    price: 25,
    categoryId: "糕點",
    desc: "嚴選新鮮鳳梨熬製內餡，外皮酥脆、甜中帶酸，伴手禮首選。",
    tags: ["特價", "手工"],
    stock: 5,
  },
  {
    id: 3,
    name: "黑糖珍珠奶茶",
    price: 65,
    categoryId: "飲料",
    desc: "自製黑糖珍珠 Q 彈有嚼勁，搭配鮮奶茶香氣濃醇。",
    tags: ["人氣", "新品", "熱銷"],
    stock: 10,
  },
  {
    id: 4,
    name: "原味米餅",
    price: 20,
    categoryId: "零食",
    desc: "天然米穀製作，無添加香精，輕鬆享受健康好滋味。",
    tags: ["特價", "無添加"],
    stock: 52,
  },
  {
    id: 5,
    name: "檸檬塔",
    price: 45,
    categoryId: "糕點",
    desc: "法式塔皮搭配手工檸檬凝乳，酸甜平衡，每口都是幸福。",
    tags: ["季節限定"],
    stock: 8,
  },
  {
    id: 6,
    name: "烏龍綠茶",
    price: 28,
    categoryId: "飲料",
    desc: "高山烏龍茶葉冷泡 8 小時，清爽回甘，無糖無咖啡因。",
    tags: ["特價", "無糖"],
    stock: 0,
  },
  {
    id: 7,
    name: "花生牛奶糖",
    price: 22,
    categoryId: "零食",
    desc: "濃郁花生香氣融合牛奶香甜，入口即化，是辦公室必備的解嘴饞零食。",
    tags: ["經典", "人氣"],
    stock: 36,
  },
  {
    id: 8,
    name: "鳳梨豆瓣醬",
    price: 60,
    categoryId: "調味醬",
    desc: "選用在地新鮮鳳梨與豆瓣混合醃製，酸鹹香辣完美平衡，下飯超對味。",
    tags: ["特色", "下飯"],
    stock: 0,
  },
])
const myProduct = reactive({
    id: null,
    name: null,
    price: null,
    categoryId: null,
    desc: null,
    tags: [],
    stock: null,
})
const myProduct2 = reactive({
    id: null,
    name: null,
    price: null,
    categoryId: null,
    desc: null,
    tags: [],
    stock: null,
})

onMounted(() => {
    const item = products.value.find(d => d.id === parseInt(id))
    if (item) {
        // alert('目前查看的商品資訊為：' + item.name)
        // reactive 賦值寫法
        myProduct.id = item.id
        myProduct.name = item.name
        myProduct.price = item.price
        myProduct.categoryId = item.categoryId
        myProduct.desc = item.desc
        myProduct.tags = item.tags
        myProduct.stock = item.stock
        // 也可以使用 Object.assign() 的方式一次賦值
        Object.assign(myProduct2, item)
    }
    else {
        alert('該商品資訊不存在')
    }
})

function addToCart() {
    // 呼叫 cartStore 的 addItem 方法，將 myProduct2 的所有屬性加入購物車
    cartStore.addItem(myProduct2, quantity.value)
    // 加入 alert 提示視窗
    alert(`已將 ${quantity.value} 個 ${myProduct2.name} 加入購物車！`)    
}
</script>

<template>
    <h3 class="fw-bold mb-3">商品資訊</h3>

    <div class="row g-4">
        <div class="col-md-5">
            <div
                class="bg-light rounded d-flex align-items-center justify-content-center"
                style="height: 300px"
            >
                <div>
                    <div style="font-size: 100px">🧋</div>
                    <div class="text-center">商品圖片</div>
                </div>
            </div>
        </div>

        <div class="col-md-7">
            <div class="mb-2">
                <span class="badge text-bg-primary me-1">{{ myProduct2.tags[0] }}</span>
                <span class="badge text-bg-info me-1">{{ myProduct2.tags[1] }}</span>
                <span class="badge text-bg-light text-dark border me-1">{{ myProduct2.categoryId }}</span>
            </div>
            <h4 class="fw-bold mb-1">{{ myProduct2.name }}</h4>
            <div class="fs-4 fw-bold text-primary mb-2">{{ myProduct2.price }}</div>
            <p class="text-body-secondary mb-4">
                {{ myProduct2.desc }}
            </p>

            <!-- 數量選擇 -->
            <div v-if="myProduct2.stock > 0" class="d-flex align-items-center gap-3 mb-4">
                <label class="form-label mb-0 fw-semibold">數量</label>
                <select class="form-select" style="width: 100px" v-model.number="quantity">
                    <option v-for="qty in 10" :key="qty" :value="qty">{{ qty }}</option>
                </select>
            </div>

            <button 
                type="button" 
                class="btn btn-primary px-5" 
                @click="addToCart()"
                v-if="myProduct2.stock > 0"
            >
                加入購物車
            </button>
            <button type="button" class="btn btn-secondary px-5" disabled v-else>
                已售完
            </button>
        </div>
    </div>
</template>

<style scoped></style>
