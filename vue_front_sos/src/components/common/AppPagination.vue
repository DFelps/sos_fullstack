<template>
  <div v-if="totalPages > 1" class="mt-5 flex items-center justify-between">
    <button @click="$emit('prev')" :disabled="currentPage === 1" class="rounded-xl bg-[#001EAA] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0048CA] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500">Anterior</button>
    <span class="text-sm font-medium text-slate-500">Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="$emit('next')" :disabled="currentPage === totalPages" class="rounded-xl bg-[#001EAA] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0048CA] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500">Próxima</button>
  </div>
</template>

<script setup lang="ts">
    defineProps<{ currentPage: number; totalPages: number }>();
    defineEmits<{ (e: 'prev'): void; (e: 'next'): void }>();
</script>