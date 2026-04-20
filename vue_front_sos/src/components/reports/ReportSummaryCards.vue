<template>
  <div class="grid gap-4 md:grid-cols-3">
    <StatCard label="Sem estoque" :value="outOfStockCount" helper="Produtos zerados" />
    <StatCard label="Baixo estoque" :value="lowStockCount" helper="Abaixo do mínimo" />
    <StatCard label="Com validade" :value="expirationCount" helper="Produtos com vencimento" />
  </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import StatCard from '@/components/common/StatCard.vue';
    import type { Product } from '@/types';

    const props = defineProps<{ products: Product[] }>();

    const outOfStockCount = computed(() => props.products.filter((item) => item.quantity === 0).length);
    const lowStockCount = computed(() => props.products.filter((item) => item.quantity > 0 && item.quantity <= item.minQuantity).length);
    const expirationCount = computed(() => props.products.filter((item) => item.expirationDate).length);
</script>