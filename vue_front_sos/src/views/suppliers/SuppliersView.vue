<template>
  <AppLayout title="Fornecedores" subtitle="Gestão de parceiros e distribuidores">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <SupplierFormCard @submit="onCreate" />

      <SectionCard title="Base de fornecedores">
        <SupplierTable :suppliers="store.suppliers" @edit="openEditModal" @remove="openDeleteModal" />
      </SectionCard>
    </div>

    <SupplierEditModal :open="editingOpen" :supplier="selectedSupplier" @close="closeEditModal" @submit="onEdit" />

    <AppConfirmModal :open="deleteOpen" title="Excluir fornecedor" :message="deleteMessage" @cancel="closeDeleteModal" @confirm="onDelete" />
  </AppLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import AppLayout from '@/components/layout/AppLayout.vue';
  import SectionCard from '@/components/common/SectionCard.vue';
  import AppConfirmModal from '@/components/common/AppConfirmModal.vue';
  import SupplierFormCard from '@/components/suppliers/SupplierFormCard.vue';
  import SupplierTable from '@/components/suppliers/SupplierTable.vue';
  import SupplierEditModal from '@/components/suppliers/SupplierEditModal.vue';
  import { useInventoryStore } from '@/stores/inventory';
  import type { Supplier } from '@/types';

  const store = useInventoryStore();

  const editingOpen = ref(false);
  const deleteOpen = ref(false);
  const selectedSupplier = ref<Supplier | null>(null);
  const supplierToDelete = ref<Supplier | null>(null);

  const deleteMessage = computed(() =>
    supplierToDelete.value
      ? `Tem certeza que deseja excluir o fornecedor "${supplierToDelete.value.tradeName}"? Essa ação não poderá ser desfeita.`
      : 'Tem certeza que deseja excluir este fornecedor?'
  );

  const onCreate = async (payload: Record<string, string>) => {
    try {
      await store.addSupplier({
        tradeName: payload.tradeName,
        contactName: payload.contactName,
        email: payload.email,
        phone: payload.phone
      });

      await store.loadSuppliers();
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
    }
  };

  const openEditModal = (supplier: Supplier) => {
    selectedSupplier.value = supplier;
    editingOpen.value = true;
  };

  const closeEditModal = () => {
    editingOpen.value = false;
    selectedSupplier.value = null;
  };

  const onEdit = async (payload: { tradeName: string; contactName: string; email: string; phone: string }) => {
    if (!selectedSupplier.value) return;

    try {
      await store.editSupplier(selectedSupplier.value.id, payload);
      await store.loadSuppliers();
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar fornecedor:', error);
    }
  };

  const openDeleteModal = (supplier: Supplier) => {
    supplierToDelete.value = supplier;
    deleteOpen.value = true;
  };

  const closeDeleteModal = () => {
    deleteOpen.value = false;
    supplierToDelete.value = null;
  };

  const onDelete = async () => {
    if (!supplierToDelete.value) return;

    try {
      await store.removeSupplier(supplierToDelete.value.id);
      await store.loadSuppliers();
      closeDeleteModal();
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  onMounted(async () => {
    try {
      await store.loadSuppliers();
    } catch (error) {
      console.error('Erro ao carregar fornecedores:', error);
    }
  });
</script>