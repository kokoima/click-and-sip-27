<template>
  <div class="glass-card rounded-lg overflow-hidden">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-600 mt-1">{{ product.description }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-lg font-bold">${{ product.price.toFixed(2) }}</span>
        <div class="flex items-center gap-2">
          <template v-if="quantity > 0">
            <button
              class="p-2 rounded-md border"
              @click="$emit('quantity-change', product, quantity - 1)"
            >
              <MinusIcon class="h-4 w-4" />
            </button>
            <span class="w-8 text-center">{{ quantity }}</span>
          </template>
          <button
            class="p-2 rounded-md bg-primary text-white"
            @click="handleAdd"
          >
            <PlusIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <Dialog v-model="showVariantDialog" v-if="product.variants">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize your {{ product.name }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <div v-for="variant in product.variants" :key="variant.id">
            <label class="text-sm font-medium">{{ variant.name }}</label>
            <select
              v-model="selectedVariants[variant.id]"
              class="w-full p-2 border rounded-md mt-1"
            >
              <option v-for="option in variant.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <button
            class="w-full p-2 bg-primary text-white rounded-md"
            @click="submitVariants"
          >
            Add to Order
          </button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MinusIcon, PlusIcon } from 'lucide-vue-next'
import type { Product } from '../types'
import Dialog from './ui/dialog.vue'
import DialogContent from './ui/dialog-content.vue'
import DialogHeader from './ui/dialog-header.vue'
import DialogTitle from './ui/dialog-title.vue'

const props = defineProps<{
  product: Product
  quantity: number
}>()

const emit = defineEmits<{
  (e: 'quantity-change', product: Product, quantity: number, variants?: Record<string, string>): void
}>()

const showVariantDialog = ref(false)
const selectedVariants = ref<Record<string, string>>({})

const handleAdd = () => {
  if (props.product.variants) {
    showVariantDialog.value = true
  } else {
    emit('quantity-change', props.product, props.quantity + 1)
  }
}

const submitVariants = () => {
  emit('quantity-change', props.product, props.quantity + 1, selectedVariants.value)
  showVariantDialog.value = false
  selectedVariants.value = {}
}
</script>