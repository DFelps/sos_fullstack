<template>
  <section class="rounded-3xl border border-white/10 bg-white p-6 shadow-panel">
    <div class="mb-6 flex items-center justify-between gap-3">
      <div>
        <h3 class="text-lg font-bold text-slate-900">{{ title }}</h3>
        <p v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; description?: string }>();
</script>
