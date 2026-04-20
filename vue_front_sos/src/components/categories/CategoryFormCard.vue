<template>
  <SectionCard title="Nova categoria" description="Crie grupos para facilitar filtros e relatórios">
    <SimpleEntityForm :fields="fields" :initial-values="{ color: '#0048CA' }" submit-label="Salvar categoria" @submit="$emit('submit', $event)" />
  </SectionCard>
</template>

<script setup lang="ts">
    import SectionCard from '@/components/common/SectionCard.vue';
    import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';

    const fields: FieldConfig[] = [
    { key: 'name', label: 'Nome' },
    { key: 'description', label: 'Descrição', full: true },
    { key: 'color', label: 'Cor', type: 'color' }
    ];

    defineEmits<{
    (e: 'submit', payload: Record<string, string>): void;
    }>();
</script>