<template>
  <div class="rounded-3xl border border-white/10 bg-white p-6 shadow-panel">
    <p class="text-sm font-medium text-slate-500">{{ label }}</p>
    <h3 class="mt-2 text-3xl font-bold text-slate-900">{{ value }}</h3>
    <p class="mt-3 text-sm text-slate-500">{{ helper }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; helper: string }>();
</script>
