<template>
  <div class="min-h-screen">
    <RouterView />
    <VueSonner />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueSonner } from './components/ui/sonner.vue'
</script>