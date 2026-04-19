<template>
  <AppLayout title="Fornecedores" subtitle="Gestão de parceiros e distribuidores">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <SectionCard title="Novo fornecedor">
        <SimpleEntityForm :fields="fields" @submit="onSubmit" />
      </SectionCard>
      <SectionCard title="Base de fornecedores">
        <div class="overflow-x-auto">
          <table class="table-sos">
            <thead><tr><th>Empresa</th><th>Contato</th><th>E-mail</th><th>Telefone</th></tr></thead>
            <tbody>
              <tr v-for="item in store.suppliers" :key="item.id" class="border-b border-slate-100">
                <td>{{ item.tradeName }}</td><td>{{ item.contactName }}</td><td>{{ item.email }}</td><td>{{ item.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';
import { useInventoryStore } from '@/stores/inventory';
const store = useInventoryStore();
const fields: FieldConfig[] = [
  { key: 'tradeName', label: 'Razão/Nome fantasia' },
  { key: 'contactName', label: 'Contato' },
  { key: 'email', label: 'E-mail', type: 'email' },
  { key: 'phone', label: 'Telefone' }
];
const onSubmit = (payload: Record<string, string>) => store.addSupplier(payload as { tradeName: string; contactName: string; email: string; phone: string });
</script>
