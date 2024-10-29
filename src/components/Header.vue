<template>
  <div class="relative h-[300px]">
    <div
      v-for="(image, index) in establishment.images"
      :key="image"
      class="carousel-slide"
      :class="{ 'translate-x-0': index === currentImageIndex, 'translate-x-full': index !== currentImageIndex }"
    >
      <img
        :src="image"
        :alt="`${establishment.name} ${index + 1}`"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
      <h1 class="text-3xl font-bold text-white">{{ establishment.name }}</h1>
      <p class="text-white/80">{{ establishment.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Establishment } from '../types'

const props = defineProps<{
  establishment: Establishment
}>()

const currentImageIndex = ref(0)
let timer: number

onMounted(() => {
  timer = setInterval(() => {
    currentImageIndex.value = 
      currentImageIndex.value === props.establishment.images.length - 1 
        ? 0 
        : currentImageIndex.value + 1
  }, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>