<template>
  <AppModal :open="open" title="Editar fornecedor" @close="$emit('close')">
    <SimpleEntityForm v-if="supplier" :fields="fields" :initial-values="formValues" submit-label="Salvar alterações" :reset-on-submit="false" @submit="handleSubmit" />
  </AppModal>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import AppModal from '@/components/common/AppModal.vue';
    import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';
    import type { Supplier } from '@/types';

    const props = defineProps<{
    open: boolean;
    supplier: Supplier | null;
    }>();

    const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', payload: { tradeName: string; contactName: string; email: string; phone: string }): void;
    }>();

    const fields: FieldConfig[] = [
    { key: 'tradeName', label: 'Razão/Nome fantasia' },
    { key: 'contactName', label: 'Contato' },
    { key: 'email', label: 'E-mail', type: 'email' },
    { key: 'phone', label: 'Telefone' }
    ];

    const formValues = computed<Record<string, string>>(() => {
    if (!props.supplier) {
        return {
        tradeName: '',
        contactName: '',
        email: '',
        phone: ''
        };
    }

    return {
        tradeName: props.supplier.tradeName ?? '',
        contactName: props.supplier.contactName ?? '',
        email: props.supplier.email ?? '',
        phone: props.supplier.phone ?? ''
    };
    });

    const handleSubmit = (payload: Record<string, string>) => {
    emit('submit', {
        tradeName: payload.tradeName,
        contactName: payload.contactName,
        email: payload.email,
        phone: payload.phone
    });
    };
</script>