<template>
  <AppModal :open="open" title="Editar cliente" @close="$emit('close')">
    <SimpleEntityForm v-if="customer" :fields="fields" :initial-values="formValues" submit-label="Salvar alterações" :reset-on-submit="false" @submit="handleSubmit" />
  </AppModal>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import AppModal from '@/components/common/AppModal.vue';
    import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';
    import type { Customer } from '@/types';

    const props = defineProps<{
    open: boolean;
    customer: Customer | null;
    }>();

    const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', payload: { name: string; email: string; phone: string }): void;
    }>();

    const fields: FieldConfig[] = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'E-mail', type: 'email' },
    { key: 'phone', label: 'Telefone' }
    ];

    const formValues = computed<Record<string, string>>(() => {
    if (!props.customer) {
        return {
        name: '',
        email: '',
        phone: ''
        };
    }

    return {
        name: props.customer.name ?? '',
        email: props.customer.email ?? '',
        phone: props.customer.phone ?? ''
    };
    });

    const handleSubmit = (payload: Record<string, string>) => {
    emit('submit', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone
    });
    };
</script>