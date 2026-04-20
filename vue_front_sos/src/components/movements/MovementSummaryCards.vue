<template>
  <div class="grid gap-4 md:grid-cols-3">
    <StatCard label="Entradas" :value="entryCount" helper="Movimentações de entrada" />
    <StatCard label="Saídas" :value="exitCount" helper="Movimentações de saída" />
    <StatCard label="Ajustes" :value="adjustmentCount" helper="Movimentações de ajuste" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StatCard from '@/components/common/StatCard.vue';
import type { Movement } from '@/types';

const props = defineProps<{ movements: Movement[] }>();

const entryCount = computed(() => props.movements.filter((item) => item.type === 'entry').length);
const exitCount = computed(() => props.movements.filter((item) => item.type === 'exit').length);
const adjustmentCount = computed(() => props.movements.filter((item) => item.type === 'adjustment').length);
</script>