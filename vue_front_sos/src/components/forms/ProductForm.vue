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
      <button class="btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { Category, Supplier } from '@/types';

type ProductFormPayload = {
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
};

const props = withDefaults(defineProps<{
  categories: Category[];
  suppliers: Supplier[];
  initialValues?: Partial<ProductFormPayload>;
  submitLabel?: string;
  resetOnSubmit?: boolean;
}>(), {
  initialValues: () => ({}),
  submitLabel: 'Salvar produto',
  resetOnSubmit: true
});

const emit = defineEmits<{
  (e: 'submit', payload: ProductFormPayload): void;
}>();

const getBaseState = () => ({
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

const form = reactive(getBaseState());

const applyInitialValues = () => {
  const base = getBaseState();
  form.name = props.initialValues.name ?? base.name;
  form.sku = props.initialValues.sku ?? base.sku;
  form.categoryId = props.initialValues.categoryId ?? base.categoryId;
  form.supplierId = props.initialValues.supplierId ?? base.supplierId;
  form.quantity = Number(props.initialValues.quantity ?? base.quantity);
  form.minQuantity = Number(props.initialValues.minQuantity ?? base.minQuantity);
  form.costPrice = Number(props.initialValues.costPrice ?? base.costPrice);
  form.salePrice = Number(props.initialValues.salePrice ?? base.salePrice);
  form.expirationDate = props.initialValues.expirationDate ?? base.expirationDate;
  form.entryDate = props.initialValues.entryDate ?? base.entryDate;
  form.location = props.initialValues.location ?? base.location;
  form.description = props.initialValues.description ?? base.description;
};

watch(() => [props.initialValues, props.categories, props.suppliers], () => applyInitialValues(), { immediate: true, deep: true });

const resetForm = () => {
  if (Object.keys(props.initialValues).length) {
    applyInitialValues();
    return;
  }
  Object.assign(form, getBaseState());
};

const submitForm = () => {
  emit('submit', {
    name: form.name,
    sku: form.sku,
    categoryId: form.categoryId,
    supplierId: form.supplierId,
    quantity: Number(form.quantity),
    minQuantity: Number(form.minQuantity),
    costPrice: Number(form.costPrice),
    salePrice: Number(form.salePrice),
    expirationDate: form.expirationDate || undefined,
    entryDate: form.entryDate,
    location: form.location,
    description: form.description
  });

  if (props.resetOnSubmit) Object.assign(form, getBaseState());
};
</script>