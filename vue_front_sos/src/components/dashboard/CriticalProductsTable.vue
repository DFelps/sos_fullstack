<template>
  <div v-if="products.length" class="overflow-x-auto">
    <table class="table-sos">
      <thead><tr><th>Produto</th><th>SKU</th><th>Atual</th><th>Mínimo</th><th>Status</th></tr></thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id" class="border-b border-slate-100">
          <td>{{ product.name }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.minQuantity }}</td>
          <td><StatusBadge :label="product.quantity === 0 ? 'Sem estoque' : 'Baixo estoque'" :variant="product.quantity === 0 ? 'danger' : 'warning'" /></td>
        </tr>
      </tbody>
    </table>

    <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
  </div>

  <p v-else class="text-sm text-slate-500">Nenhum produto crítico no momento.</p>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import StatusBadge from '@/components/common/StatusBadge.vue';
    import AppPagination from '@/components/common/AppPagination.vue';
    import type { Product } from '@/types';

    const props = defineProps<{
    products: Product[];
    }>();

    const currentPage = ref(1);
    const perPage = 5;

    const totalPages = computed(() => Math.max(1, Math.ceil(props.products.length / perPage)));
    const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return props.products.slice(start, start + perPage);
    });

    const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
    const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
</script>