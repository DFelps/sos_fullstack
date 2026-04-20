<template>
  <div v-if="customers.length" class="grid gap-4 md:grid-cols-2">
    <div v-for="item in paginatedCustomers" :key="item.id" class="rounded-2xl border border-slate-100 p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h4 class="font-bold text-slate-900">{{ item.name }}</h4>
          <p class="mt-2 text-sm text-slate-500">{{ item.email }}</p>
          <p class="text-sm text-slate-500">{{ item.phone }}</p>
        </div>

        <div class="flex gap-2">
          <button @click="$emit('edit', item)" class="rounded-xl bg-[#001EAA] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0048CA]">Editar</button>
          <button @click="$emit('remove', item)" class="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700">Excluir</button>
        </div>
      </div>
    </div>

    <div class="md:col-span-2">
      <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
    </div>
  </div>

  <div v-else class="rounded-2xl border border-slate-100 p-5 text-sm text-slate-500">
    Nenhum cliente cadastrado.
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppPagination from '@/components/common/AppPagination.vue';
import type { Customer } from '@/types';

const props = defineProps<{
  customers: Customer[];
}>();

defineEmits<{
  (e: 'edit', customer: Customer): void;
  (e: 'remove', customer: Customer): void;
}>();

const currentPage = ref(1);
const perPage = 6;

const totalPages = computed(() => Math.max(1, Math.ceil(props.customers.length / perPage)));
const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return props.customers.slice(start, start + perPage);
});

watch(() => props.customers.length, () => {
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
</script>