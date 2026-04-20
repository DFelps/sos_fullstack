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
        <CriticalProductsTable :products="criticalProducts" />
      </SectionCard>

      <SectionCard title="Últimas movimentações" description="Entradas, saídas e ajustes recentes">
        <RecentMovementsList :movements="store.movements" :products="store.products" />
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import AppLayout from '@/components/layout/AppLayout.vue';
  import StatCard from '@/components/common/StatCard.vue';
  import SectionCard from '@/components/common/SectionCard.vue';
  import CriticalProductsTable from '@/components/dashboard/CriticalProductsTable.vue';
  import RecentMovementsList from '@/components/dashboard/RecentMovementsList.vue';
  import { useInventoryStore } from '@/stores/inventory';
  import { currency } from '@/utils/formatters';

  const store = useInventoryStore();

  const criticalProducts = computed(() => store.products.filter((item) => item.quantity <= item.minQuantity));

  onMounted(async () => {
    try {
      await store.loadInitialData();
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
  });
</script>