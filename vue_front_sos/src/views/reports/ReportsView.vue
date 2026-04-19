<template>
  <AppLayout title="Relatórios" subtitle="Indicadores rápidos para operação e compras">
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <SectionCard title="Produtos sem estoque">
        <ul class="space-y-3">
          <li v-for="item in outOfStock" :key="item.id" class="rounded-2xl border border-slate-100 p-4 text-sm text-slate-700">{{ item.name }} - SKU {{ item.sku }}</li>
        </ul>
      </SectionCard>
      <SectionCard title="Baixo estoque">
        <ul class="space-y-3">
          <li v-for="item in lowStock" :key="item.id" class="rounded-2xl border border-slate-100 p-4 text-sm text-slate-700">{{ item.name }} - Atual {{ item.quantity }} / Mínimo {{ item.minQuantity }}</li>
        </ul>
      </SectionCard>
      <SectionCard title="Produtos com validade">
        <ul class="space-y-3">
          <li v-for="item in withExpiration" :key="item.id" class="rounded-2xl border border-slate-100 p-4 text-sm text-slate-700">{{ item.name }} - {{ shortDate(item.expirationDate) }}</li>
        </ul>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import { useInventoryStore } from '@/stores/inventory';
import { shortDate } from '@/utils/formatters';
const store = useInventoryStore();
const outOfStock = computed(() => store.products.filter((item) => item.quantity === 0));
const lowStock = computed(() => store.products.filter((item) => item.quantity > 0 && item.quantity <= item.minQuantity));
const withExpiration = computed(() => store.products.filter((item) => item.expirationDate));
</script>
