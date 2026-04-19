<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="submitForm">
    <div>
      <label class="label-sos">Nome</label>
      <input v-model="form.name" class="input-sos" required />
    </div>
    <div>
      <label class="label-sos">SKU</label>
      <input v-model="form.sku" class="input-sos" required />
    </div>
    <div>
      <label class="label-sos">Categoria</label>
      <select v-model="form.categoryId" class="input-sos" required>
        <option value="" disabled>Selecione</option>
        <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
    </div>
    <div>
      <label class="label-sos">Fornecedor</label>
      <select v-model="form.supplierId" class="input-sos" required>
        <option value="" disabled>Selecione</option>
        <option v-for="item in suppliers" :key="item.id" :value="item.id">{{ item.tradeName }}</option>
      </select>
    </div>
    <div>
      <label class="label-sos">Quantidade</label>
      <input v-model.number="form.quantity" type="number" class="input-sos" min="0" required />
    </div>
    <div>
      <label class="label-sos">Quantidade mínima</label>
      <input v-model.number="form.minQuantity" type="number" class="input-sos" min="0" required />
    </div>
    <div>
      <label class="label-sos">Preço de custo</label>
      <input v-model.number="form.costPrice" type="number" step="0.01" class="input-sos" min="0" required />
    </div>
    <div>
      <label class="label-sos">Preço de venda</label>
      <input v-model.number="form.salePrice" type="number" step="0.01" class="input-sos" min="0" required />
    </div>
    <div>
      <label class="label-sos">Validade</label>
      <input v-model="form.expirationDate" type="date" class="input-sos" />
    </div>
    <div>
      <label class="label-sos">Data de entrada</label>
      <input v-model="form.entryDate" type="date" class="input-sos" required />
    </div>
    <div>
      <label class="label-sos">Localização</label>
      <input v-model="form.location" class="input-sos" placeholder="A1-02" required />
    </div>
    <div class="md:col-span-2">
      <label class="label-sos">Descrição</label>
      <textarea v-model="form.description" class="input-sos min-h-28"></textarea>
    </div>

    <div class="md:col-span-2 flex justify-end gap-3">
      <button type="button" class="btn-secondary" @click="resetForm">Limpar</button>
      <button class="btn-primary">Salvar produto</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { Category, Supplier } from '@/types';

const props = defineProps<{
  categories: Category[];
  suppliers: Supplier[];
}>();

const emit = defineEmits<{
  (e: 'submit', payload: {
    name: string;
    sku: string;
    categoryId: string;
    supplierId: string;
    quantity: number;
    minQuantity: number;
    costPrice: number;
    salePrice: number;
    expirationDate?: string;
    entryDate: string;
    location: string;
    description: string;
  }): void;
}>();

const baseState = () => ({
  name: '',
  sku: '',
  categoryId: props.categories[0]?.id ?? '',
  supplierId: props.suppliers[0]?.id ?? '',
  quantity: 0,
  minQuantity: 0,
  costPrice: 0,
  salePrice: 0,
  expirationDate: '',
  entryDate: new Date().toISOString().slice(0, 10),
  location: '',
  description: ''
});

const form = reactive(baseState());

const resetForm = () => Object.assign(form, baseState());
const submitForm = () => {
  emit('submit', { ...form, expirationDate: form.expirationDate || undefined });
  resetForm();
};
</script>
