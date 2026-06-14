<script setup>
import { ref, onMounted, reactive } from 'vue'
import AppModal from '@/components/AppModal.vue'
import axios from 'axios'

const showModal = ref(false)
const products = ref([])
// 表單響應式物件
const form = reactive({
    id: null,
    name: '',
    imageUrl: '',
    category: '',
    price: 0,
    stock: 0,
    desc: '',
})

// 取得商品列表
async function fetchProducts() {
    try {
        const resp = await axios.get('https://localhost:7193/api/Product')
        console.log(resp)

        //  將資料賦值給響應式變數 products
        products.value = resp.data
    } 
    catch (error) {
        console.error('資料讀取失敗：', error)
    }
}

// 儲存 (新增、修改共用)
async function save() {
    try {
        if (form.id == null) {
            //  新增模式發送 POST 請求
            const resp = await axios.post('https://localhost:7193/api/Product', form)
            console.log('商品新增成功:', resp.data)
        } 
        else {
            // 修改模式發送 PUT 請求
            const resp = await axios.put(`https://localhost:7193/api/Product/${form.id}`, form)
            console.log('商品修改成功:', resp.data)
        }
        
        showModal.value = false // 關閉彈出視窗        
        await fetchProducts()   // 重新載入列表，讓最新資料立刻出現在畫面上    
        resetForm()             // 重置表單欄位清空內容
    } 
    catch (error) {
        console.error('儲存商品失敗：', error)
        alert('儲存失敗，請檢查後端 API 狀態或欄位格式')
    }
}

// 編輯
async function edit(id) {
    try {
        resetForm()
        const resp = await axios.get(`https://localhost:7193/api/Product/${id}`)
        
        form.id = resp.data.id
        form.name = resp.data.name
        form.imageUrl = resp.data.imageUrl
        form.category = resp.data.category
        form.price = resp.data.price
        form.stock = resp.data.stock
        form.desc = resp.data.desc        
        showModal.value = true // 開啟彈窗
    } 
    catch (error) {
        console.error('取得商品細節失敗：', error)
        alert('無法取得該商品資料')
    }
}

// 刪除
async function deleteData(id) {
    if (!confirm('確定要刪除嗎？將無法復原此動作')) return

    const resp = await axios.delete(`https://localhost:7193/api/Product/${id}`)
    await fetchProducts()
    alert(resp.data.message)
}

// 清空表單
function resetForm() {
    form.id = null
    form.name = ''
    form.imageUrl = ''
    form.category = ''
    form.price = 0
    form.stock = 0
    form.desc = ''
}

//  確保組件一掛載到畫面上，就立刻執行 API 請求
onMounted(() => {
    fetchProducts()
})
</script>

<template>
    <h3 class="fw-bold mb-4">商品管理</h3>

    <div class="mb-4">
        <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            @click="((showModal = true), resetForm())"
        >
            新增
        </button>
    </div>

    <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <span class="fw-semibold">商品列表</span>
            <span>共 {{ products.length }} 筆</span>
        </div>
        <div class="card-body p-0">
            <table class="table mb-0 align-middle">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>圖</th>
                        <th>商品名稱</th>
                        <th>分類</th>
                        <th class="text-end">售價</th>
                        <th class="text-center">庫存</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, i) in products" :key="p.id || i">
                        <td class="text-body-secondary small">{{ i + 1 }}</td>
                        <td>
                            <img
                                :src="'https://localhost:7193/' + p.imageUrl"
                                class="img-thumbnail"
                                style="width: 100px"
                            />
                        </td>
                        <td class="fw-semibold">{{ p.name }}</td>
                        <td>
                            <span class="badge text-bg-light text-dark border">{{
                                p.category
                            }}</span>
                        </td>
                        <td class="text-end">NT$ {{ p.price }}</td>
                        <td class="text-center">{{ p.stock }}</td>
                        <td class="text-end">
                            <button 
                                type="button" 
                                class="btn btn-sm btn-outline-primary me-1"
                                @click="edit(p.id)"   
                            >
                                編輯
                            </button>
                            <button 
                                type="button" 
                                class="btn btn-sm btn-outline-danger"
                                @click="deleteData(p.id)"
                            >
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <AppModal :show="showModal" @close="showModal = false">
        <template #header>
            <h5 class="fw-bold mb-0">{{ form.id == null ? '新增' : '修改' }}商品</h5>
        </template>
        <div class="mb-3">
            <label class="form-label">商品名稱</label>
            <input type="text" class="form-control" v-model="form.name" />
        </div>
        <div class="mb-3">
            <label class="form-label">圖片網址</label>
            <input type="text" class="form-control" v-model="form.imageUrl" />
        </div>
        <div class="mb-3">
            <label class="form-label">分類</label>
            <select class="form-select" v-model="form.category">
                <option value="">請選擇分類</option>
                <option value="零食">零食</option>
                <option value="糕點">糕點</option>
                <option value="飲料">飲料</option>
                <option value="醬料">醬料</option>
            </select>
        </div>
        <div class="row g-2 mb-3">
            <div class="col">
                <label class="form-label">售價（NT$）</label>
                <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    min="0"
                    v-model.number="form.price"
                />
            </div>
            <div class="col">
                <label class="form-label">庫存數量</label>
                <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    min="0"
                    v-model.number="form.stock"
                />
            </div>
        </div>

        <div class="mb-4">
            <label class="form-label">商品描述</label>
            <textarea
                class="form-control"
                rows="3"
                placeholder="請輸入商品描述"
                v-model="form.desc"
            ></textarea>
        </div>
        <template #footer>
            <button type="button" class="btn btn-secondary" @click="showModal = false">取消</button>
            <button type="button" class="btn btn-primary" @click="save()">儲存</button>
        </template>
    </AppModal>
</template>
<style scoped></style>
