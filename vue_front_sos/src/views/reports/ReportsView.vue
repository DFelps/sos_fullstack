<template>
  <AppLayout title="Relatórios" subtitle="Indicadores rápidos para operação e compras">
    <div class="space-y-6">
      <ReportSummaryCards :products="store.products" />

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ReportListCard title="Produtos sem estoque" :items="outOfStock" empty-text="Nenhum produto sem estoque.">
          <template #default="{ item }">
            <div class="flex items-center justify-between gap-3">
              <div><p class="font-semibold text-slate-900">{{ item.name }}</p><p class="text-xs text-slate-500">SKU {{ item.sku }}</p></div>
              <StatusBadge label="Sem estoque" variant="danger" />
            </div>
          </template>
        </ReportListCard>

        <ReportListCard title="Baixo estoque" :items="lowStock" empty-text="Nenhum produto com baixo estoque.">
          <template #default="{ item }">
            <div class="flex items-center justify-between gap-3">
              <div><p class="font-semibold text-slate-900">{{ item.name }}</p><p class="text-xs text-slate-500">Atual {{ item.quantity }} / Mínimo {{ item.minQuantity }}</p></div>
              <StatusBadge label="Baixo estoque" variant="warning" />
            </div>
          </template>
        </ReportListCard>

        <ReportListCard title="Produtos com validade" :items="withExpiration" empty-text="Nenhum produto com validade cadastrada.">
          <template #default="{ item }">
            <div class="flex items-center justify-between gap-3">
              <div><p class="font-semibold text-slate-900">{{ item.name }}</p><p class="text-xs text-slate-500">{{ shortDate(item.expirationDate) }}</p></div>
              <StatusBadge label="Com validade" variant="info" />
            </div>
          </template>
        </ReportListCard>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import AppLayout from '@/components/layout/AppLayout.vue';
  import StatusBadge from '@/components/common/StatusBadge.vue';
  import ReportSummaryCards from '@/components/reports/ReportSummaryCards.vue';
  import ReportListCard from '@/components/reports/ReportListCard.vue';
  import { useInventoryStore } from '@/stores/inventory';
  import { shortDate } from '@/utils/formatters';

  const store = useInventoryStore();

  const outOfStock = computed(() => store.products.filter((item) => item.quantity === 0));
  const lowStock = computed(() => store.products.filter((item) => item.quantity > 0 && item.quantity <= item.minQuantity));
  const withExpiration = computed(() => store.products.filter((item) => item.expirationDate));

  onMounted(async () => {
    try {
      await store.loadProducts();
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  });
</script>