<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="submitForm">
    <div>
      <label class="label-sos">Produto</label>
      <select v-model="form.productId" class="input-sos" required>
        <option value="" disabled>Selecione</option>
        <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
      </select>
    </div>
    <div>
      <label class="label-sos">Tipo</label>
      <select v-model="form.type" class="input-sos" required>
        <option value="entry">Entrada</option>
        <option value="exit">Saída</option>
        <option value="adjustment">Ajuste</option>
      </select>
    </div>
    <div>
      <label class="label-sos">Quantidade</label>
      <input v-model.number="form.quantity" type="number" min="1" class="input-sos" required />
    </div>
    <div>
      <label class="label-sos">Data</label>
      <input v-model="form.date" type="date" class="input-sos" required />
    </div>
    <div class="md:col-span-2">
      <label class="label-sos">Motivo</label>
      <input v-model="form.reason" class="input-sos" required />
    </div>
    <div class="md:col-span-2 flex justify-end">
      <button class="btn-primary">Registrar movimentação</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { Product } from '@/types';

const props = defineProps<{ products: Product[] }>();
const emit = defineEmits<{ (e: 'submit', payload: { productId: string; type: 'entry' | 'exit' | 'adjustment'; quantity: number; reason: string; date: string }): void }>();

const form = reactive({
  productId: props.products[0]?.id ?? '',
  type: 'entry' as const,
  quantity: 1,
  reason: '',
  date: new Date().toISOString().slice(0, 10)
});

const submitForm = () => emit('submit', { ...form });
</script>
