<template>
  <div v-if="products.length" class="overflow-x-auto">
    <table class="table-sos">
      <thead><tr><th>Produto</th><th>SKU</th><th>Categoria</th><th>Estoque</th><th>Preço</th><th>Status</th><th>Ações</th></tr></thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id" class="border-b border-slate-100">
          <td><p class="font-semibold">{{ product.name }}</p><p class="text-xs text-slate-500">{{ product.location }}</p></td>
          <td>{{ product.sku }}</td>
          <td>{{ categoryName(product.categoryId) }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ currency(product.salePrice) }}</td>
          <td><StatusBadge :label="status(product)" :variant="variant(product)" /></td>
          <td>
            <div class="flex gap-2">
              <button @click="$emit('edit', product)" class="rounded-xl bg-[#001EAA] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0048CA]">Editar</button>
              <button @click="$emit('remove', product)" class="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700">Excluir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
  </div>

  <p v-else class="text-sm text-slate-500">Nenhum produto cadastrado.</p>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import StatusBadge from '@/components/common/StatusBadge.vue';
    import AppPagination from '@/components/common/AppPagination.vue';
    import { currency } from '@/utils/formatters';
    import type { Category, Product } from '@/types';

    const props = defineProps<{
    products: Product[];
    categories: Category[];
    }>();

    defineEmits<{
    (e: 'edit', product: Product): void;
    (e: 'remove', product: Product): void;
    }>();

    const currentPage = ref(1);
    const perPage = 8;

    const totalPages = computed(() => Math.max(1, Math.ceil(props.products.length / perPage)));
    const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return props.products.slice(start, start + perPage);
    });

    watch(() => props.products.length, () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
    });

    const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
    const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

    const categoryName = (id: string) => props.categories.find((item) => item.id === id)?.name ?? '—';
    const status = (product: Product) => product.quantity === 0 ? 'Sem estoque' : product.quantity <= product.minQuantity ? 'Baixo estoque' : 'Saudável';
    const variant = (product: Product) => product.quantity === 0 ? 'danger' : product.quantity <= product.minQuantity ? 'warning' : 'success';
</script>