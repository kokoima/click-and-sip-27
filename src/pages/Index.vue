<template>
  <div class="min-h-screen pb-20">
    <Header :establishment="establishment" />
    
    <main class="container mx-auto px-4 mt-6">
      <div class="w-full">
        <nav class="flex space-x-2 overflow-x-auto">
          <button
            v-for="category in categories"
            :key="category"
            class="px-4 py-2 rounded-md"
            :class="{
              'bg-primary text-white': selectedCategory === category,
              'bg-muted': selectedCategory !== category
            }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </nav>

        <div class="product-grid mt-6">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :quantity="getProductQuantity(product)"
            @quantity-change="handleQuantityChange"
          />
        </div>
      </div>
    </main>

    <Cart :items="cartItems" @checkout="handleCheckout" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '../composables/useToast'
import Header from '../components/Header.vue'
import ProductCard from '../components/ProductCard.vue'
import Cart from '../components/Cart.vue'
import { mockEstablishment, mockProducts } from '../data/mockData'
import type { CartItem, Product } from '../types'

const { toast } = useToast()
const establishment = ref(mockEstablishment)
const cartItems = ref<CartItem[]>([])
const selectedCategory = ref(mockProducts[0].category)

const categories = computed(() => 
  Array.from(new Set(mockProducts.map(p => p.category)))
)

const filteredProducts = computed(() => 
  mockProducts.filter(p => p.category === selectedCategory.value)
)

const getProductQuantity = (product: Product) => {
  const item = cartItems.value.find(item => item.product.id === product.id)
  return item?.quantity || 0
}

const handleQuantityChange = (
  product: Product,
  quantity: number,
  variants?: Record<string, string>
) => {
  const index = cartItems.value.findIndex(
    item => 
      item.product.id === product.id &&
      JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
  )

  if (index >= 0) {
    if (quantity === 0) {
      cartItems.value.splice(index, 1)
    } else {
      cartItems.value[index].quantity = quantity
    }
  } else if (quantity > 0) {
    cartItems.value.push({ product, quantity, selectedVariants: variants })
  }
}

const handleCheckout = () => {
  toast({
    title: "Order Placed!",
    description: "Your drinks will be ready soon. Order code: #123",
  })
  cartItems.value = []
}
</script>