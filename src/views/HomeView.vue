<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import hello from '@/utils/greeting'

// onMounted(() => {
//   const message = hello('deng')
//   alert(message)
// })

// onBeforeUnmount(() => {
//   alert('謝謝光臨 歡迎下次再來！')
// })
</script>

<template>
  <h3 class="fw-bold mb-3">首頁</h3>
  <p>傳統柑仔店，提供在地優質商品，是您購物的最佳選擇。</p>
</template>

<style scoped></style>
