<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="props.show">
        <div class="modal-backdrop fade show"></div>

        <div class="modal fade show d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <!-- 具名插槽 header -->
                            <slot name="header"></slot>
                        </h5>
                        <button 
                            type="button" 
                            class="btn-close" 
                            @click="emit('close')"
                        >
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- 預設插槽 -->
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <!-- 具名插槽 footer -->
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
