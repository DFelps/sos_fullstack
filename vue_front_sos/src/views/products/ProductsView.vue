<template>
  <AppLayout title="Cadastrar produtos" subtitle="Cadastro principal do estoque SOS">
    <div class="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
      <SectionCard title="Novo produto" description="Cadastre itens com dados completos de estoque">
        <ProductForm
          :categories="store.categories"
          :suppliers="store.suppliers"
          @submit="onSubmit"
        />
      </SectionCard>

      <SectionCard title="Produtos cadastrados" description="Base atual do inventário">
        <div v-if="store.products.length" class="overflow-x-auto">
          <table class="table-sos">
            <thead>
              <tr>
                <th>Produto</th>
                <th>SKU</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in store.products" :key="product.id" class="border-b border-slate-100">
                <td>
                  <p class="font-semibold">{{ product.name }}</p>
                  <p class="text-xs text-slate-500">{{ product.location }}</p>
                </td>
                <td>{{ product.sku }}</td>
                <td>{{ categoryName(product.categoryId) }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ currency(product.salePrice) }}</td>
                <td>
                  <StatusBadge :label="status(product)" :variant="variant(product)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="text-sm text-slate-500">
          Nenhum produto cadastrado.
        </p>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import ProductForm from '@/components/forms/ProductForm.vue';
import { useInventoryStore } from '@/stores/inventory';
import { currency } from '@/utils/formatters';
import type { Product } from '@/types';

const store = useInventoryStore();

const categoryName = (id: string) =>
  store.categories.find((item) => item.id === id)?.name ?? '—';

const status = (product: Product) =>
  product.quantity === 0
    ? 'Sem estoque'
    : product.quantity <= product.minQuantity
      ? 'Baixo estoque'
      : 'Saudável';

const variant = (product: Product) =>
  product.quantity === 0
    ? 'danger'
    : product.quantity <= product.minQuantity
      ? 'warning'
      : 'success';

const onSubmit = async (payload: Omit<Product, 'id'>) => {
  try {
    await store.addProduct(payload);
    await Promise.all([
      store.loadProducts(),
      store.loadMovements(),
      store.refreshDashboard()
    ]);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
  }
};

onMounted(async () => {
  try {
    await Promise.all([
      store.loadCategories(),
      store.loadSuppliers(),
      store.loadProducts()
    ]);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
});
</script>