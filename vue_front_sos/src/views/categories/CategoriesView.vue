<template>
  <AppLayout title="Categorias" subtitle="Organização por grupos de produto">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <CategoryFormCard @submit="onCreate" />

      <SectionCard title="Lista de categorias">
        <CategoryList :categories="store.categories" @edit="openEditModal" @remove="openDeleteModal" />
      </SectionCard>
    </div>

    <CategoryEditModal :open="editingOpen" :category="selectedCategory" @close="closeEditModal" @submit="onEdit" />

    <AppConfirmModal :open="deleteOpen" title="Excluir categoria" :message="deleteMessage" @cancel="closeDeleteModal" @confirm="onDelete" />
  </AppLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import AppLayout from '@/components/layout/AppLayout.vue';
  import SectionCard from '@/components/common/SectionCard.vue';
  import AppConfirmModal from '@/components/common/AppConfirmModal.vue';
  import CategoryFormCard from '@/components/categories/CategoryFormCard.vue';
  import CategoryList from '@/components/categories/CategoryList.vue';
  import CategoryEditModal from '@/components/categories/CategoryEditModal.vue';
  import { useInventoryStore } from '@/stores/inventory';
  import type { Category } from '@/types';

  const store = useInventoryStore();

  const editingOpen = ref(false);
  const deleteOpen = ref(false);
  const selectedCategory = ref<Category | null>(null);
  const categoryToDelete = ref<Category | null>(null);

  const deleteMessage = computed(() =>
    categoryToDelete.value
      ? `Tem certeza que deseja excluir a categoria "${categoryToDelete.value.name}"? Essa ação não poderá ser desfeita.`
      : 'Tem certeza que deseja excluir esta categoria?'
  );

  const onCreate = async (payload: Record<string, string>) => {
    try {
      await store.addCategory({
        name: payload.name,
        description: payload.description,
        color: payload.color
      });

      await store.loadCategories();
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
    }
  };

  const openEditModal = (category: Category) => {
    selectedCategory.value = category;
    editingOpen.value = true;
  };

  const closeEditModal = () => {
    editingOpen.value = false;
    selectedCategory.value = null;
  };

  const onEdit = async (payload: { name: string; description: string; color: string }) => {
    if (!selectedCategory.value) return;

    try {
      await store.editCategory(selectedCategory.value.id, payload);
      await store.loadCategories();
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
    }
  };

  const openDeleteModal = (category: Category) => {
    categoryToDelete.value = category;
    deleteOpen.value = true;
  };

  const closeDeleteModal = () => {
    deleteOpen.value = false;
    categoryToDelete.value = null;
  };

  const onDelete = async () => {
    if (!categoryToDelete.value) return;

    try {
      await store.removeCategory(categoryToDelete.value.id);
      await store.loadCategories();
      closeDeleteModal();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  onMounted(async () => {
    try {
      await store.loadCategories();
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  });
</script>