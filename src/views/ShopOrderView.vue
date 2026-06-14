<script setup>
import { reactive, ref } from 'vue'
import Order from '@/components/OrderDetail.vue'
import AppModal from '@/components/AppModal.vue'

const orders = ref([
    {
        id: 'ORD-20260401-001',
        status: '已完成',
        date: '2026-04-01 10:23:45',
        invoice: 'AB-12345678',
        total: 215,
        receiver: '王小明',
        phone: '0912-345-678',
        address: '台北市大安區信義路四段 100 號 5 樓',
        items: [
            { id: 1, name: '古早味麥芽餅', qty: 2, price: 35 },
            { id: 2, name: '手工鳳梨酥', qty: 3, price: 25 },
            { id: 6, name: '烏龍綠茶', qty: 2, price: 28 },
            { id: 4, name: '原味米餅', qty: 1, price: 20 },
        ],
    },
    {
        id: 'ORD-20260408-002',
        status: '處理中',
        date: '2026-04-08 14:05:12',
        invoice: null,
        total: 189,
        receiver: '李美玲',
        phone: '0936-789-012',
        address: '新北市板橋區文化路一段 55 號 3 樓',
        items: [
            { id: 5, name: '檸檬塔', qty: 1, price: 45 },
            { id: 6, name: '烏龍綠茶', qty: 2, price: 28 },
            { id: 1, name: '古早味麥芽餅', qty: 1, price: 35 },
            { id: 7, name: '花生牛奶糖', qty: 2, price: 30 },
        ],
    },
    {
        id: 'ORD-20260412-003',
        status: '已取消',
        date: '2026-04-12 09:41:30',
        invoice: null,
        total: 120,
        receiver: '陳大偉',
        phone: '0958-111-222',
        address: '台中市西區台灣大道二段 200 號',
        items: [
            { id: 8, name: '鳳梨豆瓣醬', qty: 1, price: 60 },
            { id: 3, name: '黑糖珍珠奶茶', qty: 2, price: 30 },
        ],
    },
    {
        id: 'ORD-20260415-004',
        status: '已完成',
        date: '2026-04-15 17:58:02',
        invoice: 'CD-87654321',
        total: 310,
        receiver: '林淑芬',
        phone: '0977-456-789',
        address: '高雄市前鎮區中山二路 88 號 2 樓',
        items: [
            { id: 2, name: '手工鳳梨酥', qty: 4, price: 25 },
            { id: 5, name: '檸檬塔', qty: 2, price: 45 },
            { id: 6, name: '烏龍綠茶', qty: 3, price: 28 },
            { id: 7, name: '花生牛奶糖', qty: 2, price: 22 },
            { id: 1, name: '古早味麥芽餅', qty: 2, price: 35 },
        ],
    },
    {
        id: 'ORD-20260417-005',
        status: '處理中',
        date: '2026-04-17 11:30:00',
        invoice: null,
        total: 156,
        receiver: '張志豪',
        phone: '0921-654-321',
        address: '桃園市中壢區中北路 33 號 7 樓',
        items: [
            { id: 6, name: '烏龍綠茶', qty: 1, price: 28 },
            { id: 7, name: '花生牛奶糖', qty: 3, price: 30 },
            { id: 4, name: '原味米餅', qty: 2, price: 20 },
            { id: 3, name: '黑糖珍珠奶茶', qty: 1, price: 30 },
        ],
    },
])
const showDetailModal = ref(false)
const showInvoiceModal = ref(false)

const viewData = reactive({
    id: '',
    status: '',
    date: '',
    invoice: null,
    total: 0,
    receiver: '',
    phone: '',
    address: '',
    items: [],
})

function setViewData(orderID) {
    const detail = orders.value.find((x) => x.id === orderID)
    if (detail) {
        viewData.id = detail.id
        viewData.status = detail.status
        viewData.date = detail.date
        viewData.invoice = detail.invoice
        viewData.total = detail.total
        viewData.receiver = detail.receiver
        viewData.phone = detail.phone
        viewData.address = detail.address
        viewData.items = detail.items
        return true
    }
    return false
}

function handleViewDetail(orderId) {
    if (setViewData(orderId)) {
        showDetailModal.value = true
    } else {
        alert('查無此訂單')
    }
}

// 查看發票的方法
function handleViewInvoice(invoiceNum) {
    const detail = orders.value.find((x) => x.invoice === invoiceNum)

    if (detail && setViewData(detail.id)) {
        showInvoiceModal.value = true
    } else {
        alert('查無此發票對應的訂單')
    }
}
</script>

