<script setup lang="ts">
import { defineProps, computed } from 'vue'

type Size = 'small' | 'medium' | 'large' | 'transactions'
type Variant = 'primary' | 'secondary' | 'danger' | 'orange'
type Width = 'auto' | 'full' | 'sm' | 'md' | 'lg'

const props = defineProps<{
  text: string
  type?: string
  size?: Size
  variant?: Variant
  disabled?: boolean
  width?: Width
  loading: boolean
  handleClick?: any
}>()

const buttonClasses = computed(() => {
  const baseClasses =
    'font-semibold flex items-center justify-between rounded focus:outline-none transition duration-200'
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    transactions: 'px-[10px] py-[6px]',
  }
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    orange: 'bg-[#CC5500] text-white hover:bg-[#CC5500]-700',
  }
  const widthStyles = {
    auto: 'width: auto;',
    full: 'width: 100%;',
    sm: 'width: 150px;',
    md: 'width: 200px;',
    lg: 'width: 300px;',
  }

  const size: Size = props.size ?? 'medium'
  const variant: Variant = props.variant ?? 'primary'
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  const width: Width = props.width ?? 'auto'

  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${widthStyles[width]}`
})
</script>

<template>
  <button :class="buttonClasses" class="" @click="handleClick">
    <div class="mr-3" v-if="$slots['icon-left']">
      <slot name="icon-left" v-if="$slots['icon-left']"></slot>
    </div>
    <slot>{{ text }}</slot>
  </button>
</template>
