<template>
  <AppLayout title="Clientes" subtitle="Cadastro de clientes e compradores">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <CustomerFormCard @submit="onCreate" />

      <SectionCard title="Base de clientes">
        <CustomerList :customers="store.customers" @edit="openEditModal" @remove="openDeleteModal" />
      </SectionCard>
    </div>

    <CustomerEditModal :open="editingOpen" :customer="selectedCustomer" @close="closeEditModal" @submit="onEdit" />

    <AppConfirmModal :open="deleteOpen" title="Excluir cliente" :message="deleteMessage" @cancel="closeDeleteModal" @confirm="onDelete" />
  </AppLayout>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import AppLayout from '@/components/layout/AppLayout.vue';
  import SectionCard from '@/components/common/SectionCard.vue';
  import AppConfirmModal from '@/components/common/AppConfirmModal.vue';
  import CustomerFormCard from '@/components/customers/CustomerFormCard.vue';
  import CustomerList from '@/components/customers/CustomerList.vue';
  import CustomerEditModal from '@/components/customers/CustomerEditModal.vue';
  import { useInventoryStore } from '@/stores/inventory';
  import type { Customer } from '@/types';

  const store = useInventoryStore();

  const editingOpen = ref(false);
  const deleteOpen = ref(false);
  const selectedCustomer = ref<Customer | null>(null);
  const customerToDelete = ref<Customer | null>(null);

  const deleteMessage = computed(() =>
    customerToDelete.value
      ? `Tem certeza que deseja excluir o cliente "${customerToDelete.value.name}"? Essa ação não poderá ser desfeita.`
      : 'Tem certeza que deseja excluir este cliente?'
  );

  const onCreate = async (payload: Record<string, string>) => {
    try {
      await store.addCustomer({
        name: payload.name,
        email: payload.email,
        phone: payload.phone
      });

      await store.loadCustomers();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const openEditModal = (customer: Customer) => {
    selectedCustomer.value = customer;
    editingOpen.value = true;
  };

  const closeEditModal = () => {
    editingOpen.value = false;
    selectedCustomer.value = null;
  };

  const onEdit = async (payload: { name: string; email: string; phone: string }) => {
    if (!selectedCustomer.value) return;

    try {
      await store.editCustomer(selectedCustomer.value.id, payload);
      await store.loadCustomers();
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
    }
  };

  const openDeleteModal = (customer: Customer) => {
    customerToDelete.value = customer;
    deleteOpen.value = true;
  };

  const closeDeleteModal = () => {
    deleteOpen.value = false;
    customerToDelete.value = null;
  };

  const onDelete = async () => {
    if (!customerToDelete.value) return;

    try {
      await store.removeCustomer(customerToDelete.value.id);
      await store.loadCustomers();
      closeDeleteModal();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  onMounted(async () => {
    try {
      await store.loadCustomers();
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  });
</script>