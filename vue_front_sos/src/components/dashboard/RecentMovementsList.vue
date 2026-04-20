<template>
  <div v-if="movements.length" class="space-y-4">
    <div v-for="movement in movements.slice(0, 6)" :key="movement.id" class="rounded-2xl border border-slate-100 p-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="font-semibold text-slate-900">{{ productName(movement.productId) }}</p>
          <p class="mt-1 text-sm text-slate-500">{{ movement.reason }}</p>
        </div>
        <StatusBadge :label="movement.type" :variant="movement.type === 'entry' ? 'success' : movement.type === 'exit' ? 'danger' : 'info'" />
      </div>
      <div class="mt-3 flex justify-between text-sm text-slate-500">
        <span>Qtd. {{ movement.quantity }}</span>
        <span>{{ shortDate(movement.date) }}</span>
      </div>
    </div>
  </div>

  <p v-else class="text-sm text-slate-500">Nenhuma movimentação encontrada.</p>
</template>

<script setup lang="ts">
    import StatusBadge from '@/components/common/StatusBadge.vue';
    import { shortDate } from '@/utils/formatters';
    import type { Movement, Product } from '@/types';

    const props = defineProps<{
    movements: Movement[];
    products: Product[];
    }>();

    const productName = (productId: string) => props.products.find((item) => item.id === productId)?.name ?? 'Produto removido';
</script>