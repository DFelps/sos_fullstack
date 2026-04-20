<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div class="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 class="text-lg font-bold text-slate-900">{{ title }}</h3>
        <button @click="$emit('close')" class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">Fechar</button>
      </div>
      <div class="p-6"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
    defineProps<{ open: boolean; title: string }>();
    defineEmits<{ (e: 'close'): void }>();
</script>