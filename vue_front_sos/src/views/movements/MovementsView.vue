<template>
  <AppLayout title="Histórico" subtitle="Entradas, saídas e ajustes de estoque">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <SectionCard title="Registrar movimentação">
        <MovementForm :products="store.products" @submit="onSubmit" />
      </SectionCard>

      <SectionCard title="Movimentações recentes">
        <div v-if="store.movements.length" class="overflow-x-auto">
          <table class="table-sos">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Motivo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movement in store.movements" :key="movement.id" class="border-b border-slate-100">
                <td>{{ productName(movement.productId) }}</td>
                <td>{{ movement.type }}</td>
                <td>{{ movement.quantity }}</td>
                <td>{{ movement.reason }}</td>
                <td>{{ shortDate(movement.date) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="text-sm text-slate-500">
          Nenhuma movimentação registrada.
        </p>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import MovementForm from '@/components/forms/MovementForm.vue';
import { useInventoryStore } from '@/stores/inventory';
import { shortDate } from '@/utils/formatters';
import type { Movement } from '@/types';

const store = useInventoryStore();

const productName = (id: string) =>
  store.products.find((item) => item.id === id)?.name ?? '—';

const onSubmit = async (payload: Omit<Movement, 'id'>) => {
  try {
    await store.addMovement(payload);
    await Promise.all([
      store.loadMovements(),
      store.loadProducts(),
      store.refreshDashboard()
    ]);
  } catch (error) {
    console.error('Erro ao registrar movimentação:', error);
  }
};

onMounted(async () => {
  try {
    await Promise.all([
      store.loadProducts(),
      store.loadMovements()
    ]);
  } catch (error) {
    console.error('Erro ao carregar movimentações:', error);
  }
});
</script>