<template>
  <AppLayout title="Histórico" subtitle="Entradas, saídas e ajustes de estoque">
    <div class="space-y-6">
      <MovementSummaryCards :movements="store.movements" />

      <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
        <SectionCard title="Registrar movimentação">
          <MovementForm :products="store.products" @submit="onSubmit" />
        </SectionCard>

        <SectionCard title="Movimentações recentes" description="Filtre e acompanhe o histórico operacional">
          <div class="space-y-5">
            <MovementFilters v-model:search="search" v-model:type="selectedType" />
            <MovementTable :movements="filteredMovements" :products="store.products" />
          </div>
        </SectionCard>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import MovementForm from '@/components/forms/MovementForm.vue';
import MovementSummaryCards from '@/components/movements/MovementSummaryCards.vue';
import MovementFilters from '@/components/movements/MovementFilters.vue';
import MovementTable from '@/components/movements/MovementTable.vue';
import { useInventoryStore } from '@/stores/inventory';
import type { Movement } from '@/types';

const store = useInventoryStore();
const search = ref('');
const selectedType = ref('all');

const filteredMovements = computed(() =>
  store.movements.filter((movement) => {
    const product = store.products.find((item) => item.id === movement.productId);
    const matchesSearch = !search.value || product?.name.toLowerCase().includes(search.value.toLowerCase()) || movement.reason.toLowerCase().includes(search.value.toLowerCase());
    const matchesType = selectedType.value === 'all' || movement.type === selectedType.value;
    return matchesSearch && matchesType;
  })
);

const onSubmit = async (payload: Omit<Movement, 'id'>) => {
  try {
    await store.addMovement(payload);
    await Promise.all([store.loadMovements(), store.loadProducts(), store.refreshDashboard()]);
  } catch (error) {
    console.error('Erro ao registrar movimentação:', error);
  }
};

onMounted(async () => {
  try {
    await Promise.all([store.loadProducts(), store.loadMovements()]);
  } catch (error) {
    console.error('Erro ao carregar movimentações:', error);
  }
});
</script>