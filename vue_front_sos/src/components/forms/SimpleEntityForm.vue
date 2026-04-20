<template>
  <form class="grid gap-4 md:grid-cols-2" @submit.prevent="submitForm">
    <div v-for="field in fields" :key="field.key" :class="field.full ? 'md:col-span-2' : ''">
      <label class="label-sos">{{ field.label }}</label>

      <textarea v-if="field.type === 'textarea'" v-model="form[field.key]" class="input-sos min-h-28"></textarea>

      <input v-else-if="field.type === 'color'" v-model="form[field.key]" type="color" class="input-sos h-11 p-1" />

      <input v-else :v-model="form[field.key]" v-model="form[field.key]" :type="field.type || 'text'" class="input-sos" />
    </div>

    <div class="md:col-span-2 flex justify-end gap-3">
      <button type="button" class="btn-secondary" @click="resetForm">Limpar</button>
      <button class="btn-primary">{{ submitLabel }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';

  export type FieldConfig = {
    key: string;
    label: string;
    type?: string;
    full?: boolean;
  };

  const props = withDefaults(defineProps<{
    fields: FieldConfig[];
    initialValues?: Record<string, string>;
    submitLabel?: string;
    resetOnSubmit?: boolean;
  }>(), {
    initialValues: () => ({}),
    submitLabel: 'Salvar',
    resetOnSubmit: true
  });

  const emit = defineEmits<{
    (e: 'submit', payload: Record<string, string>): void;
  }>();

  const getBaseState = () =>
    Object.fromEntries(
      props.fields.map((field) => [field.key, props.initialValues[field.key] ?? ''])
    ) as Record<string, string>;

  const form = reactive<Record<string, string>>({});

  const applyInitialValues = () => {
    Object.assign(form, getBaseState());
  };

  watch(() => [props.initialValues, props.fields], () => applyInitialValues(), { immediate: true, deep: true });

  const resetForm = () => applyInitialValues();

  const submitForm = () => {
    emit('submit', { ...form });
    if (props.resetOnSubmit) applyInitialValues();
  };
</script>