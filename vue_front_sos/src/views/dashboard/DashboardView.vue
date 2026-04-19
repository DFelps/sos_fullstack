<template>
  <AppLayout title="Dashboard" subtitle="Visão geral da operação de estoque">
    <div class="grid gap-6 xl:grid-cols-4">
      <StatCard label="Itens em estoque" :value="store.dashboard.totalItems" helper="Quantidade total somada dos produtos" />
      <StatCard label="Valor do inventário" :value="currency(store.dashboard.inventoryValue)" helper="Baseado no preço de custo" />
      <StatCard label="Baixo estoque" :value="store.dashboard.lowStock" helper="Produtos abaixo do mínimo" />
      <StatCard label="Sem estoque" :value="store.dashboard.outOfStock" helper="Itens zerados" />
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.4fr,0.9fr]">
      <SectionCard title="Produtos críticos" description="Itens que precisam de reposição imediata">
        <div v-if="criticalProducts.length" class="overflow-x-auto">
          <table class="table-sos">
            <thead>
              <tr>
                <th>Produto</th>
                <th>SKU</th>
                <th>Atual</th>
                <th>Mínimo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in criticalProducts" :key="product.id" class="border-b border-slate-100">
                <td>{{ product.name }}</td>
                <td>{{ product.sku }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.minQuantity }}</td>
                <td>
                  <StatusBadge
                    :label="product.quantity === 0 ? 'Sem estoque' : 'Baixo estoque'"
                    :variant="product.quantity === 0 ? 'danger' : 'warning'"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="text-sm text-slate-500">
          Nenhum produto crítico no momento.
        </p>
      </SectionCard>

      <SectionCard title="Últimas movimentações" description="Entradas, saídas e ajustes recentes">
        <div v-if="store.movements.length" class="space-y-4">
          <div v-for="movement in store.movements.slice(0, 6)" :key="movement.id" class="rounded-2xl border border-slate-100 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold text-slate-900">{{ productName(movement.productId) }}</p>
                <p class="mt-1 text-sm text-slate-500">{{ movement.reason }}</p>
              </div>
              <StatusBadge
                :label="movement.type"
                :variant="movement.type === 'entry' ? 'success' : movement.type === 'exit' ? 'danger' : 'info'"
              />
            </div>
            <div class="mt-3 flex justify-between text-sm text-slate-500">
              <span>Qtd. {{ movement.quantity }}</span>
              <span>{{ shortDate(movement.date) }}</span>
            </div>
          </div>
        </div>

        <p v-else class="text-sm text-slate-500">
          Nenhuma movimentação encontrada.
        </p>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import StatCard from '@/components/common/StatCard.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import { useInventoryStore } from '@/stores/inventory';
import { currency, shortDate } from '@/utils/formatters';

const store = useInventoryStore();

const criticalProducts = computed(() =>
  store.products.filter((item) => item.quantity <= item.minQuantity)
);

const productName = (productId: string) =>
  store.products.find((item) => item.id === productId)?.name ?? 'Produto removido';

onMounted(async () => {
  try {
    await store.loadInitialData();
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
  }
});
</script>