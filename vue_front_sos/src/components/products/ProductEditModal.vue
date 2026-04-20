<template>
  <AppModal :open="open" title="Editar produto" @close="$emit('close')">
    <ProductForm v-if="product" :categories="categories" :suppliers="suppliers" :initial-values="formValues" submit-label="Salvar alterações" :reset-on-submit="false" @submit="handleSubmit" />
  </AppModal>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import AppModal from '@/components/common/AppModal.vue';
    import ProductForm from '@/components/forms/ProductForm.vue';
    import type { Category, Product, Supplier } from '@/types';

    const props = defineProps<{
    open: boolean;
    product: Product | null;
    categories: Category[];
    suppliers: Supplier[];
    }>();

    const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', payload: Omit<Product, 'id'>): void;
    }>();

    const formValues = computed(() => {
    if (!props.product) return {};
    return {
        name: props.product.name,
        sku: props.product.sku,
        categoryId: props.product.categoryId,
        supplierId: props.product.supplierId,
        quantity: props.product.quantity,
        minQuantity: props.product.minQuantity,
        costPrice: props.product.costPrice,
        salePrice: props.product.salePrice,
        expirationDate: props.product.expirationDate ?? '',
        entryDate: props.product.entryDate,
        location: props.product.location,
        description: props.product.description ?? ''
    };
    });

    const handleSubmit = (payload: Omit<Product, 'id'>) => emit('submit', payload);
</script>