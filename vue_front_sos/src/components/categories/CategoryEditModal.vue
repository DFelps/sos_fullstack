<template>
  <AppModal :open="open" title="Editar categoria" @close="$emit('close')">
    <SimpleEntityForm v-if="category" :fields="fields" :initial-values="formValues" submit-label="Salvar alterações" :reset-on-submit="false" @submit="handleSubmit" />
  </AppModal>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import AppModal from '@/components/common/AppModal.vue';
    import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';
    import type { Category } from '@/types';

    const props = defineProps<{
    open: boolean;
    category: Category | null;
    }>();

    const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', payload: { name: string; description: string; color: string }): void;
    }>();

    const fields: FieldConfig[] = [
    { key: 'name', label: 'Nome' },
    { key: 'description', label: 'Descrição', full: true },
    { key: 'color', label: 'Cor', type: 'color' }
    ];

    const formValues = computed<Record<string, string>>(() => {
        if (!props.category) {
            return {
            name: '',
            description: '',
            color: '#0048CA'
            };
        }

        return {
            name: props.category.name ?? '',
            description: props.category.description ?? '',
            color: props.category.color ?? '#0048CA'
        };
    });

    const handleSubmit = (payload: Record<string, string>) => {
    emit('submit', {
        name: payload.name,
        description: payload.description,
        color: payload.color
    });
    };
</script>