<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
    <div class="container mx-auto">
      <div v-if="items.length > 0">
        <div class="space-y-2">
          <div
            v-for="item in items"
            :key="`${item.product.id}-${JSON.stringify(item.selectedVariants)}`"
            class="flex justify-between items-center"
          >
            <div>
              <h3 class="font-medium">{{ item.product.name }}</h3>
              <p v-if="item.selectedVariants" class="text-sm text-gray-500">
                {{ Object.values(item.selectedVariants).join(', ') }}
              </p>
              <p class="text-sm text-gray-500">x{{ item.quantity }}</p>
            </div>
            <p class="font-medium">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
        <div class="border-t mt-4 pt-4">
          <div class="flex justify-between font-bold">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
        <button
          class="w-full mt-4 p-2 bg-primary text-white rounded-md"
          @click="$emit('checkout')"
        >
          Proceed to Checkout
        </button>
      </div>
      <p v-else class="text-center text-gray-500">
        Your cart is empty
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '../types'

const props = defineProps<{
  items: CartItem[]
}>()

defineEmits<{
  (e: 'checkout'): void
}>()

const total = computed(() => 
  props.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
)
</script>