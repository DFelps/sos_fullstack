<template>
  <SectionCard title="Novo fornecedor" description="Cadastre parceiros e distribuidores do estoque SOS">
    <SimpleEntityForm :fields="fields" submit-label="Salvar fornecedor" @submit="$emit('submit', $event)" />
  </SectionCard>
</template>

<script setup lang="ts">
    import SectionCard from '@/components/common/SectionCard.vue';
    import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';

    const fields: FieldConfig[] = [
    { key: 'tradeName', label: 'Razão/Nome fantasia' },
    { key: 'contactName', label: 'Contato' },
    { key: 'email', label: 'E-mail', type: 'email' },
    { key: 'phone', label: 'Telefone' }
    ];

    defineEmits<{
    (e: 'submit', payload: Record<string, string>): void;
    }>();
</script>