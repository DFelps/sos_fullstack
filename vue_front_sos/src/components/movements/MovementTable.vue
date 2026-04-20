<template>
  <div v-if="movements.length" class="overflow-x-auto">
    <table class="table-sos">
      <thead><tr><th>Produto</th><th>Tipo</th><th>Quantidade</th><th>Motivo</th><th>Data</th></tr></thead>
      <tbody>
        <tr v-for="movement in paginatedMovements" :key="movement.id" class="border-b border-slate-100">
          <td>{{ productName(movement.productId) }}</td>
          <td><StatusBadge :label="typeLabel(movement.type)" :variant="typeVariant(movement.type)" /></td>
          <td>{{ movement.quantity }}</td>
          <td>{{ movement.reason }}</td>
          <td>{{ shortDate(movement.date) }}</td>
        </tr>
      </tbody>
    </table>

    <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
  </div>

  <p v-else class="text-sm text-slate-500">Nenhuma movimentação encontrada.</p>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppPagination from '@/components/common/AppPagination.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import { shortDate } from '@/utils/formatters';
import type { Movement, Product } from '@/types';

const props = defineProps<{ movements: Movement[]; products: Product[] }>();

const currentPage = ref(1);
const perPage = 8;

const totalPages = computed(() => Math.max(1, Math.ceil(props.movements.length / perPage)));
const paginatedMovements = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return props.movements.slice(start, start + perPage);
});

watch(() => props.movements.length, () => {
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

const productName = (id: string) => props.products.find((item) => item.id === id)?.name ?? '—';
const typeLabel = (type: string) => type === 'entry' ? 'Entrada' : type === 'exit' ? 'Saída' : 'Ajuste';
const typeVariant = (type: string) => type === 'entry' ? 'success' : type === 'exit' ? 'danger' : 'info';
</script>