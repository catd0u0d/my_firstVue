<script setup>
import { ref } from 'vue'
const categoryId = ref('')
const keyword = ref('')
const categories = ref([
    {
        id: 1,
        name: '零食',
    },
    {
        id: 2,
        name: '飲料',
    },
    {
        id: 3,
        name: '糕點',
    },
    {
        id: 4,
        name: '調味醬',
    },
])
const products = ref([
    {
        id: 1,
        name: '古早味麥芽餅',
        price: 35,
        categoryId: 1,
        desc: '用傳統配方製作，香脆餅皮包覆濃郁麥芽糖，勾起童年的甜蜜記憶。',
    },
    {
        id: 2,
        name: '手工鳳梨酥',
        price: 25,
        categoryId: 3,
        desc: '嚴選新鮮鳳梨熬製內餡，外皮酥脆、甜中帶酸，伴手禮首選。',
    },
    {
        id: 3,
        name: '黑糖珍珠奶茶',
        price: 65,
        categoryId: 2,
        desc: '自製黑糖珍珠 Q 彈有嚼勁，搭配鮮奶茶香氣濃醇。',
    },
    {
        id: 4,
        name: '原味米餅',
        price: 20,
        categoryId: 1,
        desc: '天然米穀製作，無添加香精，輕鬆享受健康好滋味。',
    },
    {
        id: 5,
        name: '檸檬塔',
        price: 45,
        categoryId: 3,
        desc: '法式塔皮搭配手工檸檬凝乳，酸甜平衡，每口都是幸福。',
    },
    {
        id: 6,
        name: '烏龍綠茶',
        price: 28,
        categoryId: 2,
        desc: '高山烏龍茶葉冷泡 8 小時，清爽回甘，無糖無咖啡因。',
    },
    {
        id: 7,
        name: '花生牛奶糖',
        price: 22,
        categoryId: 1,
        desc: '濃郁花生香氣融合牛奶香甜，入口即化，是辦公室必備的解嘴饞零食。',
    },
    {
        id: 8,
        name: '鳳梨豆瓣醬',
        price: 60,
        categoryId: 4,
        desc: '選用在地新鮮鳳梨與豆瓣混合醃製，酸鹹香辣完美平衡，下飯超對味。',
    },
])

function handleCategory() {
    console.log('選擇的分類=' + categoryId.value)
}

function handleKeyword() {
    console.log('輸入的關鍵字=' + keyword.value)
}
</script>

<template>
    <h3 class="fw-bold mb-3">線上購物2</h3>

    <!-- 搜尋 & 篩選列 1 -->
    <div class="d-flex gap-2 mb-4">
        <input
            type="text"
            class="form-control"
            placeholder="搜尋商品..."
            v-model="keyword"
            @keyup.enter="handleKeyword"
        />
        <select
            class="form-select"
            style="max-width: 160px"
            v-model="categoryId"
            v-on:change="handleCategory()"
        >
            <option value="">全部分類</option>
            <option value="1">零食</option>
            <option value="2">飲料</option>
            <option value="3">糕點</option>
            <option value="4">調味醬</option>
        </select>
    </div>
    <!-- 搜尋 & 篩選列 2 -->
    <div class="d-flex gap-2 mb-4">
        <input type="text" class="form-control" placeholder="搜尋商品..." />
        <select class="form-select" style="max-width: 160px">
            <option value="">全部分類</option>
            <option v-for="item in categories" :value="item.id" :key="item.id">
                {{ item.name }}
            </option>
        </select>
    </div>

    <!-- 商品列表 -->
    <div class="row g-3">
        <div>共 {{ products.length }} 筆結果</div>
        <!-- 商品卡片 -->
        <!-- for 迴圈加在這邊 -->
        <div class="col-md-4" v-for="(item, index) in products" :key="item.id">
            <div class="card h-100">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold">
                        <RouterLink
                            :to="{ name: 'product2', params: { productId: item.id } }"
                            class="stretched-link text-decoration-none text-dark"
                        >
                            {{ index + 1 }}- {{ item.name }}
                        </RouterLink>
                    </h6>
                    <p class="card-text text-body-secondary small flex-grow-1">
                        {{ item.desc }}
                    </p>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <span class="fw-bold text-primary">NT$ {{ item.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
