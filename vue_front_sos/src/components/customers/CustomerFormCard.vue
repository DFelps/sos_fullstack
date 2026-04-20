<template>
  <SectionCard title="Novo cliente" description="Cadastre clientes e compradores do estoque SOS">
    <SimpleEntityForm :fields="fields" submit-label="Salvar cliente" @submit="$emit('submit', $event)" />
  </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '@/components/common/SectionCard.vue';
import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';

const fields: FieldConfig[] = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail', type: 'email' },
  { key: 'phone', label: 'Telefone' }
];

defineEmits<{
  (e: 'submit', payload: Record<string, string>): void;
}>();
</script>