import { ref } from 'vue'

interface Toast {
  title: string
  description?: string
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const toast = (newToast: Toast) => {
    toasts.value.push(newToast)
    setTimeout(() => {
      toasts.value.shift()
    }, 3000)
  }

  return {
    toasts,
    toast
  }
}