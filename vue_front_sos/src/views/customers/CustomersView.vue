<template>
  <AppLayout title="Clientes" subtitle="Cadastro de clientes e compradores">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <SectionCard title="Novo cliente">
        <SimpleEntityForm :fields="fields" @submit="onSubmit" />
      </SectionCard>

      <SectionCard title="Base de clientes">
        <div v-if="store.customersLoading" class="rounded-2xl border border-slate-100 p-5 text-sm text-slate-500">
          Carregando clientes...
        </div>

        <div v-else-if="store.customersError" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {{ store.customersError }}
        </div>

        <div v-else-if="store.customers.length" class="grid gap-4 md:grid-cols-2">
          <div
            v-for="item in store.customers"
            :key="item.id"
            class="rounded-2xl border border-slate-100 p-5"
          >
            <h4 class="font-bold text-slate-900">{{ item.name }}</h4>
            <p class="mt-2 text-sm text-slate-500">{{ item.email }}</p>
            <p class="text-sm text-slate-500">{{ item.phone }}</p>
          </div>
        </div>

        <div v-else class="rounded-2xl border border-slate-100 p-5 text-sm text-slate-500">
          Nenhum cliente cadastrado.
        </div>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';
import { useInventoryStore } from '@/stores/inventory';

const store = useInventoryStore();

const fields: FieldConfig[] = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail', type: 'email' },
  { key: 'phone', label: 'Telefone' }
];

onMounted(async () => {
  try {
    await store.loadCustomers();
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
});

const onSubmit = async (payload: Record<string, string>) => {
  try {
    await store.addCustomer({
      name: payload.name,
      email: payload.email,
      phone: payload.phone
    });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
  }
};
</script>