<template>
  <AppLayout title="Produtos" subtitle="Cadastro e gerenciamento principal do estoque SOS">
    <div class="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
      <ProductFormCard :categories="store.categories" :suppliers="store.suppliers" @submit="onCreate" />

      <SectionCard title="Produtos cadastrados" description="Base atual do inventário">
        <ProductTable :products="store.products" :categories="store.categories" @edit="openEditModal" @remove="openDeleteModal" />
      </SectionCard>
    </div>

    <ProductEditModal :open="editingOpen" :product="selectedProduct" :categories="store.categories" :suppliers="store.suppliers" @close="closeEditModal" @submit="onEdit" />

    <AppConfirmModal :open="deleteOpen" title="Excluir produto" :message="deleteMessage" @cancel="closeDeleteModal" @confirm="onDelete" />
  </AppLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import AppLayout from '@/components/layout/AppLayout.vue';
  import SectionCard from '@/components/common/SectionCard.vue';
  import AppConfirmModal from '@/components/common/AppConfirmModal.vue';
  import ProductFormCard from '@/components/products/ProductFormCard.vue';
  import ProductTable from '@/components/products/ProductTable.vue';
  import ProductEditModal from '@/components/products/ProductEditModal.vue';
  import { useInventoryStore } from '@/stores/inventory';
  import type { Product } from '@/types';

  const store = useInventoryStore();

  const editingOpen = ref(false);
  const deleteOpen = ref(false);
  const selectedProduct = ref<Product | null>(null);
  const productToDelete = ref<Product | null>(null);

  const deleteMessage = computed(() => productToDelete.value ? `Tem certeza que deseja excluir o produto "${productToDelete.value.name}"? Essa ação não poderá ser desfeita.` : 'Tem certeza que deseja excluir este produto?');

  const onCreate = async (payload: Omit<Product, 'id'>) => {
    try {
      await store.addProduct(payload);
      await Promise.all([store.loadProducts(), store.loadMovements(), store.refreshDashboard()]);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  const openEditModal = (product: Product) => {
    selectedProduct.value = product;
    editingOpen.value = true;
  };

  const closeEditModal = () => {
    editingOpen.value = false;
    selectedProduct.value = null;
  };

  const onEdit = async (payload: Omit<Product, 'id'>) => {
    if (!selectedProduct.value) return;

    try {
      await store.editProduct(selectedProduct.value.id, payload);
      await Promise.all([store.loadProducts(), store.loadMovements(), store.refreshDashboard()]);
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const openDeleteModal = (product: Product) => {
    productToDelete.value = product;
    deleteOpen.value = true;
  };

  const closeDeleteModal = () => {
    deleteOpen.value = false;
    productToDelete.value = null;
  };

  const onDelete = async () => {
    if (!productToDelete.value) return;

    try {
      await store.removeProduct(productToDelete.value.id);
      await Promise.all([store.loadProducts(), store.loadMovements(), store.refreshDashboard()]);
      closeDeleteModal();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  onMounted(async () => {
    try {
      await Promise.all([store.loadCategories(), store.loadSuppliers(), store.loadProducts()]);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  });
</script>