<template>
    <h3 class="fw-bold mb-4">訂單記錄</h3>
    <!-- 訂單卡片（子元件位置） -->
    <Order
        v-for="order in orders"
        :orderId="order.id"
        :orderStatus="order.status"
        :orderDate="order.date"
        :orderTotal="order.total"
        :orderItems="order.items"
        :orderInvoice="order.invoice"
        @view-detail="handleViewDetail"
        @view-invoice="handleViewInvoice"
    />
    <!-- 詳細訂單 Modal -->
    <div v-if="showDetailModal" class="modal-backdrop fade show"></div>
    <div
        v-if="showDetailModal"
        class="modal fade show d-block"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="d-flex justify-content-end">
                    <button
                        type="button"
                        class="btn-close m-3"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="showDetailModal = false"
                    ></button>
                </div>
                <div class="modal-body mb-4">
                    <h5 class="fw-bold mb-1">訂單編號</h5>
                    <p class="text-body-secondary small mb-3">{{ viewData.id }}</p>

                    <div class="d-flex gap-3 mb-3 small">
                        <div>
                            <span class="text-body-secondary">訂單狀態：</span>
                            <span class="badge text-bg-success">{{ viewData.status }}</span>
                        </div>
                        <div>
                            <span class="text-body-secondary">建立時間：</span>
                            <span>{{ viewData.date }}</span>
                        </div>
                    </div>

                    <hr class="my-3" />

                    <!-- 收件資訊 -->
                    <p class="fw-bold small mb-2">收件資訊</p>
                    <div class="small mb-1">
                        <span class="text-body-secondary me-2">收件人：</span>
                        <span>{{ viewData.receiver }}</span>
                    </div>
                    <div class="small mb-1">
                        <span class="text-body-secondary me-2">電話：</span>
                        <span>{{ viewData.phone }}</span>
                    </div>
                    <div class="small mb-3">
                        <span class="text-body-secondary me-2">地址：</span>
                        <span>{{ viewData.address }}</span>
                    </div>

                    <hr class="my-3" />

                    <!-- 品項明細 -->
                    <p class="fw-bold small mb-2">購買品項</p>
                    <table class="table table-sm table-borderless small mb-0">
                        <thead class="text-body-secondary">
                            <tr>
                                <th>品名</th>
                                <th class="text-center">數量</th>
                                <th class="text-end">單價</th>
                                <th class="text-end">小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in viewData.items" :key="item.id">
                                <td>{{ item.name }}</td>
                                <td class="text-center">{{ item.qty }}</td>
                                <td class="text-end">NT$ {{ item.price }}</td>
                                <td class="text-end">NT$ {{ item.price * item.qty }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <hr class="my-3" />

                    <div class="d-flex justify-content-between fw-bold">
                        <span>合計</span>
                        <span class="text-primary fs-5">NT$ {{ viewData.total }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 發票 Modal -->
    <AppModal :show="showInvoiceModal" @close="showInvoiceModal = false">
        <template #header>
            <h5 class="fw-bold mb-0">發票資訊</h5>
        </template>

        <!-- 發票主體 -->
        <div class="card shadow-sm border-0">
            <div class="card-header text-center bg-secondary text-white py-3">
                <div class="fw-bold fs-5">電子發票證明聯</div>
            </div>

            <div class="card-body px-3 py-3">
                <div class="text-center mb-3">
                    <div class="invoice-number fw-bold fs-3">
                        {{ viewData.invoice || '無發票資訊' }}
                    </div>
                    <div class="text-body-secondary small">{{ viewData.date }}</div>
                </div>

                <hr />

                <table class="table table-sm table-borderless small mb-0">
                    <thead>
                        <tr class="text-body-secondary">
                            <th>品名</th>
                            <th class="text-center">數量</th>
                            <th class="text-end">單價</th>
                            <th class="text-end">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in viewData.items" :key="'invoice-' + item.id">
                            <td>{{ item.name }}</td>
                            <td class="text-center">{{ item.qty }}</td>
                            <td class="text-end">{{ item.price }}</td>
                            <td class="text-end">{{ item.price * item.qty }}</td>
                        </tr>
                    </tbody>
                </table>

                <hr />

                <div class="d-flex justify-content-between small mb-1">
                    <span class="text-body-secondary">銷售額合計</span>
                    <span>NT$ {{ Math.round(viewData.total / 1.05) }}</span>
                </div>
                <div class="d-flex justify-content-between small mb-1">
                    <span class="text-body-secondary">稅額(5%)</span>
                    <span>NT$ {{ viewData.total - Math.round(viewData.total / 1.05) }}</span>
                </div>
                <div class="d-flex justify-content-between fw-bold mt-2">
                    <span>總計</span>
                    <span class="text-primary fs-5">NT$ {{ viewData.total }}</span>
                </div>
            </div>
        </div>

        <template #footer>
            <span class="text-muted small"> 如發票有問題請聯繫客服! </span>
        </template>
    </AppModal>
</template>
<style scoped></style>
