<template>
  <SectionCard title="Novo produto" description="Cadastre itens com dados completos de estoque">
    <ProductForm :categories="categories" :suppliers="suppliers" @submit="$emit('submit', $event)" />
  </SectionCard>
</template>

<script setup lang="ts">
  import SectionCard from '@/components/common/SectionCard.vue';
  import ProductForm from '@/components/forms/ProductForm.vue';
  import type { Category, Product, Supplier } from '@/types';

  defineProps<{
    categories: Category[];
    suppliers: Supplier[];
  }>();

  defineEmits<{
    (e: 'submit', payload: Omit<Product, 'id'>): void;
  }>();
</script>