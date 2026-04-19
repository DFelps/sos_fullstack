<template>
  <span :class="classes" class="inline-flex rounded-full px-3 py-1 text-xs font-semibold">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ label: string; variant: 'success' | 'warning' | 'danger' | 'info' }>();
const classes = computed(() => ({
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700'
}[props.variant]));
</script>
