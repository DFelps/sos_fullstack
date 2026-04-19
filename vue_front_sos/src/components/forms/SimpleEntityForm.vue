<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="emit('submit', { ...form })">
    <div v-for="field in fields" :key="field.key" :class="field.full ? 'md:col-span-2' : ''">
      <label class="label-sos">{{ field.label }}</label>
      <input v-model="form[field.key]" class="input-sos" :type="field.type ?? 'text'" :required="field.required !== false" />
    </div>
    <div class="md:col-span-2 flex justify-end">
      <button class="btn-primary">Salvar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

export interface FieldConfig {
  key: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
}

const props = defineProps<{ fields: FieldConfig[]; initialValues?: Record<string, string> }>();
const emit = defineEmits<{ (e: 'submit', payload: Record<string, string>): void }>();
const form = reactive<Record<string, string>>({ ...(props.initialValues ?? {}) });
</script>
